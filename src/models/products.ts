import client from "../database";
import { PoolClient, QueryResult  } from "pg";
import { productType, productReturnType } from "../interfaces/products";

export class getRowsInProducts {

    async index() : Promise<productReturnType[]> {

        try {

            const conn : PoolClient = await client.connect();
            const sql : string = "SELECT * FROM products;";
            const result : QueryResult = await conn.query(sql);
            conn.release();

            return result.rows;

        } catch (error) {

            throw new Error(`Can Not Get Products ${error}`);

        }

    }

    async show (id: number) : Promise<productReturnType> {

        try {

            const conn : PoolClient = await client.connect();
            const sql : string = "SELECT * FROM products WHERE id = ($1);";
            const result  :QueryResult = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];

        } catch (error) {

            throw new Error(`Cannot Find Product Where ${id} ${error}`);

        }

    }

    async create (p : productType) : Promise<productReturnType> {

        try {

            const conn  :PoolClient = await client.connect();
            const sql : string = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
            const result : QueryResult = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();

            return result.rows[0];

        } catch (error) {

            throw new Error(`Cannot Add New Product ${error}`);

        }

    }

};