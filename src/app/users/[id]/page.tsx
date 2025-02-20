import {FC} from "react";
import UserDetails from "@/components/UserDetails/UserDetails";

type userProps = {
    params:Promise<{id:string}>;
}

const Page:FC<userProps> = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            <UserDetails id={Number(id)}/>
        </div>
    );
};

export default Page;