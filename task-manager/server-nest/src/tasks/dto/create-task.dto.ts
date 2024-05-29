import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  stateId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  update: Date;
}
