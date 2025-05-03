// src/cymbal/cymbal.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CymbalService } from './cymbal.service';
import { CreateCymbalDto } from './create-cymbal.dto';
import { UpdateCymbalDto } from './update-cymbal.dto';
import { Cymbal } from './cymbal.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('cymbal') // Tag untuk Swagger
@Controller('cymbal') // Base path untuk endpoint di controller ini
export class CymbalController {
  constructor(private readonly cymbalService: CymbalService) {}

  /**
   * Endpoint untuk membuat cymbal baru.
   * @param createCymbalDto Data cymbal yang akan dibuat.
   * @returns Promise dengan objek Cymbal yang baru dibuat.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Cymbal berhasil dibuat.', type: Cymbal })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  create(@Body() createCymbalDto: CreateCymbalDto): Promise<Cymbal> {
    return this.cymbalService.create(createCymbalDto);
  }

  /**
   * Endpoint untuk mendapatkan semua cymbal.
   * @returns Promise dengan array objek Cymbal.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Daftar semua cymbal.', type: [Cymbal] })
  findAll(): Promise<Cymbal[]> {
    return this.cymbalService.findAll();
  }

  /**
   * Endpoint untuk mendapatkan cymbal berdasarkan ID.
   * @param id ID cymbal.
   * @returns Promise dengan objek Cymbal.
   * @throws NotFoundException jika cymbal tidak ditemukan.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Detail cymbal berdasarkan ID.', type: Cymbal })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cymbal tidak ditemukan.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cymbal | null> {
    return this.cymbalService.findOne(id);
  }

  /**
   * Endpoint untuk memperbarui data cymbal.
   * @param id ID cymbal yang akan diperbarui.
   * @param updateCymbalDto Data cymbal yang diperbarui.
   * @returns Promise dengan objek Cymbal yang diperbarui.
   * @throws NotFoundException jika cymbal tidak ditemukan.
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cymbal berhasil diperbarui.', type: Cymbal })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cymbal tidak ditemukan.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCymbalDto: UpdateCymbalDto): Promise<Cymbal> {
    return this.cymbalService.update(id, updateCymbalDto);
  }

  /**
   * Endpoint untuk menghapus cymbal.
   * @param id ID cymbal yang akan dihapus.
   * @returns Promise<void>.
   * @throws NotFoundException jika cymbal tidak ditemukan.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Cymbal berhasil dihapus.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cymbal tidak ditemukan.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cymbalService.remove(id);
  }
}
