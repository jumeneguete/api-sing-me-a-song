import connection from "../../src/database";

export async function insertGenre(body: {name: string}){
    await connection.query(`INSERT INTO genres (name) VALUES ($1)`, [body.name]);
}