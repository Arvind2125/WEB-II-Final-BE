import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCymbalTable1714675200002 implements MigrationInterface { // Ganti timestamp ini dengan yang baru saat generate migrasi

    // Metode `up` dijalankan saat migrasi diterapkan (membuat tabel)
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE cymbal (
                id SERIAL PRIMARY KEY, -- Kolom ID sebagai primary key auto-increment
                jenis VARCHAR(100) NOT NULL, -- Jenis cymbal (misal: hi-hat, crash, ride, splash)
                merk VARCHAR(100) NOT NULL, -- Merk cymbal
                gambar TEXT, -- URL atau path gambar cymbal (opsional)
                harga DECIMAL(10, 2) NOT NULL, -- Harga cymbal
                stok INTEGER NOT NULL DEFAULT 0, -- Jumlah stok cymbal, default 0
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan record
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Waktu terakhir record diperbarui
            );
        `);
    }

    // Metode `down` dijalankan saat migrasi di-rollback (menghapus tabel)
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE cymbal;`); // Menghapus tabel cymbal
    }

}
