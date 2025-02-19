import React, {FC} from 'react';
import {apiService} from "@/services/api.services";
import Link from "next/link";
import RecipeTags from "@/components/RecipeTags/RecipeTags";
type RecipeDetailType = {
    id: number;
}
const RecipeDetails:FC<RecipeDetailType> = async ({id}) => {
    const recipe = await apiService.getRecipe(id);
    return (
        <div>
            <p>Id: {recipe.id}</p>
            <p>Name: {recipe.name}</p>
            <p>PrepTimeMinutes: {recipe.prepTimeMinutes}</p>
            <p>CookTimeMinutes: {recipe.cookTimeMinutes}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Cuisine: {recipe.cuisine}</p>
            <Link href={`/users/${recipe.userId}`}>Author</Link> <br/>
            <h3>Tags:</h3>
            {recipe.tags.map((tag, index) => <RecipeTags tag={tag} key={index}/>)}
        </div>
    );
};

export default RecipeDetails;