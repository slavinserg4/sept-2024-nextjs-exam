import {FC} from "react";
import UserDetails from "@/components/UserDetails/UserDetails";
import './StyleForUserDetailsPage.css'
type userProps = {
    params:Promise<{id:string}>;
}

const Page:FC<userProps> = async ({params}) => {
    const {id} = await params;
    return (
        <div className={'userDetailsPage'}>
            <UserDetails id={Number(id)}/>
        </div>
    );
};

export default Page;