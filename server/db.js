import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize(
  'towatch',
  'root',
  'root',
  {
    dialect: 'mysql',
    host: 'localhost',
    port: '8889'
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
  id_fb: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
});

const UserMovie = db.define('user_movie', {
});

User.belongsToMany(Movie, { through: UserMovie });
Movie.belongsToMany(User, { through: UserMovie });

db.sync();

export { db };
