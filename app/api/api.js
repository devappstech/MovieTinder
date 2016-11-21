var fetch = require('graphql-fetch')('http://192.168.0.14:8889/graphql')

var api = {
  getMovies(offset,limit){
    var query = `
      query {
        movies (limit: $limit, offset: $offset){
          id,
          title,
          img
        }
      }
    `
    var queryVars = {
      limit: limit,
      offset: offset
    }

    var opts = {
    }

    return fetch(query, queryVars, opts).then(function (results) {
      if (results.errors) {
        return console.log("api.getMovies() failed");
      }
      return results.data.movies;

    })
  },
  getUser(id_fb){
    var query = `
      query {
        user (id_fb: $id_fb){
          towatch
        }
      }
    `
    var queryVars = {
      id_fb: id_fb
    }

    var opts = {
    }

    return fetch(query, queryVars, opts).then(function (results) {
      if (results.errors) {
        return console.log("api.getUser() failed");
      }
      return results.data.movies;

    })
  },
  addMovieToUser(id_fb,id_movie){
    var query = `
      mutation {
        addMovieToUser (id_fb: $id_fb,id_movie: $id_movie){
          id
        }
      }
    `
    var queryVars = {
      id_fb: id_fb,
      id_movie: id_movie
    }

    var opts = {
    }

    return fetch(query, queryVars, opts).then(function (results) {
      if (results.errors) {
        return console.log("api.addMovieToUser() failed");
      }
      return results.data.user;

    })
  },
  addUser(id_fb){
    var query = `
      mutation {
        addUser (id_fb: $id_fb){
          id
        }
      }
    `
    var queryVars = {
      id_fb: id_fb,
    }

    var opts = {
    }

    return fetch(query, queryVars, opts).then(function (results) {
      if (results.errors) {
        return console.log("api.addUser() failed");
      }
      return results.data.user;

    })
  }

}


module.exports = api;
