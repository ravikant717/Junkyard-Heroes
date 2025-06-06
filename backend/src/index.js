import express from "express"; //make type: module in package json
import dotenv from "dotenv"; //to use environment variables
dotenv.config(); //load environment variables from .env file
import { connectDB } from "./lib/db.js";
//express gives tools to create api
const app = express();
import authRoutes from "./routes/auth.route.js"; //importing auth route
import customerRoutes from "./routes/customer.route.js"; //importing customer route
import cors from "cors"; //to allow cross-origin requests
import cookieParser from "cookie-parser"; //to parse cookies in request

const PORT = process.env.PORT;
app.use(cookieParser()); //to parse cookies in request

app.use(express.json()); //to parse json data from request body

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], //Allowed methods
    credentials: true, //Allow cookies to be sent with requests
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes); //customer routes



app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});
