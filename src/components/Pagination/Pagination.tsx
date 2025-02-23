import './StyleForPagination.css'
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {FC} from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination:FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getPageLink = (page: number) => {
        const params = new URLSearchParams();
        const query = searchParams.get("query");
        if (query) {
            params.set("query", query);
        }
        const tag = searchParams.get("tag");
        if (tag) {
            params.set("tag", tag);
        }
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav className={'navPagination'}>
            {currentPage > 1 && <Link className={'LinksForPagination'} href={getPageLink(currentPage - 1)}>Prev</Link>}
            <span>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && <Link className={'LinksForPagination'} href={getPageLink(currentPage + 1)}>Next</Link>}
        </nav>
    );
};

export default Pagination;
