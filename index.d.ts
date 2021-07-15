import { Document } from "mongoose"

export interface Email {
    email: string, 
    message: string,
    createdDate : Date
}

export interface EmailDocument extends Document, Email{}