import {ObjectId} from "mongodb";

export interface UserInterface {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
}