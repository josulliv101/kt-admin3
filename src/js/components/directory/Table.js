var React = require('react');
var Listing = require('./Listing');
var numeral = require('numeral');
var moment = require('moment');

function cityStateZip(loc) {
	return `${loc.locality}, ${loc.region} ${loc.postal}`;
}

var Table = React.createClass({

  getInitialProps: function() {
  	return { items: [] };
  },

  render: function() {
 	var Cmp = this.props.listItemCmp;

 	var items = this.props.items.map(function(item) {

/* 		var price = item.cur_data && numeral(item.cur_data.price).format('$0,0'),
 			loc = item.location,
 			cur = item.cur_data,
 			city = cityStateZip(loc),
 			mapurl = "https://maps.googleapis.com/maps/api/staticmap?center=" + loc.coords[0] + "," + loc.coords[1] + "&zoom=17&size=216x169";
*/
 		return (
 			<Cmp 
 				key={item.id}
 				id={item.id}
 				address={item.addr1} 
 				city={!item.city ? '' : item.city + ', ' + item.state}
 				price={item.name}
 				desc={item.type}
 				updatedat={item.type}
 				sqft={0}
 				rooms={0}
 				thumbnail={item.logo2 || item.thumbnail}
 			/>
 		);
 	}),

 	classes = this.props.isLoading === true ? 'loading' : '';

    return (
	  <div id="listing-table" className={classes}>
	    <div className="table-listings well well-lg">
	      	{items}
	    </div>
	    <div className="ajax-loader"/>
	  </div>
    )
  }
  
});

module.exports = Table;