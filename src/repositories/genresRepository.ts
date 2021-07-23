import connection from '../database';

export async function getGenres(){
    const result = await connection.query(`SELECT * FROM genres`)
    return result.rows;
}

export async function addGenre(name : string){
    const result = await connection.query(`INSERT INTO genres (name) VALUES ($1) RETURNING *`, [name]);
    return result.rows[0];
}

export async function getGenreByName (name:string){
    const result = await connection.query(`SELECT * FROM genres WHERE name = $1`, [name]);
    return result.rows;
}