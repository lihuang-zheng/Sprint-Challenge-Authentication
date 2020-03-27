const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Rest DB", () => {
  describe("Post /register", () => {
    it("Should return 201", async done => {
      await db("users").truncate();

      request(server)
        .post("/api/auth/register")
        .send({ username: "Aaron", password: "pass" })
        .expect(201, done);
    });
    it("Should return json", () => {
      request(server)
        .post("/api/auth/register")
        .send({ username: "Aaron", password: "pass" })
        .expect("Content-Type", /json/);
    });
  });

  describe("Post /login", () => {
    it("Should return 200", async done => {
      request(server)
        .post("/api/auth/login")
        .send({ username: "Aaron", password: "pass" })
        .expect(200, done);
    });
    it("Should return json", () => {
      request(server)
        .post("/api/auth/login")
        .send({ username: "Aaron", password: "pass" })
        .expect("Content-Type", /json/);
    });
  });

  let token;

  beforeAll(done => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "Aaron", password: "pass" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe("Get /", () => {
    it("Should return 401 with no auth", done => {
      request(server)
        .get("/api/auth")
        .expect(401, done);
    });
    it("Should return 200 with auth", done => {
      console.log(token);
      request(server)
        .get("/api/auth")
        .set("authorization", token)
        .expect(200, done);
    });
  });
});
