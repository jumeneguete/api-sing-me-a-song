import connection from "../../src/database";
import faker from "faker/locale/pt_BR";

export async function insertRecommendation(){
    return await connection.query(`
    INSERT INTO songs (name, "youtubeLink") 
    VALUES ($1, $2) RETURNING *`,
    [faker.lorem.words, faker.internet.url]);
}

export async function insertScore(score:number){
    return await connection.query(`
    INSERT INTO songs (name, "youtubeLink", score) 
    VALUES ($1, $2, $3) RETURNING *`,
    [faker.lorem.words, faker.internet.url, score]);
}

