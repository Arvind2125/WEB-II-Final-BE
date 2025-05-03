// src/tom/dto/update-tom.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat memperbarui tom.
 */
export class UpdateTomDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Jenis tom (misal: rack tom, floor tom)', required: false })
  jenis?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Merk tom', required: false })
  merk?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar tom', required: false })
  gambar?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty({ description: 'Harga tom', required: false })
  harga?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Jumlah stok tom', required: false })
  stok?: number;
}
