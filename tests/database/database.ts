import connection from "../../src/database";

export async function cleanDatabaseRec(){
    await connection.query('TRUNCATE songs RESTART IDENTITY');
}

export async function cleanDatabaseGenres(){
    await connection.query('TRUNCATE genres RESTART IDENTITY');
}

export async function endDBConnection(){
    await connection.end();
}