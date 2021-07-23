import * as recommendationRepository from "../repositories/recommendationReposiyory";

export async function create(name: string , link: string){
    const validLink = isYoutubeVideo(link);
    const validName = typeof(name);

    if (validName !== "string" || validLink === false) return false;

    await recommendationRepository.addRecommendation(name, link);
};

export async function upvote(id: number){

    const register = await recommendationRepository.findSong(id);
    if(register.length === 0) return false;

    const score: number = register[0].score + 1;
    await recommendationRepository.addVote(id, score);
};

export async function downvote(id: number){

    const register = await recommendationRepository.findSong(id);
    if(register.length === 0) return false;

    const score: number = register[0].score - 1;
    const newRegister = await recommendationRepository.addVote(id, score);

    if (newRegister.score <= (-5)){
        await recommendationRepository.exclude(id);
        return "excluded";
    }
};

export async function getSong(){
    const highScore = await recommendationRepository.songsHighScore();
    const lowScore = await recommendationRepository.songsLowScore();
    const allSongs = await recommendationRepository.anySongOrdered();
    const percentage = Math.random();

 if (allSongs.length === 0){
     return null;
 } else if (!highScore || !lowScore){
        const random = randomNumber(allSongs);
        return allSongs[random];
    } else if (percentage <= 0.7){
        const random = randomNumber(highScore);
        return highScore[random];
    } else if (percentage > 0.7){
        const random = randomNumber(lowScore);
        return lowScore[random];
    }
};

export async function topSongs(amount:number){
    const songs = await recommendationRepository.anySongOrdered();
    const result: any[] = [];

    if(songs.length===0) return null;

    const length = songs.length-1;
    const repetition = amount > length ? length : amount;

    for(let i =0; i< repetition; i++){
        result.push(songs[i]);
    }

    return result;  
};

function isYoutubeVideo(url: string) {
  var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(v)) ? RegExp.$1 : false;
}

function randomNumber(array: any[]){
        const quantity: number = array.length-1;
        return Math.floor(Math.random() * quantity);
}