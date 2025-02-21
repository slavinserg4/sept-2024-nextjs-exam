import { cookies } from 'next/headers';
import { apiService } from '@/services/api.services';
import { withTokenRefresh } from '@/utils';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const queryParam = searchParams.get('query');
    const tagParam = searchParams.get('tag');

    const limit = limitParam ? Number(limitParam) : 10;
    const currentPage = pageParam ? Number(pageParam) : 1;
    const skip = (currentPage - 1) * limit;

    // Функція для отримання даних рецептів через apiService
    async function fetchData() {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json({ message: 'Нема access токена' }, { status: 401 });
        }

        let data;
        if (tagParam) {
            // Якщо є тег, використовуємо API для фільтрації за тегом
            data = await apiService.getRecipesByTag(accessToken, tagParam, skip, limit);
        } else if (queryParam) {
            const numericQuery = Number(queryParam);
            if (!isNaN(numericQuery)) {
                // Якщо query є числовим, шукаємо конкретний рецепт за ID
                const singleRecipe = await apiService.getRecipe(accessToken, numericQuery);
                data = { recipes: [singleRecipe], total: 1, skip, limit };
            } else {
                // Якщо query - не числове, шукаємо за ім'ям
                data = await apiService.getRecipes(accessToken, skip, limit, queryParam);
            }
        } else {
            // Якщо немає ні тегу, ні query, отримуємо всі рецепти
            data = await apiService.getRecipes(accessToken, skip, limit);
        }
        return data;
    }

    return await withTokenRefresh(fetchData);
}
