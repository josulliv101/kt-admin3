var React = require('react');
var Searchbox = require('../forms/Searchbox.jsx');
var ResultsTable = require('../directory/ResultsTable');
var Filter = require('../directory/Filter');
var ElasticWebAPI = require('../../utils/ElasticSearch');
var FirebaseWebAPI = require('../../utils/Firebase');

var Listing = require('../directory/Listing');

var Search = React.createClass({

  getInitialState: function() {

    return { filterType: 'nonprofit', filterTags: [] };

  },

  getDefaultProps: function() {

    return { listItemCmp: Listing, isContainerFluid: false };

  },

  setFilterType: function(type) {

    console.log('setFilterType', type);

    this.setState({ filterType: type });

  },

  setFilterTags: function(tags) {

    console.log('filterTags', tags);

    this.setState({ filterTags: tags });

  },

  render: function() {

    var containerClass = this.props.isContainerFluid ? 'container-fluid' : 'container' ;
    
    return (
      <div id="profile" className={containerClass}>
        <div className="row">
          <div className="col-md-12">
            <h2>Good Cause Directory</h2>
            <p></p>
          </div>
        </div>
        <div id="directory" className={containerClass}>
          <div className="row">
            <div className="col-sm-2 col-md-2">
              <h2>Filter Stuff</h2>
              <Filter ref='filter' handler={this.setFilterTags} handleChange={this.setFilterType}/>
            </div>
            <div className="col-sm-10 col-md-10">
              <ResultsTable listItemCmp={this.props.listItemCmp} filterTags={this.state.filterTags} filterType={this.state.filterType} getResults={ElasticWebAPI.getDirectoryResults}/>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
});

module.exports = Search;