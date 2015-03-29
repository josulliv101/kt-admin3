
var React = require('react/addons');
var cx = React.addons.classSet;
var Router = require('react-router');
var App = require('./components/App');
var Home = require('./components/pages/Home');
var Faq = require('./components/pages/Faq');
var Search = require('./components/pages/Search');
var About = require('./components/pages/About');
var Profile = require('./components/pages/Profile');
var Blog = require('./components/pages/Blog');
var Pulse = require('./components/pages/Pulse');
var Settings = require('./components/pages/Settings');
var Causes = require('./components/pages/settings/Causes');
var General = require('./components/pages/settings/General');
/*
var Directory = require('./components/Directory');
var Details = require('./components/DetailsEdit');
var Search = require('./components/Search');
var Login = require('./components/Login');
*/
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
  <Route handler={App} ignoreScrollBehavior={true}>
    <DefaultRoute name="home" handler={Home} isHomepage={true}/>
    <Route name="hp" path="hp/:scrollTo" handler={Home}/>
    <Route name="faq" path="faq" handler={Faq}/>
    <Route name="search" path="search" handler={Search}/>
    <Route name="about" path="about" handler={About}/>
    <Route name="settings" path="settings" handler={Settings}>
      <DefaultRoute name="general" handler={General}/>
      <Route name="causes" path="causes" handler={Causes}/>
    </Route>
    <Route name="blog" path="blog" handler={Blog}/>
    <Route name="pulse" path="pulse" handler={Pulse}/>
    <Route name="profile" path=":profile" handler={Profile}/>
  </Route>
);

Router.run(routes, function(Handler) {
  console.log('Handler', Handler);
  React.render(<Handler/>, document.getElementById('app'));
});
