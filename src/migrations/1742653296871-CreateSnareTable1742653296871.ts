import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSnareTable1714675200000 implements MigrationInterface { // Ganti timestamp ini dengan yang baru saat generate migrasi

    // Metode `up` dijalankan saat migrasi diterapkan (membuat tabel)
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE snare (
                id SERIAL PRIMARY KEY, -- Kolom ID sebagai primary key auto-increment
                jenis VARCHAR(100) NOT NULL, -- Jenis snare (misal: maple, birch, steel)
                merk VARCHAR(100) NOT NULL, -- Merk snare (misal: Pearl, Tama, Ludwig)
                gambar TEXT, -- URL atau path gambar snare (opsional)
                harga DECIMAL(10, 2) NOT NULL, -- Harga snare, menggunakan DECIMAL untuk presisi mata uang
                stok INTEGER NOT NULL DEFAULT 0, -- Jumlah stok snare, default 0
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu pembuatan record
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Waktu terakhir record diperbarui
            );
        `);
    }

    // Metode `down` dijalankan saat migrasi di-rollback (menghapus tabel)
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE snare;`); // Menghapus tabel snare
    }

}
