import express, { Request, Response } from 'express';
import  {
    getHome,
    getAll,
    getUserById,
    deleteUser,
    updateUser,
    createUser,
    searchUser,
    updateUserByField,
}  from '../controllers/userController';
import { UsersResolvedById, UsersResolvedByFilterQuery } from '../middleware/resolveUsers';

export const router = express.Router();

// @desc Get Homepage
// @route GET /
// @access Public
router.get('/', getHome);

// @desc Get all users
// @route GET /api/users
// @access Public
router.get('/api/users', getAll);

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
router.get('/api/users/:id', UsersResolvedById, getUserById);

// @desc searching for a user with a specific filter and value
// @route GET /api/users
// @access Public
router.get('/api/users', UsersResolvedByFilterQuery, searchUser);

// @desc create a new user 
// @route POST /api/users
// @access Public
router.post('/api/users', createUser);

// @desc update a user
// @route PUT /api/users/:id
// @access Public
router.put('/api/users/:id', UsersResolvedById, updateUser);

// @desc update a user by just a field
// @route PATCH /api/users/:id
// @access Public
router.patch('/api/users/:id', UsersResolvedById, updateUserByField);

// @desc delete a user
// @route DELETE /api/users/:id
// @access Public
router.delete('/api/users/:id', UsersResolvedById, deleteUser);
