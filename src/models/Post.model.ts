import sequelize from '../sequelize';
import Sequelize from 'sequelize';

const Post =sequelize.define('post',{
  descripcion:{
    type: Sequelize.TEXT,
  },
  img:{
    type: Sequelize.STRING,
  },
},{
  timestamps: true
})


export default Post;