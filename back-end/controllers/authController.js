const db = require("../database/database");

const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập tài khoản và mật khẩu" });
  }

  const query = "select * from users where username = ?";
  db.get(query, [username], (err, user) => {
    if (err) return res.status(500).json({ error: "Lỗi server" });
    if (!user)
      return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });

    if (password !== user.password) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }
    res.json({ message: "Đăng nhập thành công" });
  });
};

module.exports = { loginUser };
