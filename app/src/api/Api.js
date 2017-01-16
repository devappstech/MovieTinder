var fetch = require('graphql-fetch')('http://vps360306.ovh.net:8889/graphql');

var api = {
  getMovies(offset,limit){
    var query = `
      query {
        movies (limit: `+limit+`, offset: `+offset+`){
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

    return fetch(query, queryVars, opts)
  },
  getUser(id){
    var query = `
      query{
        user (id: "`+id+`"){
          id,
          count
        }
      }
    `
    var queryVars = {
      id: id
    }

    var opts = {
    }

    return fetch(query, queryVars, opts)
  },
  addMovieToUser(id_fb,id_movie, bool){
    var query = `
      mutation {
        addMovieToUser (id_user:"`+id_fb+`",id_movie:`+id_movie+`,bool:`+bool+`){
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

    return fetch(query, queryVars, opts)
  },
  findFilm(users, compteur){
    var tab = "";
    for (var i = 0; i < users.length; i++) {
      tab += '"'+users[i] +'",';
    }
    tab = tab.substr(0, tab.length - 1);

    var query = `
      query{
      	user_movie(users:[`+tab+`],offset:`+compteur+`,limit:1 ){
        	movieId,
        	count,
        	movie{
          	title,
          	id,
        	  img,
      	    rating,
          	description
        	}
      	}
      }
    `

    var queryVars = {
      //id: id_fb,
    }

    var opts = {
    }

    return fetch(query, queryVars, opts)
  }

}


module.exports = api;
