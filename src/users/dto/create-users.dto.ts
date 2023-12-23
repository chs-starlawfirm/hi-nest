import { IsEmail, IsString } from 'class-validator';

export class CreateUesrsDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly sex: string;
  @IsString()
  readonly birth: string;
  @IsString()
  readonly postalCode: string;
  @IsString()
  readonly address: string;
  @IsString()
  readonly detailAddress: string;
  @IsString()
  readonly phone: string;
}
