import pool from '../config/db.js';

export const TodoModel = {
  // Perbarui getByUserId untuk implementasi pagination (Langkah 4)
  getByUserId: async (userId: number, limit: number, offset: number) => {
    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [userId, limit, offset]
    );
    return rows;
  },

  // Tambahan method baru untuk menghitung total data pagination (Langkah 4)
  countByUserId: async (userId: number) => {
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) AS total FROM todos WHERE user_id = ?",
      [userId]
    );
    return rows[0].total as number;
  },

  // Ambil satu todo berdasarkan id dan userId
  getById: async (id: number, userId: number) => {
    const [rows]: any = await pool.query(
      'SELECT * FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0]; // Kembalikan 1 data, atau undefined jika tidak ditemukan
  },

  // Method bawaan dari kode awal
  create: async (userId: number, task: string) => {
    const [result]: any = await pool.query(
      'INSERT INTO todos (user_id, task) VALUES (?, ?)',
      [userId, task]
    );
    return result.insertId;
  },

  // REVISI BAGIAN A: Update task atau status is_completed secara parsial dinamis
  update: async (id: number, task: string | undefined, isCompleted: boolean | undefined, userId: number) => {
    const fields: string[] = [];
    const values: any[] = [];
    
    // Cek jika task memiliki value (tidak undefined), maka masukkan ke field yang akan diupdate
    if (task !== undefined) {
      fields.push('task = ?');
      values.push(task);
    }
    
    // Cek jika isCompleted memiliki value (tidak undefined), maka masukkan ke field yang akan diupdate
    if (isCompleted !== undefined) {
      fields.push('is_completed = ?');
      values.push(isCompleted);
    }
    
    // Jika tidak ada field yang diupdate (keduanya undefined), hentikan proses
    if (fields.length === 0) return 0;
    
    values.push(id, userId);
    
    const [result]: any = await pool.query(
      `UPDATE todos SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    
    return result.affectedRows;
  },

  // Hapus todo berdasarkan id dan user Id
  delete: async (id: number, userId: number) => {
    const [result]: any = await pool.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  }
};