import Users from "@/components/Users/Users";

interface PageProps {

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
