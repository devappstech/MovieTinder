import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize(
  'tindermovie',
  'phpmyadmin',
  'password',
  {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306'
  },
);

const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
});

const User = db.define('user', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});


const UserMovie = db.define('user_movie', {
  state: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  count: {
    type: Sequelize.VIRTUAL
  },
  userId:{
    type: Sequelize.STRING,
    allowNull: false
},
}
);

UserMovie.removeAttribute('id');

User.belongsToMany(Movie, { through: UserMovie });
Movie.belongsToMany(User, { through: UserMovie });

Movie.hasMany(UserMovie)
UserMovie.belongsTo(Movie)

db.sync({force: true});

export { db, Movie };
