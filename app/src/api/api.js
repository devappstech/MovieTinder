var fetch = require('graphql-fetch')('http://192.168.0.14:8889/graphql')

var api = {
  getMovies(){
    var query = `
      query {
        movies {
          id,
          title,
          img,
          description
        }
      }
    `
    var queryVars = {
    }

    var opts = {
    }

    return fetch(query, queryVars, opts).then(function (results) {
      if (results.errors) {
        return console.log("api.getMovies() failed");
      }
      return results.data.movies;

    })
  }
}


module.exports = api;
