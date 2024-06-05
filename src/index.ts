import 'dotenv/config'

import express, { NextFunction, Request, Response } from "express";
import corpusRouter from "./api/v1/corpus/route";
import usersRouter from "./api/v1/users/route";
import quizRouter from "./api/v1/quiz/route";
import newsRouter from "./api/v1/news/route";
import eventTypeRouter from "./api/v1/newsType/route"


const app = express();
const port = process.env.PORT || 3000;
const route = "api/v1";

app.use(express.json());

app.get(`/${route}/health`, (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

// app.use(decodeToken);

app.use(`/${route}/corpus`, corpusRouter);

app.use(`/${route}/users`, usersRouter);

app.use(`/${route}/quiz`, quizRouter);

app.use(`/${route}/news`, newsRouter);

app.use(`/${route}/news-type`, eventTypeRouter);

app.use(`/${route}/challenge`, eventTypeRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
