import express from "express";
import cors from "cors";
import * as recommendationController from "./controllers/recommendationController";
import * as genresController from './controllers/genresController';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationController.create);
app.post("/recommendations/:id/upvote", recommendationController.upvote);
app.post("/recommendations/:id/downvote", recommendationController.downvote);
app.get("/recommendations/random", recommendationController.getSong);
app.get("/recommendations/top/:amount", recommendationController.getTopSongs);
app.post("/genres", genresController.addGenre);

export default app;
