"use client";
import '@/app/globals.css'
import './StyleForUsers.css'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import User from "@/components/User/User";
import Search from "@/components/Search/Search";
import { IUser } from "@/models/IUser";
import { IUserBaseResponseModel } from "@/models/IUserBaseResponseModel";

const Users = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query") || "";
    const currentPage = parseInt(page, 10);
    const limit = 10;

    const [data, setData] = useState<IUserBaseResponseModel | null>(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
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

    if (!data) return <div className={'loader'}></div>;

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div className={'UsersDiv'}>
            <Search />
            {query && <h3>Results for: {query}</h3>}
            <div>
                {data.users && data.users.length > 0 ? (
                    data.users.map((user: IUser) => (
                        <User key={user.id} user={user} />
                    ))
                ) : (
                    <p>Nothing found</p>
                )}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Users;
