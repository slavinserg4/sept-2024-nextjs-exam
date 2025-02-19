// src/services/authService.ts
import { ITokenPair } from '@/models/ITokenPair';
import { IUserWithTokens } from '@/models/IUserWithTokens';
import {cookies} from "next/headers";

const BASE_URL = 'https://dummyjson.com/auth';

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

        const cookieStore = await cookies();
        // Зберігаємо токени та інші дані в куках
        cookieStore.set('accessToken', data.accessToken);
        cookieStore.set('refreshToken', data.refreshToken);
        cookieStore.set('isAuthenticated', 'true');
        cookieStore.set('userName', data.username );
        cookieStore.set('userImage', data.image);


    },

    // Refresh токенів
    refreshToken: async (): Promise<ITokenPair> => {
        const cookieStore = await cookies();
        const refreshTokenValue = cookieStore.get('refreshToken')?.value;
        if (!refreshTokenValue) {
            throw new Error('Немає refresh token для оновлення');
        }

        const requestBody = JSON.stringify({
            refreshToken: refreshTokenValue,
            expiresInMins: 30,
        });

        const response = await fetch(`${BASE_URL}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Не вдалося оновити токен: ${errorText}`);
        }

        const data: ITokenPair = await response.json();

        // Оновлюємо куки з новими токенами
        console.log('New tokens:', data);

        return data;
    },
};
