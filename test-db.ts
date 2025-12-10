// test-db.js
import pool from './lib/db';

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB Connected:', res.rows[0]);
  } catch (err) {
    console.error('DB connection error:', err);
  } finally {
    await pool.end();
  }
}

test();
