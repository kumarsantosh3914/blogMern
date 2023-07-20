const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect("mongodb://localhost/blog_Mern");
};

module.exports = connect;
