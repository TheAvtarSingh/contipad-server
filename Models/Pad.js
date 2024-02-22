const mongoose = require("mongoose");

const PadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  padNumber: {
    type: Number,
    required: true,
  },
  padTitle: {
    type: String,
    required: true,
  },
  padContent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PadDB", PadSchema);
