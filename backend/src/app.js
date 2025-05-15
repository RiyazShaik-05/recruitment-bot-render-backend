import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import sessionRouter from "./routes/session.route.js"


const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "https://recruitment-bot-rho.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());



app.get("/", (req,res) => {
    res.send("Hii");
})



app.use("/api/auth",authRouter);
app.use("/api/chat",chatRouter);
app.use("/api/session",sessionRouter);


export default app;