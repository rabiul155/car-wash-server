import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

//Testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

//Not found route handle
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
