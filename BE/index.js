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
const app = express();
const http = require('http').createServer(app);
app.use(express.json());
app.use(cors());
EmailService.init();
Mongo.connect();
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "<http://localhost:3000>"
  }
});

//👇🏻 Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/service", serviceRoutes)
app.use(catchError);


const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
