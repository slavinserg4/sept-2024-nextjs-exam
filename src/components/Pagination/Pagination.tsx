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

    const params = new URLSearchParams(searchParams.toString());

    const getPageLink = (page: number) => {
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav style={{ display: "flex", gap: "8px", marginTop: "16px", alignItems: "center" }}>
            {currentPage > 1 && <Link href={getPageLink(currentPage - 1)}>Prev</Link>}
            <span>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && <Link href={getPageLink(currentPage + 1)}>Next</Link>}
        </nav>
    );
};

export default Pagination;
