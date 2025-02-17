import { cookieService } from './cookieService';
import { ITokenPair } from "@/models/ITokenPair";
import {IUserWithTokens} from "@/models/IUserWithTokens";

const BASE_URL = 'https://dummyjson.com/auth';

export const authService = {
    loginUser: async (username: string, password: string) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 1 }),
        });

        if (!response.ok) {
            throw new Error('Помилка входу: неправильний логін або пароль');
        }

        const data:IUserWithTokens = await response.json();
        console.log('Дані входу:', data);

        // Зберігаємо токени та інші дані в куках
        await cookieService.set('accessToken', data.accessToken);
        await cookieService.set('refreshToken', data.refreshToken);
        await cookieService.set('isAuthenticated', 'true');
        await cookieService.set('userName', data.username, { httpOnly: false });
        await cookieService.set('userImage', data.image, { httpOnly: false });

        return data;
    },

    /**
     * Оновлення (refresh) токену.
     */
    refreshToken: async () => {
        const refreshTokenValue = await cookieService.get('refreshToken');
        console.log('Refresh token (з cookie):', refreshTokenValue);
        if (!refreshTokenValue) {
            throw new Error('Немає refresh token для оновлення');
        }

        const requestBody = JSON.stringify({
            refreshToken: refreshTokenValue,
            expiresInMins: 30,
        });
        console.log('Request body для refresh:', requestBody);

        const response = await fetch(`${BASE_URL}/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody,

        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Помилка оновлення токена:', response.status, errorText);
            throw new Error('Не вдалося оновити токен');
        }

        const data: ITokenPair = await response.json();
        console.log('Оновлені токени:', data);

        await cookieService.set('accessToken', data.accessToken);
        await cookieService.set('refreshToken', data.refreshToken);
    },
};
