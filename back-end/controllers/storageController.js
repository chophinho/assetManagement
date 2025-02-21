const db = require("../database/database");

const addAssetToStorage = (req, res) => {
  const { id, name, value, quantity, borrowed, maintenance_period } = req.body;
  console.log(req.body);

  const query =
    "insert into storage (id, name, value,quantity,borrowed,maintenance_period) values (?, ?,?,?,?,?)";
  db.run(
    query,
    [id, name, value, quantity, borrowed, maintenance_period],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        id,
        name,
        value,
        quantity,
        borrowed,
        maintenance_period,
        message: "Thêm tài sản vào kho thành công",
      });
    }
  );
};
const deleteAssetFromStorage = (req, res) => {
  const { id } = req.params;

  const query = "delete from storage where id = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Xóa thành công" });
  });
};

const getAllAssetOnStorage = (req, res) => {
  const query = "select * from storage";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

module.exports = {
  addAssetToStorage,
  deleteAssetFromStorage,
  getAllAssetOnStorage,
};
