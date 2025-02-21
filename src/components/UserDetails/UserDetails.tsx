"use client";

import {useState, useEffect, FC} from "react";
import UserRecipes from "@/components/UserRecipes/UserRecipes";
import { IUser } from "@/models/IUser";

type UserProps = {
    id: number;
};

const UserDetails:FC<UserProps> = ({ id }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/users/${id}/api`, {
                    method: "GET",
                });
                if (!res.ok) {
                    new Error("Не вдалося завантажити дані користувача");
                }
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    setError("Користувача не знайдено");
                }
            } catch (err) {
                console.error(err);
                setError("Сталася помилка");
            } finally {
                setLoading(false);
            }
        };

        fetchUser().catch();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;

    return (
        <div>
            <p>Id: {user.id}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Maiden Name: {user.maidenName}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Gender: {user.gender}</p>
            <p>BirthDate: {user.birthDate}</p>
            <div>
                Recipes:
                <UserRecipes userId={id} />
            </div>
        </div>
    );
};

export default UserDetails;
