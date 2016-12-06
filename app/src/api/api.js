

var api = {
  getInfosUserFb(token){
     return fetch('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cfriends%2Cpicture&access_token='+token)
            .then((response) => response.json())
            .then((responseJson) => { return responseJson.movies; })
            .catch((error) => { console.error(error); }); }
  }
}


module.exports = api;
