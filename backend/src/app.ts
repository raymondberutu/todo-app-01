import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { randomUUID } from 'crypto';
import { sendSuccess, sendError } from './utils/response';

const app = express();

// Langkah 6: Tambahkan exposedHeaders pada konfigurasi cors
app.use(cors({ exposedHeaders: ['X-Request-Id'] }));
app.use(express.json());

// Langkah 6: Middleware pertama untuk membuat ID unik (X-Request-Id)
app.use((req, res, next) => {
    const requestId = randomUUID();
    res.locals.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
});

// Langkah 6: Middleware kedua untuk menampilkan log
app.use((req, res, next) => {
    console.log(`[${res.locals.requestId}] ${req.method} ${req.originalUrl}`);
    next();
});

// Langkah 7: Perbarui response bawaan menggunakan sendSuccess
// Route utama cek apakah server berjalan
app.get('/', (req, res) => {
    sendSuccess(res, 'Backend Todo Praktikum Berjalan Mulus!', null);
});

// Daftarkan semua route dengan prefix /api
app.use('/api', routes);

// Langkah 7: Perbarui response bawaan menggunakan sendError
// 404 Handler - dipanggil jika tidak ada route yang cocok
app.use((req: Request, res: Response) => {
    sendError(res, `Route ${req.method} ${req.url} tidak ditemukan!`, 404);
});

// Langkah 7: Perbarui response bawaan menggunakan sendError
// Global Error Handler - menangkap error yang tidak tertangani
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Terjadi error:', err.message);
    sendError(res, 'Terjadi kesalahan pada server.', 500);
});

export default app;