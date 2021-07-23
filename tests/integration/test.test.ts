import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import { cleanDatabase, endDBConnection } from "../database/database";
import { insertRecommendation, insertScore } from "../factories/insertSong";
import { updateRecommendation } from "../factories/updateSong";
import faker from "faker/locale/pt_BR"

beforeEach(cleanDatabase);
afterAll(endDBConnection);
const agent = supertest(app);

describe("POST /recommendations", () => {

  function generateBody (name: any, youtubeLink: string){
    return  { name, youtubeLink }
  }

  it("should return status 201 when receive a valid body", async () => {
    const name = faker.lorem.words();
    const link = "https://www.youtube.com/watch?v=eitDnP0_83k&list=RDu04baUNhhy0&index=4";
    const body = generateBody(name, link);

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(201);
  });

  it("should return status 400 when receive an invalid body", async () => {
    const body = {};

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 406 when name is not a string", async () => {
    const name = 1234
    const link = "https://www.youtube.com/watch?v=eitDnP0_83k&list=RDu04baUNhhy0&index=4";
    const body = generateBody(name, link);

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(406);
  });

  it("should return status 406 when youtubeLink is not a link from youtube", async () => {
    const name = faker.lorem.words();
    const link = "https://www.globo.com";
    const body = generateBody(name, link);

    const response = await agent.post("/recommendations").send(body);

    expect(response.status).toBe(406);
  });
});



describe("POST /recommendations/:id/upvote", () => {

  it("should return status 200 when receive a valid param", async () => {
    const body = {}
    const result = await insertRecommendation();
    const param = result.rows[0].id;
    
    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(200);
  });

  it("should return status 400 when receive an invalid param", async () => {
    const body = {}
    await insertRecommendation();
    const param = "string"

    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 404 when param does not correspond a database id", async () => {
    const body = {}
    await insertRecommendation();
    const param = 123456789

    const response = await agent.post(`/recommendations/${param}/upvote`).send(body);

    expect(response.status).toBe(404);
  });
});



describe("POST /recommendations/:id/downvote", () => {

  it("should return status 200 when receive a valid param", async () => {
    const body = {}
    const result =  await insertRecommendation();
    const param = result.rows[0].id;
    
    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(200);
  });

  it("should return status 400 when receive an invalid param", async () => {
    const body = {}
    await insertRecommendation();
    const param = "string"

    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(400);
  });

  it("should return status 410 when score reaches value equal or lower then -5", async () => {
    const body = {}
    const result = await insertScore(-4);
    const id = result.rows[0].id;
    await updateRecommendation(id);
    
    const response = await agent.post(`/recommendations/${id}/downvote`).send(body);

    expect(response.status).toBe(410);
  });

  it("should return status 404 when param does not correspond a database id", async () => {
    const body = {}
    await insertRecommendation();
    const param = 123456789

    const response = await agent.post(`/recommendations/${param}/downvote`).send(body);

    expect(response.status).toBe(404);
  });

});



describe("GET /recommendations/random", () => {

  it("should return status 200 when get a random  high scored or low scored song from database", async () => {
    await insertScore(2);
    await insertScore(20);

    const response = await agent.get(`/recommendations/random`);

    expect(response.status).toBe(200);
  });

  it("should return status 200 when get a random  song of all songs from database with only high scored songs", async () => {
    await insertScore(11);
    await insertScore(20);

    const response = await agent.get(`/recommendations/random`);

    expect(response.status).toBe(200);
  });

  it("should return status 200 when get a random  song of all songs from database with only low scored songs", async () => {
    await insertScore(-2);
    await insertScore(10);

    const response = await agent.get(`/recommendations/random`);

    expect(response.status).toBe(200);
  });

  it("should return status 404 when database is empty", async () => {

    const response = await agent.get(`/recommendations/random`);

    expect(response.status).toBe(404);
  });

});




describe("GET /recommendations/top/:amount", () => {

  it("should return status 200 when get a valid param", async () => {
    await insertScore(2);
    await insertScore(12);
    await insertScore(20);

    const response = await agent.get(`/recommendations/top/2`);

    expect(response.status).toBe(200);
  });

  it("should return status 200 for nagtive param", async () => {
    await insertScore(2);
    await insertScore(12);
    await insertScore(20);
    
    const param = -2;

    const response = await agent.get(`/recommendations/top/${param}`);

    expect(response.status).toBe(200);
  });

  it("should return status 400 for invalid param", async () => {
    const param = "string"

    const response = await agent.get(`/recommendations/top/${param}`);

    expect(response.status).toBe(400);
  });


  it("should return status 404 when database is empty", async () => {
    const response = await agent.get(`/recommendations/top/2`);

    expect(response.status).toBe(404);
  });

});


