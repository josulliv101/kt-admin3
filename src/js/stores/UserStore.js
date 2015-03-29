var Constants = require('../constants/Constants.js');
var Dispatcher = require('../dispatchers/Dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _state = {

    user: null,

    username: null,

    uid: null,

    token: null,

    name: null,

    firstname: null,

    lastname: null,

    role: null,

    mycauses: [],

    profileLink: null,

    profilePic: null,

    authProvider: null,

    isAuthenticated: false,

    // Current user profile
    profile: null

};

var UserStore = assign({}, EventEmitter.prototype, {

  getState: function() {

  	return _state;

  },

  emitChange: function() {

    this.emit(CHANGE_EVENT);

  },

  addChangeListener: function(callback) {

    this.on(CHANGE_EVENT, callback);

  },

  removeChangeListener: function(callback) {

    this.removeListener(CHANGE_EVENT, callback);

  }

});

UserStore.dispatchToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case ActionTypes.USER_AUTHENTICATED:

      _state = assign(_state, action.state);

      console.log('USER_AUTHENTICATED', _state);

      UserStore.emitChange();

      break;

    case ActionTypes.RECEIVE_FULL_USER_DATA:

      _state = assign(_state, action.state);

      console.log('RECEIVE_FULL_USER_DATA', _state);

      UserStore.emitChange();

      break;

    case ActionTypes.RECEIVE_TIDBIT_USER_DATA:

      _state = assign(_state, action.state);

      console.log('RECEIVE_FULL_USER_DATA', _state);

      UserStore.emitChange();

      break;

    case ActionTypes.RECEIVE_FULL_PROFILE_DATA:

      _state = assign(_state, action.state);

      console.log('RECEIVE_FULL_PROFILE_DATA', _state);

      UserStore.emitChange();

      break;


    case ActionTypes.LOG_OUT:

      _state = assign(_state, { authData: null });

      UserStore.emitChange();

      break;


    default:

  }

});

module.exports = UserStore;