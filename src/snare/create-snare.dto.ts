// src/snare/dto/create-snare.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal, Min } from "class-validator";

/**
 * DTO untuk data yang diterima saat membuat snare baru.
 */
export class CreateSnareDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Jenis snare (misal: maple, birch)' })
  jenis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Merk snare (misal: Pearl, Tama)' })
  merk: string;

  @IsOptional() // Kolom ini opsional
  @IsString()
  @ApiProperty({ description: 'URL atau path gambar snare', required: false })
  gambar?: string;

  @IsNumber({ maxDecimalPlaces: 2 }) // Memastikan ini angka dengan maksimal 2 desimal
  @IsNotEmpty()
  @Min(0) // Harga tidak boleh negatif
  @ApiProperty({ description: 'Harga snare' })
  harga: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0) // Stok tidak boleh negatif
  @ApiProperty({ description: 'Jumlah stok snare' })
  stok: number;
}
