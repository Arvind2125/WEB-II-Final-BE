// src/snare/snare.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { SnareService } from './snare.service';
import { CreateSnareDto } from './create-snare.dto';
import { UpdateSnareDto } from './update-snare.dto';
import { Snare } from './snare.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('snare') // Tag untuk Swagger
@Controller('snare') // Base path untuk endpoint di controller ini
export class SnareController {
  constructor(private readonly snareService: SnareService) {}

  /**
   * Endpoint untuk membuat snare baru.
   * @param createSnareDto Data snare yang akan dibuat.
   * @returns Promise dengan objek Snare yang baru dibuat.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Snare berhasil dibuat.', type: Snare })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  create(@Body() createSnareDto: CreateSnareDto): Promise<Snare> {
    return this.snareService.create(createSnareDto);
  }

  /**
   * Endpoint untuk mendapatkan semua snare.
   * @returns Promise dengan array objek Snare.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Daftar semua snare.', type: [Snare] })
  findAll(): Promise<Snare[]> {
    return this.snareService.findAll();
  }

  /**
   * Endpoint untuk mendapatkan snare berdasarkan ID.
   * @param id ID snare.
   * @returns Promise dengan objek Snare.
   * @throws NotFoundException jika snare tidak ditemukan.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Detail snare berdasarkan ID.', type: Snare })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snare tidak ditemukan.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Snare | null> {
    // ParseIntPipe otomatis mengubah parameter ID menjadi integer dan validasi
    return this.snareService.findOne(id);
  }

  /**
   * Endpoint untuk memperbarui data snare.
   * @param id ID snare yang akan diperbarui.
   * @param updateSnareDto Data snare yang diperbarui.
   * @returns Promise dengan objek Snare yang diperbarui.
   * @throws NotFoundException jika snare tidak ditemukan.
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Snare berhasil diperbarui.', type: Snare })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snare tidak ditemukan.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSnareDto: UpdateSnareDto): Promise<Snare> {
    return this.snareService.update(id, updateSnareDto);
  }

  /**
   * Endpoint untuk menghapus snare.
   * @param id ID snare yang akan dihapus.
   * @returns Promise<void>.
   * @throws NotFoundException jika snare tidak ditemukan.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Mengembalikan status code 204 No Content untuk penghapusan berhasil
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Snare berhasil dihapus.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Snare tidak ditemukan.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.snareService.remove(id);
  }
}
