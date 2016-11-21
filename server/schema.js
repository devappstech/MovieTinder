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
      year: {
        type: GraphQLInt,
        resolve (movie) {
          return movie.year;
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

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      movies: {
        type: new GraphQLList(Movie),
        args: {
          offset: {
            type: GraphQLInt
          },
          limit: {
            type: GraphQLInt
          }
        },
        resolve (root,args) {
          return db.models.movie.findAll({order: [['rating', 'DESC']], offset: args.offset, limit: args.limit });
        }
      },
      user: {
        type: User,
        args: {
          id_fb: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return db.models.user.findOrCreate({ where: args}).spread(function(user, created){
            if (created == null){
              return created
            }
            else {
              return user.get({plain: true})
            }
          });
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
          year: {
            type: new GraphQLNonNull(GraphQLInt)
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
            year: args.year,
          });
        }
      },
      addMovieToUser: {
        type: User,
        args:{
          id_movie: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_fb: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.user.findOne({ where: args.id_fb}).then(user => {user.addMovie(args.id_movie);});
        }
      },
      removeMovieToUser: {
        type: User,
        args:{
          id_movie: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          id_fb: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve (_, args) {
          return db.models.user.findOne({ where: args.id_fb}).then(user => {user.removeMovie(args.id_movie);});
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
