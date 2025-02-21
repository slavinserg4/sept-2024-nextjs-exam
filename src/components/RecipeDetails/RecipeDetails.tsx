"use client";

import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import RecipeTags from "@/components/RecipeTags/RecipeTags";
import {IRecipe} from "@/models/IRecipe";
// Припустимо, що у вас є тип IRecipe, можна його імпортувати, або використовувати any

type RecipeDetailType = {
    id: number;
};

const RecipeDetails: FC<RecipeDetailType> = ({ id }) => {
    const [recipe, setRecipe] = useState<IRecipe|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:3000/recipes/${id}/api`, {
                    method: "GET",
                });
                if (!res.ok) {
                     new Error("Не вдалося завантажити дані рецепту");
                }
                const data = await res.json();
                // Очікуємо, що API повертає об'єкт з ключем "recipe"
                if (data.recipe) {
                    setRecipe(data.recipe);
                } else {
                    setError("Рецепт не знайдено");
                }
            } catch (err) {
                console.error(err);
                setError("Сталася помилка");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe().catch();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>No recipe found</div>;

    return (
        <div>
            <p>Id: {recipe.id}</p>
            <p>Name: {recipe.name}</p>
            <p>PrepTimeMinutes: {recipe.prepTimeMinutes}</p>
            <p>CookTimeMinutes: {recipe.cookTimeMinutes}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Cuisine: {recipe.cuisine}</p>
            <Link href={`/users/${recipe.userId}`}>Author</Link>
            <br />
            <h3>Tags:</h3>
            {recipe.tags.map((tag: string, index: number) => (
                <RecipeTags tag={tag} key={index} />
            ))}
        </div>
    );
};

export default RecipeDetails;
