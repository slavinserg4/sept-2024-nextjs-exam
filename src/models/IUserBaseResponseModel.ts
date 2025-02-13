import {IUser} from "./IUser.ts";

export interface IUserBaseResponseModel {
    total: number;
    skip: number;
    limit: number;
    users:IUser[];
}