import Link from 'next/link';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    return (
        <nav style={{ display: 'flex', gap: '8px', marginTop: '16px', alignItems: 'center' }}>
            {currentPage > 1 && (
                <Link href={`?page=${currentPage - 1}`}>
                    Prev
                </Link>
            )}
            <span>
        Page {currentPage} of {totalPages}
      </span>
            {currentPage < totalPages && (
                <Link href={`?page=${currentPage + 1}`}>
                    Next
                </Link>
            )}
        </nav>
    );
};

export default Pagination;
