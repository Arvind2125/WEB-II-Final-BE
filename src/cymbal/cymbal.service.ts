// src/cymbal/cymbal.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cymbal } from './cymbal.entity';
import { CreateCymbalDto } from './create-cymbal.dto';
import { UpdateCymbalDto } from './update-cymbal.dto';

/**
 * Service untuk mengelola data Cymbal.
 * Berisi logika bisnis untuk operasi CRUD.
 */
@Injectable()
export class CymbalService {
  constructor(
    @InjectRepository(Cymbal) // Inject repository TypeORM untuk entity Cymbal
    private cymbalRepository: Repository<Cymbal>,
  ) {}

  /**
   * Membuat cymbal baru.
   * @param createCymbalDto Data untuk membuat cymbal.
   * @returns Promise dengan objek Cymbal yang baru dibuat.
   */
  async create(createCymbalDto: CreateCymbalDto): Promise<Cymbal> {
    const cymbal = this.cymbalRepository.create(createCymbalDto); // Membuat instance Cymbal dari DTO
    return this.cymbalRepository.save(cymbal); // Menyimpan cymbal ke database
  }

  /**
   * Mendapatkan semua cymbal.
   * @returns Promise dengan array objek Cymbal.
   */
  async findAll(): Promise<Cymbal[]> {
    return this.cymbalRepository.find(); // Mengambil semua record dari tabel cymbal
  }

  /**
   * Mendapatkan cymbal berdasarkan ID.
   * @param id ID cymbal.
   * @returns Promise dengan objek Cymbal atau undefined jika tidak ditemukan.
   */
  async findOne(id: number): Promise<Cymbal | null> {
    return this.cymbalRepository.findOne({ where: { id } }); // Mengambil cymbal berdasarkan ID
  }

  /**
   * Memperbarui data cymbal.
   * @param id ID cymbal yang akan diperbarui.
   * @param updateCymbalDto Data untuk memperbarui cymbal.
   * @returns Promise dengan objek Cymbal yang diperbarui.
   * @throws NotFoundException jika cymbal dengan ID tersebut tidak ditemukan.
   */
  async update(id: number, updateCymbalDto: UpdateCymbalDto): Promise<Cymbal> {
    const cymbal = await this.findOne(id); // Cari cymbal berdasarkan ID
    if (!cymbal) {
      throw new NotFoundException(`Cymbal dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ditemukan
    }
    // Merge data dari DTO ke objek cymbal yang ada
    this.cymbalRepository.merge(cymbal, updateCymbalDto);
    return this.cymbalRepository.save(cymbal); // Simpan perubahan ke database
  }

  /**
   * Menghapus cymbal berdasarkan ID.
   * @param id ID cymbal yang akan dihapus.
   * @returns Promise<void>.
   * @throws NotFoundException jika cymbal dengan ID tersebut tidak ditemukan.
   */
  async remove(id: number): Promise<void> {
    const result = await this.cymbalRepository.delete(id); // Hapus cymbal berdasarkan ID
    if (result.affected === 0) {
      throw new NotFoundException(`Cymbal dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ada record yang terpengaruh (tidak ditemukan)
    }
  }
}
