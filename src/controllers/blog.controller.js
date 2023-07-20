const blogService = require("../services/blog.service");

const create = async (req, res) => {
  try {
    const response = await blogService.createBlog(req.body);
    return res.status(200).json({
      success: true,
      message: "Successfully created the blog",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const removeBlog = async (req, res) => {
  try {
    const response = await blogService.deleteBlog(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully removed the blog",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const response = await blogService.updateBlog(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Successfully update the blog",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const response = await blogService.getBlogs(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const getAllblogs = async (req, res) => {
  try {
    const response = await blogService.getAllBlogs();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all the blogs",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

const getblogById = async (req, res) => {
  try {
    const response = await blogService.getBlogById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched a blog",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in controller layer",
      data: {},
      err: error,
    });
  }
};

module.exports = {
  create,
  removeBlog,
  updateBlog,
  getAllblogs,
  getblogById,
  getBlog,
};
