import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
    DATABASE_HOST,
    DATABASE_DEV,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_TEST,
    ENV,
} = process.env;

let client = new Pool();

if (ENV === "dev") {

    client = new Pool({
        host: DATABASE_HOST,
        database: DATABASE_DEV,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
    });

} else if (ENV === "test") {

    client = new Pool({
        host: DATABASE_HOST,
        database: DATABASE_TEST,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
    });

}

export default client;