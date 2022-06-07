import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";

import { UsersService } from "./user.service";
 
@Controller('user') 

export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Post()
async addUser(
    @Body('username') userName: string, 
    @Body('password') userPass: string ) {
    const generatedId = await this.usersService.insertUser(
        userName, 
        userPass
        );
     return {id: generatedId};
}
@Get()
async getAllUsers(){
    const user = await this.usersService.getUsers();
    return user;
}

@Get(':id')
getUsers(@Param('id') userId: string){
 return this.usersService.getSingleUsers(userId);
}
@Patch(':id')
async updateUser(
@Param('id') userId: string, 
@Body('username') userName: string, 
@Body('password') userPass: string
){

await this.usersService.updateUser(userId, userName, userPass);
return null;
}
@Delete(':id')
async removeUser(@Param('id') userId: string){
   return await this.usersService.deleteUser(userId);
 
}
}