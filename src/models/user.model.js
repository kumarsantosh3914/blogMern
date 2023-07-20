const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // a trigger to encrypt the plain password before saving the user
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

/**
 * This is going to be an instance method for user, to compare a password
 * With the stored encrypted password
 * @param plainPassword -> input password given by the user in sign in request
 * @returns boolen donoting whether passwords are same or not?
 */

userSchema.methods.isValidPassword = async function (plainPassword) {
  const currentUser = this;
  const compare = await bcrypt.compare(plainPassword, currentUser.password);
  return compare;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
