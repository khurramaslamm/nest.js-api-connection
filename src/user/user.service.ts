import { Injectable, NotFoundException} from "@nestjs/common";
import { stringify } from "querystring";

import { User } from './user.model'

@Injectable()

export class UsersService {
    private users: User[] = [];
    insertUser(userName: string, Password: string) {
        const userId = Math.random().toString();
        const newUser = new User(userId, userName, Password);
        this.users.push(newUser);
        return userId;
    }

    getUsers(){
        return [...this.users];
    }

    getSingleUsers(userId: string){
        const user = this.findUser(userId)[0];
        return {...user}
    }

    updateUser(userId: string, username: string, pass: string){
        const [user, index] = this.findUser(userId);
        const updatedUser = {...user}; 
        if(username){
            updatedUser.username = username
        }
        if(pass){
            updatedUser.password = pass;
        }
        this.users[index] = updatedUser;
    }

    deleteUser(userId: string){
        const index = this.findUser(userId)[1];
        const updatedList = this.users.splice(index, 1);
         return updatedList;
    }

    private findUser(userId: string): [User, number]{
        const userIndex = this.users.findIndex(user => user.id == userId);
        const user = this.users[userIndex];

        if(!user){
            throw new NotFoundException('Cant Find the User'); 
        }
        return [user, userIndex];
    }
}

