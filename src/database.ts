import { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: "postgres://postgres:postgres@postgres:5432/swara_db",
		max: 10,
	}),
});
export const db = new Kysely<Database>({
	dialect,
});
