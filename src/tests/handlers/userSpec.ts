import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
import { userType } from "../../interfaces/users";

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as string;

describe("User Handler", () => {

  const userData: userType = {
    firstName: "hassan",
    lastName: "mohammed",
    password: "password123",
  };

  let token: string, userId: number = 1;

  it("should require authorization on every endpoint", (done) => {

    request.get("/users").then((res) => {

        expect(res.status).toBe(401);

        done();

    });

    request.get(`/users/${userId}`).then((res) => {

        expect(res.status).toBe(401);

        done();
    });

  });

  it("gets the Create endpoint", (done) => {

    request.post(`/users/create`).send(userData).then((res) => {

        const { body, status } = res;

        token = body;

        // @ts-ignore
        const {user} = jwt.verify(token, SECRET);

        userId = user.id;

        expect(status).toBe(200);

        expect(res.body).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);

        done();


    })

  })

  it("gets the index endpoint", async (done) => {

    request.get("/users").set("Authorization", "bearer " + token).then((res) => {

      expect(res.status).toBe(200);

      expect(res.body).toBeInstanceOf(Array);

      done();

    })

  })

});
