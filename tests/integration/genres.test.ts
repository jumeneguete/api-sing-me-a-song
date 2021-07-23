import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import { cleanDatabaseGenres, endDBConnection } from "../database/database";
import { insertGenre } from "../factories/insertGenres.";
import faker from 'faker/locale/pt_BR';
import connection from "../../src/database";

beforeEach(cleanDatabaseGenres);
afterAll(endDBConnection);
const agent = supertest(app);

describe ("POST /genres", () => {
    it("should return status 201 when receive a valid body", async () => {
        const body = { name: faker.lorem.words()};

        const response = await agent.post("/genres").send(body);

        expect(response.status).toBe(201);
    });

    it("should return status 400 when receive an empty body", async () => {
        const body = {}

        const response = await agent.post("/genres").send(body);

        expect(response.status).toBe(400);
    });

    it("should return status 400 when receive an invalid body", async () => {
        const body = "string";

        const response = await agent.post("/genres").send(body);

        expect(response.status).toBe(400);
    });

    it("should return status 409 when a genre has already exists in the database", async () => {
        const body = {name : faker.lorem.words()}
        await insertGenre(body);

        const response = await agent.post("/genres").send(body);

        expect(response.status).toBe(409);
    });

});