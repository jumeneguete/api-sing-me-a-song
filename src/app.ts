import express from "express";
import cors from "cors";
import * as recommendationController from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationController.create);
app.post("/recommendations/:id/upvote", recommendationController.upvote);

export default app;
