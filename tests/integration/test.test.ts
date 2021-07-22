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

  it("should return status 400 when receive a invalid body", async () => {
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
