import client from "../database";
import { userType, userReturnType } from "../interfaces/users";
import bcrypt from "bcrypt";
import { orderReturnDetails } from "../interfaces/order_details";

export class getRowsInUsers {

    async index() : Promise<userReturnType[]> {

        try {

            const conn = await client.connect();
            const sql = "SELECT * FROM users;"
            const result = await conn.query(sql);
            conn.release();

            return result.rows;

        } catch (error) {

            throw new Error(`Can Not Get users ${error}`);

        }

    }

    async show (id: number) : Promise<userReturnType> {

        try {

            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE id = ($1);";
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];

        } catch (error) {

            throw new Error(`Cannot Find user Where ${id} ${error}`);

        }

    }

    async create (u : userType) : Promise<userReturnType> {

        try {

            const pepper : string = process.env.BCRYPT_PASSWORD as string;
            const salt : string = process.env.SALT_ROUNDS as string;
            const conn = await client.connect();
            const sql = "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;";
            const hashPassword = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt)
            );
            const result = await conn.query(sql, [u.firstName, u.lastName, hashPassword]);
            conn.release();

            return result.rows[0];

        } catch (error) {

            throw new Error(`Cannot Add New user ${error}`);

        }

    }

    async addProductToOrder(
        userId: number,
        productId: number,
        quantityInput: number
      ): Promise<orderReturnDetails | undefined> {
        try {
          const connection = await client.connect();
          const orderQuery =
            "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active';";
          const orderResult = await connection.query(orderQuery, [userId]);
          const orderId: number = orderResult.rows[0].id;
          if (orderId) {
            const addProductQuery =
              'INSERT INTO order_products (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING *;';
            const result = await connection.query(addProductQuery, [
              productId,
              quantityInput,
              orderId
            ]);
            connection.release();
            return result.rows[0];
          } else {
            connection.release();
            console.error(`There are no active orders for user ${userId}`);
          }
        } catch (err) {
          throw new Error(`Cannot add product ${productId} to order: ${err}`);
        }
      }

      async removeProductFromOrder(
        userId: number,
        productId: number
      ): Promise<orderReturnDetails | undefined> {
        try {
          const connection = await client.connect();
          const orderQuery =
            "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active';";
          const orderResult = await connection.query(orderQuery, [userId]);
          const orderId: number = orderResult.rows[0].id;
          if (orderId) {
            const sql =
              'DELETE FROM order_products WHERE order_id = ($1) AND product_id = ($2) RETURNING *;';
            const result = await connection.query(sql, [orderId, productId]);
            connection.release();
            return result.rows[0];
          } else {
            connection.release();
            console.error(`There are no active orders for user ${userId}`);
          }
        } catch (err) {
          throw new Error(
            `Could not delete product ${productId} from order: ${err}`
          );
        }
      }

};