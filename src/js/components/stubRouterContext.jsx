/**
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   var stubRouterContext = require('./stubRouterContext');
 *   var IndividualComponent = require('./IndividualComponent');
 *   var Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

var React = require('react');
var assign = require('react/lib/Object.assign');

var stubRouterContext = function(Component, props, stubs) {
  return React.createClass({
    childContextTypes: {
      makePath: React.PropTypes.func,
      makeHref: React.PropTypes.func,
      transitionTo: React.PropTypes.func,
      replaceWith: React.PropTypes.func,
      goBack: React.PropTypes.func,
      getCurrentPath: React.PropTypes.func,
      getCurrentRoutes: React.PropTypes.func,
      getCurrentPathname: React.PropTypes.func,
      getCurrentParams: React.PropTypes.func,
      getCurrentQuery: React.PropTypes.func,
      isActive: React.PropTypes.func
    },
     
    getChildContext: function() {
      return assign({}, {
        makePath: function() {},
        makeHref: function() {},
        transitionTo: function() {},
        replaceWith: function() {},
        goBack: function() {},
        getCurrentPath: function() {},
        getCurrentRoutes: function() {},
        getCurrentPathname: function() {},
        getCurrentParams: function() {},
        getCurrentQuery: function() {},
        isActive: function() {}
      }, stubs);
    },
     
    render: function() {
      // return <Home/>;
      return <Component {...props}/>;
    }
  });
};
 
module.exports = stubRouterContext; 