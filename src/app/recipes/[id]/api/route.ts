import { cookies } from 'next/headers';
import { apiService } from '@/services/api.services';
import { withTokenRefresh } from '@/utils';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
        return Response.json({ message: 'Невірний ID' }, { status: 400 });
    }

    async function fetchData() {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json({ message: 'Нема access токена' }, { status: 401 });
        }
        // Отримуємо дані рецепту за допомогою apiService.
        // За умовчанням, припускаємо, що apiService.getRecipe приймає accessToken та id
        const recipe = await apiService.getRecipe(accessToken, numericId);
        return { recipe };
    }

    return await withTokenRefresh(fetchData);
}
