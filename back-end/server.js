const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const assetRoutes = require("./routes/assetRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
app.use("/v1/asset", assetRoutes);
app.use("/v1/user", userRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/client", clientRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`)
);
