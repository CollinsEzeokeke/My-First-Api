import express, { Request, Response } from "express";
import {
  getAll,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  searchUser,
  updateUserByField,
} from "../../controllers/user/userController";
import {
  UsersResolvedById,
  UsersResolvedByFilterQuery,
  validator,
  validatorCreate,
  validatorId,validatorUpdate,validatorUpdateOptional
} from "../../middleware/Users/resolveUsers";

const router = express.Router();

// @desc Get all users
// @route GET /api/users
// @access Public
router.get('/api/users', getAll);

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
router.get("/api/users/findById/:id", validatorId, UsersResolvedById, getUserById);


// @desc searching for a user with a specific filter and value
// @route GET /api/users/search
// @access Public
router.get("/api/users/search", validator, UsersResolvedByFilterQuery, searchUser);

// @desc create a new user
// @route POST /api/users
// @access Public
router.post("/api/users", validatorCreate, createUser);

// @desc update a user
// @route PUT /api/users/:id
// @access Public
router.put("/api/users/:id",validatorUpdate,  UsersResolvedById, updateUser);

// @desc update a user by just a field
// @route PATCH /api/users/:id
// @access Public
router.patch("/api/users/:id",validatorUpdateOptional,UsersResolvedById, updateUserByField);

// @desc delete a user
// @route DELETE /api/users/:id
// @access Public
router.delete("/api/users/:id", UsersResolvedById, deleteUser);


export default router;