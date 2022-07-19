import { getRowsInUsers } from "../../models/users";
import { userType, userReturnType } from "../../interfaces/users";
import client from "../../database";
import bcrypt from 'bcrypt';
import { getRowsInProducts } from "../../models/products";
import { getRowsInOrders } from "../../models/orders";
import { productType } from "../../interfaces/products";

const userInstance = new getRowsInUsers();
const { PEPPER, SALT_ROUNDS } = process.env;

describe("User Model", () => {

    it("should have a Index method", () => {

        expect(userInstance.index).toBeDefined()

    });

    it("should have a Show method", () => {

        expect(userInstance.show).toBeDefined()

    });

    it('with an addProductToOrder method', () => {
        expect(userInstance.addProductToOrder).toBeDefined();
    });
    
    it('with a removeProductFromOrder method', () => {
        expect(userInstance.removeProductFromOrder).toBeDefined();
    });

    it("should have a create method", () => {

        expect(userInstance.create).toBeDefined()

    });

});

describe("User Model Methods", () => {

    beforeAll(async() => {

        const connection = await client.connect();
        const sql = "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3);"
        const hashedPassword = bcrypt.hashSync(
            "13579" + PEPPER,
            parseInt(SALT_ROUNDS as unknown as string)
        );
        connection.query(sql, ["ahmed", "saleh", hashedPassword]);
        connection.release();

    })

    it('index should return a list of all users', async () => {
        const result = await userInstance.index();
    
        expect(result.length).toBeGreaterThan(0);
    });

    it('create should add a user', async () => {
        const user = await userInstance.create({firstName: "ali", lastName: "azzam", password: "098765"});
        expect(user).toBeInstanceOf(Object);
    });

    it('show should return the user with the given id', async () => {
        const result = await userInstance.show(1);
    
        expect(result).toBeInstanceOf(Object);
    });

});

describe("User method to modify orders", () => {

    const productStore = new getRowsInProducts();
    const orderStore = new getRowsInOrders();
    const testUser : userType = {firstName: "mohammed", lastName: "amen", password: "1234"};
    const testProduct : productType = {name: "DELL", price: "2000", category: "Laptops"};

    it('addProductToOrder and removeProductToOrder Test', async () => {
        const user = await userInstance.create(testUser);
        const product = await productStore.create(testProduct);
        await orderStore.create(user.id);
        const result = await userInstance.addProductToOrder(user.id, product.id ,2);
        expect(result?.quantity).toEqual(2);
        const Result = await userInstance.removeProductFromOrder(user.id, product.id);
        expect(Result?.quantity).toEqual(2);
    });

});