var url = 'localhost:8889/graphql';

var api = {
  getMovies(){
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"query":"{movies{id}}"}
    });
  }
};

module.exports = api;
