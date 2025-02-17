import {IUser} from "@/models/IUser";
import {FC} from "react";
import Link from "next/link";

type userPropsType = {
    user:IUser;
}

const User:FC<userPropsType> = ({user}) => {
    return (
        <div>
            <Link href={`/users/${user.id}`}>{user.firstName}</Link>

        </div>
    );
};

export default User;