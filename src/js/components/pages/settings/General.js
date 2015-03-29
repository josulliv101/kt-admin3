var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var UserStore = require('../../../stores/UserStore');
var Actions = require('../../../actions/Actions');
var classNames = require('classnames');

var General = React.createClass({

  mixins: [Router.State, React.addons.LinkedStateMixin, Router.Navigation, ReactFireMixin],

	getInitialState: function() {

    return getStateFromStores();

  },

  getDefaultProps: function() {

  	return {};

  },

  componentWillUpdate: function() {

  	if (!this.state.uid || !!this.firebaseRefs['item']) return;

    var url = "https://kindturtle.firebaseio.com/users/" + this.state.uid;

    this.bindAsObject(new Firebase(url), "item");

    console.log('componentWillMount', this.state, url);

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

  handleTypeChange: function(type) {

    this.setState({ type: type });

  },

  save: function() {

  	if (!this.state.username) return;

  	var displayname = (this.state.type === 'person' ? this.state.firstname + ' ' + this.state.lastname : this.state.displayname),

  			data = { 
  				displayname: displayname, 
  				website: this.state.website, 
  				email: this.state.email, 
  				username: this.state.username, 
  				type: this.state.type, 
  				firstname: this.state.firstname, 
  				lastname: this.state.lastname,
  				isActive: true
  			};

  	//this.firebaseRefs['item'].update(data);

	var url = "https://kindturtle.firebaseio.com/places/" + this.state.uid;

    this.bindAsObject(new Firebase(url), "place");

    this.firebaseRefs['place'].update(data, function() { Actions.receiveFullUserData(data); });

  },

  render: function() {

  	var types = ['person', 'company', 'organization'];

    return (
		  <div data-example-id="simple-horizontal-form" className="bs-example">
		  	<h4>I support good causes and want to help.</h4>
		    <form className="form-horizontal">
		      <div className="form-group">
		        <label className="col-sm-2 control-label" for="type">About You</label>
		        <div className="col-sm-10">
		        	<span className="help-block">What are you?</span>
							<div aria-label="Basic example" role="group" className="btn-group btn-group-sm">
								{this.getButtonsForTypes(types)}
					    </div>
					    
		        </div>
		      </div>

		      <div className="form-group">
		        <label className="col-sm-2 control-label" for="username"></label>
		        <div className="col-sm-10">
		        	<span className="help-block">Username</span>
		        	
		          <input type="text" placeholder="Username" id="username" valueLink={this.linkState('username')}  className="form-control"/>
		        	<span className="help-block">https://www.kindturtle.com/{this.state.username}</span>
		        </div>
		      </div>

		      {getNameInput(this, this.state.type)}


		      <div className="form-group">
		        <label className="col-sm-2 control-label" for="email"></label>
		        <div className="col-sm-10">
		        	<span className="help-block">Email</span>
		          <input type="email" placeholder="Email" id="email" valueLink={this.linkState('email')} className="form-control"/>
		        	
		        </div>
		      </div>
		      <div className="form-group">
		        <label className="col-sm-2 control-label" for="website"></label>
		        <div className="col-sm-10">
		        	<span className="help-block">Website</span>
		          <input type="text" placeholder="Website" id="website" valueLink={this.linkState('website')} className="form-control"/>
		        	
		        </div>
		      </div>

		      <hr/>
		      <div className="form-group">
		        <div className="col-sm-offset-2 col-sm-10">
		          <button className="btn btn-primary" type="submit" onClick={this.save}>Save Changes</button>
		        </div>
		      </div>
		    </form>
		  </div>
    );
  },

  getButtonsForTypes: function(types) {

	  return types.map(function(type) {

	  	return <button className={classNames('btn', 'btn-default', { active: this.state.type === type })} type="button" onClick={this.handleTypeChange.bind(null, type)}>{type}</button>;

	  }, this);

  }
  
});

function getNameInput(context, type) {

	if (!type || type === 'person') return (
	      <div className="form-group">
	        <label className="col-sm-2 control-label" for="firstname"></label>
	        <div className="col-sm-5">
	        	<span className="help-block">First Name</span>
	          <input type="text" placeholder="First Name" id="firstname" valueLink={context.linkState('firstname')}  className="form-control"/>
	        	
	        </div>
	        <div className="col-sm-5">
	        	<span className="help-block">Last Name</span>
	          <input type="text" placeholder="Last Name" id="lastname" valueLink={context.linkState('lastname')}  className="form-control"/>
	        	
	        </div>
	      </div>
		);

	type = type.replace(/^[a-z]/, function(m) { return m.toUpperCase() });

	return (
	      <div className="form-group">
	        <label className="col-sm-2 control-label" for="displayname"></label>
	        <div className="col-sm-10">
	        	<span className="help-block">{type} Name</span>
	          <input type="text" placeholder="Name" id="displayname" valueLink={context.linkState('displayname')}  className="form-control"/>   	
	        </div>
	      </div>
		);
}

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = General;