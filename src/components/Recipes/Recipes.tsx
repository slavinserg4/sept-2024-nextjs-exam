import { apiService } from "@/services/api.services";
import Pagination from "@/components/Pagination/Pagination";
import Recipe from "@/components/Recipe/Recipe";
import Search from "@/components/Search/Search";

interface RecipesProps {
    searchParams: Promise<{ page?: string; query?: string; tag?: string }>;
}

const Recipes = async ({ searchParams }: RecipesProps) => {
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || "1", 10);
    const query = sp.query || "";
    const tag = sp.tag || ""; // Отримуємо тег
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    let data;

    if (tag) {
        // 🔹 Якщо є тег, використовуємо API для тегів
        data = await apiService.getRecipesByTag(tag, skip, limit);
    } else if (query) {
        // 🔹 Якщо query - ID, шукаємо конкретний рецепт, інакше шукаємо по імені
        const parsedQuery = Number(query);
        if (!isNaN(parsedQuery)) {
            const singleRecipe = await apiService.getRecipe(parsedQuery);
            data = { recipes: [singleRecipe], total: 1 };
        } else {
            data = await apiService.getRecipes(skip, limit, query);
        }
    } else {
        // 🔹 Якщо немає пошуку і тегів, отримуємо всі рецепти
        data = await apiService.getRecipes(skip, limit);
    }

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div>
            <Search />
            {query && <h2>Results for: {query}</h2>}
            {tag && <h2>Filtered by tag: {tag}</h2>}
            {data.recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Recipes;
