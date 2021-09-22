require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "sound-dic",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected. ✅");
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  this.connect();
});

module.exports = db;
