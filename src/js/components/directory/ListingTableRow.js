var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions/Actions');

var ListingTableRow = React.createClass({

  mixins: [ Router.Navigation ],

  render: function() {

    var {address, city, unit, price, desc, updatedat, sqft, rooms, thumbnail, id } = this.props;

    return (
      <div className="media listing listing-table-row clearfix" onClick={this.handleDetails.bind(null, id)}>
        <div className="media-left">
          <a href="#"> </a>
        </div>
        <div className="media-body">
          <div>
            <p className="text-primary price">{price} <span className="pull-right">{city}</span></p>
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

module.exports = ListingTableRow;