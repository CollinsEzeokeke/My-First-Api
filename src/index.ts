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