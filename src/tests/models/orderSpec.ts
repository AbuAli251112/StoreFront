import { getRowsInOrders } from "../../models/orders";
import { getRowsInUsers } from "../../models/users";
import { userType, userReturnType } from "../../interfaces/users";
import client from "../../database";

const orderInstance = new getRowsInOrders();
const userInstance = new getRowsInUsers();

describe('Order model', () => {
  it('has a create method', () => {
    expect(orderInstance.create).toBeDefined();
  });

  it('has a getActiveOrder method', () => {
    expect(orderInstance.getActiveOrder).toBeDefined();
  });

  it('has a getCompletedOrders method', () => {
    expect(orderInstance.getCompleteOrders).toBeDefined();
  });
});

describe('Order model method', () => {

    it('create and getActiveOrder and getcompleteOrder', async () => {
      const user: userReturnType = await userInstance.create({
        firstName: "hassan",
        lastName: "mohammed",
        password: "password123"
      });

      const result = await orderInstance.create(user.id);

      expect(result.user_id).toEqual(user.id);

      const res = await orderInstance.getActiveOrder(user.id);
      expect(res.status).toEqual("active");

      const Res = await orderInstance.getCompleteOrders(user.id);
      expect(Res).toBeInstanceOf(Array);

    });

  it('create should throw an error if an active order already exist with the same user id', async () => {
    let error;
    try {
      await orderInstance.create(1);
    } catch (err) {
      error = err;
    }

    expect(error).toThrowError;
  });

});