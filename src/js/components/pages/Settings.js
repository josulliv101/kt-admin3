var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var UserStore = require('../../stores/UserStore');

var classNames = require('classnames');

var Settings = React.createClass({
  
  mixins: [Router.State, Router.Navigation],

	getInitialState: function() {

    return getStateFromStores();

  },

  getDefaultProps: function() {

  	return {};

  },

  componentWillUpdate: function(nextProps, nextState) {

    if (nextState.isAuthenticated !== true) {

    	console.log('user does not have permission to view settings page');

    	this.transitionTo('home');

    }

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

  render: function() {

  	var profile = this.getParams().profile;
  	var path = this.getPath();

    var goodCauseItem = this.state.cause !== true ? <li className={classNames({ active: this.isActive('/settings/causes') })} role="presentation"><Link to="causes">Causes I'm Helping</Link></li> : <script/>;
  	
    console.log('Router.State', path);
    
    return (
			<div id="profile" className="container">
				<div className="row">
		      <div className="col-md-12">
		      	<h2>Settings</h2>
		      	<p></p>
					</div>
				</div>
        <div className="row">
          <div className="col-md-2">
						<ul className="nav nav-pills nav-stacked">
				      <li className={classNames({ active: this.isActive('/settings') })} role="presentation"><Link to="general">Account Details</Link></li>
				      {goodCauseItem}
				      <li role="presentation"><a href="#">My Campaigns</a></li>
				      <li role="presentation"><a href="#">Volunteering</a></li>
				      <li role="presentation"><a href="#">Reset Password</a></li>
				      <li role="presentation"><a href="#">Privacy</a></li>
				      <li role="presentation"><a href="#">Promotion Tools</a></li>
				    </ul>
          </div>
          <div className="col-md-7">
					  <RouteHandler/>
          </div>
          <div className="col-md-3">
            <p>sidebar</p>
          </div>
        </div>
       </div>
    );
  }
  
});

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = Settings;