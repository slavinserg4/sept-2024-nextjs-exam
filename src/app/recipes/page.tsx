import Recipes from "@/components/Recipes/Recipes";

interface PageProps {
    // Якщо searchParams повертається як Promise
    searchParams: Promise<{ page?: string }>;
}

const RecipesPage = ({ searchParams }: PageProps) => {
    return (
        <div>
            <Recipes searchParams={searchParams} />
        </div>
    );
};

export default RecipesPage;
