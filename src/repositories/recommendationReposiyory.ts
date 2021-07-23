import connection from "../database"

export async function addRecommendation(name: string, link: string){
   return await connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ($1, $2) RETURNING *`, [name,link]);
}

export async function findSongById(id: number){
   const result =  await connection.query(`SELECT * FROM songs WHERE id=$1`, [id]);
   return result.rows;
}

export async function vote(id: number, score:number){

   const result = await connection.query(`UPDATE songs SET score = $1 WHERE id= $2 RETURNING *`, [score, id]);
   return result.rows[0];
}

export async function exclude(id: number){

   await connection.query(`DELETE FROM songs WHERE id = $1`, [id]);
}

export async function anySongOrdered(){
   const result = await connection.query(`SELECT * FROM songs ORDER BY score DESC`);
   return result.rows;
}

export async function songsHighScore(){
   const result = await connection.query(`SELECT * FROM songs WHERE score > 10`);
   return result.rows;
}

export async function songsLowScore(){
   const result = await connection.query(`SELECT * FROM songs WHERE score <= 10`);
   return result.rows;
}