import pool from '../config/db.js';

export const TodoModel = {
  // Method bawaan dari kode awal
  getByUserId: async (userId: number) => {
    const [rows]: any = await pool.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
    return rows;
  },

  // Tambahan dari Langkah 10a: Ambil satu todo berdasarkan id dan userId
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

  // Tambahan dari Langkah 1: Update task atau status is_completed
  update: async (id: number, task: string, isCompleted: boolean, userId: number) => {
    const [result]: any = await pool.query(
      'UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?',
      [task, isCompleted, id, userId]
    );
    return result.affectedRows;
  },

  // Tambahan dari Langkah 1: Hapus todo berdasarkan id dan user Id
  delete: async (id: number, userId: number) => {
    const [result]: any = await pool.query(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  }
};