/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  readonly price: number;
}
