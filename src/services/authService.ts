import { ITokenPair } from '@/models/ITokenPair';
import { IUserWithTokens } from '@/models/IUserWithTokens';
import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";



export const authService = {
    loginUser: async (username: string, password: string) => {
        const response = await fetch(`https://dummyjson.com/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 }),
        });

        if (!response.ok) {
            throw new Error('Помилка входу: неправильний логін або пароль');
        }

        const data: IUserWithTokens = await response.json();
        console.log('Дані входу:', data);

        // Зберігаємо токени та інші дані в куках
        await setCookie('accessToken', data.accessToken,{cookies});
        await setCookie('refreshToken', data.refreshToken,{cookies});
        await setCookie('isAuthenticated', 'true',{cookies});
        await setCookie('userName', data.username ,{cookies});
        await setCookie('userImage', data.image,{cookies});

    },

    // Refresh токенів
    refreshToken: async (refreshTokenValue:string) => {
        const response = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: refreshTokenValue,
                expiresInMins: 30,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Не вдалося оновити токен: ${errorText}`);
        }

        const data: ITokenPair = await response.json();
        return data

    },
};
