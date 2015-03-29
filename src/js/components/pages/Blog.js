var React = require('react');

var Router = require('react-router');
var UserStore = require('../../stores/UserStore');
var Actions = require('../../actions/Actions');

var Profile = React.createClass({
  
  mixins: [Router.State],

  render: function() {

    var profile = this.getParams().profile;

    return (
      <div id="profile" className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Blog</h2>
            <p></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div data-example-id="simple-horizontal-form" className="bs-example">
              <h4>The blog...</h4>
            </div>
          </div>
          <div className="col-md-3">
            <p className="lead">MyStuff</p>
          </div>
        </div>
       </div>
    );
  }
  
});


module.exports = Profile;