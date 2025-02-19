import {FC} from "react";
import {apiService} from "@/services/api.services";
import UserRecipes from "@/components/UserRecipes/UserRecipes";
type userProps = {
    id:number
}

const UserDetails:FC<userProps> = async ({id}) => {
    const user = await apiService.getUser(+id)
    return (
        <div>
            <p>Id: {user.id}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Maiden Name: {user.maidenName}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Gender: {user.gender}</p>
            <p>BirthDate: {user.birthDate}</p>
            recipes:
            <UserRecipes userId={Number(id)}/>
        </div>
    );
};

export default UserDetails;