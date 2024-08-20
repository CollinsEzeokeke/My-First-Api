import express from "express";
import { error } from "./middleware/primaryMiddleWare/error";
import loggerWare from "./middleware/primaryMiddleWare/loggerWare";
import alphaRoute from "./routes/Alpha/indexrouter";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./data/Users/mockUsers";

const app = express();

app.use(express.json());
app.use(cookieParser("secret"));
// Setting up a logger
app.use(loggerWare);
// Setting up a session
app.use(session({
  secret: "secret",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 60000 * 360 * 3 }
}))
// setting the app to use the routes from the Alpha route folder
app.use(alphaRoute)
// setting up the error middleware
app.use(error);



// Creating a port 
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", ( req, res ) => {
  console.log(req.session)
  console.log(req.session.id)
  req.session.visited = true;
  res.cookie("hello", "world" , { maxAge: 60000 * 360 * 3 , signed: true });
  res.send({msg: "I am a cookie and I was recently logged"})
})
