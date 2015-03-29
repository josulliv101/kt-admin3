var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Router = require('react-router');
var UserStore = require('../../stores/UserStore');
var Actions = require('../../actions/Actions');
var Featured = require('../Featured.jsx');
var ElasticWebAPI = require('../../utils/ElasticSearch');

var Profile = React.createClass({
  
  mixins: [Router.State, Router.Navigation, ReactFireMixin],

  getInitialState: function() {

    return getStateFromStores();

  },

  getDefaultProps: function() {

    return {};

  },

  componentDidMount: function() {

    UserStore.addChangeListener(this.onChange);

  },

  componentWillUnmount: function() {

    UserStore.removeChangeListener(this.onChange);

  },

  componentWillUpdate: function() {

    var id = this.state.profile && (this.state.profile.createdBy || this.state.profile.id);

    var url = "https://kindturtle.firebaseio.com/tidbits/" + id;

    if (!this.firebaseRefs['tidbits'] && id) this.bindAsArray(new Firebase(url), "tidbits");

  },

  onChange: function() {

    this.setState(getStateFromStores());

  },

  handleCauseClick: function(id) {

    console.log('!!!!', id, this);

    this.transitionTo('profile', { profile: id });

  },

  postItem: function(ev) {

    ev.preventDefault();

    console.log('postItem');

    this.setState({ newTidbit: true });

  },

  addTidbit: function(ev) {

    ev.preventDefault();

    console.log('addTidbit', this.state.uid);

    

    this.firebaseRefs['tidbits'].push({ 
      createdAt: new Date().getTime(),
      createdBy: this.state.uid,
      content: this.refs.tidbitContent.getDOMNode().value,
    }, this.setState.bind(this, { newTidbit: false }));
/**/

    //this.setState({ newTidbit: false });

  },

  cancelTidbit: function(ev) {

    ev.preventDefault();

    console.log('cancelTidbit');

    this.setState({ newTidbit: false });

  },

  render: function() {

    var name = this.state.firstname || this.state.username,
        id = this.state.profile && (this.state.profile.createdBy || this.state.profile.id),
        profile = this.state.profile && this.state.profile.name,
        thumbnail = this.state.profile && this.state.profile.thumbnail,
        isCause = !!(this.state.profile && (this.state.profile.type === 'nonprofit' || this.state.profile.type  === 'edu')),
        goodCause = isCause ? <h4 className="verified">Good Cause <span className="glyphicon glyphicon-heart" /></h4> : <h4 className="verified">Supporter of Good Causes <span className="glyphicon glyphicon-heart-empty hide" /></h4>,
        mycauses = this.state.profile && this.state.profile.mycauses || ['null'],
        profilePic = this.state.profile && this.state.profile.profilePic || this.state.profile && this.state.profile.logo2 || '/img/logos/blank.png',
        elCause = this.state.cause ? <p>Yes, I am a good cause.</p> : <script/>,
        muscles = isCause ? <div><hr/><p>Flex your social media muscles for this good cause</p><button className="btn btn-large btn-default">flex muscles</button></div> : <script/>,
        newTidbit = this.state.newTidbit === true ? (
          <div className="new-tidbit">
            <textarea ref="tidbitContent" defaultValue="" placeholder="Please enter your tidbit..." />
            <div className="btn-group">
              <button className="btn btn-default" onClick={this.addTidbit}>Add</button>
              <button className="btn btn-default" onClick={this.cancelTidbit}>Cancel</button>
            </div>
          </div>
        ) : <script/>,
        mycauses = !isCause ? (<div><hr/>
            <h4>Good Causes I Sponsor</h4>
            <Featured 
              label={profile + mycauses.length} 
              limit={2}
              handleClick={this.handleCauseClick} 
              getFeatured={ElasticWebAPI.getCausesById.bind(this, mycauses)}/></div>) : <script/>;

    console.log('params', this.getParams());

    console.log('state', this.state);

    var username = this.getParams().profile;

    if (!username) return <script/>;

    console.log('username', !this.state.profile || this.state.profile.id !== username);

    // If username has changed
    if (!this.state.profile || this.state.profile.id !== username) setTimeout(function() { 

      Actions.fetchFullProfileData(username); 

    }, 0);

    if (!!id && this.state && !this.state.tidbits) setTimeout(function() { 
 
      console.log('@@@@', id);
      Actions.fetchTidbitProfileData(id); 

    }, 0);

    thumbnail = (thumbnail && false ? <div><h4>Website</h4><img className="website" src={thumbnail} /></div> : <script/>);
    console.log('tidbits', this.state && this.state.tidbits);
    return (
      <div id="profile" className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>&nbsp;</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            
            <div className="profile-pic"><img src={profilePic} /></div>

            <ul className="nav nav-pills nav-stacked">
              <li role="presentation" className="active"><a href="#"><span className="badge badge-sm pull-right">12</span>Tidbits</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">4</span>Causes I Help</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">2</span>Giving Campaigns</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">23</span>Philanthropic Followers</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Philanthropicly Following</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Website Bookmarks</a></li>
            </ul>

            <hr/>
            {thumbnail}
          </div>
          <div id="profile-content" className="col-md-7">
            <div data-example-id="simple-horizontal-form" className="bs-example">
              
              <h2 className="profile-title">{profile}</h2>
              {goodCause}
              <hr/>
              <div aria-label="Small button group" role="group" className="btn-group btn-group-sm hide">
                <button className="btn btn-primary active" type="button">Tidbits</button>
                <button className="btn btn-primary" type="button">Philanthropic Followers</button>
                <button className="btn btn-primary" type="button">Following</button>
                <button className="btn btn-primary" type="button">Giving Campaigns</button>
              </div>
              <hr/>
              <div className="tidbits-menu clearfix">
                <h4 className="pull-left">Tidbits</h4>
                <button className={"pull-right btn btn-primary " + (this.state.newTidbit || id !== this.state.uid ? 'hide' : '')} onClick={this.postItem}>Post New Tidbit</button>
              </div>
              {newTidbit}
              <hr/>
              <ul className="tidbits">
                {this.state.tidbits && this.state.tidbits.map(function(bit) { return <li>{bit.content}</li>; })}
              </ul>
               
              {elCause}
            </div>
          </div>
          <div className="col-md-3">

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">


                  <h5 className="sponsorship">This page is made possible by:</h5>
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
              <div className="row">
                <div id="profile-side" className="col-md-12">
                  <div className="follow">
                     Sponsor This Cause <span className="glyphicon glyphicon-gift hide"/>
                  </div>
                  <p><strong>The Sullivan Family</strong><br/>Cambridge, MA</p>
                  <p>Help crowd-fund this page's sponsorship. Become a Sponsor &gt;</p>
                  <hr/>

                  <p className="hide"><span className="badge badge-sm">2</span> sponsors have raised <strong>$200</strong> for this cause. Become a sponsor.</p>
                  
                  <p className="hide"><span className="badge badge-sm">5</span> Kindturtle users have raised <strong>$340</strong> for this cause.</p>
                  <hr/>

                  
                  <p>
                    Philanthropic Followers <span className="badge pull-right">12</span>
                  </p>
            
                  <p>
                     Total Raised <strong className="pull-right">$400</strong>
                  </p>

                  <div className="follow-help">This is a philanthropic follow.</div>
                  {muscles}
                  {mycauses}
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
  
});

function getStateFromStores() {

  return UserStore.getState();

}

module.exports = Profile;