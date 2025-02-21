import { cookies } from 'next/headers';
import { apiService } from '@/services/api.services';
import {ITokenPair} from "@/models/ITokenPair";
import {authService} from "@/services/authService";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const queryParam = searchParams.get('query');

    const limit = limitParam ? Number(limitParam) : 10;
    const currentPage = pageParam ? Number(pageParam) : 1;
    const skip = (currentPage - 1) * limit;

    // Допоміжна функція для формування даних через apiService
    async function fetchData() {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value
        if (!accessToken) {
            return Response.json('Нема акцес токена')
        }
            if (queryParam) {
                const numericQuery = Number(queryParam);
                if (!isNaN(numericQuery)) {
                    const singleUser = await apiService.getUser(accessToken ,numericQuery);
                    return { users: [singleUser], total: 1, skip, limit };
                } else {
                    return await apiService.getUsers(accessToken,skip, limit, queryParam);
                }
            } else {
                return await apiService.getUsers(accessToken,skip, limit);
            }

    }

    try {
        // Перша спроба отримати дані
        const data = await fetchData();
        return Response.json(data);
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
                    return Response.json({ message: 'Немає refresh token' }, { status: 401 });
                }
                // Оновлюємо токени через authService
                const tokensData:ITokenPair = await authService.refreshToken(refreshToken)

                cookieStore.set('accessToken', tokensData.accessToken)
                cookieStore.set('refreshToken', tokensData.refreshToken)
                // Після успішного оновлення, повторно отримуємо дані
                const data = await fetchData();
                return Response.json(data);
            } catch (refreshError: unknown) {
                let refreshErrorMessage = 'Помилка при оновленні токенів';
                if (refreshError instanceof Error) {
                    refreshErrorMessage = refreshError.message;
                }
                return Response.json({ message: refreshErrorMessage }, { status: 401 });
            }
        }
        return Response.json({ message: errorMessage }, { status: 500 });
    }
}