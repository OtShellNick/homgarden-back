import { Injectable } from '@nestjs/common';
//
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    private collection;

    constructor(private databaseService: DatabaseService) {}

    private getCollection() {
        if (!this.collection) {
            this.collection = this.databaseService.getDb().collection<UserInterface>('users');
        }
        return this.collection;
    }

    async create(createUserDto: CreateUserDto): Promise<UserInterface> {
        const insertResult = await this.getCollection().insertOne(createUserDto);
        return insertResult;
    }

    async getAll(): Promise<UserInterface[]> {
        const users = await this.getCollection().find().toArray();
        return users;
    }
}