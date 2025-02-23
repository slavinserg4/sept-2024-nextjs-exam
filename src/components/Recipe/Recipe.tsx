import React from "react";
import {IRecipe} from "@/models/IRecipe";
import Link from "next/link";
import RecipeTags from "@/components/RecipeTags/RecipeTags";
import './StyleForRecipe.css'
interface IRecipeProps {
    recipe: IRecipe;
}


const Recipe: React.FC<IRecipeProps> = ({ recipe }) => {
    return (
        <div className="Recipe">
            <Link className={'LinkToRecipeDetails'} href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <h4>Tags:</h4>
            {recipe.tags.map((tag,index)=><RecipeTags tag={tag} key={index}/>)}
            <hr/>
        </div>
    );
};

export default Recipe;
