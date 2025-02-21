"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import User from "@/components/User/User";
import Search from "@/components/Search/Search";
import { IUser } from "@/models/IUser";
import { IUserBaseResponseModel } from "@/models/IUserBaseResponseModel";

const Users = () => {
    // Отримуємо параметри з URL
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query") || "";
    const currentPage = parseInt(page, 10);
    const limit = 10;

    const [data, setData] = useState<IUserBaseResponseModel | null>(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Формуємо рядок запиту
                const queryString =
                    `?page=${currentPage}&limit=${limit}` +
                    (query ? `&query=${encodeURIComponent(query)}` : "");
                const res = await fetch(`http://localhost:3000/users/api${queryString}`, {
                    method: "GET"
                });
                if (!res.ok) {
                    new Error("Не вдалося завантажити дані");
                }
                const json: IUserBaseResponseModel = await res.json();
                setData(json);
            } catch  {
                console.log('error fetching users');
            }
        };

        fetchUsers().catch();
    }, [query, currentPage]);

    if (!data) return <div>Loading...</div>;

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div>
            <Search />
            {query && <h2>Results for: {query}</h2>}
            {data.users?.map((user: IUser) => (
                <User key={user.id} user={user} />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Users;
