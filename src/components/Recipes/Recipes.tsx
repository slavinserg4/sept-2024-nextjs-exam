"use client";

import '@/app/globals.css'
import './StyleForRecipes.css'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import Recipe from "@/components/Recipe/Recipe";
import Search from "@/components/Search/Search";
import {IRecipeBaseResponseModel} from "@/models/IRecipeBaseResponseModel";

const Recipes = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query") || "";
    const tag = searchParams.get("tag") || "";
    const currentPage = parseInt(page, 10);
    const limit = 10;

    const [data, setData] = useState<IRecipeBaseResponseModel | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Формуємо рядок запиту з параметрами page, limit, query та tag
                const queryString =
                    `?page=${currentPage}&limit=${limit}` +
                    (query ? `&query=${encodeURIComponent(query)}` : "") +
                    (tag ? `&tag=${encodeURIComponent(tag)}` : "");

                const res = await fetch(`http://localhost:3000/recipes/api${queryString}`, {
                    method: "GET",
                });
                if (!res.ok) {
                    new Error("Не вдалося завантажити дані");
                }
                const json: IRecipeBaseResponseModel = await res.json();
                setData(json);
            } catch (error) {
                console.error("error fetching recipes", error);
            }
        };

        fetchRecipes().catch();
    }, [query, currentPage, tag]);

    if (!data) return <div className={'loader'}></div>;

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div className={'Recipes'}>
            <Search />
            {query && <h3>Results for: {query}</h3>}
            {tag && <h3>Filtered by tag: {tag}</h3>}
            <div className="recipesInfo">
                {data.recipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Recipes;
