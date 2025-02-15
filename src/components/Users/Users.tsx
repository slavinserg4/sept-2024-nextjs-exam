import {apiService} from "@/services/api.services";
import {IUser} from "@/models/IUser";
import User from "@/components/User/User";

const Users = async () => {
    const users:IUser[] = await apiService.getUsers()
    return (
        <div>
            {users.map((user) => <User key={user.id} user={user} />)}
        </div>
    );
};

export default Users;