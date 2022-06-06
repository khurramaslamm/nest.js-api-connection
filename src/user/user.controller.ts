import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";

import { UsersService } from "./user.service";
 
@Controller('user') 

export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Post()
addUser(
    @Body('username') userName: string, 
    @Body('password') userPass: string ): any {
    const generatedId = this.usersService.insertUser(
        userName, 
        userPass
        );
     return {id: generatedId};
}
@Get()
getAllUsers(){
    return this.usersService.getUsers();
}

@Get(':id')
getUsers(@Param('id') userId: string){
 return this.usersService.getSingleUsers(userId);
}
@Patch(':id')
updateUser(
@Param('id') userId: string, 
@Body('username') userName: string, 
@Body('password') userPass: string
){

this.usersService.updateUser(userId, userName, userPass);
return null;
}
@Delete(':id')
removeUser(@Param('id') userId: string){
   return this.usersService.deleteUser(userId);
 
}
} 