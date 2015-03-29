var React = require('react');
var Router = require('react-router');
var Actions = require('../../actions/Actions.js');

var Filter = React.createClass({

  mixins: [ Router.Navigation ],

  getDefaultProps: function() {

    return { tags: {animals: [], autism: [], cancer: [] }, activeTags: [], page: 1, type: 'nonprofit' };

  },

  hasTag: function(tag) {

    console.log('has tag', tag, this.props.activeTags)
    return this.props.activeTags.indexOf(tag) > -1;

  },

  // returns new array with toggled value
  toggleTag: function(tag) {
console.log(this.props.activeTags);
    var copy = this.props.activeTags.slice(),

        index = copy.indexOf(tag);

        

    // Toggle
    index === -1 ? copy.push(tag) : copy.splice(index, 1);

    return copy;

  },

  render: function() {

    var {type, tags, activeTags} = this.props,

        items = Object.keys(tags).map(function(tag) { 

          var classes = "tag-item " + (this.hasTag(tag) === true ? 'active' : '');

          return <li key={tag} className={classes}>
                  <a href="#" onClick={this.onClickTag.bind(null, tag)}>
                    {tag}
                    <label className="badge badge-sm pull-right">{tags[tag].length}</label>
                  </a>
                 </li>; 

        }, this);

    return (
	  	<div className="filter">
        <h5>Filters</h5>
        <div aria-label="Default button group" role="group" className="btn-group btn-group-xs">
          <button 
            className={'btn btn-default ' + (type === 'nonprofit' ? 'active' : '') } 
            type="button"
            onClick={this.onClick.bind(null, 'nonprofit')}
          >NonProfits</button>
          <button 
            className={'btn btn-default ' + (type === 'edu' ? 'active' : '') } 
            type="button"
            onClick={this.onClick.bind(null, 'edu')}
          >Colleges</button>
        </div>
        <h5>Tags <label className="badge badge-sm">{tags.length}</label></h5>
        <ul className="nav nav-pills nav-stacked">
          {items}
        </ul>
      </div>
    );
  },

  onClickTag: function(tag, ev) {

    ev.preventDefault();

    var tags = this.toggleTag(tag);

    console.log(tag);

    this.props.handler(tags);
    //Actions.setActiveTags(tags);

  },

  onClick: function(type, ev) {

  	ev.preventDefault();

  	//Actions.setType(type);
console.log('click', { page: this.props.page, type: type });

    this.props.handleChange(type);
    //this.transitionTo('pagination', { page: this.props.page, type: type });

  }
  
});

module.exports = Filter;