import {IUser} from "@/models/IUser";
export interface IUserBaseResponseModel {
    total: number;
    skip: number;
    limit: number;
    users:IUser[];
}