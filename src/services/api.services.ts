import { authorizedFetch } from './authorizedFetch';
import { IUser } from '@/models/IUser';
import { IRecipe } from '@/models/IRecipe';
import { IUserBaseResponseModel } from '@/models/IUserBaseResponseModel';
import { IRecipeBaseResponseModel } from '@/models/IRecipeBaseResponseModel';

const BASE_URL = 'https://dummyjson.com/auth';


export const apiService = {
    // Приклад: метод отримання списку користувачів (або конкретного користувача)
    getUsers: async (
        skip = 0,
        limit = 10,
        query?: string | number
    ): Promise<IUserBaseResponseModel> => {
        let url = `${BASE_URL}/users?skip=${skip}&limit=${limit}`;
        if (query) {
            if (typeof query === 'number') {
                url = `${BASE_URL}/users/${query}`;
            } else {
                url = `${BASE_URL}/users/search?q=${query}&skip=${skip}&limit=${limit}`;
            }
        }
        return authorizedFetch<IUserBaseResponseModel>(url);
    },

    getUser: async (id: number): Promise<IUser> => {
        const url = `${BASE_URL}/users/${id}`;
        return authorizedFetch<IUser>(url);
    },

    // Приклад: отримання рецептів
    getRecipes: async (
        skip = 0,
        limit = 10,
        query?: string | number
    ): Promise<IRecipeBaseResponseModel> => {
        let url = `${BASE_URL}/recipes?skip=${skip}&limit=${limit}`;
        if (query) {
            if (typeof query === 'number') {
                url = `${BASE_URL}/recipes/${query}`;
            } else {
                url = `${BASE_URL}/recipes/search?q=${query}&skip=${skip}&limit=${limit}`;
            }
        }
        return authorizedFetch<IRecipeBaseResponseModel>(url);
    },

    getRecipe: async (id: number): Promise<IRecipe> => {
        const url = `${BASE_URL}/recipes/${id}`;
        return authorizedFetch<IRecipe>(url);
    },

    // Приклад: отримання рецептів за тегом
    getRecipesByTag: async (
        tag: string,
        skip = 0,
        limit = 10
    ): Promise<IRecipeBaseResponseModel> => {
        const url = `${BASE_URL}/recipes/tag/${tag}?skip=${skip}&limit=${limit}`;
        return authorizedFetch<IRecipeBaseResponseModel>(url);
    },
};
