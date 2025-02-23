"use client";

import './StyleForSearch.css'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { searchQueryAction } from "@/server-actions/ServerActions";
import Form from "next/form";

const Search = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query] = useState(searchParams.get("query") || "");
    const [isPending, startTransition] = useTransition();

    const handleSearch = async (formData: FormData) => {
        const queryValue = formData.get("query") as string;
        const newUrl = await searchQueryAction(pathname, searchParams, queryValue);

        startTransition(() => {
            router.push(newUrl);
        });
    };

    return (
        <Form action={handleSearch} className={'search-form'}>
            <input
                type="text"
                name="query"
                placeholder="Search by name or ID..."
                defaultValue={query}
            />
            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Searching..." : "Search"}
            </button>
        </Form>
    );
};

export default Search;
