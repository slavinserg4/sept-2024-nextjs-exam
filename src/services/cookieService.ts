import { cookies } from 'next/headers';

export const cookieService = {
    // Отримати куку за ім'ям
    get: async (name: string): Promise<string | null> => {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value || null;

    },

    // Встановити куку
    set: async (
        name: string,
        value: string,
        options: { httpOnly?: boolean; path?: string; expires?: Date } = {}
    ) => {
        const cookieStore = await cookies();
        cookieStore.set(name, value, {
            httpOnly: true,
            path: '/',
            ...options,
        });
    },

    // Видалити куку (задаємо дату, що вже минула)
    remove: async (name: string) => {
        const cookieStore = await cookies();
        cookieStore.set(name, '', { expires: new Date(0), path: '/' });
    },
};
