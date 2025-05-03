// src/cymbal/cymbal.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Entity untuk tabel 'cymbal'.
 * Merepresentasikan data cymbal.
 */
@Entity('cymbal') // Menentukan nama tabel di database
export class Cymbal {
  @PrimaryGeneratedColumn() // Kolom ID sebagai primary key auto-increment
  id: number;

  @Column({ length: 100 }) // Kolom untuk jenis cymbal, maksimal 100 karakter
  jenis: string;

  @Column({ length: 100 }) // Kolom untuk merk cymbal, maksimal 100 karakter
  merk: string;

  @Column({ type: 'text', nullable: true }) // Kolom untuk gambar cymbal (URL/path), bisa null
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
