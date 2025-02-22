"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { searchQueryAction } from "@/server-actions/ServerActions";

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
        <form
            action={handleSearch}
            style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
        >
            <input
                type="text"
                name="query"
                placeholder="Search by name or ID..."
                defaultValue={query}
                style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <button
                type="submit"
                disabled={isPending}
                style={{ padding: "8px", cursor: "pointer" }}
            >
                {isPending ? "🔄 Searching..." : "🔍 Search"}
            </button>
        </form>
    );
};

export default Search;
