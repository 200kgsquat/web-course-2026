const Database = require('better-sqlite3');
const path = require('node:path');
const fs = require('node:fs');
// A single connection per process, persisted to a real SQLite file.
const filename = process.env.DATABASE_PATH || path.join(process.cwd(), 'lib', 'database.sqlite');
fs.mkdirSync(path.dirname(filename), {recursive: true});
const db = new Database(filename);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS categories (
 id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
 type TEXT NOT NULL CHECK(type IN ('income','expense')));
 CREATE TABLE IF NOT EXISTS transactions (
 id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL NOT NULL,
 category_id INTEGER NOT NULL, date TEXT NOT NULL, comment TEXT,
 FOREIGN KEY(category_id) REFERENCES categories(id));`);
if (!db.prepare('SELECT COUNT(*) AS n FROM categories').get().n) {
 const insert = db.prepare('INSERT INTO categories(name,type) VALUES (?,?)');
 db.transaction(() => { insert.run('Еда','expense'); insert.run('Транспорт','expense'); insert.run('Зарплата','income'); })();
}
module.exports = db;
