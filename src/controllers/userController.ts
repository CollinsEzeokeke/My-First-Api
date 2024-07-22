import { Request, Response } from 'express';
import { mockUsers } from '../data/mockUsers'; // Ensure this path is correct

// @desc Get Homepage
// @route GET /
// @access Public
export function getHome(req: Request, res: Response) {
  res.send('Welcome to the homepage');
}

// @desc Get all users
// @route GET /api/users
// @access Public
export function getAll(req: Request, res: Response) {
  res.json(mockUsers);
}

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
export function getUserById (req: Request, res: Response) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).send('User not found');
  }
}

// @desc searching for a user with a specific filter and value
// @route GET /api/users
// @access Public
export function searchUser(req: Request, res: Response) {
  if ((req.query) && (req.query.filter) && (req.query.value)) {
    res.json();
  } else {
    res.status(404).send('User not found');
  }
}