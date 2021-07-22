import connection from "../database"

export async function addRecommendation(name: string, link: string){
   return await connection.query(`INSERT INTO songs (name, "youtubeLink") values ($1, $2) RETURNING *`, [name,link]);
}