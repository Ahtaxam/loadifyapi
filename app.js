const express = require("express");
const connectToDB = require("./mongoConnection");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

const userRoute = require("./routes/user");
const loaderRoute = require("./routes/postLoaderAdd");
const inventoryRoute = require("./routes/postInventoryAdd");
const messageRoute = require("./routes/message");
const bookingRoute = require("./routes/booking");
const passwordRoute = require("./routes/password");
const contactUsRoute = require("./routes/contactUs");

const { initializeSocket } = require("./config/socket");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// const io = new Server(server);

app.get("/", (req, res) => {
  res.status(200).json("Hello From Server");
});

// io.on('connection', (socket) => {
//   console.log('A user connected: ', socket);
// });

app.use("/api/v1/user", userRoute);
app.use("/api/v1/loader", loaderRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/password", passwordRoute);
app.use("/api/v1/contactus", contactUsRoute);

const startServer = async () => {
  try {
    await connectToDB();
    server.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
    initializeSocket(server);
  } catch (err) {
    console.log(`Failed to start server ${err}`);
  }
};

startServer();
