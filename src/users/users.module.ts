import { Module } from '@nestjs/common';
//
import { UsersService } from './users.service';
import { HashModule } from '../hash/hash.module';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule, HashModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}