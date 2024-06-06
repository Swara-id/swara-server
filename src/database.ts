import { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: process.env.CONNECTION_STRING,
		max: 10,
	}),
});
export const db = new Kysely<Database>({
	dialect,
});
