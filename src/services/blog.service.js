const Blog = require("../models/blog.model");

/**
 * Creates a new blog with the provided data.
 * @param {Object} blogData - The data for the new blog.
 * @returns {Promise<Object>} The newly created blog object.
 * @throws {Error} If there is an error creating the blog.
 */
const createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw new Error("Failed to create blog: " + error.message);
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findOneAndDelete(id);
    return blog;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates an existing blog with the provided data.
 * @param {Object} blogData - The data to update the blog.
 * @param {string} blogId - The ID of the blog to update.
 * @returns {Promise<Object>} The updated blog object.
 * @throws {Error} If no blog found for the given id.
 */
const updateBlog = async (blogData, blogId) => {
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, blogData, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      throw new Error("No blog found for the given id");
    }
    return blog;
  } catch (error) {
    throw new Error("Failed to update blog: " + error.message);
  }
};

/**
 * Retrieves a list of blogs that match the provided criteria.
 * @param {Object} criteria - The criteria to filter blogs.
 * @returns {Promise<Array>} An array of blog objects that match the criteria.
 * @throws {Error} If there is an error retrieving blogs.
 */
const getBlogs = async (id) => {
  try {
    const blogs = await Blog.find(id);
    return blogs;
  } catch (error) {
    throw new Error("Failed to get blogs: " + error.message);
  }
};

/**
 * Retrieves all blogs.
 * @returns {Promise<Array>} An array of all blog objects.
 * @throws {Error} If there is an error retrieving blogs.
 */
const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    throw new Error("Failed to get all blogs: " + error.message);
  }
};

/**
 * Retrieves a blog by its ID.
 * @param {string} id - The ID of the blog to find.
 * @param {string} userId - (Optional) The ID of the user who owns the blog.
 * @returns {Promise<Object>} The blog object with the given ID.
 * @throws {Error} If no blog found for the given ID.
 */
const getBlogById = async (id, userId) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("No blog records found for the id");
    }
    // Optionally, you can add additional logic here to check if the user has permission to access this blog (e.g., based on userId).
    return blog;
  } catch (error) {
    throw new Error("Failed to get blog by ID: " + error.message);
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogs,
  getAllBlogs,
  getBlogById,
};
