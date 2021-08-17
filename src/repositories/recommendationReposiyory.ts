import connection from "../database"

export interface Song {
   id: number,
   name: string,
   youtubeLink: string,
   score: number
}

export async function addRecommendation(name: string, link: string) : Promise<Song>{
   const result = await connection.query(`INSERT INTO songs (name, "youtubeLink") VALUES ($1, $2) RETURNING *`, [name,link]);
   const song : Song = result.rows[0];
   return song;
}

export async function findSongById(id: number) : Promise<Song[]> {
   const result =  await connection.query(`SELECT * FROM songs WHERE id=$1`, [id]);
   const songs : Song[] = result.rows;
   return songs;
}

export async function vote(id: number, score:number): Promise<Song> {

   const result = await connection.query(`UPDATE songs SET score = $1 WHERE id= $2 RETURNING *`, [score, id]);
   const song : Song = result.rows[0];
   return song;
}

export async function exclude(id: number){

   await connection.query(`DELETE FROM songs WHERE id = $1`, [id]);
}

export async function anySongOrdered(): Promise<Song[]> {
   const result = await connection.query(`SELECT * FROM songs ORDER BY score DESC`);
   const songs : Song[] = result.rows;
   return songs;
}

export async function songsHighScore(): Promise<Song[]> {
   const result = await connection.query(`SELECT * FROM songs WHERE score > 10`);
   const songs : Song[] = result.rows;
   return songs;
}

export async function songsLowScore(): Promise<Song[]> {
   const result = await connection.query(`SELECT * FROM songs WHERE score <= 10`);
   const songs : Song[] = result.rows;
   return songs;
}