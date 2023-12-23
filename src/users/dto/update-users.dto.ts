import { PartialType } from '@nestjs/mapped-types';
import { CreateUesrsDto } from './create-users.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateUsersDto extends PartialType(CreateUesrsDto) {
  @IsDate()
  @IsOptional()
  readonly updateAt: Date;
  @IsDate()
  @IsOptional()
  readonly lastLoginAt: Date;
}
