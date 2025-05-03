// src/snare/snare.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snare } from './snare.entity';
import { CreateSnareDto } from './create-snare.dto';
import { UpdateSnareDto } from './update-snare.dto';

/**
 * Service untuk mengelola data Snare.
 * Berisi logika bisnis untuk operasi CRUD.
 */
@Injectable()
export class SnareService {
  constructor(
    @InjectRepository(Snare) // Inject repository TypeORM untuk entity Snare
    private snareRepository: Repository<Snare>,
  ) {}

  /**
   * Membuat snare baru.
   * @param createSnareDto Data untuk membuat snare.
   * @returns Promise dengan objek Snare yang baru dibuat.
   */
  async create(createSnareDto: CreateSnareDto): Promise<Snare> {
    const snare = this.snareRepository.create(createSnareDto); // Membuat instance Snare dari DTO
    return this.snareRepository.save(snare); // Menyimpan snare ke database
  }

  /**
   * Mendapatkan semua snare.
   * @returns Promise dengan array objek Snare.
   */
  async findAll(): Promise<Snare[]> {
    return this.snareRepository.find(); // Mengambil semua record dari tabel snare
  }

  /**
   * Mendapatkan snare berdasarkan ID.
   * @param id ID snare.
   * @returns Promise dengan objek Snare atau null jika tidak ditemukan.
   */
  async findOne(id: number): Promise<Snare | null> {
    return this.snareRepository.findOne({ where: { id } }); // Mengambil snare berdasarkan ID
  }

  /**
   * Memperbarui data snare.
   * @param id ID snare yang akan diperbarui.
   * @param updateSnareDto Data untuk memperbarui snare.
   * @returns Promise dengan objek Snare yang diperbarui.
   * @throws NotFoundException jika snare dengan ID tersebut tidak ditemukan.
   */
  async update(id: number, updateSnareDto: UpdateSnareDto): Promise<Snare> {
    const snare = await this.findOne(id); // Cari snare berdasarkan ID
    if (!snare) {
      throw new NotFoundException(`Snare dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ditemukan
    }
    // Merge data dari DTO ke objek snare yang ada
    this.snareRepository.merge(snare, updateSnareDto);
    return this.snareRepository.save(snare); // Simpan perubahan ke database
  }

  /**
   * Menghapus snare berdasarkan ID.
   * @param id ID snare yang akan dihapus.
   * @returns Promise dengan hasil penghapusan.
   * @throws NotFoundException jika snare dengan ID tersebut tidak ditemukan.
   */
  async remove(id: number): Promise<void> {
    const result = await this.snareRepository.delete(id); // Hapus snare berdasarkan ID
    if (result.affected === 0) {
      throw new NotFoundException(`Snare dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ada record yang terpengaruh (tidak ditemukan)
    }
  }
}
