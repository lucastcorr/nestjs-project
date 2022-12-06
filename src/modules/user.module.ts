import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { userProviders } from 'src/providers/user.providers';
import { UserService } from 'src/services/user.service';
import { DatabaseModule } from './database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        ...userProviders,
        UserService],
})
export class UserModule {}
