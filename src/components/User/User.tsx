import {IUser} from "@/models/IUser";
import {FC} from "react";

type userPropsType = {
    user:IUser;
}

const User:FC<userPropsType> = ({user}) => {
    return (
        <div>
            {user.firstName}
        </div>
    );
};

export default User;