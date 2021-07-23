import { Request, Response } from 'express';
import * as genresServices from '../services/genresService';

export async function addGenre(req: Request, res: Response) {
    try {
        const name: string = req.body.name;
        if (!name || typeof (name) !== "string") return res.sendStatus(400);

        const result = await genresServices.addGenre(name);
        if (!result) return res.sendStatus(409);

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export async function getGenres(req: Request, res: Response){
    try{
        const result = await genresServices.getGenre();

        res.status(200).send(result);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}