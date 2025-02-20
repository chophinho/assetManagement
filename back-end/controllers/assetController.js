const db = require("../database/database");

const addAsset = (req, res) => {
  const { type, owner, status } = req.body;

  if (!type || !owner || !status) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  const query = "insert into assets (type, owner, status) values (?, ?,?)";

  db.run(query, [type, owner, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const updateStorageQuery =
      "update storage set borrowed = borrowed +1 where id = ?";
    db.run(updateStorageQuery, [type], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      }

      res.json({
        id: this.lastID,
        type,
        owner,
        status,
        message: "Storage đã cập nhật",
      });
    });
  });
};
const deleteAsset = (req, res) => {
  const { id } = req.params;

  const deleteQuery = "delete from assets where id = ? returning type";
  db.get(deleteQuery, [id], (err, deletedAsset) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi xóa tài sản: " + err.message });
    }
    if (!deletedAsset) {
      return res.status(404).json({ error: "Tài sản k tồn tại" });
    }

    const updateStorageQuery =
      "update storage set borrowed = borrowed - 1 where id = ? and borrowed > 0";
    db.run(updateStorageQuery, [deletedAsset.type], function (err) {
      if (err) {
        console.error("Lỗi cập nhật storage:", err.message);
      }
      res.json({ message: "Tài sản đã được xóa, storage đã cập nhật" });
    });
  });
};

const getAllAsset = (req, res) => {
  const query = `select 
    assets.type,
    storage.name as storage_name,
    assets.owner,
    clients.name as client_name,
    clients.email, 
    storage.value 
    from assets 
    join storage on assets.type = storage.id 
    join clients on assets.owner = clients.id`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const getAssetByStatus = (req, res) => {
  const { status } = req.params;
  const query = `select 
                  assets.type, 
                  storage.name as storage_name, 
                  assets.owner,  
                  clients.name as client_name, 
                  clients.email, 
                  storage.value 
                  from assets 
                  join storage on assets.type = storage.id 
                  join clients on assets.owner = clients.id 
                  where assets.status = ?;`;
  db.all(query, status, (err, rows) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có tài sản có trạng thái này" });
    }
    res.json(rows);
  });
};
const getAssetByOwner = (req, res) => {
  const { owner } = req.params;
  const query = `select 
                  assets.type, 
                  storage.name as storage_name, 
                  assets.owner,  
                  clients.name as client_name, 
                  clients.email, 
                  storage.value 
                  from assets 
                  join storage on assets.type = storage.id 
                  join clients on assets.owner = clients.id 
                  where assets.owner = ?;`;
  db.all(query, owner, (err, rows) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có tài sản của người này" });
    }
    res.json(rows);
  });
};
const getAssetByType = (req, res) => {
  const { type } = req.params;
  const query = `select 
                  assets.type, 
                  storage.name as storage_name, 
                  assets.owner,  
                  clients.name as client_name, 
                  clients.email, 
                  storage.value 
                  from assets 
                  join storage on assets.type = storage.id 
                  join clients on assets.owner = clients.id 
                  where assets.type = ?;`;
  db.all(query, type, (err, rows) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "Không có tài sản loại này" });
    }
    res.json(rows);
  });
};
const updateStatus = (req, res) => {
  const query = `
    update assets 
    set status = 'maintenance' 
    where status = 'good' 
    and id in (
      select assets.id from assets
      join storage ON assets.type = storage.id
      where (julianday('now') - julianday(assets.created_at)) >= storage.maintenance_period
    );
  `;

  db.run(query, [], function (err) {
    if (err) {
      res.status(500).json({ err: err.message });
    } else {
      res.status(200).json({ message: "Cập nhật thành công" });
    }
  });
};

module.exports = {
  addAsset,
  getAllAsset,
  getAssetByStatus,
  deleteAsset,
  getAssetByOwner,
  getAssetByType,
  updateStatus,
};
