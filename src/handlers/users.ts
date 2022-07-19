import express from "express";
import { getRowsInUsers } from "../models/users";
import { userType , userReturnType } from "../interfaces/users";
import { verifyAuthToken } from "../utils/auth";
import { getTokenByUser } from "../utils/createToken";

const u = new getRowsInUsers();

const index = async (req : express.Request, res : express.Response) => {

    try {

        const users : userReturnType[] = await u.index();
        res.json(users);

    } catch (err) {

        res.status(400);
        res.json(err);

    }

}

const show = async (req : express.Request, res : express.Response) => {

    try {

        const id = req.params.id as unknown as number;
        if (id === undefined) {
            res.status(400);
            res.send(`Missing required parameter :id.`);
            return false;
        }
        const user = await u.show(id);
        res.json(user);

    } catch (err) {

        res.status(400);
        res.json(err);

    }

}

const create = async (req : express.Request, res : express.Response) => {

    try {

        const userInfo : userType = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };

        if (userInfo.firstName === undefined || userInfo.lastName === undefined || userInfo.password === undefined) {
            res.status(400);
            res.send(`Some required parameters are missing! eg. :firsname, :lastname, :password`);
            return false;
        }

        const newUser = await u.create(userInfo);
        res.json(getTokenByUser(newUser));

    } catch (err) {

        res.status(400);
        res.json(err);

    }

}

const addProduct = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.id);
      const { productId, quantity } = req.body;
      const orderDetails = await u.addProductToOrder(
        userId,
        productId,
        quantity
      );
      res.json(orderDetails);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  };
  
  const removeProduct = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.id);
      const productId = req.body.productId;
      const orderDetails = await u.removeProductFromOrder(userId, productId);
      res.json(orderDetails);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  };

const userRouter = (app: express.Application): void => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users/create', create);
    app.post('/users/:id/add-product-to-order', verifyAuthToken, addProduct);
    app.delete('/users/:id/remove-product-from-order', verifyAuthToken,removeProduct);
};

export default userRouter;