import sequelize from '../sequelize';
import Sequelize from 'sequelize';
import User from './User.model'; 

const Amigo= sequelize.define('amigo',{
},{
  timestamps: true
})

export default Amigo;