
import connection from '../database';

interface Genre {
    id: number,
    name: string
}

export async function getGenres(){
    const result = await connection.query(`SELECT * FROM genres`);
    const genres : Genre[] = result.rows;
    return genres;
}

export async function addGenre(name : string){
    const result = await connection.query(`INSERT INTO genres (name) VALUES ($1) RETURNING *`, [name]);
    const genre : Genre[] = result.rows[0];
    return genre;
}

export async function getGenreByName (name:string){
    const result = await connection.query(`SELECT * FROM genres WHERE name = $1`, [name]);
    const genres : Genre[] = result.rows;
    return genres;
}