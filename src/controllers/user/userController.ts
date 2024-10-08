import { Request, Response, NextFunction } from "express";
import { mockUsers } from "../../data/Users/mockUsers";
import User from "../../interfaces/User/User";

// @desc Get all users
// @route GET /api/users
// @access Public
export function getAll(req: Request, res: Response) { 
  res.json(mockUsers);
}

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
export function getUserById(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).send("User not found");
  }
}

//@desc searching for a user with a specific filter and value
//@route GET /api/users/search
//@access Public
export function searchUser(req: Request, res: Response) {
  const user = req.user;
  console.log(user);
  res.json(user);
}

// @desc create a new user
// @route POST /api/users
// @access Public
export function createUser(req: Request, res: Response) {
  const { username, displayName } = req.body;

  if (!username || !displayName) {
    return res.status(400).send("Username and DisplayName are required");
  }
  const varianle = req.data;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...varianle };

  mockUsers.push(newUser);
  res.status(201).json(newUser);
}

// @desc update a user
// @route PUT /api/users/:id
// @access Public
export function updateUser(req: Request, res: Response) {
  const user = req.user as User;
  if (!user) {
    res.status(404).send("User not found");
  } else {
    user.displayName = req.body.displayName;
    user.username = req.body.username;
    res.json(user);
  }
}

// @desc update a user by just a field
// @route PATCH /api/users/:id
// @access Public
export function updateUserByField(req: Request, res: Response) {
  const user = req.user as User;
  if (!user) {
    res.status(404).send("User not found");
  } else {
    if (req.body.displayName) {
      user.displayName = req.body.displayName;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    res.json(user);
  }
}

// @desc delete a user
// @route DELETE /api/users/:id
// @access Public
export function deleteUser(req: Request, res: Response) {
  const user = req.user as User;
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const deleteMockuser = mockUsers.splice(mockUsers.indexOf(user), 1);
    res.json(deleteMockuser);
  }
}

export function login (req: Request, res: Response) {
  const user = req.user as User;
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.json(user)
  }
}

export function responses (req: Request, res: Response) {
  const message = req.message;
  if (!message) {
    res.status(404).send("User not found");
  } else {
    res.json(message)
  }
}