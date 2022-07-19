import { getRowsInProducts } from "../../models/products";
import { productType, productReturnType } from "../../interfaces/products";
import client from '../../database';

const productInstance = new getRowsInProducts();

describe("Product Model", () => {

    it("should have a Index method", () => {

        expect(productInstance.index).toBeDefined()

    });

    it("should have a Show method", () => {

        expect(productInstance.show).toBeDefined()

    });

    it("should have a create method", () => {

        expect(productInstance.create).toBeDefined()

    });

    describe("Product Model Method", () => {

        beforeAll(async () => {

            const connection = await client.connect();
            const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3);";
            connection.query(sql, ["samsung", "4000", "mobiles"]);
            connection.release();

        });

        it('index should return a list of all products', async () => {
            const result = await productInstance.index();
        
            expect(result).toBeInstanceOf(Array);
        });

        it('create should add a product', async () => {
            const result = await productInstance.create({
              name: 'notepad',
              price: "9",
              category: 'office'
            });
        
            expect(result.name).toEqual("notepad");
            expect(result.price).toEqual("9");
            expect(result.category).toEqual("office");
          });

          it('show should return the product with the given id', async () => {
            const result = await productInstance.show(3);
        
            expect(result).toEqual({
              id: 3,
              name: 'notepad',
              price: "9",
              category: 'office',
            });
          });

    });

});