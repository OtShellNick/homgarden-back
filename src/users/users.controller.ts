import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
//
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<UserInterface> {
        const user = await this.usersService.create(createUserDto);
        return user;
    }

    @Get()
    async all(): Promise<UserInterface[]> {
        const users = await this.usersService.getAll();
        return users;
    }
}