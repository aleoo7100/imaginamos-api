import {Request, Response} from 'express';
import Post from '../models/Post.model'; 
import User from '../models/User.model';
import Amigo from '../models/Amigo.model';
import { validationResult } from 'express-validator';

export async function listarAmigo (req: Request, res:Response){
  try {
    const amigos = await Amigo.findAll({
      where:{usersId:req.user.id},
      include: [{model: User , as: 'amigos', attributes: ['nombre', 'correo' ]  }],
    })

    return res.json({
      ok:true,
      data:amigos
    })
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
};

export async function agregarAmigo (req: Request, res:Response){
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        ok:false,
        error: errors.array() 
      });
    }
    
    if(req.user.correo===req.body.correo){
      return res.status(400).json({
        ok:false,
        error:'No puede agregarse a si mismo como amigo'
      })
    }

    const userAmigo= await User.findOne({where:{correo:req.body.correo}})
    if(!userAmigo){
      return res.status(400).json({
        ok:false,
        error:'Este correo no esta registrado en nuestro sistema'
      })
    }

    const userAmigoRegistrado= await Amigo.findOne({where:{usersId:req.user.id,amigosId:userAmigo.id}})
    if(userAmigoRegistrado){
      return res.status(400).json({
        ok:false,
        error:'Este usuario ya es su amigo'
      })
    }

    const amigo = await Amigo.create({
      usersId:req.user.id,
      amigosId:userAmigo.id
    })

    return res.json({
      ok:true,
      data:amigo
    })
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
};



export async function eliminarAmigo (req: Request, res:Response){
  try {
    const amigo= await Amigo.destroy({where:{id:req.params.id,usersId:req.user.id}})
    
    if(amigo===1){
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
}



export async function listarUsuarios(req: Request, res:Response){
  try {
    const usuarios = await User.findAll({attributes: ['id','nombre', 'correo' ] })
    return res.json({
      ok:true,
      data:usuarios
    })
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
}