import {Request, Response} from 'express';
import Post from '../models/Post.model'; 
import User from '../models/User.model';
import Amigo from '../models/Amigo.model';
import { validationResult } from 'express-validator';
import { serverUrl } from '../helpers/helper';

export async function listarPost (req: Request, res:Response){
  try {
    const post = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id','nombre','correo'],
        }, 
      ]
    })
    post.forEach((element,index) => {
      post[index].img=serverUrl+post[index].img;
    });
    const amigos= await Amigo.findAll({
      where:{usersId:req.user.id},
      include: [{model: User , as: 'amigos', attributes: ['nombre', 'correo','birtday' ]  }],
    })
    return res.json({
      ok:true,
      data:{
        publicaciones:post,
        amigos
      }
    })
  } catch (error) {
    return res.status(500).json({
      ok:false,
      error
    })
  }
};

export async function listarPostsById (req: Request, res:Response){
  try {
    const post = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id','nombre','correo'],
          where:{id:req.params.id},
        }, 
      ]
    })
    post.forEach((element,index) => {
      post[index].img=serverUrl+post[index].img;
    });

    const amigosCount= await Amigo.count({where:{usersId:req.params.id}})
    return res.json({
      ok:true,
      data:{
        publicaciones:post,
        amigosCount
      }
    })
  } catch (error) {
    return res.status(500).json({
      ok:false,
      error
    })
  }
};



export async function createPost (req: Request, res:Response){
  
  try {
    if(!req.files) {
      return res.status(422).json({ 
        ok:false,
        error: 'La imagen es requerido'
      });
    } else {

      const photo = req.files.photo;
      const date=new Date().getTime();
      const url=`/uploads/${req.user.id}/${date}${photo.name}`;
      photo.mv(`.${url}`);

      let post = await Post.create({
        img:url,
        usersId:req.user.id,
      })

      post.img=serverUrl+post.img;

      return res.json({
        ok:true,
        data:post
      })
      
    }
  } catch (error) {
    return res.status(500).json({
      ok:false,
      error
    })
  }
  
};

export async function destroyPost(req: Request, res:Response){
  try {
    const post = await Post.destroy({
      where:{id:req.params.id,usersId:req.user.id}
    })
    if(post===1){
      return res.json({
        ok:true,
        data:'Amigo Eliminado'
      })
    }else{
      return res.status(400).json({
        ok:false,
        error:'Ningun elemento eliminado'
      })
    }
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
};