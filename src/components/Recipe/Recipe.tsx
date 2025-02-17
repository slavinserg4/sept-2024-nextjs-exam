import React from "react";
import {IRecipe} from "@/models/IRecipe";

interface IRecipeProps {
    recipe: IRecipe;
    // Можна додати інші властивості, якщо потрібно
}


const Recipe: React.FC<IRecipeProps> = ({ recipe }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
            <h3>{recipe.name}</h3>
            {/* Відображаємо теги, розділені комами */}
            <p>{recipe.tags.join(', ')}</p>
        </div>
    );
};

export default Recipe;
