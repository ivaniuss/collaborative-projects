<<<<<<< HEAD
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
=======
export class CreateEventDto {}
>>>>>>> dfba103 (Develop (#36))
