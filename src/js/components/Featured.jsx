'use strict';

var React = require('react/addons');
var Actions = require('../actions/Actions');
var classNames = require('classnames');

var Featured = React.createClass({

  propTypes: {

    getFeatured: React.PropTypes.func.isRequired

  },

  getInitialState: function() {

    return { items: [] };

  },

  getDefaultProps: function() {
    return { limit: 4, columns: 12, handleClick: function() {} };
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('@componentDidUpdate', prevState.items.length, this.state.items.length);
    //if (this.state.items.length === prevState.items.length) return;

    this.props.getFeatured()

        .then(this.handleAjaxResponse)

  },

  componentDidMount: function() {
    
    this.props.getFeatured()

        .then(this.handleAjaxResponse)

  },

  handleAjaxResponse: function(items) {

    if (this.state.items.length === items.length) return;

console.log('handleAjaxResponse::', items.length);
    this.setState({ items: items});

  },

  render: function() {
console.log('handleAjaxResponse::render', this.state.items.length);
    var columnWidth = this.props.columns/this.props.limit,
        items = this.state.items.map(function(item) { return getFeature(item, columnWidth, this.props.handleClick.bind(this, item.id)); }, this);

    return (
			<div ref="featured" className="featured">
        <div className="row">
          {items}
        </div>
        <div className="">{this.props.label}</div>
      </div>
    );
  }
  
});

function getFeature(item, columnWidth, handleClick) {

  var classes = "col-sm-" + columnWidth + " col-md-" + columnWidth;

  return (
    <div className={classes} onClick={handleClick}>
      <div className="thumbnail">
        <img className="blank" src={item.logo2 || item.thumbnail} alt={item.name}/>
        <div className="caption">
          <h3>{item.name}</h3>
        </div>
      </div>
    </div>
  );
}

module.exports = Featured;