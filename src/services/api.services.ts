// src/services/api.service.ts
import { IRecipe } from "@/models/IRecipe";
import { IUser } from "@/models/IUser";
import { IRecipeBaseResponseModel } from "@/models/IRecipeBaseResponseModel";
import { IUserBaseResponseModel } from "@/models/IUserBaseResponseModel";


const BASE_URL = 'https://dummyjson.com/auth';


async function fetchAPI<T>(url: string, token:string): Promise<T> {
    const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    });

    const response = await fetch(url, { headers });
    console.log('Response status:', response.status);


    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Помилка при запиті ${url}: ${response.status} - ${errorText}`);
        throw new Error(`Запит завершився помилкою: ${response.statusText}`);
    }
    console.log('Response:', response);
    return response.json();
}

export const apiService = {
    getUsers: async (token:string, skip = 0, limit = 10, query?: string | number): Promise<IUserBaseResponseModel> => {
        let url = `${BASE_URL}/users?skip=${skip}&limit=${limit}`;
        if (query) {
            url =
                typeof query === 'number'
                    ? `${BASE_URL}/users/${query}`
                    : `${BASE_URL}/users/search?q=${query}&skip=${skip}&limit=${limit}`;
        }
        return fetchAPI(url,token);
    },

    getUser: async ( token:string, id: number): Promise<IUser> => {
        const url = `${BASE_URL}/users/${id}`;
        return fetchAPI(url,token);
    },

    getRecipes: async ( token:string,skip = 0, limit = 10, query?: string | number): Promise<IRecipeBaseResponseModel> => {
        let url = `${BASE_URL}/recipes?skip=${skip}&limit=${limit}`;
        if (query) {
            url = typeof query === "number"
                ? `${BASE_URL}/recipes/${query}`
                : `${BASE_URL}/recipes/search?q=${query}&skip=${skip}&limit=${limit}`;
        }
        return fetchAPI(url,token);
    },

    getRecipe: async ( token:string,id: number): Promise<IRecipe> => {
        const url = `${BASE_URL}/recipes/${id}`;
        return fetchAPI(url,token);
    },

    getRecipesByTag: async ( token:string,tag: string, skip = 0, limit = 10): Promise<IRecipeBaseResponseModel> => {
        const url = `${BASE_URL}/recipes/tag/${tag}?skip=${skip}&limit=${limit}`
        return fetchAPI(url,token);
    },
};
