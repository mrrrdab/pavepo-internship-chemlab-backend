import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryParams {
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly skip?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly take?: number;
}
