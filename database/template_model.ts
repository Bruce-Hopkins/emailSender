
import { Schema, model, connect, Mongoose } from 'mongoose';
import {Email} from '../index'
// Define the schema

/**
 * Variable
 */
const EmailSchema = new Schema<Email>(
  {
    email: {type: String  },
    message: {type: String},
    dateOfCreation: {type: Date},
  },
)
const DB:any = model<Email>('User', EmailSchema);
export {DB}
