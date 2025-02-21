'use server';

import {authService} from "@/services/authService";

export const LoginUser = async (formData: FormData) => {
    const username = formData.get('username') as string ?? '';
    const password = formData.get('password') as string ?? '';

    try {
        const user = await authService.loginUser(username, password);
        console.log(user);
        return user;
    } catch {
        throw new Error("Неправильний логін або пароль");
    }
};

export const searchQueryAction = async (
    pathname: string,
    _searchParams: URLSearchParams,
    queryValue: string
) => {
    // Створюємо новий об'єкт URLSearchParams і додаємо лише потрібні параметри
    const params = new URLSearchParams();
    if (queryValue) {
        params.set("query", queryValue);
    }
    // При пошуку зазвичай починаємо з першої сторінки
    params.set("page", "1");

    return `${pathname}?${params.toString()}`;
};


