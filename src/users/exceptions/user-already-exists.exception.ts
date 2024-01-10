import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      { message: `User with email ${email} already exists` },
      HttpStatus.BAD_REQUEST,
    );
  }
}
