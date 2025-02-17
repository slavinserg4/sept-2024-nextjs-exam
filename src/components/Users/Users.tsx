import { apiService } from "@/services/api.services";
import User from "@/components/User/User";
import Pagination from "@/components/Pagination/Pagination";

interface UsersProps {
    // Якщо searchParams передається як Promise, оголосіть тип як Promise<{ page?: string }>.
    searchParams: Promise<{ page?: string }>;
}

const Users = async ({ searchParams }: UsersProps) => {
    // Очікуємо розгортання searchParams, щоб отримати параметри
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || '1', 10);
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    // Завантаження даних користувачів через apiService
    const data = await apiService.getUsers(skip, limit);
    // Припускаємо, що API повертає загальну кількість користувачів у полі data.total
    const totalPages = data.total ? Math.ceil(data.total / limit) : 1;

    return (
        <div>
            {data.users.map((user) => (
                <User key={user.id} user={user} />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
};

export default Users;
