import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLNonNull,
} from 'graphql';

import sequelize from 'sequelize';

import { db, MovieDb } from './db';

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
          return movie.rating;
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
        type: GraphQLString,
        resolve (user) {
          return user.id;
        }
      },
      count: {
        type: GraphQLInt,
        resolve (user) {
          return user.count;
        }
      }
    };
  }
});

const UserMovie = new GraphQLObjectType({
  name: 'UserMovie',
  description: 'This represents a User and a movie association',
  fields: () => {
    return {
      movieId: {
        type: GraphQLInt,
        resolve (user_movie) {
          return user_movie.movieId;
        }
      },
      count: {
        type: GraphQLInt,
        resolve (user_movie) {
          return user_movie.count;
        }
      },
      movie: {
        type: Movie,
        resolve (user_movie) {
          return user_movie.movie;
        }
      },
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
          id: {
            type: GraphQLString
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
      },
      user_movie: {
        type: new GraphQLList(UserMovie),
        args: {
          offset: {
            type: GraphQLInt
          },
          limit: {
            type: GraphQLInt
          },
          users: {
            type: new GraphQLList(GraphQLString)
          }
        },
        resolve (root, args) {
          return db.models.user_movie.findAll({
            offset: args.offset,
            limit: args.limit,
            attributes: ['movieId', [sequelize.fn('count', sequelize.col('movieId')),'count']],
            where: {
              state: true,
              userId: [args.users]
            },
            order: 'count DESC, rating DESC',
            group: 'movieId',
            include: [{model: db.models.movie}],
          });
        }
      },
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
          id_user: {
            type: new GraphQLNonNull(GraphQLString)
          },
          bool: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve (_, args) {
          return db.models.user.findOne({ where: {id:args.id_user}}).then(
            user => {
              user.update({count: user.count+1});
              user.addMovie(args.id_movie, {state:args.bool});
              return user;
            });
        }
      },
      /*
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
          return db.models.user.findOne({ where: args.id_fb}).then(user => { user.removeMovie(args.id_movie); return user;});
        }
      }*/
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
