'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import './StyleForForm.css';
import Form from "next/form";

interface FormComponentProps {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<FormComponentProps>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const customHandler = async (formData: FormComponentProps) => {
        try {
            await loginUser(formData);
            router.push('/dashboard');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className={'MainFormDiv'}>
            <p className={'HeaderForForm'}>Please log in to access the site.</p>
            <hr className={'hrForForm'} />
            <Form className={'Form'} action={customHandler}>
                <h4 className={'Enter'}>Enter your username</h4>
                <input
                    type="text"
                    {...register('username')}
                    placeholder="Username"
                    className="FormInputUsername"
                />
                <h4 className={'Enter'}>Enter your password</h4>
                <input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    className="FormInputPassword"
                />
                <button className={'ButtonForForm'} type="submit">Submit</button>
            </Form>
            {error && <p className={'error'}>{error}</p>}
        </div>
    );
};

export default LoginForm;