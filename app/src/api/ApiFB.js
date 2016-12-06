var ApiFb = {
  getInfosUserFb(token){
     var url = 'https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cfriends%7Bpicture%2Cname%7D%2Cpicture&access_token='+token;
     console.log(url);
     return fetch(url).then(response => response.json());
  }
}
module.exports = ApiFb;
