import {Request, Response} from 'express';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {check,validationResult } from 'express-validator';

export async function registro (req: Request, res:Response){
  try {

    //verificando que pase las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        ok:false,
        error: errors.array() 
      });
    }
 
    // encriptando password 
    const password = md5(req.body.password);
    // guardar nuevo usuario
    const user = await User.create({
      nombre:req.body.nombre,
      correo:req.body.correo,
      birtday:req.body.birtday,
      password:password
    })

    // creando token 
    const token = jwt.sign({
      user:{
        id:user.id,
        nombre:user.nombre,
        birtday:user.birtday,
        correo:user.correo
      }
    },process.env.SEED)

    // devolviendo usuario
    return res.json({
      ok:true,
      data:{
        user:{
          id:user.id,
          nombre:user.nombre,
          birtday:user.birtday,
          correo:user.correo
        },
        token
      }
    })

  } catch (error) {
    // devolviendo error
    return res.status(400).json({
      ok:false,
      error
    })
  }
};

export async function login (req: Request, res:Response){
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        ok:false,
        error: errors.array() 
      });
    }


    const user = await User.findOne({where:{correo: req.body.correo}})
    if(!user){
      return res.status(400).json({
        ok:false,
        error:"Correo no registrado"
      })
    }else{
      // validando password
      if(md5(req.body.password) !== user.password){
        return res.status(400).json({
          ok:false,
          error:"Correo o password incorrecto"
        })
      }else{
        // creando token 
        const token = jwt.sign({
          user:{
            id:user.id,
            nombre:user.nombre,
            birtday:user.birtday,
            correo:user.correo
          }
        },process.env.SEED)

        return res.json({
          ok:true,
          data:{
            user:{
              id:user.id,
              nombre:user.nombre,
              correo:user.correo,
              birtday:user.birtday
            },
            token
          }
        })
      
      }
    }
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
}

export const profile = async (req: Request, res:Response)=>{
  try {
    const users = await User.findAll()
    return res.json({
      ok:true,
      data:users
    })
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error
    })
  }
};