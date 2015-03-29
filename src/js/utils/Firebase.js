var request  = require('superagent-bluebird-promise'),
    Firebase = require('firebase');

var urlBase = 'https://kindturtle.firebaseio.com/',
    FB = new Firebase(urlBase);

module.exports = {

  loginWithFacebook: function() {

    FB.authWithOAuthPopup("facebook", authHandler);

  },

  loginWithToken: function(token) {

    FB.authWithCustomToken(token, authHandler);

  },

  logout: function() {

    FB.unauth(authHandler);

  },


  getProfileFullData: function(id, callback) {

    return request.get(urlBase + 'places.json?orderBy="id"&equalTo="' + id + '"').promise()

      .then(function(res) {

        console.log('superagent', res.body[Object.keys(res.body)[0]]);

        callback(res.body[Object.keys(res.body)[0]]);
        
        //return Object.keys(res.body).map(function(key) { return res.body[key]; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  getUserTidbits: function(uid, callback) {

    return request.get(urlBase + 'tidbits/' + uid + '.json').promise()

      .then(function(res) {

        console.log('superagent', res.body);

        callback({ tidbits: Object.keys(res.body).map(function(key) { return res.body[key]; }) });
        
        //return Object.keys(res.body).map(function(key) { return res.body[key]; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  getUserFullData: function(uid, callback) {

    return request.get(urlBase + 'places/' + uid + '.json').promise()

      .then(function(res) {

        console.log('superagent', res.body);

        callback(res.body);
        
        //return Object.keys(res.body).map(function(key) { return res.body[key]; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  getFeatured: function(limit) {

    return request.get(urlBase + 'places.json?orderBy="featured"&startAt=true&limitToFirst='+limit).promise()

      //.set('content-type', 'GET')

      .then(function(res) {

        console.log('superagent', res.body);

        return Object.keys(res.body).map(function(key) { return res.body[key]; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  }

};

function authHandler(error, authData) {

  var Actions = require('../actions/Actions');

  if (error) {

    console.log("Login Failed!", error);

  } else {

    console.log("Authenticated successfully with payload:", authData);


    if (authData) { 

      FB.child("users").child(authData.uid).once('value', function(snapshot) {
        
        var exists = (snapshot.val() !== null);

        if (!exists) createUser(authData);

      });

    }

    Actions.userAuthenticated(authData);

  }
  
}

function createUser(authData) {

  var timestamp = new Date().getTime();

  FB.child("users").child(authData.uid).set({

    provider: authData.provider,

    createdAt: timestamp

  });

  FB.child("places").child(authData.uid).set({

    name: getName(authData),

    profilePic: getProfilePic(authData),

    profileLink: getProfileLink(authData),

    createdAt: timestamp,

    createdBy: authData.uid,

    isCause: false,

    isActive: false // Needs a username to be active

  });

}

function getProfilePic(authData) {

  if (authData.provider === 'facebook') return authData.facebook.cachedUserProfile.picture.data.url;

  return '';

}

function getProfileLink(authData) {

  if (authData.provider === 'facebook') return authData.facebook.cachedUserProfile.link;

  return '';

}

function getName(authData) {

  if (authData.provider === 'facebook') return authData.facebook.cachedUserProfile.name;

  return '';

}
