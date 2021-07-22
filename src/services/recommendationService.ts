import * as recommendationRepository from "../repositories/recommendationReposiyory";

export async function create(name: string , link: string){
    const validLink = isYoutubeVideo(link);
    const validName = typeof(name);

    if (validName !== "string" || validLink === false) return false;

    await recommendationRepository.addRecommendation(name, link);
}


function isYoutubeVideo(url: string) {
  var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(v)) ? RegExp.$1 : false;
}