import express from "express";
import { getRowsInOrders } from "../models/orders";
import { orderType , orderReturnType } from "../interfaces/orders";
import { verifyAuthToken } from "../utils/auth";

const o = new getRowsInOrders();

const create = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.body.userId;
      const order = await o.create(userId);
      res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  };
  
  const active = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const order = await o.getActiveOrder(userId);
      res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  };
  
  const completed = async (req: express.Request, res: express.Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const order = await o.getCompleteOrders(userId);
      res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
  };

const orderRouter = (app: express.Application): void => {
    app.post('/orders/create', verifyAuthToken, create);
    app.get('/orders/:userId/active', verifyAuthToken, active);
    app.get('/orders/:userId/completed', verifyAuthToken, completed);
};

export default orderRouter;