import sequelize from '../sequelize';

const Amigo= sequelize.define('amigo',{
},{
  timestamps: true
})

export default Amigo;