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
            <div className="col-sm-3 col-md-3">
              <h2>Filter Stuff</h2>
              <Filter ref='filter' handler={this.setFilterTags} handleChange={this.setFilterType}/>
            </div>
            <div className="col-sm-6 col-md-6">
              <ResultsTable listItemCmp={this.props.listItemCmp} filterTags={this.state.filterTags} filterType={this.state.filterType} getResults={ElasticWebAPI.getDirectoryResults}/>
            </div>
            <div className="col-md-3">

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">


                    <h5 className="sponsorship">Featured Profiles:</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 nopadding">


                    <p><img className="sponsor-img" src="/img/sponsors/dph.png"/></p>
                    <p><img className="sponsor-img" src="/img/sponsors/jpl.png"/></p>
                    <p><img className="sponsor-img" src="/img/sponsors/theta-chi.png"/></p>
                    <p><img className="sponsor-img" src="/img/sponsors/somerville.png"/></p>


                  </div>
                  <div className="col-md-6 nopadding">
                    
                    <p><img className="sponsor-img" src="/img/sponsors/hi-rise.png"/></p>
                    <p><img className="sponsor-img" src="/img/sponsors/formagio.png"/></p>
                    
                    
                    <p><img className="sponsor-img" src="/img/sponsors/magicbeans.png"/></p>
                    <p><img className="sponsor-img" src="/img/sponsors/crateescape.png"/></p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
});

module.exports = Search;