import express, { Request, Response } from "express";
import kamusRouter from "./api/v1/corpus/route";
import usersRouter from "./api/v1/users/route";

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/v1/health", (req: Request, res: Response) => {
	res.send("Hello, TypeScript Express!");
});

app.use("/api/v1/kamus", kamusRouter);

app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
