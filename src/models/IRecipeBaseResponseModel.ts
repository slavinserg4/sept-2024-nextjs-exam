import {IRecipe} from "@/models/IRecipe";

export interface IRecipeBaseResponseModel {
    total: number;
    skip: number;
    limit: number;
    recipes:IRecipe[];

}