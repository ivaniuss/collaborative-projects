import { IsString } from 'class-validator';

export class State {
  @IsString()
  name: string;
}
