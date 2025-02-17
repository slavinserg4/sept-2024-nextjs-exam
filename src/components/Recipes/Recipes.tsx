import { apiService } from "@/services/api.services";
import Pagination from "@/components/Pagination/Pagination";
import Recipe from "@/components/Recipe/Recipe";

interface RecipesProps {
    searchParams: Promise<{ page?: string }>;
}

const Recipes = async ({ searchParams }: RecipesProps) => {
    // Очікуємо розгортання searchParams
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || '1', 10);
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    // Отримуємо рецепти з API
    const data = await apiService.getRecipes(skip, limit);
    // Припускаємо, що API повертає загальну кількість рецептів у полі total
    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div>
            {data.recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Recipes;
