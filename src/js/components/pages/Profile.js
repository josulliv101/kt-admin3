var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Router = require('react-router');
var UserStore = require('../../stores/UserStore');
var Actions = require('../../actions/Actions');
var Featured = require('../Featured.jsx');
var ElasticWebAPI = require('../../utils/ElasticSearch');

/*

TidBits

- Why I Help
- Ways to Help
- Help Needed
- Who's Willing To Help
- Helpful Info
- Help Spread the Word


*/
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

    var urlTidbits = "https://kindturtle.firebaseio.com/tidbits/" + id;

    if (!this.firebaseRefs['tidbits'] && id) this.bindAsArray(new Firebase(urlTidbits), "tidbits");

     var urlSponsors = "https://kindturtle.firebaseio.com/sponsorship/" + id;

    if (!this.firebaseRefs['sponsorship'] && id) this.bindAsArray(new Firebase(urlSponsors), "sponsorship");
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
        goodCause = isCause ? <h4 className="verified"><span className="glyphicon glyphicon-heart" /> Good Cause </h4> : <h4 className="verified">Supporter of Good Causes <span className="glyphicon glyphicon-heart-empty hide" /></h4>,
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

    thumbnail = (thumbnail && true ? <div><h4>Website</h4><img className="website" src={thumbnail} /></div> : <script/>);
    console.log('tidbits', this.state && this.state.tidbits);
    return (
      <div id="profile" className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>&nbsp;</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            
            <div className="profile-pic"><img src={profilePic} /></div>
            <h4>General</h4>
            <ul className="nav nav-pills nav-stacked">

              <li role="presentation" className="active"><a href="#"><span className="badge badge-sm pull-right">45</span>Tidbits</a></li>
              
              <li role="presentation" className=""><a href="#"><span className="badge badge-sm pull-right">45</span>Ways to Help</a></li>

              <li role="presentation" className=""><a href="#"><span className="badge badge-sm pull-right">45</span>Who&apos;s Helping &amp; Why</a></li>
              
            </ul>

            <h4>Giving Campaigns</h4>
            <ul className="nav nav-pills nav-stacked">
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Philanthropic Followers</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Please Dont Send Me Cards</a></li>
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Social Media Muscles</a></li>
            </ul>

            <h4>Fun Stuff</h4>
            <ul className="nav nav-pills nav-stacked">
              <li role="presentation"><a href="#"><span className="badge badge-sm pull-right">14</span>Koala Love</a></li>
              
            </ul>
            <hr/>
            
          </div>
          <div id="profile-content" className="col-md-6">
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
              
              <div className="tidbits-menu clearfix">
                <h4 className="pull-left">Tidbits</h4>
                <button className={"pull-right btn btn-primary " + (this.state.newTidbit || id !== this.state.uid ? 'hide' : '')} onClick={this.postItem}>Post New Tidbit</button>
              </div>
              {newTidbit}
              
              <div aria-label="Default button group" role="group" className="btn-group btn-group-sm">
                <button 
                  className={'btn btn-default active'} 
                  type="button"
                >All</button>
                <button className={'btn btn-default ' } type="button">Why Help?</button>
                <button className={'btn btn-default ' } type="button">Essential Info</button>
                <button className={'btn btn-default ' } type="button">Spread the Word</button>
                
                <button className={'btn btn-default ' } type="button">Resources</button>
              </div>
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
                  <div className="follow">
                     Philanthropic Follow <span className="glyphicon glyphicon-gift hide"/>
                  </div>
<hr/>
{thumbnail}
<hr/>
                  <h5 className="sponsorship">This causes page made possible by:</h5>
                  <ul className="sponsorship-squares">
                    {this.state.sponsorship && this.state.sponsorship.map(function(sponsor) { return <li><a href={'#' + sponsor}><img src={"/img/sponsors/" + sponsor + ".png"} /></a></li>; })}
                  </ul>
                </div>
              </div>

              <div className="row hide">
                <div id="profile-side" className="col-md-12">
                  <div className="follow">
                     Sponsor This Cause <span className="glyphicon glyphicon-gift hide"/>
                  </div>
                  <p><strong>The Sullivan Family</strong><br/>Cambridge, MA</p>
                  <p>Help crowd-fund this page&apos;s sponsorship. Become a Sponsor &gt;</p>
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