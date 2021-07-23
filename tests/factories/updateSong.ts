import connection from "../../src/database";

export async function updateRecommendation(id: number){
    return  await connection.query(`UPDATE songs SET score = -5 WHERE id= ${id}`);
}