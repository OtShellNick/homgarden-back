import { Injectable } from '@nestjs/common';
//
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { DatabaseService } from '../database/database.service';
import { HashingService } from '../hash/hash.service';
import { Collection } from 'mongodb';

@Injectable()
export class UsersService {
  private collection: Collection<UserInterface>;

  constructor(
    private databaseService: DatabaseService,
    private hashingService: HashingService,
  ) {}

  private getCollection() {
    if (!this.collection) {
      this.collection = this.databaseService
        .getDb()
        .collection<UserInterface>('users');
    }
    return this.collection;
  }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const hashPassword = await this.hashingService.hashPassword(
      createUserDto.password,
    );
    const insertResult = await this.getCollection().insertOne(
      { ...createUserDto, password: hashPassword },
      {},
    );
    return { ...createUserDto, _id: insertResult.insertedId };
  }

  async getAll(): Promise<UserInterface[]> {
    const users = await this.getCollection().find().toArray();
    return users;
  }

  async getUserByEmail(email: string): Promise<UserInterface> {
    const user = await this.getCollection().findOne({ email });
    return user;
  }
}
