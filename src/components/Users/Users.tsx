import { apiService } from "@/services/api.services";
import Pagination from "@/components/Pagination/Pagination";
import User from "@/components/User/User";
import Search from "@/components/Search/Search";

interface UsersProps {
    searchParams: Promise<{ page?: string; query?: string }>;
}

const Users = async ({ searchParams }: UsersProps) => {
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || "1", 10);
    const query = sp.query || "";
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    let data;

    if (query) {
        const parsedQuery = Number(query);

        if (!isNaN(parsedQuery)) {
            // 🔹 Якщо query - ID, то шукаємо конкретного користувача
            const singleUser = await apiService.getUser(parsedQuery);
            data = { users: [singleUser], total: 1 }; // Обгортаємо в об'єкт
        } else {
            // 🔹 Інакше шукаємо за ім'ям
            data = await apiService.getUsers(skip, limit, query);
        }
    } else {
        // 🔹 Якщо немає пошуку, отримуємо всіх користувачів
        data = await apiService.getUsers(skip, limit);
    }

    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div>
            <Search />
            {query && <h2>Results for: {query}</h2>}
            {data.users.map((user) => <User key={user.id} user={user} />)}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Users;
