import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url);
  next();
};

const resolveIndexByUserId = (req: Request, res: Response, next: NextFunction) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);
  if (!user) return res.status(404).send("User not found");
  next();
};

app.use(resolveIndexByUserId);

const port = process.env.PORT || 3000;

interface User {
  id: number;
  username: string;
  displayName: string;
}

const mockUsers: User[] = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "bob", displayName: "Bob" },
  { id: 3, username: "charlie", displayName: "Charlie" },
  { id: 4, username: "jane", displayName: "Jane" },
];

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`Base URL 1: ${req.baseUrl}`);
    next();
  },
  
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`Base URL 2: ${req.baseUrl}`);
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`Base URL: ${req.baseUrl}`);
    next();
  },
  (req: Request, res: Response) => {
    res.send(`Hello, Here are all the users currently in my database: (Strictly confidential)${[mockUsers]}`);
  }
);

app.use(loggingMiddleware, (req: Request, res: Response, next: NextFunction) => {
    console.log(`Finished logging your middleware`);
    next();
});

app.get("/api/users/:id", (req: Request, res: Response) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);

  if (user) {
    return res.send(user);
  } else {
    return res.status(404).send("User not found");
  }
});

app.get("/api/users", (req: Request, res: Response) => {
  console.log(req.query);
  const { filter, value } = req.query as { filter: string; value: string };
  // when filter and value are undefined it'll return all users if both are then it returns the filtered users and their values
  if (!filter && !value) {
    res.send(mockUsers).status(200);
  } else {
    res.send(
      mockUsers.filter((user) => {
        const filterType = filter as keyof typeof user;
        // if filter type is username then it'll return the filtered users and their values and if it's displayName then it'll return the filtered users and their displayNames and if it's a number then it'll return the filtered users and their ids
        if (
          filterType === "username" ||
          filterType === "displayName" ||
          filterType === "id"
        ) {
          return user[filterType].toString().includes(value);
        }
      })
    );
  }
});

// Creating a new user
app.post("/api/users", (req: Request, res: Response) => {
  const { username, displayName } = req.body;

  if (!username || !displayName) {
    return res.status(400).send("Username and DisplayName are required");
  }

  const newUser: User = {
    id: mockUsers.length + 1,
    username: username,
    displayName: displayName,
  };

  mockUsers.push(newUser);
  res.status(201).json(newUser);
});

// updating a user profile
app.put("/api/users/:id",resolveIndexByUserId, (req: Request, res: Response, next: NextFunction) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);
  if (!user) return res.status(404).send("User not found");
  if (req.body.username) {
    user.username = req.body.username;
  }
  if (req.body.displayName) {
    user.displayName = req.body.displayName;
  }
  res.status(200).json(user);
});

// updating a particular item in a user's profile

app.patch("/api/users/:id", (req: Request, res: Response) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);
  if (!user) return res.status(404).send("User not found");
  mockUsers[user.id] = { ...mockUsers[user.id], ...req.body };
  res.status(200).json(mockUsers[user.id]);
});

// deleting a user
app.delete("/api/users/:id", (req: Request, res: Response) => {
  const parseId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === parseId);
  if (!user) return res.status(404).send("User not found");
  mockUsers.splice(mockUsers.indexOf(user, 1));
  res.sendStatus(200);
});

// listening to the port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
