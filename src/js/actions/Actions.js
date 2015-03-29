var Dispatcher = require('../dispatchers/Dispatcher');
var FirebaseWebAPI = require('../utils/Firebase');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

var Actions = {

  runRoute: function(route, params) {

    console.log(ActionTypes.RUN_ROUTE, route, params);

  },

  receiveFullProfileData: function(data) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.RECEIVE_FULL_PROFILE_DATA,

      state: { profile: data }

    });

  },

  fetchTidbitProfileData: function(id) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.FETCH_TIDBIT_PROFILE_DATA

    });

    FirebaseWebAPI.getUserTidbits(id, this.receiveTidbitProfileData)

  },

  receiveTidbitProfileData: function(data) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.RECEIVE_TIDBIT_USER_DATA,

      state: data

    });

  },

  fetchFullProfileData: function(id) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.FETCH_FULL_PROFILE_DATA

    });

    FirebaseWebAPI.getProfileFullData(id, this.receiveFullProfileData)

  },

  receiveFullUserData: function(data) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.RECEIVE_FULL_USER_DATA,

      state: data

    });

  },

  //// Authentication ////

  loginWithFacebook: function() {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.LOG_IN_FACEBOOK

    });

    FirebaseWebAPI.loginWithFacebook();

  },

  loginWithToken: function() {

    var localData = JSON.parse(localStorage.getItem('firebase:session::kindturtle')) || {};

    console.log('localData', localData.token);

    Dispatcher.handleViewAction({

      actionType: ActionTypes.LOG_IN_TOKEN,

      state: { token: localData.token }

    });

    if (localData.token) FirebaseWebAPI.loginWithToken(localData.token);

  },

  logout: function() {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.LOG_OUT

    });

    FirebaseWebAPI.logout();

  },

  userAuthenticated: function(authData) {

    Dispatcher.handleViewAction({

      actionType: ActionTypes.USER_AUTHENTICATED,

      state: parseProfileData(authData)

    });

    if (authData) FirebaseWebAPI.getUserFullData(authData.uid, this.receiveFullUserData);
  }
  
};

function parseProfileData(authData) {

	// Logout
	if (!authData) {

		return {

		    user: null,

		    uid: null,

		    token: null,

		    name: null,

		    profileLink: null,
		    
		    profilePic: null,

		    authProvider: null,

		    isAuthenticated: false

		}

	}

	if (authData.provider === 'facebook' && authData.facebook) {

		return {

		    user: authData.provider,

		    uid: authData.uid,

		    token: authData.token,

		    name: authData.facebook.displayName,

		    profileLink: authData.facebook.cachedUserProfile && authData.facebook.cachedUserProfile.link,
		    
		    profilePic: authData.facebook.cachedUserProfile && authData.facebook.cachedUserProfile.picture.data.url,

		    authProvider: authData.provider,

		    isAuthenticated: true

		}
	}

  // Token
  else  if (authData.provider === 'facebook' && !authData.facebook) {

    return {

        uid: authData.uid,

        token: authData.token,

        authProvider: authData.provider,

        isAuthenticated: true

    }
  }
}

module.exports = Actions;