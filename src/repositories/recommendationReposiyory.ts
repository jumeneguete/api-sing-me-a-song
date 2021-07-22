import connection from "../database"

export async function addRecommendation(name: string, link: string){
   return await connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ($1, $2) RETURNING *`, [name,link]);
}

export async function findSong(id: number){
   return await connection.query(`SELECT * FROM songs WHERE id=$1`, [id]);
}

export async function addVote(id: number, score:number){

   await connection.query(`UPDATE songs SET score = $1 WHERE id= $2`, [score, id]);

}