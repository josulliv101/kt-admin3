var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Actions = require('../actions/Actions');
var Login = require('./forms/Login.jsx');
var Topnav = require('./Topnav.jsx');

var App = React.createClass({

  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function() {
    return {
      showHeader: false
    };
  },

  componentDidUpdate: function() {

    //ImitateBrowserBehavior.updateScrollPosition({ x: 10, y: 100 }, 'push');

    var id = this.getParams().scrollTo,
        y = 0;

    if (id && $) y = $('#' + id).offset().top - 60; // Push content down below topnav

    if ($) $("html, body").animate({ scrollTop: Math.max(0, y) + "px" }, 900);

  },

  componentDidMount: function() {

    //ImitateBrowserBehavior.updateScrollPosition({ x: 10, y: 100 }, 'push');

    var id = this.getParams().scrollTo,
        y = 0;

    if (id && $) y = $('#' + id).offset().top;

    if ($) $("html, body").scrollTop(y);

    window.addEventListener("scroll", this.handleScroll);

    Actions.loginWithToken();

  },

  handleScroll: function(e) {
    
    var showHeader = e.pageY > 30,
        $el = $(this.getDOMNode());

    //console.log('scroll', e.pageY, showHeader);

    //$(this.getDOMNode()).removeClass('headroom--not-top headroom--top');

    if (showHeader && $el.hasClass('headroom--top')) $el.removeClass('headroom--top').addClass('headroom--not-top');

    else if (!showHeader && $el.hasClass('headroom--not-top')) $el.removeClass('headroom--not-top').addClass('headroom--top');
  },

  render: function() {
    

    var {address, city, unit, price, desc, updatedat, sqft, rooms, thumbnail, id } = this.props,

        path = this.getPath(),

        header = (this.state.showHeader === true ? 'headroom--not-top' : 'headroom--top'),
        
        isHomepage = path === '/' || path.indexOf('/hp') === 0 || path.indexOf('/?') === 0;

    console.log('app', this.getParams(), path, Router);

/*<li><Link to="profile" params={{profile: 'joe'}}>Joe's Page</Link></li>
<li><Link to="home">Sign In</Link></li>*/

    return (
      <div className={ (isHomepage ? 'homepage ' : ' ')  + header} onScroll={this.handleScroll}>
        <div className="navbar-wrapper">
          <div className="container-fluid">

            <nav className="navbar navbar-inverse navbar-static-top">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand tk-giddyup-std" href="#">kindturtle</a> <label className="tagline"> &nbsp;|&nbsp; help good causes reach their goals</label>
                </div>
                <Topnav />
              </div>
            </nav>

          </div>
        </div>

        <RouteHandler/>

        <hr className="featurette-divider"/>

        <footer>
          <p className="pull-right"><a href="#">Back to top</a></p>
          <p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
        </footer>
        <Login />
      </div>
    );
  }
  
});

module.exports = App;