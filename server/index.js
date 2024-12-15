import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
//Call DataaBase Connection
dotenv.config({});
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;
//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

//API's
app.use("/api/v1/user", userRoute);

app.get("/home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i am Coming from Backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
