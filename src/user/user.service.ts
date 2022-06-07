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
        return user;
    }

    updateUser(userId: string, username: string, pass: string){
        // const [user, index] = this.findUser(userId);
        // const updatedUser = {...user}; 
        // if(username){
        //     updatedUser.username = username
        // }
        // if(pass){
        //     updatedUser.password = pass;
        // }
        // this.users[index] = updatedUser;
    }

    deleteUser(userId: string){
        const index = this.findUser(userId)[1];
        const updatedList = this.users.splice(index, 1);
         return updatedList;
    }

    private async findUser(userId: string): Promise<User>{
        let user;
        try{
            user = await this.userModel.findById(userId);
        }
        catch(error){
            throw new NotFoundException('Cant Find the User'); 
        }

        if(!user){
            throw new NotFoundException('Cant Find the User'); 
        }

        return {id: user.id, username: user.username, password: user.password};
    }
}

