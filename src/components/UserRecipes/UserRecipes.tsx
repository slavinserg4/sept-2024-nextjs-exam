import { FC } from "react";
import { mergeRecipesWithUsers } from "@/services/helper";
import { apiService } from "@/services/api.services";
import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";

interface Props {
    userId: number;
}

const UserRecipes: FC<Props> = async ({ userId }) => {
    let allRecipes:IRecipe[] = [];
    let skip = 0;
    const limit = 50; // Поставимо базовий ліміт
    let total = 0;

    do {
        const response = await apiService.getRecipes( skip, limit );
        allRecipes = [...allRecipes, ...response.recipes];
        total = response.total;
        skip += limit;
    } while (allRecipes.length < total);

    const userRecipes = mergeRecipesWithUsers(allRecipes, userId);

    return (
        <div>
            <h2>Recipes of this user</h2>
            {userRecipes.length > 0 ? (
                <ul>
                    {userRecipes.map(recipe => (
                        <Link href={`/recipes/${recipe.id}`} key={recipe.id}>{recipe.name}</Link>
                    ))}
                </ul>
            ) : (
                <h3>This user has no recipes.</h3>
            )}
        </div>
    );
};

export default UserRecipes;
