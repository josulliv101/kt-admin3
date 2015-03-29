var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions/Actions');

var Listing = React.createClass({

  mixins: [ Router.Navigation ],

  render: function() {

    var {address, city, unit, price, desc, updatedat, sqft, rooms, thumbnail, id } = this.props;

    return (
      <div className="media listing clearfix" onClick={this.handleDetails.bind(null, id)}>
        <div className="media-left">
          <a href="#"> </a>
        </div>
        <div className="media-body">
          <h5 className="media-heading text-muted">{city}</h5>
          <h2 className="title">{rooms}  / {sqft} square ft</h2>
          <div>
            <p className="text-primary price">{price}</p>
          </div>
          <div className={thumbnail ? 'has-thumbnail' : ''}>
            <p className="thumbnail"><img src={thumbnail} /></p>
          </div>
          <div>
            <p className="text-muted desc hide">{desc}</p>
          </div>
          <div className="footer hide">
            <div className="last-updated">Last updated: {updatedat}</div>
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-xs details-link" onClick={alert.bind(null, 'Follow')}>Follow</button>
              <button type="button" className="btn btn-default btn-xs details-link" onClick={alert.bind(null, 'Flex')}>Flex Social Media Muscles</button>
              <button type="button" className="btn btn-default btn-xs details-link" onClick={this.handleDetails.bind(null, id)}>Full Details</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleDetails: function(id) {

    //Actions.setActiveOrg(id);

    this.transitionTo('profile', { profile: id });

  }
  
});

module.exports = Listing;