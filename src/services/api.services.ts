import { IUserWithTokens } from "@/models/IUserWithTokens";
import { cookies } from 'next/headers';

export const apiService = {
    getAccessToken: async (): Promise<string | null> => {
        const cookieStore = await cookies();
        return cookieStore.get("accessToken")?.value || null;
    },
    // user login and log out
    LoginUser: async (username: string, password: string): Promise<IUserWithTokens> => {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
        });

        if (!response.ok) {
            throw new Error("Помилка входу: неправильний логін або пароль");
        }

        const data: IUserWithTokens = await response.json();
        console.log(data);

        const cookieStore = await cookies();
        cookieStore.set('accessToken', data.accessToken, { httpOnly: true, path: '/' });
        cookieStore.set('refreshToken', data.refreshToken, { httpOnly: true, path: '/' });
        cookieStore.set('isAuthenticated', 'true', { httpOnly: true, path: '/' });
        cookieStore.set('userName', data.username, { httpOnly: false, path: '/' });
        cookieStore.set('userImage', data.image, { httpOnly: false, path: '/' });

        return data;
    },
    // Users
    getUsers: async () => {
        const token = await apiService.getAccessToken();

        const response = await fetch("https://dummyjson.com/auth/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Не вдалося отримати користувачів");

        const data = await response.json();
        console.log("Отримані користувачі:", data); // Дебаг

        if (!Array.isArray(data.users)) {
            throw new Error("Очікувався масив користувачів, отримано щось інше");
        }

        return data.users;
    },


    // Recipes
    getRecipes: async () => {
        const token = apiService.getAccessToken();

        const response = await fetch("https://dummyjson.com/auth/recipes", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error("Не вдалося отримати рецепти");

        const data = await response.json();
        console.log("Отримані рецепти:", data); // Дебаг

        if (!Array.isArray(data.recipes)) {
            throw new Error("Очікувався масив рецептів, отримано щось інше");
        }

        return data.recipes; // Повертаємо масив рецептів
    },

};
