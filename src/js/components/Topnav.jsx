'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore');
var Actions = require('../actions/Actions');
var classNames = require('classnames');

var Topnav = React.createClass({

	getInitialState: function() {

    return getStateFromStores();

  },

  componentDidMount: function() {

    UserStore.addChangeListener(this.onChange);

  },


  componentWillUnmount: function() {

    UserStore.removeChangeListener(this.onChange);

  },

  componentDidUpdate: function(prevProps, prevState) {

    //console.log('componentDidUpdate', prevState, this.state);

    // Shut the login modal once authenticated
    if (this.state.isAuthenticated === true) {

      $('.bs-example-modal-sm').modal('hide');

    }

  },

  onChange: function() {

    this.setState(getStateFromStores());

  },

  logout: function(ev) {

    ev.preventDefault();

    Actions.logout();

  },

  render: function() {

    var name = this.state.name,
        pic = this.state.profilePic,
        isAuthenticated = this.state.isAuthenticated;

    var signInOut = !isAuthenticated

                        ? <li><a href="#" data-toggle="modal" data-target=".bs-example-modal-sm">Sign In</a></li>

                        : <li><Link to="profile" params={{profile: this.state.username || this.state.uid}}>My Profile</Link></li>;

    var pic = isAuthenticated && pic

                    ? <li className="profile"><img src={pic}/></li>

                    : <script/>;

    var myaccount = isAuthenticated

                    ? <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My Account <span className="caret"></span></a>
                        <ul className="dropdown-menu topnav" role="menu">
                          <li><Link to="settings">Settings</Link></li>
                          
                          <li><a href="#" onClick={this.logout}>Logout</a></li>
                        </ul>
                      </li>

                    : <script/>;

    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav pull-right">
          <li><Link to="home">Home</Link></li>
          <li className="top hide"><Link to="home" query={{ t: new Date().getTime() }} ><span className="glyphicon glyphicon-arrow-up hide"></span>back to top</Link></li>
          <li className="hide"><Link to="hp" params={{scrollTo: 'features'}} query={{ t: new Date().getTime() }} >Featured</Link></li>
          <li className="hide"><Link to="hp" params={{scrollTo: 'directory'}} query={{ t: new Date().getTime() }} >Directory</Link></li>

          <li className="hide"><Link to="hp" params={{scrollTo: 'about'}} query={{ t: new Date().getTime() }} >About</Link></li>

          <li className="hide"><Link to="hp" params={{scrollTo: 'faq'}} query={{ t: new Date().getTime() }} >Faq</Link></li>
          <li><Link to="search">Good Cause Directory</Link></li>
          <li className="hide"><Link to="pulse">The Pulse</Link></li>
          <li><Link to="blog">Blog</Link></li>
          {signInOut} {myaccount} {pic} 

          <li className="hide"><Link to="hp" params={{scrollTo: 'add'}} query={{ t: new Date().getTime() }} >Suggest A Good Cause</Link></li>
          
          
          
        </ul>
      </div>
    );
  }
  
});

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = Topnav;