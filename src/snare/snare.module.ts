// src/snare/snare.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnareService } from './snare.service';
import { SnareController } from './snare.controller';
import { Snare } from './snare.entity';

/**
 * Module untuk mengelola fitur Snare.
 */
@Module({
  imports: [
    // Mengimpor TypeOrmModule.forFeature untuk mendaftarkan entity Snare di module ini
    TypeOrmModule.forFeature([Snare]),
  ],
  controllers: [SnareController], // Mendaftarkan SnareController
  providers: [SnareService], // Mendaftarkan SnareService
  exports: [SnareService], // Mengekspor SnareService jika dibutuhkan di module lain
})
export class SnareModule {}
