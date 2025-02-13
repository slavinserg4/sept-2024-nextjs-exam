import {IRecipe} from "./IRecipe.ts";

export interface IRecipeBaseResponseModel {
    total: number;
    skip: number;
    limit: number;
    recipes:IRecipe[];

}