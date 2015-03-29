'use strict';

var React = require('react');
var UserStore = require('../../stores/UserStore');
var Actions = require('../../actions/Actions');
var classNames = require('classnames');

var Login = React.createClass({

	propTypes: {

/*    // Required
    getResults: React.PropTypes.func.isRequired,

    results: React.PropTypes.array,

    isBusy: React.PropTypes.bool,

    minQueryTextLength: React.PropTypes.number*/

  }, 

	getInitialState: function() {

    return getStateFromStores();

  },

  getDefaultProps: function() {

  	return {};

  },

  componentDidMount: function() {

    UserStore.addChangeListener(this.onChange);

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this.onChange);

  },

  onChange: function() {

    this.setState(getStateFromStores());

  },

  loginWithFacebook: function() {

    Actions.loginWithFacebook();

  },

  render: function() {

    var name = this.state.name;

    return (
      <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body sign-up-form">
              <div className="facebook-connect" onClick={this.loginWithFacebook}>
                <svg viewBox="0 0 90 90" height="50" width="50" className="login-btn">
                  <g fill="none">
                    <g transform="translate(10.000000, 10.000000)">
                      <circle r="35" cy="35" cx="35" fill="#3B5999" stroke-width="3" stroke="#3B5999"/>
                      <path fill="#FFFFFF" d="M31.4213136,49.8136842 L31.4213136,36.2143421 L27,36.2143421 L27,30.9143421 L31.4213136,30.9143421 L31.4213136,27.0057895 C31.4213136,22.4698684 34.0977966,20 38.0069492,20 C39.8794068,20 41.4888559,20.1443421 41.9577966,20.2088158 L41.9577966,24.9490789 L39.2466102,24.9503947 C37.1205508,24.9503947 36.7089407,25.9960526 36.7089407,27.5305263 L36.7089407,30.9143421 L41.779322,30.9143421 L41.1190678,36.2143421 L36.7089407,36.2143421 L36.7089407,49.8136842"/>
                    </g>
                  </g>
                </svg>
                <span>Sign up with Facebook</span>
              </div>
              <div title="Twitter" role="button" className="twitter-login hide">
                <svg viewBox="0 0 90 90" height="50" width="50" className="login-btn">
                  <g fill="none">
                    <g transform="translate(15.000000, 20.000000)">
                      <circle r="35" cy="35" cx="35" fill="#00aced" stroke-width="3" stroke="#00aced"/>
                      <g transform="scale(.18, .18)">
                        <path d="m 250,87.974 c -7.358,3.264 -15.267,5.469 -23.566,6.461 8.471,-5.078 14.978,-13.119 18.041,-22.701 -7.929,4.703 -16.71,8.117 -26.057,9.957 -7.484,-7.975 -18.148,-12.957 -29.95,-12.957 -22.66,0 -41.033,18.371 -41.033,41.031 0,3.216 0.363,6.348 1.062,9.351 -34.102,-1.711 -64.336,-18.047 -84.574,-42.872 -3.532,6.06 -5.556,13.108 -5.556,20.628 0,14.236 7.244,26.795 18.254,34.153 -6.726,-0.213 -13.053,-2.059 -18.585,-5.132 -0.004,0.171 -0.004,0.343 -0.004,0.516 0,19.88 14.144,36.464 32.915,40.234 -3.443,0.938 -7.068,1.439 -10.81,1.439 -2.644,0 -5.214,-0.258 -7.72,-0.736 5.222,16.301 20.375,28.165 38.331,28.495 -14.043,11.006 -31.735,17.565 -50.96,17.565 -3.312,0 -6.578,-0.194 -9.788,-0.574 18.159,11.643 39.727,18.437 62.899,18.437 75.473,0 116.746,-62.524 116.746,-116.747 0,-1.779 -0.04,-3.548 -0.119,-5.309 8.017,-5.784 14.973,-13.011 20.474,-21.239 z" fill="#ffffff"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Sign up with Twitter</span>
              </div>
              <div title="Google+" role="button" className="google-login hide">
                <svg viewBox="0 0 90 90" height="50" width="50" className="login-btn">
                  <g fill="none">
                    <g transform="translate(10.000000, 10.000000)">
                      <circle r="35" cy="35" cx="35" fill="#DC4A38" stroke-width="3" stroke="#DC4A38"/>
                      <g transform="scale(0.4, 0.4) translate(26.0, 26.0)">
                        <path d="M70.479,71.845l-3.983-3.093c-1.213-1.006-2.872-2.334-2.872-4.765c0-2.441,1.659-3.993,3.099-5.43 c4.64-3.652,9.276-7.539,9.276-15.73c0-8.423-5.3-12.854-7.84-14.956h6.849l7.189-4.517H60.418 c-5.976,0-14.588,1.414-20.893,6.619c-4.752,4.1-7.07,9.753-7.07,14.842c0,8.639,6.633,17.396,18.346,17.396 c1.106,0,2.316-0.109,3.534-0.222c-0.547,1.331-1.1,2.439-1.1,4.32c0,3.431,1.763,5.535,3.317,7.528 c-4.977,0.342-14.268,0.893-21.117,5.103c-6.523,3.879-8.508,9.525-8.508,13.51c0,8.202,7.731,15.842,23.762,15.842 c19.01,0,29.074-10.519,29.074-20.932C79.764,79.709,75.344,75.943,70.479,71.845z M56,59.107 c-9.51,0-13.818-12.294-13.818-19.712c0-2.888,0.547-5.87,2.428-8.199c1.773-2.218,4.861-3.657,7.744-3.657 c9.168,0,13.923,12.404,13.923,20.382c0,1.996-0.22,5.533-2.762,8.09C61.737,57.785,58.762,59.107,56,59.107z M56.109,103.65 c-11.826,0-19.452-5.657-19.452-13.523c0-7.864,7.071-10.524,9.504-11.405c4.64-1.561,10.611-1.779,11.607-1.779 c1.105,0,1.658,0,2.538,0.111c8.407,5.983,12.056,8.965,12.056,14.629C72.362,98.542,66.723,103.65,56.109,103.65z" fill="#FFFFFF"/>
                        <polygon points="98.393,58.938 98.393,47.863 92.923,47.863 92.923,58.938 81.866,58.938 81.866,64.469 92.923,64.469 92.923,75.612 98.393,75.612 98.393,64.469 109.506,64.469 109.506,58.938" fill="#FFFFFF"/>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Sign up with Google+</span>
              </div>
              <div>
                <div className="via"><span>or via email</span></div>
                <div className="sign-up-field"><input type="text" placeholder="Full Name" className="text-input"/></div>
                <div className="sign-up-field"><input type="text" maxlength="512" placeholder="Email" className="text-input"/></div>
                <div className="sign-up-field">
                  <input type="password" maxlength="512" placeholder="Password" className="text-input"/>
                  <div className="hint"></div>
                </div>
              </div>
              <button label="Sign Up" className="button sign-up-button">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
});

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = Login;