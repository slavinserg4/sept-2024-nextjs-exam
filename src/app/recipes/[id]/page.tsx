import {FC} from "react";
import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import './StyleForRecideDetailsPage.css'

type RecipeProps = {
    params:Promise<{id:string}>;
}
const Page:FC<RecipeProps> = async ({params}) => {
    const {id} = await params;

    return (
        <div className={'RecipeDetailsPage'}>
            <RecipeDetails id={Number(id)}/>
        </div>
    );
};

export default Page;