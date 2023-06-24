require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const Mongo = require("./config/db");
const EmailService = require("./utils/EmailService");
const catchError = require("./middleware/error");
const authRoutes = require("./route/authRoutes");
const companyRoutes = require("./route/companyRoutes");
const customerRoutes = require("./route/customerRoutes");
const serviceRoutes = require("./route/serviceRoutes");
const paymentRoutes = require("./route/paymentRoutes");
const pickupRoutes = require("./route/pickupRoutes");
const notiRoutes = require("./route/notiRoutes");
const Socket = require("./models/socket");
const socket = require("./models/socket");
const app = express();
const http = require("http").createServer(app);
app.use(express.json());
app.use(cors());
EmailService.init();
Mongo.connect();
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.set("socketio", io);
const socketIdByUserId = {};

//👇🏻 Add this before the app.get() block
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("login", async (userId) => {
    socketIdByUserId[userId] = socket.id;
    console.log(userId, socket.id);
    const socketDevice = await Socket.create({
      accountId: userId,
      socketID: socket.id,
    });
  });
  socket.on("send_message", (value) => {
    io.emit("receive_message", { data: Math.random() });
  });
  socket.on("notification-count", (value) => {
    console.log(value);
  });
  socket.on("disconnect", async () => {
    socket.disconnect();
    const socketDevice = await Socket.findOneAndDelete({
      socketID: socket.id,
    });
    console.log(`🔥: ${socket.id} user disconnected`);
  });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/pickup", pickupRoutes);
app.use("/api/v1/noti", notiRoutes);
app.use(catchError);

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
