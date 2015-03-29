var React = require('react');
var Router = require('react-router');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Searchbox = require('../../forms/Searchbox.jsx');
var ElasticWebAPI = require('../../../utils/ElasticSearch');
var FirebaseWebAPI = require('../../../utils/Firebase');
var UserStore = require('../../../stores/UserStore');
var Actions = require('../../../actions/Actions');
var classNames = require('classnames');
var Featured = require('../../Featured.jsx');

var Causes = React.createClass({
  
  mixins: [ReactFireMixin, Router.Navigation],

  getInitialState: function() {

    return getStateFromStores();

  },

  getDefaultProps: function() {

    return {};

  },

  componentWillUpdate: function(nextProps, nextState) {

    // Redirect Good Causes - should not see this page ever
    if (nextState && nextState.cause === true) this.transitionTo('home');

  	if (!this.state.uid || !!this.firebaseRefs['item']) return;

    var url = "https://kindturtle.firebaseio.com/users/" + this.state.uid;

    this.bindAsObject(new Firebase(url), "item");

    console.log('componentWillMount', this.state, url);

  },

  componentDidMount: function() {

    UserStore.addChangeListener(this.onChange);

    this.componentWillUpdate();

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this.onChange);

  },

  onChange: function() {

    this.setState(getStateFromStores());

  },

  handleCausesChange: function(id) {

	  console.log('handleCausesChange', id, this.state.mycauses);

  	var data, isDup = this.state.mycauses.indexOf(id) > -1;

	
	
  	if (isDup) return;

  	data = { mycauses: this.state.mycauses.concat([id]) };

  	console.log('handleCausesChange data', data);

    //this.firebaseRefs['item'].update(data);

    var url = "https://kindturtle.firebaseio.com/places/" + this.state.uid;

    this.bindAsObject(new Firebase(url), "place");

    this.firebaseRefs['place'].update(data);

  	Actions.receiveFullUserData(data);

  },

  render: function() {
  	// So the search returns 0 hits instead of errors
  	var arg = this.state.mycauses.length === 0 ? ['null'] : this.state.mycauses;
    return (
      <div className="carousel">
      	<Searchbox 
      		placeholderText='Find a good cause to add' 
      		handleClick={this.handleCausesChange}
      		getResults={ElasticWebAPI.getResults} />
      	<hr/>
      	<Featured 
      		label={this.state.mycauses.length} 
      		limit={4} 
      		getFeatured={ElasticWebAPI.getCausesById.bind(this, arg)}/>
      </div>
    );
  }
  
});

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = Causes;