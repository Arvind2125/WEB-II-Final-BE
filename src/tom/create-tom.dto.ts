// src/tom/dto/create-tom.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat membuat tom baru.
 */
export class CreateTomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Jenis tom (misal: rack tom, floor tom)' })
  jenis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Merk tom' })
  merk: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar tom', required: false })
  gambar?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: 'Harga tom' })
  harga: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: 'Jumlah stok tom' })
  stok: number;
}
