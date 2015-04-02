var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions/Actions');

var Table = require('./Table');
var Pagination = require('./Pagination');
var LimitSelection = require('./LimitSelection');

var ResultsTable = React.createClass({

  mixins: [ Router.State, Router.Navigation ],

  propTypes: {

    getResults: React.PropTypes.func.isRequired

  }, 

  getInitialState: function() {

    return { limit: 10, items: [], page: 1, total: 0, isBusy: true };

  },

  getDefaultProps: function() {

    return { tags: [], type: 'nonprofit', filterType: 'nonprofit', filterTags: [] };

  },

  componentDidMount: function() {

    //Actions.getPlacesByType(this.props.type);

    this.props.getResults(this.state, this.props.filterType, this.props.filterTags)

        .then(this.receiveResults);

  },

  // move to better lifecycle fn
  componentDidUpdate: function(prevProps, prevState) {

    var {page, limit} = this.state;
console.log('componentDidUpdate', page, limit);
    // No change
    if (prevState.page === page 

          && prevState.limit === limit 

          && prevProps.filterType === this.props.filterType

          && prevProps.filterTags === this.props.filterTags

        ) return;

    this.props.getResults(this.state, this.props.filterType, this.props.filterTags)

        .then(this.receiveResults);

  },

  receiveResults: function(data) {

    console.log('receiveResults', data);

    if (!data) return;

    this.setState({ items: data.items, total: data.total, isBusy: false });

  },

  render: function() {

    var { isBusy, tags, type } = this.props,

        { items, limit, page, total } = this.state,

        offset = (page-1) * limit,

        pageRange = getDisplayedItemsRange(page, limit, total);

    return (
      <div className="results-table">
        <LimitSelection current={limit} sizes={[5, 10, 15]} handler={this.setLimitSize}/>
        <Pagination 
          isLoading = {isBusy} 
          totalListings = {items.length} 
          active = {page} 
          totalPages = {Math.ceil(total/limit)} 
          start = {pageRange.start}
          end = {pageRange.end}
          type= {type}
          clickHandler={this.setPage}
        />
        <Table items={items} isLoading = {isBusy} listItemCmp={this.props.listItemCmp} />
        <label>{this.props.filterType}</label><label>{this.props.filterTags}</label>
      </div>
    )
  },

  setLimitSize: function(size) {

    console.log('set limit', size, this);

    this.setState({ limit: size });
  },

  setPage: function(page) {

    console.log('set page', page, this);

    this.setState({ page: page, isBusy: true });
  }

});

module.exports = ResultsTable;

function getDisplayedItemsRange(activePage, limit, total) {

  return { 

    start: (activePage - 1) * limit + 1,

    end: Math.min(((activePage-1)  * limit + limit), total)

  };

}