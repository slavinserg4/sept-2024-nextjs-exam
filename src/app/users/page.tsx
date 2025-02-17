import Users from "@/components/Users/Users";

interface PageProps {
    // Залежно від версії Next.js, searchParams може бути Promise або звичайним об'єктом.
    // Якщо Next.js повертає Promise, оголосіть тип як Promise<{ page?: string }>.
    searchParams: Promise<{ page?: string }>;
}

const UsersPage = ({ searchParams }: PageProps) => {
    return (
        <div>
            <Users searchParams={searchParams} />
        </div>
    );
};

export default UsersPage;
