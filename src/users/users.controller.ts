import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
//
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserExceptionFilter } from './filters/user-exception.filter';

@Controller('users')
@UseFilters(UserExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserInterface> {
    const existingUser = await this.usersService.getUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UserAlreadyExistsException(createUserDto.email);
    }
    const user = await this.usersService.create(createUserDto);
    console.log(user);
    return user;
  }

  @Get()
  async all(): Promise<UserInterface[]> {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get('error')
  throwError() {
    throw new Error('Simulated server error');
  }
}
