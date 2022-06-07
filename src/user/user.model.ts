import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
username: {type: String, required: true},
password: {type: String, require: true}
});


export interface User {
    id: string;
    username: string;
    password: string;
} 
