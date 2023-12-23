import { IsString } from 'class-validator';

export class LogsDto {
  @IsString()
  readonly status: string;
}
