import supertest from "supertest";
import jwt from "jsonwebtoken";

import app from "../../server";
import { productType } from "../../interfaces/products";
import { userType } from "../../interfaces/users";

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as string;

describe("Product Handler", () => {

  const product: productType = {
    name: "Iphone",
    price: "2000",
    category: "Smart Mobiles",
  };

  let token: string, userId: number, productId: number;

  beforeAll(async () => {

    const userData: userType = {
      firstName: "hassan",
      lastName: "mohammed",
      password: "password123",
    };

    const { body } = await request.post("/users/create").send(userData);

    token = body;

    // @ts-ignore

    const { user } = jwt.verify(token, SECRET);

    userId = user.id;

  });

  afterAll(async () => {

    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token);

  });

  it("Gets The Create Endpoint", (done) => {

    request.post("/products/create").send(product).set("Authorization", "bearer " + token).then((res) => {

        const { body, status } = res;

        expect(status).toBe(200);

        productId = body.id;

        done();

      });

  });

  it("gets the index endpoint", (done) => {

    request.get("/products").then((res) => {

      expect(res.status).toBe(200);

      done();

    });

  });

  it("gets the read endpoint", (done) => {

    request.get(`/products/${productId}`).then((res) => {

      expect(res.status).toBe(200)

      done()

    })

  })

  it("gets the read endpoint Response", async (done) => {

    request.get(`/products/${productId}`).then((res) => {

      expect(res.body).toEqual({id: productId, name: "Iphone", price: "2000", category: "Smart Mobiles"})

      done()

    })

  })

});