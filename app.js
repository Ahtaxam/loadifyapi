const express = require("express");
const connectToDB = require("./mongoConnection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")

const userRoute = require("./routes/user");
const loaderRoute = require("./routes/postLoaderAdd");
const inventoryRoute = require("./routes/postInventoryAdd")

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json("Hello From Server");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/loader", loaderRoute);
app.use("/api/v1/inventory", inventoryRoute)

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Failed to start server ${err}`);
  }
};

startServer();
