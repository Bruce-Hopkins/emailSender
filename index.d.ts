import { Document } from "mongoose"

export interface Email extends Document{
    email: string, 
    message: string,
    createdDate : Date
}