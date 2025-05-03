// src/cymbal/cymbal.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CymbalService } from './cymbal.service';
import { CymbalController } from './cymbal.controller';
import { Cymbal } from './cymbal.entity';

/**
 * Module untuk mengelola fitur Cymbal.
 */
@Module({
  imports: [
    // Mengimpor TypeOrmModule.forFeature untuk mendaftarkan entity Cymbal di module ini
    TypeOrmModule.forFeature([Cymbal]),
  ],
  controllers: [CymbalController], // Mendaftarkan CymbalController
  providers: [CymbalService], // Mendaftarkan CymbalService
  exports: [CymbalService], // Mengekspor CymbalService jika dibutuhkan di module lain
})
export class CymbalModule {}
