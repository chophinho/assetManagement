const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./asset_management.db", (err) => {
  if (err) {
    console.error("Lỗi kết nối SQLite:", err);
    return;
  }
  console.log(" oke");
});

module.exports = db;
