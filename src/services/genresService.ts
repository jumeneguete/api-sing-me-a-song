import * as genresRepository from '../repositories/genresRepository';

export async function addGenre(genre: string){
    const name = genre.toLowerCase();
    const genres = await genresRepository.getGenreByName(name);
    if( genres.length !== 0 ) return null;

    return await genresRepository.addGenre(name);

}

export async function getGenre(){
   return await genresRepository.getGenres();
}