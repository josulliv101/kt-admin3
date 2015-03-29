var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Searchbox = require('../forms/Searchbox.jsx');
var Featured = require('../Featured.jsx');
var ResultsTable = require('../directory/ResultsTable');
var Filter = require('../directory/Filter');
var ElasticWebAPI = require('../../utils/ElasticSearch');
var FirebaseWebAPI = require('../../utils/Firebase');

var Home = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {

    return { filterType: 'nonprofit', filterTags: [] };

  },

  handleSearchboxClick: function(id) {

    console.log('!!!!', id, this);

    this.transitionTo('profile', { profile: id });

  },

  render: function() {

    // Our social platform creates fun &amp; innovative online opportunities that help good causes <strong>grow</strong> charitable giving, <strong>connect</strong> people, <strong>engage</strong> followers &amp; <strong>share</strong> ideas. 

    return (
      <div>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <img src="./img/buster.png" alt="First slide"/>
              <div className="container">
                <div className="carousel-caption">
                  <Searchbox getResults={ElasticWebAPI.getResults} handleClick={this.handleSearchboxClick} />
                  <h3>Our social platform is for anyone who supports a good cause. We help good causes <strong>grow</strong> giving, <strong>connect</strong> people, <strong>engage</strong> followers &amp; <strong>share</strong> information. </h3>
                  <p>
                    <a className="btn btn-lg btn-primary" href="#" role="button">Create a Profile</a>
                  </p>
                  <h4>Your profile allows you to support good causes and add your own good causes.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="features" className="container marketing">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h2>Featured Causes</h2>
            </div>
          </div>
          <Featured 
            limit={6} 
            getFeatured={FirebaseWebAPI.getFeatured.bind(null, 6)}
            handleClick={this.handleSearchboxClick}
          />
        </div>


        <div id="about" className="container marketing">
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It'll blow your mind.</span></h2>
              <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-responsive" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjE4OS4zMjUwMDA3NjI5Mzk0NSIgeT0iMjUwIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjIzcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NTAweDUwMDwvdGV4dD48L2c+PC9zdmc+" alt="Generic placeholder image"/>
            </div>
          </div>
        </div>

        <div id="faq" className="container marketing">
          <div className="row featurette">
            <div className="col-md-5">
              <img className="featurette-image img-responsive" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjE4OS4zMjUwMDA3NjI5Mzk0NSIgeT0iMjUwIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjIzcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NTAweDUwMDwvdGV4dD48L2c+PC9zdmc+" alt="Generic placeholder image"/>
            </div>
            <div className="col-md-7">
              <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
              <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
          </div>
        </div>

        <div id="add" className="container marketing">
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
              <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-responsive" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjE4OS4zMjUwMDA3NjI5Mzk0NSIgeT0iMjUwIiBzdHlsZT0iZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjIzcHQ7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NTAweDUwMDwvdGV4dD48L2c+PC9zdmc+"  alt="Generic placeholder image"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
});

module.exports = Home;