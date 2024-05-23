import { IsString, IsDate, IsNumber } from 'class-validator';

export class Task {
  @IsString()
  userId: string;

  @IsNumber()
  stateId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  state: string;

  @IsDate()
  Date: Date;
}
