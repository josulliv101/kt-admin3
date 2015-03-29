var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions/Actions.js');
var Route = Router.Route;

var Pagination = React.createClass({

  mixins: [ Router.Navigation ],
  
  getDefaultProps: function() {

  	return { active: 0, totalPages: 0, totalListings: 0, start: 0, end: 0 };

  },

  render: function() {
 	
 	var i = 1, items = [], {totalListings, totalPages,  active, start, end} = this.props,

 		// This is necessary when a url 'pg' param is invalid and entered directly into the browser
 		activePage = validatePageRange(active, totalPages), status;

 	// Ensure our ranges makes sense
	status = start < end 

				? <h5>{totalListings} Listings / Showing {start} - {end}</h5>

				: <script/>;

 	while (i <= totalPages) {

 		var params = { position: i },
        handleClick = this.props.handleClick;

 		items.push(
 			<li key={i} className={i === activePage ? 'active' : ''}>
 				<a href="#" onClick={this.onClick.bind(null, i)}>{i}</a>
 			</li>
 		);

 		i++;

 	};

    return (
		<nav className="clearfix">
		  <div className="listings-badge pull-left">
		  	{status}
		  </div>
		  <ul className="pagination pagination-sm pull-right">
		    <li>
		      <a href="#" aria-label="Previous" onClick={this.onClick.bind(null, this.props.active-1)}>
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
		    {items}
		    <li>
		      <a href="#" aria-label="Next" onClick={this.onClick.bind(null, this.props.active+1)}>
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		  </ul>
		</nav>
    )
  },

  onClick: function(pageIndex, ev) {

  	ev.preventDefault();

  	pageIndex = validatePageRange(pageIndex, this.props.totalPages);

  	// Ignore if there's no change or app is currently fetching data
  	if (this.props.isLoading || this.props.active === pageIndex) return;

  	// Update url hashtag
  	//...this.transitionTo('pagination', { page: pageIndex, type: this.props.type });

    this.props.clickHandler(pageIndex)
  	//Actions.setPage(pageIndex);

  }
  
});


function validatePageRange(position, maxPosition) {

  var pos = Number(position) || 1;

  // Needs to be greater than 0
  pos = Math.max(pos, 1);

  pos = Math.min(pos, maxPosition); 

  return pos;
}

module.exports = Pagination;