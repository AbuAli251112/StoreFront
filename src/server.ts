import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import productRouter from './handlers/products';
import userRouter from './handlers/users';
import orderRouter from './handlers/orders';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";
const port : number = 3000;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

productRouter(app);
userRouter(app);
orderRouter(app);

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
});

export default app;