

// // Creating a new user
// app.post("/api/users", (req: Request, res: Response) => {
//   const { username, displayName } = req.body;

//   if (!username || !displayName) {
//     return res.status(400).send("Username and DisplayName are required");
//   }

//   const newUser: User = {
//     id: mockUsers.length + 1,
//     username: username,
//     displayName: displayName,
//   };

//   mockUsers.push(newUser);
//   res.status(201).json(newUser);
// });

// // updating a user profile
// app.put("/api/users/:id",resolveIndexByUserId, (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json(req.user);
// });

// // updating a particular item in a user's profile

// app.patch("/api/users/:id", (req: Request, res: Response) => {
//   const parseId = parseInt(req.params.id);
//   const user = mockUsers.find((user) => user.id === parseId);
//   if (!user) return res.status(404).send("User not found");
//   mockUsers[user.id] = { ...mockUsers[user.id], ...req.body };
//   res.status(200).json(mockUsers[user.id]);
// });

// // deleting a user
// app.delete("/api/users/:id", (req: Request, res: Response) => {
//   const parseId = parseInt(req.params.id);
//   const user = mockUsers.find((user) => user.id === parseId);
//   if (!user) return res.status(404).send("User not found");
//   mockUsers.splice(mockUsers.indexOf(user, 1));
//   res.sendStatus(200);
// });

// // listening to the port 3000
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



import express from "express";
import { error } from "./middleware/error";
import loggerWare from "./middleware/loggerWare";
import { router } from "./routes/userRoutes";

const app = express();
app.use(express.json());

// Setting up a logger
app.use(loggerWare);


// Creating a port 
const port = process.env.PORT || 3000;

//setting up the routes
app.use(router);


app.use(error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});