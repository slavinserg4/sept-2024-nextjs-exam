import {IUser} from "@/models/IUser";
import {FC} from "react";
import Link from "next/link";
import './StyleForUser.css'
type userPropsType = {
    user:IUser;
}

const User:FC<userPropsType> = ({user}) => {
    return (
        <div className={'userDiv'}>
            <Link className={'UserLink'} href={`/users/${user.id}`}><span>Id: {user.id}</span> Name: {user.firstName} {user.lastName} </Link>
            <hr/>
        </div>
    );
};

export default User;