// src/snare/dto/update-snare.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat memperbarui snare.
 * Semua field bersifat opsional karena tidak semua field mungkin diperbarui.
 */
export class UpdateSnareDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Jenis snare (misal: maple, birch)', required: false })
  jenis?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Merk snare (misal: Pearl, Tama)', required: false })
  merk?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar snare', required: false })
  gambar?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @ApiProperty({ description: 'Harga snare', required: false })
  harga?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Jumlah stok snare', required: false })
  stok?: number;
}
