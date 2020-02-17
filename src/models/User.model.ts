import sequelize from '../sequelize';
import Sequelize from 'sequelize';
import Post from './Post.model';
import Amigo from './Amigo.model';

const User= sequelize.define('user',{
  nombre:{
    type: Sequelize.STRING,
    allowNull: false
  },
  birtday:{
    type: Sequelize.DATE,
    allowNull: false,
  },
  correo:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }, 
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
},{
  timestamps: true
})

//----- relacion uno a muchos entre users y posts------
User.hasMany(Post, {
  foreignKey: 'usersId'
}) 
Post.belongsTo(User, {
  foreignKey: 'usersId'
}) 
// ----------------------------------------------

//------- relacion muchos a muchos users(amigos)------
Amigo.belongsTo(User, {
  as:'users',
  foreignKey: 'usersId',
}) 
Amigo.belongsTo(User, {
  as:'amigos',
  foreignKey: 'amigosId',
})  
// ------------------------------

 
export default User;