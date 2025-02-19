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
    searchParams: URLSearchParams,
    queryValue: string
) => {
    const params = new URLSearchParams(searchParams.toString());

    if (queryValue) {
        params.set("query", queryValue);
    } else {
        params.delete("query");
    }

    return `${pathname}?${params.toString()}`;
};