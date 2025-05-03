// src/cymbal/dto/create-cymbal.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat membuat cymbal baru.
 */
export class CreateCymbalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Jenis cymbal (misal: hi-hat, crash)' })
  jenis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Merk cymbal' })
  merk: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar cymbal', required: false })
  gambar?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: 'Harga cymbal' })
  harga: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: 'Jumlah stok cymbal' })
  stok: number;
}
