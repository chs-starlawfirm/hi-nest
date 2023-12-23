import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUesrsDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  createUser(@Body() createData: CreateUesrsDto) {
    const createUserCount: Promise<number> =
      this.usersService.createUser(createData);
    return createUserCount;
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateData: UpdateUsersDto) {
    const updateUserCount: Promise<number> = this.usersService.updateUser(
      id,
      updateData,
    );
    return updateUserCount;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    const deleteUser: Promise<number> = this.usersService.deleteUser(id);
    return deleteUser;
  }
}
