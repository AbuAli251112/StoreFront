import supertest from "supertest";
import { userType } from "../../interfaces/users";
import jwt from "jsonwebtoken";

import app from "../../server";

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as string;

describe("Order Handler", () => {

  it("should require authorization on every endpoint", (done) => {

    request.post("/odrers/create").send("1").then((res) => {

        expect(res.status).toThrowError;

        done();

    });

    request.get(`/odrers/1/active`).then((res) => {

      expect(res.status).toThrowError;

      done();

    });

    request.get(`/odrers/1/complete`).then((res) => {

      expect(res.status).toThrowError;

      done();

    });


  });

  it("Test Create End Point", async () => {

    const userData: userType = {
      firstName: "hassan",
      lastName: "mohammed",
      password: "password123",
    };

    const { body } = await request.post("/users/create").send(userData);

    const token = body;

    // @ts-ignore

    const { user } = jwt.verify(token, SECRET);

    const userId = user.id as number ;

    await request.post("/orders/create").send({userId: userId}).set("Authorization", "bearer " + token).then((res) => {

      const { status } = res;

      expect(status).toBe(200);

    });

  });

  it("Test Active End Point", async () => {

    const userData: userType = {
      firstName: "ali",
      lastName: "maher",
      password: "12345",
    };

    const { body } = await request.post("/users/create").send(userData);

    const token = body;

    // @ts-ignore

    const { user } = jwt.verify(token, SECRET);

    const userId : number = user.id;

    await request.get(`/orders/${userId}/active`).set("Authorization", "bearer " + token).then((res) => {

      const { status } = res;

      expect(status).toBe(200);

    });

  });

  it("Test Complete End Point", async () => {

    const userData: userType = {
      firstName: "ali",
      lastName: "maher",
      password: "12345",
    };

    const { body } = await request.post("/users/create").send(userData);

    const token = body;

    // @ts-ignore

    const { user } = jwt.verify(token, SECRET);

    const userId : number = user.id;

    await request.get(`/orders/${userId}/completed`).set("Authorization", "bearer " + token).then((res) => {

      const { status } = res;

      expect(status).toBe(200);

    });

  });




});