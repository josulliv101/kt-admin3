'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Actions = require('../../actions/Actions');
var classNames = require('classnames');

var Search = React.createClass({

  mixins: [ Router.Navigation ],

	propTypes: {

    // Required
    getResults: React.PropTypes.func.isRequired,

    handleClick: React.PropTypes.func.isRequired,

    results: React.PropTypes.array,

    isBusy: React.PropTypes.bool,

    minQueryTextLength: React.PropTypes.number

  }, 

	getInitialState: function() {

    return { query: '', isBusy: false, results: [] };

  },

  getDefaultProps: function() {

  	return {

  		minQueryTextLength: 2,

  		placeholderText: 'Find a good cause to help',

      txtNoResults: 'No results match this search term.',

      handleClick: function(id) {

        console.log('!!!!', id, this);

        this.transitionTo('profile', { profile: id });

      }

  	};

  },

	onChange: function(ev) {

		var q = ev && ev.target && ev.target.value.trim();

    if (q) this.setState({ isBusy: true, query: q });

    // Clear results term does not validate
	  if (!this.isSearchTermValid(q)) return this.setState({ results: [] });

    this.props.getResults(q)

        .then(this.handleReturnedResults)

        .catch(function(error) {

          console.log(error);

        })

	},

  handleReturnedResults: function(items) {

    console.info('handleReturnedResults', items);

    this.setState({ isBusy: false, results: items });

  },

  isSearchTermValid: function(term) {

    var isValid = !!term && term.length >= this.props.minQueryTextLength;

    return isValid;

  },

  render: function() {

  	var isTermValid = this.isSearchTermValid(this.state.query),

        results = getResultsDOM(this.state.results, isTermValid, this.props.txtNoResults, this.state.isBusy, this);

    return (
      <div className={classNames('form-group', { isBusy: this.state.isBusy })}>
        <div className="input-group search">
          <i className="glyphicon glyphicon-search"></i>
          <input 
          	type="text" 
          	className="form-control input-lg" 
          	id="exampleInputAmount" 
          	placeholder={this.props.placeholderText}
          	ref="searchInput" 
          	defaultValue={this.state.query}
          	onChange={this.onChange} />
          <span className="browse-directory">Enter the name of a good cause above or browse the <a>Directory of Good Causes</a>.</span>
        </div>
				<ul ref="results" className="results">
        	{results}
        </ul>
      </div>
    );
  }
  
});

function getResultsDOM(items, isTermValid, txtNoResults, isBusy, context) {

  // No results found
  if (!isBusy && isTermValid && items && items.length === 0) return <li>{txtNoResults}</li>;

  // Results list
  return items.map(function(result, index) { 

    var boundFn = function() {

        context.props.handleClick(result.id);

        context.setState({ results: [], query: '' });

        context.refs.searchInput.getDOMNode().value = '';

      }

    return (
      <li key={result.id} className="clearfix">
        <span className="search-result" onClick={boundFn}>{result.name}</span>
        <span className="pull-right label">{result.type}</span>
      </li>
    );
  });

}

module.exports = Search;