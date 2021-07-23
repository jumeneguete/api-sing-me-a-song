import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database"

beforeEach(async () => {
  await connection.query('TRUNCATE songs RESTART IDENTITY');
});

afterAll(async () => {
  await connection.end();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should return status 201 when receive a valid body", async () => {
    const body = {
      name: "Valid String 01",
      youtubeLink: "https://www.youtube.com/watch?v=eitDnP0_83k&list=RDu04baUNhhy0&index=4"
    }

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(201);
  });

  it("should return status 400 when receive an invalid body", async () => {
    const body = {};

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 406 when name is not a string", async () => {
    const body = {
      name: 1234,
      youtubeLink: "https://www.youtube.com/watch?v=eitDnP0_83k&list=RDu04baUNhhy0&index=4"
    }

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(406);
  });

  it("should return status 406 when youtubeLink is not a link from youtube", async () => {
    const body = {
      name: "Valid String 01",
      youtubeLink: "https://www.globo.com"
    }

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(406);
  });
});

describe("POST /recommendations/:id/upvote", () => {

  it("should return status 200 when receive a valid param", async () => {
    const body = {}
    const result = await connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste') RETURNING *`);
    const param = result.rows[0].id;
    
    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(200);
  });

  it("should return status 400 when receive an invalid param", async () => {
    const body = {}
    connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste')`);
    const param = "string"

    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 404 when param does not correspond a database id", async () => {
    const body = {}
    connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste')`);
    const param = 123456789

    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(404);
  });

});

describe("POST /recommendations/:id/downvote", () => {

  it("should return status 200 when receive a valid param", async () => {
    const body = {}
    const result = await connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste') RETURNING *`);
    const param = result.rows[0].id;
    
    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(200);
  });

  it("should return status 400 when receive an invalid param", async () => {
    const body = {}
    connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste')`);
    const param = "string"

    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 410 when score reaches value equal or lower then -5", async () => {
    const body = {}
    const result = await connection.query(`INSERT INTO songs (name, "youtubeLink", score) VALUES ('teste', 'teste', -4) RETURNING *`);
    const id = result.rows[0].id;
    await connection.query(`UPDATE songs SET score = -5 WHERE id= ${id}`)
    
    const response = await agent.post(`/recommendations/${id}/downvote`).send(body);

    expect(response.status).toBe(410);
  });

  it("should return status 404 when param does not correspond a database id", async () => {
    const body = {}
    connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ('teste', 'teste')`);
    const param = 123456789

    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(404);
  });

});

