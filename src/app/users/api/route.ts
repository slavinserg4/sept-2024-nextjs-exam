import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiService } from '@/services/api.services';
import { IUserBaseResponseModel } from '@/models/IUserBaseResponseModel';
import {ITokenPair} from "@/models/ITokenPair";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const queryParam = searchParams.get('query');

    const limit = limitParam ? Number(limitParam) : 10;
    const currentPage = pageParam ? Number(pageParam) : 1;
    const skip = (currentPage - 1) * limit;

    // Допоміжна функція для формування даних через apiService
    async function fetchData(): Promise<IUserBaseResponseModel> {
        if (queryParam) {
            const numericQuery = Number(queryParam);
            if (!isNaN(numericQuery)) {
                const singleUser = await apiService.getUser(numericQuery);
                return { users: [singleUser], total: 1, skip, limit };
            } else {
                return await apiService.getUsers(skip, limit, queryParam);
            }
        } else {
            return await apiService.getUsers(skip, limit);
        }
    }

    try {
        // Перша спроба отримати дані
        const data = await fetchData();
        return NextResponse.json(data);
    } catch (error: unknown) {
        let errorMessage = 'Сталася невідома помилка';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        // Якщо помилка свідчить про Unauthorized – пробуємо оновити токени
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
            try {
                const cookieStore = await cookies();
                const refreshToken = cookieStore.get('refreshToken')?.value;
                if (!refreshToken) {
                    return NextResponse.json({ message: 'Немає refresh token' }, { status: 401 });
                }
                // Оновлюємо токени через authService
                const tokensData:ITokenPair = await fetch('https://dummyjson.com/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        refreshToken: refreshToken,
                        expiresInMins: 30,

                    })
                    ,credentials:'include'
                }).then(res => res.json());

                cookieStore.set('accessToken', tokensData.accessToken)
                cookieStore.set('refreshToken', tokensData.refreshToken)
                // Після успішного оновлення, повторно отримуємо дані
                const data = await fetchData();
                return NextResponse.json(data);
            } catch (refreshError: unknown) {
                let refreshErrorMessage = 'Помилка при оновленні токенів';
                if (refreshError instanceof Error) {
                    refreshErrorMessage = refreshError.message;
                }
                return NextResponse.json({ message: refreshErrorMessage }, { status: 401 });
            }
        }
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}