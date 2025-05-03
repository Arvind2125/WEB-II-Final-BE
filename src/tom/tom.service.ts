// src/tom/tom.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tom } from './tom.entity';
import { CreateTomDto } from './create-tom.dto';
import { UpdateTomDto } from './update-tom.dto';

/**
 * Service untuk mengelola data Tom.
 * Berisi logika bisnis untuk operasi CRUD.
 */
@Injectable()
export class TomService {
  constructor(
    @InjectRepository(Tom) // Inject repository TypeORM untuk entity Tom
    private tomRepository: Repository<Tom>,
  ) {}

  /**
   * Membuat tom baru.
   * @param createTomDto Data untuk membuat tom.
   * @returns Promise dengan objek Tom yang baru dibuat.
   */
  async create(createTomDto: CreateTomDto): Promise<Tom> {
    const tom = this.tomRepository.create(createTomDto); // Membuat instance Tom dari DTO
    return this.tomRepository.save(tom); // Menyimpan tom ke database
  }

  /**
   * Mendapatkan semua tom.
   * @returns Promise dengan array objek Tom.
   */
  async findAll(): Promise<Tom[]> {
    return this.tomRepository.find(); // Mengambil semua record dari tabel tom
  }

  /**
   * Mendapatkan tom berdasarkan ID.
   * @param id ID tom.
   * @returns Promise dengan objek Tom atau undefined jika tidak ditemukan.
   */
  async findOne(id: number): Promise<Tom | null> {
    return this.tomRepository.findOne({ where: { id } }); // Mengambil tom berdasarkan ID
  }

  /**
   * Memperbarui data tom.
   * @param id ID tom yang akan diperbarui.
   * @param updateTomDto Data untuk memperbarui tom.
   * @returns Promise dengan objek Tom yang diperbarui.
   * @throws NotFoundException jika tom dengan ID tersebut tidak ditemukan.
   */
  async update(id: number, updateTomDto: UpdateTomDto): Promise<Tom> {
    const tom = await this.findOne(id); // Cari tom berdasarkan ID
    if (!tom) {
      throw new NotFoundException(`Tom dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ditemukan
    }
    // Merge data dari DTO ke objek tom yang ada
    this.tomRepository.merge(tom, updateTomDto);
    return this.tomRepository.save(tom); // Simpan perubahan ke database
  }

  /**
   * Menghapus tom berdasarkan ID.
   * @param id ID tom yang akan dihapus.
   * @returns Promise<void>.
   * @throws NotFoundException jika tom dengan ID tersebut tidak ditemukan.
   */
  async remove(id: number): Promise<void> {
    const result = await this.tomRepository.delete(id); // Hapus tom berdasarkan ID
    if (result.affected === 0) {
      throw new NotFoundException(`Tom dengan ID ${id} tidak ditemukan`); // Lempar error jika tidak ada record yang terpengaruh (tidak ditemukan)
    }
  }
}
