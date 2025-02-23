"use client";

import './StyleForUserRecipes.css'
import '@/app/globals.css'
import React, { FC, useEffect, useState } from "react";
import { mergeRecipesWithUsers } from "@/services/helper";
import { IRecipe } from "@/models/IRecipe";
import Link from "next/link";
import { IRecipeBaseResponseModel } from "@/models/IRecipeBaseResponseModel";

interface Props {
    userId: number;
}

const UserRecipes: FC<Props> = ({ userId }) => {
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                let allRecipes: IRecipe[] = [];
                let skip = 0;
                const limit = 50; // базовий ліміт
                let total = 0;

                do {
                    const response: IRecipeBaseResponseModel = await fetch(
                        `http://localhost:3000/recipes/api?skip=${skip}&limit=${limit}`
                    ).then((res) => res.json());
                    allRecipes = [...allRecipes, ...response.recipes];
                    total = response.total;
                    skip += limit;
                } while (allRecipes.length < total);

                const filteredRecipes = mergeRecipesWithUsers(allRecipes, userId);
                setUserRecipes(filteredRecipes);
            } catch (err) {
                console.error("Error fetching user recipes", err);
                setError("Помилка при завантаженні рецептів");
            } finally {
                setLoading(false);
            }
        };

        fetchUserRecipes().catch();
    }, [userId]);

    if (loading) return <div className={'loader'}></div>;
    if (error) return <div>Error: {error}</div>;
    if (userRecipes.length === 0) return <h3>This user has no recipes.</h3>;

    return (
        <div>
            <h4>Recipes of this user</h4>
            <ul>
                {userRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link className={'LinkToRecipeDetails'} href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRecipes;
