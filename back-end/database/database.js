const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./asset_management.db", (err) => {
  if (err) {
    console.error("Lỗi kết nối SQLite:", err);
    return;
  }
  console.log(" Kết nối SQLite thành công");
});

module.exports = db;
