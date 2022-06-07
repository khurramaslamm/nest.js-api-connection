import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule} from './user/user.module'

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://khurram-expedite:MYadmin1!@userdata.6y4my.mongodb.net/root?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
