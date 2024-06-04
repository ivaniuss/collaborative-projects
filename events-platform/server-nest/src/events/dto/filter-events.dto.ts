import { IsOptional, IsString, IsDate, IsIn } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsOptional()
  @IsIn(['title', 'date', 'location'])
  sortBy?: 'title' | 'date' | 'location';
}
