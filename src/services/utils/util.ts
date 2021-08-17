import { Song } from "../../repositories/recommendationReposiyory";

export function isYoutubeVideo(url: string) {
var v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
return (url.match(v)) ? RegExp.$1 : false;
}
  
export function randomNumber(array: Song[]){
        const quantity: number = array.length;
        return Math.floor(Math.random() * quantity);
}