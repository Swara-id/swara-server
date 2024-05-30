import express, { Request, Response } from "express";
import corpusRouter from "./api/v1/corpus/route";
import usersRouter from "./api/v1/users/route";
import quizRouter from "./api/v1/quiz/route";

const app = express();
const port = process.env.PORT || 3000;
const route = "api/v1";

app.get(`/${route}/health`, (res: Response) => {
	res.send("Hello, TypeScript Express!");
});

app.use(express.json());

app.use(`/${route}/corpus`, corpusRouter);

app.use(`/${route}/users`, usersRouter);

app.use(`/${route}/users`, usersRouter);

app.use(`/${route}/quiz`, quizRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
