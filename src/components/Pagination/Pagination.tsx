"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getPageLink = (page: number) => {
        const params = new URLSearchParams();
        // Додаємо параметр query, якщо він існує
        const query = searchParams.get("query");
        if (query) {
            params.set("query", query);
        }
        // Додаємо параметр tag, якщо він існує
        const tag = searchParams.get("tag");
        if (tag) {
            params.set("tag", tag);
        }
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav style={{ display: "flex", gap: "8px", marginTop: "16px", alignItems: "center" }}>
            {currentPage > 1 && <Link href={getPageLink(currentPage - 1)}>Prev</Link>}
            <span>
        Page {currentPage} of {totalPages}
      </span>
            {currentPage < totalPages && <Link href={getPageLink(currentPage + 1)}>Next</Link>}
        </nav>
    );
};

export default Pagination;
