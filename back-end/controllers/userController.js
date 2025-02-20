const db = require("../database/database");

const addUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  const query = "insert into users (username,password,role) values (?, ?,?)";
  db.run(query, [username, password, role], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, username, password, role });
  });
};

module.exports = { addUser };
