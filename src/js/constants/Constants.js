var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RUN_ROUTE: null,
    LOG_IN_FACEBOOK: null,
    LOG_IN_TOKEN: null,
    LOG_OUT: null,
    USER_AUTHENTICATED: null,
    RECEIVE_FULL_USER_DATA: null,
    FETCH_FULL_PROFILE_DATA: null,
    RECEIVE_FULL_PROFILE_DATA: null,
    FETCH_TIDBIT_PROFILE_DATA: null,
    RECEIVE_TIDBIT_PROFILE_DATA: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};