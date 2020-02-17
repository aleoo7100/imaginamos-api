import {Request, Response, Next} from 'express';
import jwt from 'jsonwebtoken';

//---------------------chech token--------------------------------------
export function checkToken (req:Request, res:Response, next:Next) {

  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        error: 'Token no valido'
        
      });
    }
    req.user = decoded.user;
    next();
  });

};


