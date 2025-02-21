// app/users/route.ts
import { cookies } from 'next/headers';
import { apiService } from '@/services/api.services';
import {withTokenRefresh} from "@/utils";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const queryParam = searchParams.get('query');

    const limit = limitParam ? Number(limitParam) : 10;
    const currentPage = pageParam ? Number(pageParam) : 1;
    const skip = (currentPage - 1) * limit;

    // Функція для отримання даних через apiService
    async function fetchData() {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json('Нема акцес токена');
        }
        if (queryParam) {
            const numericQuery = Number(queryParam);
            if (!isNaN(numericQuery)) {
                const singleUser = await apiService.getUser(accessToken, numericQuery);
                return { users: [singleUser], total: 1, skip, limit };
            } else {
                return await apiService.getUsers(accessToken, skip, limit, queryParam);
            }
        } else {
            return await apiService.getUsers(accessToken, skip, limit);
        }
    }

    return await withTokenRefresh(fetchData);
}
