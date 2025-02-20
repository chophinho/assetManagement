const db = require("../database/database");

const addClient = (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  const query = "insert into clients (id,name,email) values (?, ?,?)";
  db.run(query, [id, name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, id, name, email });
  });
};
const getAllClient = (req, res) => {
  const query = "select * from clients";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
module.exports = { addClient, getAllClient };
