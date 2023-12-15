const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./db");
const { reportRouter } = require("./routes/report.routes");
app.use(express.json());
app.use(cors());
app.use("/report", reportRouter);

app.listen(2033, async () => {
  try {
    await connection;
    console.log("Connection Build");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running on port 2043");
});
