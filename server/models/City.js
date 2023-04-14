const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 4,
    required: true,
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
