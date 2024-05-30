import express, { Request, Response } from "express";
import corpusRouter from "./api/v1/corpus/route";
import usersRouter from "./api/v1/users/route";
//import eventRouter from "./api/v1/event/route";
import quizRouter from "./api/v1/quiz/route";

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/v1/health", (req: Request, res: Response) => {
	res.send("Hello, TypeScript Express!");
});

app.use(express.json());

app.use("/api/v1/corpus", corpusRouter);

app.use("/api/v1/users", usersRouter);

//app.use("/api/v1/event", eventRouter);

app.use("/api/v1/quiz", quizRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});