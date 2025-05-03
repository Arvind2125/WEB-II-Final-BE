// src/tom/tom.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entity untuk tabel 'tom'.
 * Merepresentasikan data tom drum.
 */
@Entity('tom') // Menentukan nama tabel di database
export class Tom {
  @PrimaryGeneratedColumn() // Kolom ID sebagai primary key auto-increment
  id: number;

  @Column({ length: 100 }) // Kolom untuk jenis tom, maksimal 100 karakter
  jenis: string;

  @Column({ length: 100 }) // Kolom untuk merk tom, maksimal 100 karakter
  merk: string;

  @Column({ type: 'text', nullable: true }) // Kolom untuk gambar tom (URL/path), bisa null
  gambar: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Kolom untuk harga, tipe decimal dengan 10 total digit dan 2 di belakang koma
  harga: number;

  @Column({ type: 'integer', default: 0 }) // Kolom untuk stok, tipe integer dengan default 0
  stok: number;

  @CreateDateColumn() // Kolom untuk waktu pembuatan record
  created_at: Date;

  @UpdateDateColumn() // Kolom untuk waktu terakhir record diperbarui
  updated_at: Date;
}
