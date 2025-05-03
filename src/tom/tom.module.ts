// src/tom/tom.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TomService } from './tom.service';
import { TomController } from './tom.controller';
import { Tom } from './tom.entity';

/**
 * Module untuk mengelola fitur Tom.
 */
@Module({
  imports: [
    // Mengimpor TypeOrmModule.forFeature untuk mendaftarkan entity Tom di module ini
    TypeOrmModule.forFeature([Tom]),
  ],
  controllers: [TomController], // Mendaftarkan TomController
  providers: [TomService], // Mendaftarkan TomService
  exports: [TomService], // Mengekspor TomService jika dibutuhkan di module lain
})
export class TomModule {}
