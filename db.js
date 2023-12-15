const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb+srv://yashjain:yashjain2910@pres.txqkuph.mongodb.net/report?retryWrites=true&w=majority"
);

module.exports = { connection };
