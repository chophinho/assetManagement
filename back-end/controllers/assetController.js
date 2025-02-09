const db = require("../database/database");

const addAsset = (req, res) => {
  const { name, type, owner, value, status } = req.body;

  if (!name || !type || !owner || !value || !status) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  const query =
    "INSERT INTO assets (name, type, owner, value, status) VALUES (?, ?, ?, ?,?)";
  db.run(query, [name, type, owner, value, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, type, owner, value, status });
  });
};

module.exports = { addAsset };
