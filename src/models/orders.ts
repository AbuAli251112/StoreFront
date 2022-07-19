import client from "../database";
import { orderType, orderReturnType } from "../interfaces/orders";

export class getRowsInOrders {

    async getActiveOrder(userId: number): Promise<orderReturnType> {
        try {
          const connection = await client.connect();
          const sql =
            "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'";
          const result = await connection.query(sql, [userId]);
          connection.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Cannot retrieve active order: ${err}`);
        }
      }

    async getCompleteOrders(userId: number): Promise<orderReturnType[]> {
        try {
          const connection = await client.connect();
          const sql =
            "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete'";
          const result = await connection.query(sql, [userId]);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(`Cannot retrieve complete order: ${err}`);
        }
      }

    async create(userId: number): Promise<orderReturnType> {
        try {
          const connection = await client.connect();
          const checkActiveQuery =
            "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active';";
          const checkActiveQueryRes = await connection.query(checkActiveQuery, [
            userId
          ]);
          if (checkActiveQueryRes.rows[0]) {
            connection.release();
            throw new Error('an active order for this user already exists');
          } else {
            const sql =
              'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;';
            const result = await connection.query(sql, [userId, 'active']);
            connection.release();
            return result.rows[0];
          }
        } catch (err) {
          throw new Error(`Cannot create order: ${err}`);
        }
      }

};