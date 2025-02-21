"use client";

import { useForm } from "react-hook-form";
import { LoginUser } from "@/server-actions/ServerActions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormPropsType {
    username: string;
    password: string;
}

const FormComponent = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {isValid},
        reset,
    } = useForm<FormPropsType>({
        mode: "onChange",
    });

    const onSubmit = async (data: FormPropsType) => {
        setErrorMessage(null);

        try {
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("password", data.password);

            await LoginUser(formData);

            reset();
            router.push("/users");
        } catch {
            setErrorMessage("Неправильний логін або пароль");
        }
    };

    return (
        <div>
            <h1>Аутентифікація</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username")} placeholder="Username" />

                <input type="password" {...register("password")} placeholder="Password" />

                <button type="submit" disabled={!isValid}>Submit</button>

                {errorMessage && <h4>{errorMessage}</h4>}
            </form>
        </div>
    );
};

export default FormComponent;
