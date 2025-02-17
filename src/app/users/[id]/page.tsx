import {FC} from "react";
import {apiService} from "@/services/api.services";
type userProps = {
    params:{id:string};
}

const Page:FC<userProps> = async ({params}) => {
    const {id} = await params;
    const user = await apiService.getUser(+id)
    console.log(user)
    return (
        <div>
            {user.id}, {user.firstName}
        </div>
    );
};

export default Page;