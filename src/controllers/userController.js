import {
  createUserService,
  deleteAllUsersService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

const handleResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode,
    success: statusCode < 400,
    message,
    data,
  });
};
const handleError = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
  });
};

export const createUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email } = req.body;
    const user = await createUserService({ name, email });
    handleResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    handleResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await updateUserService(id, { name, email });
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    handleResponse(res, 200, "User updated successfully", user);
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUserService(id);
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    handleResponse(res, 200, "User deleted successfully");
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
export const deleteAllUsers = async (req, res) => {
  try {
    await deleteAllUsersService();
    handleResponse(res, 200, "All users deleted successfully");
  } catch (error) {
    handleError(res, 500, error.message);
  }
};
