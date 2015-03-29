var request  = require('superagent-bluebird-promise');

var urlBase = 'http://localhost:9200/firebase/place/_search?';

module.exports = {

  getCausesById: function(idsArray) {

    var q = idsArray.map(function(id) { return '"' + id + '"'; }).join(' ');

    return request.get(urlBase + 'size=100&sort=name:asc&q=(id:' + q + ')&pretty=true&from=0').promise()

      //.set('content-type', 'GET')

      .then(function(res) {

        console.log('superagent', res.body);

        return res.body.hits.hits.map(function(hit) { return hit._source; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  getResults: function(term) {

    var q = transformQueryTerm(term);

    return request.get(urlBase + 'size=10&sort=name:asc&q=(fullname:' + q + ') OR (name:' + q + ')&pretty=true&from=0').promise()

      //.set('content-type', 'GET')

      .then(function(res) {

        console.log('superagent', res.body);

        return res.body.hits.hits.map(function(hit) { return hit._source; });

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  getDirectoryResults: function(state, filterType, filterTags) {

    var { limit, page } = state,

        offset = (page-1) * limit,

        q = 'q=type:' + filterType + (filterTags.length > 0 ? ' AND tags:' + filterTags.join(',') : '');

    return request.get(urlBase + q + '&size=' + limit + '&sort=name:asc&pretty=true&from=' + offset).promise()

      //.set('content-type', 'GET')

      .then(function(res) {

        console.log('superagent', res.body);

        return { 

          items: res.body.hits.hits.map(function(hit) { return hit._source; }),

          total: res.body.hits.total

        };

      })

      .catch(function(error) {

        console.log('catch', error);

      })

  },

  handleReturnedResults: function(items) {

    console.log('handleReturnedResults', items);
    
  }

};

function transformQueryTerm(query) {

  var q = query;

  q = q.replace('&', '');

  q = q.split(' ').map(function(term) { return term + '*'; });

  q = q.join(' AND ');

  return q;

}