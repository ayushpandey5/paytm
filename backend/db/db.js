const mongoose = require("mongoose")

mongoose.connect(
    "mongodb+srv://ayushpandey:QPZMal%40123@cluster.fl6ysgy.mongodb.net/paytm"
  );

module.exports = mongoose;