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

export async function upvote(req: Request, res: Response){
  const id = Number(req.params.id);
  if(!id ) return res.sendStatus(400);

  try{
    const register = await recommendatioService.upvote(id);
    if(register === false) return res.sendStatus(404);
  
    res.sendStatus(200);
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}

export async function downvote(req: Request, res: Response){
  const id = Number(req.params.id);
  if(!id ) return res.sendStatus(400);

  try{
    const register = await recommendatioService.downvote(id);
    if(register === false) return res.sendStatus(404);
    if(register === "excluded") return res.sendStatus(410);
  
    res.sendStatus(200);
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }
}