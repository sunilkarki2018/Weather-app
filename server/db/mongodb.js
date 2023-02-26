const mongoose = require("mongoose");

// fix Mongoose strictQuery deprecation Warning
mongoose.set("strictQuery", false);

const connectMongoDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongoDB;
