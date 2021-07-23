import * as recommendationRepository from "../repositories/recommendationReposiyory";

export async function create(name: string , link: string){
    const validLink = isYoutubeVideo(link);
    const validName = typeof(name);

    if (validName !== "string" || validLink === false) return false;

    await recommendationRepository.addRecommendation(name, link);
}

export async function upvote(id: number){

    const register = await recommendationRepository.findSong(id);
    if(register.length === 0) return false;

    const score: number = register[0].score + 1;
    await recommendationRepository.addVote(id, score);
}

export async function downvote(id: number){

    const register = await recommendationRepository.findSong(id);
    if(register.length === 0) return false;

    const score: number = register[0].score - 1;
    const newRegister = await recommendationRepository.addVote(id, score);

    if (newRegister.score <= (-5)){
        await recommendationRepository.exclude(id);
        return "excluded";
    }
}

function isYoutubeVideo(url: string) {
  var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(v)) ? RegExp.$1 : false;
}