import { IUserWithTokens } from "@/models/IUserWithTokens";

export const apiService = {
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
        return data;
    },
};
