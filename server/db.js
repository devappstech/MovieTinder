import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize(
  'ToWatch',
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
  rating: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
});

const User = db.define('user', {
  nick: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_fb: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Seance = db.define('seance', {
});

const UserMovie = db.define('user_movie', {
});

User.belongsToMany(Movie, { through: UserMovie });
Movie.belongsToMany(User, { through: UserMovie });

Seance.hasMany(User);
User.belongsTo(Seance);

export { db };
