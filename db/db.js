import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbPromise = open({
  filename: `${__dirname}/notes.db`,
  driver: sqlite3.Database,
});

const initDB = async () => {
  const db = await dbPromise;
  
  await db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  );
  `);
};

await initDB();
export default dbPromise;
