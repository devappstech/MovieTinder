import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';
import { db } from './db';

const Movie = new GraphQLObjectType({
  name: 'Movie',
  description: 'This represents a Movie',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (movie) {
          return movie.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve (movie) {
          return movie.title;
        }
      },
      description: {
        type: GraphQLString,
        resolve (movie) {
          return movie.description;
        }
      },
      img: {
        type: GraphQLString,
        resolve (movie) {
          return movie.img;
        }
      },
      rating: {
        type: GraphQLString,
        resolve (movie) {
          return movie.ranking;
        }
      },
    };
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (user) {
          return user.id;
        }
      },
      nick: {
        type: GraphQLString,
        resolve (user) {
          return user.nick;
        }
      },
      id_fb: {
        type: GraphQLString,
        resolve (user) {
          return user.id_fb;
        }
      },
      towatchs: {
        type: new GraphQLList(Movie),
        resolve(user){
          return user.getMovies();
        }
      }
    };
  }
});

const Seance = new GraphQLObjectType({
  name: 'Seance',
  description: 'This represents a Seance',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (seance) {
          return seance.id;
        }
      },
      users: {
        type: new GraphQLList(User),
        resolve(seance){
          return seance.getUsers();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      movies: {
        type: new GraphQLList(Movie),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return db.models.movie.findAll({ where: args, order: [['rating', 'DESC']] });
        }
      },
      seance: {
        type: Seance,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return db.models.seance.findOne({ where: args});
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation object',
  fields: () => {
    return {
      addMovie: {
        type: Movie,
        args:{
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          img: {
            type: new GraphQLNonNull(GraphQLString)
          },
          rating: {
            type: new GraphQLNonNull(GraphQLFloat)
          }
        },
        resolve (_, args) {
          return db.models.movie.create({
            title: args.title,
            description: args.description,
            img: args.img,
            rating: args.rating,
          });
        }
      },
      addMovieToUser: {
        type: User,
        args:{
          id_movie: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_user: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.user.findOne({ where: args.id_user}).then(user => {user.addMovie(args.id_movie);});
        }
      },
      removeMovieToUser: {
        type: User,
        args:{
          id_movie: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_user: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.user.findOne({ where: args.id_user}).then(user => {user.removeMovie(args.id_movie);});
        }
      },
      addUserToSeance: {
        type: Seance,
        args:{
          id_seance: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_user: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.seance.findOne({ where: args.id_seance}).then(user => {user.addUser(args.id_user);});
        }
      },
      removeUserToSeance: {
        type: Seance,
        args:{
          id_seance: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_user: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.seance.findOne({ where: args.id_seance}).then(user => {user.removeUser(args.id_user);});
        }
      },
      addSeance: {
        type: Seance,
        resolve (_, args) {
          return db.models.seance.create();
        }
      },
      removeSeance: {
        type: Seance,
        args:{
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.seance.findOne({ where: args}).distroy();
        }
      },
      addUser: {
        type: User,
        args:{
          nick: {
            type: new GraphQLNonNull(GraphQLString)
          },
          id_fb: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve (_, args) {
          return db.models.user.create({
            title: args.nick,
            id_fb: args.id_fb,
          });
        }
      },
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
