import express from "express";
import { error } from "./middleware/primaryMiddleWare/error";
import loggerWare from "./middleware/primaryMiddleWare/loggerWare";
import alphaRoute from "./routes/Alpha/indexrouter"

const app = express();
app.use(express.json());

// Setting up a logger
app.use(loggerWare);

// Creating a port 
const port = process.env.PORT || 3000;

// setting the app to use the routes from the Alpha route folder
app.use(alphaRoute)


app.use(error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});