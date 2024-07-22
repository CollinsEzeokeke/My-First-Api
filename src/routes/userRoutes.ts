import express, { Request, Response } from 'express';
import  {
    getHome,
    getAll,
    getUserById,
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
router.get('/api/users', UsersResolvedByFilterQuery, getUserById);
