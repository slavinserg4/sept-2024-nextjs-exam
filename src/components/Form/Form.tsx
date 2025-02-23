"use client";

import './StyleForForm.css'
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
        <div className={'divForLoginPage'}>
            <h1>Log in</h1>

            <form className={'FormForLogin'} onSubmit={handleSubmit(onSubmit)}>
                <p>Input username</p>
                <input type="text" {...register("username")} placeholder="Username" className={'FormInputUsername'}/>

                <p>Input password</p>
                <input type="password" {...register("password")} placeholder="Password" className={'FormInputPassword'}/>

                <button type="submit" disabled={!isValid} className={'ButtonForForm'}>Submit</button>

                {errorMessage && <h4 className={'error'}>Incorrect login or password</h4>}
            </form>
        </div>
    );
};

export default FormComponent;
