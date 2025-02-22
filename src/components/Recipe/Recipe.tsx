import React from "react";
import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";
import RecipeTags from "@/components/RecipeTags/RecipeTags";

interface IRecipeProps {
    recipe: IRecipe;
}


const Recipe: React.FC<IRecipeProps> = ({ recipe }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            {recipe.tags.map((tag,index)=><RecipeTags tag={tag} key={index}/>)}
        </div>
    );
};

export default Recipe;
