const User = require("../models/user.model");

/**
 * Creates a new user with the provided data.
 * @param {Object} data - The user data to create.
 * @returns {Promise<Object>} The newly created user object.
 * @throws {Error} If there is an error creating the user.
 */
const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};

/**
 * Retrieves a user by their email.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object>} The user object with the given email.
 * @throws {Error} If no user found for the given email.
 */
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found for the given email");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user by email: " + error.message);
  }
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to find.
 * @returns {Promise<Object>} The user object with the given ID.
 * @throws {Error} If no user found for the given ID.
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("No user found for the given ID");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user by ID: " + error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
