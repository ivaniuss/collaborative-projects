import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  userId: string;

  @IsNumber()
  stateId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  update: Date;
}
