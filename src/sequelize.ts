import Sequelize from 'sequelize';

const DBURL = 'mysql://root@localhost:3306/imaginamos';

const sequelize = new Sequelize(DBURL);

sequelize.sync().then(()=>{
  console.log('tablas creadas')
})

export default sequelize;
