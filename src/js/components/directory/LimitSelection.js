var React = require('react');
var Actions = require('../../actions/Actions.js');

var LimitSelection = React.createClass({

  render: function() {

  	var btns = this.props.sizes.map(function(size) { 

  		var classes = 'btn btn-primary btn-xs ' + (this.props.current === size ? 'selected' : '');

  		return (
  			<button key={size} className={classes} type="button" onClick={this.onClick.bind(null, size)}>
  				{size}
  			</button>
  		);

  	}, this);

    return (
	  	<div className="limit-selection">Items per page: {btns}</div>
    );
  },

  onClick: function(size, ev) {

  	ev.preventDefault();

  	//Actions.setLimitSize(size);

    this.props.handler(size);
    
  }
  
});

module.exports = LimitSelection;