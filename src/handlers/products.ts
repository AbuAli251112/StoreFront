import express, { Application } from "express";
import { getRowsInProducts } from "../models/products";
import { productType , productReturnType } from "../interfaces/products";
import { verifyAuthToken } from "../utils/auth";

const p = new getRowsInProducts();

const index = async (req : express.Request, res : express.Response) => {

    try {

        const products : productReturnType[] = await p.index();
        res.json(products);

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
            return false
        }
        const product = await p.show(id);
        res.json(product);

    } catch (err) {

        res.status(400);
        res.json(err);

    }

}

const create = async (req : express.Request, res : express.Response) => {

    try {

        const productInfo : productType = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };

        if (productInfo.name === undefined || productInfo.price === undefined) {
            res.status(400);
            res.send(`Some required parameters are missing! eg. :name, :price`);
            return false;
        }

        const newProduct = await p.create(productInfo);
        res.json(newProduct);

    } catch (err) {

        res.status(400);
        res.json(err);

    }

}

const productRouter = (app: express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products/create', verifyAuthToken,create);
};

export default productRouter;
