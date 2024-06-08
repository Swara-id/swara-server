import "dotenv/config";
import "@config/firebase-config";

import express, { Request, Response, urlencoded } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import corpusRouter from "@api/corpus/route";
import usersRouter from "@api/users/route";
import quizRouter from "@api/quiz/route";
import newsRouter from "@api/news/route";
import suggestionRouter from "@api/suggestion/route";
import eventTypeRouter from "@api/newsType/route";
import challengeTypeRouter from "@api/Challenge/route";
import authRouter from "@api/auth/route";

const app = express();
const port = process.env.PORT || 3000;
const route = "api/v1";

app.use(
  urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

app.use(
  "/docs",
  swaggerUi.serve,
  async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  }
);

app.get(`/${route}/health`, (_req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use(`/${route}/corpus`, corpusRouter);

app.use(`/${route}/users`, usersRouter);

app.use(`/${route}/quiz`, quizRouter);

app.use(`/${route}/news`, newsRouter);

app.use(`/${route}/news-type`, eventTypeRouter);

app.use(`/${route}/challenge`, challengeTypeRouter);

app.use(`/${route}/suggestion`, suggestionRouter);

app.use(`/${route}/auth`, authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
