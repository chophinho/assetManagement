const db = require("./database");

db.serialize(() => {
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return;
    }
    console.log("Bảng có trong database:", row.name);
  });
});
