import { Injectable, NotFoundException} from "@nestjs/common";
import { stringify } from "querystring";
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.model'
import {Model} from 'mongoose'

@Injectable()

export class UsersService {
    private users: User[] = [];


    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    async insertUser(username: string, password: string) {
        const newUser = new this.userModel({username, password});
        const result = await newUser.save();
        return result.id as string;
    }

    async getUsers(){
        const user = await this.userModel.find().exec();
        return user.map( prod => ({id: prod.id, username: prod.username, password: prod.password}));
    }

    async getSingleUsers(userId: string){
        const user = await this.findUser(userId);
        return {id: user.id, username: user.username, password: user.password};
    }

    async updateUser(userId: string, username: string, pass: string){
        const updatedUser = await this.findUser(userId); 
        if(username){
            updatedUser.username = username
        }
        if(pass){
            updatedUser.password = pass;
        }
        updatedUser.save();
    }

    async deleteUser(userId: string){
       const result = await this.userModel.deleteOne({_id: userId}).exec();
       if(result.deletedCount===0){
        throw new NotFoundException('Cant Find the User'); 
       }
       
    }

    private async findUser(userId: string){
        let user;
        try{
            user = await this.userModel.findById(userId).exec();
        }
        catch(error){
            throw new NotFoundException('Cant Find the User'); 
        }

        if(!user){
            throw new NotFoundException('Cant Find the User'); 
        }

        return user;
    }
}

