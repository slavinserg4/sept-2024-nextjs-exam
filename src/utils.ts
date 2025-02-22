import { cookies } from 'next/headers';
import { ITokenPair } from '@/models/ITokenPair';
import { authService } from '@/services/authService';


export async function withTokenRefresh<T>(fetchData: () => Promise<T>): Promise<Response> {
    try {
        const data = await fetchData();
        return Response.json(data);
    } catch (error: unknown) {
        let errorMessage = 'Сталася невідома помилка';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
            try {
                const cookieStore = await cookies();
                const refreshToken = cookieStore.get('refreshToken')?.value;
                if (!refreshToken) {
                    return Response.json({ message: 'Немає refresh token' }, { status: 401 });
                }
                const tokensData: ITokenPair = await authService.refreshToken(refreshToken);
                cookieStore.set('accessToken', tokensData.accessToken);
                cookieStore.set('refreshToken', tokensData.refreshToken);
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
