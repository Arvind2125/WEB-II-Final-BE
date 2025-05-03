// src/cymbal/dto/update-cymbal.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat memperbarui cymbal.
 */
export class UpdateCymbalDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Jenis cymbal (misal: hi-hat, crash)', required: false })
  jenis?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Merk cymbal', required: false })
  merk?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar cymbal', required: false })
  gambar?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty({ description: 'Harga cymbal', required: false })
  harga?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Jumlah stok cymbal', required: false })
  stok?: number;
}
