const express = require("express");
const connectToDB = require("./mongoConnection");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Hello From Server");
});

app.use("/api/v1/user", userRoute);

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
