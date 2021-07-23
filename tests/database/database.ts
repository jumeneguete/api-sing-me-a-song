import connection from "../../src/database";

export async function cleanDatabase(){
    await connection.query('TRUNCATE songs RESTART IDENTITY');
}

export async function endDBConnection(){
    await connection.end();
}