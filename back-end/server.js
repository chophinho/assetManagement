const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // Đọc JSON body
app.use(cors()); // Cho phép gọi API từ frontend hoặc Thunder Client

// Import route
const assetRoutes = require("./routes/assetRoutes");
app.use("/api", assetRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`)
);
