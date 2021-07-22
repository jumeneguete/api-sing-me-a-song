import { Request, Response } from 'express';
import * as recommendatioService from "../services/recommendationService";

export async function create(req: Request, res: Response ){
  try{
    const { name , youtubeLink } = req.body;
    if(!name || !youtubeLink) return res.sendStatus(400);
  
    const result = await recommendatioService.create(name, youtubeLink);
    if(result=== false ) return res.sendStatus(406);
  
    res.sendStatus(201);

  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }

};