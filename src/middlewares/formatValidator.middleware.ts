import {check} from 'express-validator';


export const checkEmail=[
  check('correo').isEmail().withMessage('Correo invalido'),
]

export const checkLogin=[
  check('correo')
    .isEmail().withMessage('Correo invalido'),
  check('password')
    .isLength({ min: 6 }).withMessage('password invalido')
]

export const checkRegistro=[
  check('nombre')
    .isLength({ min: 6 }).withMessage('el nombre debe contener al menos 6 caracteres'),
  check('birtday')
    .exists().withMessage('la feha de cumpleaños es obligatoria'),
  check('correo').isEmail().withMessage('Correo invalido'),
  check('password').isLength({ min: 6 }).withMessage('password debe contener al menos 6 caracteres')
]