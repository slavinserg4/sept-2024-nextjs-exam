'use server';

import { apiService } from "@/services/api.services";

export const LoginUser = async (formData: FormData) => {
    const username = formData.get('username') as string ?? '';
    const password = formData.get('password') as string ?? '';

    try {
        const user = await apiService.LoginUser(username, password);
        console.log(user);
        return user;
    } catch {
        throw new Error("Неправильний логін або пароль");
    }
};
