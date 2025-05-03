// src/tom/tom.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TomService } from './tom.service';
import { CreateTomDto } from './create-tom.dto';
import { UpdateTomDto } from './update-tom.dto';
import { Tom } from './tom.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('tom') // Tag untuk Swagger
@Controller('tom') // Base path untuk endpoint di controller ini
export class TomController {
  constructor(private readonly tomService: TomService) {}

  /**
   * Endpoint untuk membuat tom baru.
   * @param createTomDto Data tom yang akan dibuat.
   * @returns Promise dengan objek Tom yang baru dibuat.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tom berhasil dibuat.', type: Tom })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  create(@Body() createTomDto: CreateTomDto): Promise<Tom> {
    return this.tomService.create(createTomDto);
  }

  /**
   * Endpoint untuk mendapatkan semua tom.
   * @returns Promise dengan array objek Tom.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Daftar semua tom.', type: [Tom] })
  findAll(): Promise<Tom[]> {
    return this.tomService.findAll();
  }

  /**
   * Endpoint untuk mendapatkan tom berdasarkan ID.
   * @param id ID tom.
   * @returns Promise dengan objek Tom.
   * @throws NotFoundException jika tom tidak ditemukan.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Detail tom berdasarkan ID.', type: Tom })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tom tidak ditemukan.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tom | null> {
    return this.tomService.findOne(id);
  }

  /**
   * Endpoint untuk memperbarui data tom.
   * @param id ID tom yang akan diperbarui.
   * @param updateTomDto Data tom yang diperbarui.
   * @returns Promise dengan objek Tom yang diperbarui.
   * @throws NotFoundException jika tom tidak ditemukan.
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Tom berhasil diperbarui.', type: Tom })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tom tidak ditemukan.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data input tidak valid.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTomDto: UpdateTomDto): Promise<Tom> {
    return this.tomService.update(id, updateTomDto);
  }

  /**
   * Endpoint untuk menghapus tom.
   * @param id ID tom yang akan dihapus.
   * @returns Promise<void>.
   * @throws NotFoundException jika tom tidak ditemukan.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tom berhasil dihapus.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tom tidak ditemukan.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tomService.remove(id);
  }
}
