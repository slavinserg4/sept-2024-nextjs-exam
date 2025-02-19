import { FC } from "react";
import Link from "next/link";
import './StyleForRecipeTags.css';

type RecipeTagsPropType = {
    tag: string;
};

const RecipeTags: FC<RecipeTagsPropType> = ({ tag }) => {
    return (
        <div>
            <Link className={'LinkToTag'} href={`/recipes?tag=${tag}`}>
                {tag}
            </Link>
        </div>
    );
};

export default RecipeTags;
