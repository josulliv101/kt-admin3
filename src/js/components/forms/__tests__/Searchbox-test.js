'use strict';

jest.dontMock('./../Searchbox.jsx');

describe('Searchbox', function() {

  var React = require('react/addons'),
      Searchbox = require('./../Searchbox.jsx'),
      TestUtils = React.addons.TestUtils,
      Promise = require('promise'),

      // Simulate ajax call
      mockPromise = function() {
        return new Promise(function (resolve, reject) {
          setTimeout(function() { resolve([]);}, 0);
        });
      };
      
  describe('When rendering', function() {

    it('creates an element for each item in the results array', function() {

      var searchbox, count;
          
      searchbox = TestUtils.renderIntoDocument(
        <Searchbox getResults={mockPromise} />
      );

      searchbox.setState({ results: [{ id: 1, name: 'one', type: 'my type'}, { id: 2, name: 'two', type: 'my type'}] });

      count = React.Children.count(searchbox.refs.results.props.children);

      expect(count).toBe(searchbox.state.results.length);

    });

    it('displays no results text when results are 0', function() {

      var elInput, elResults, q = 'my query',

          searchbox = TestUtils.renderIntoDocument(
            <Searchbox getResults={mockPromise} />
          );

      // Results start out as empty array

      // Query term needed so validation passes

      elInput = searchbox.refs.searchInput.getDOMNode();

      TestUtils.Simulate.change(elInput, {target: {value: q}});

      elResults = searchbox.refs.results.getDOMNode();

      // Wait until next tick to test for mock ajax
      setTimeout(function() { expect(elResults.children[0].textContent).toBe(searchbox.props.txtNoResults); }, 0);

      // Add some results
      searchbox.setState({ results: [{ id: 1, name: 'one', type: 'my type'}, { id: 2, name: 'two', type: 'my type'}] });

      expect(elResults.children[0].textContent).not.toBe(searchbox.props.txtNoResults);

    });

    it('does not call getResults when the term length does not meet minimum', function() {

      var mockSearch = jest.genMockFunction(), searchbox;

      mockSearch.mockReturnValue(mockPromise());

      searchbox = TestUtils.renderIntoDocument(
        <Searchbox minQueryTextLength={5} getResults={mockSearch} />
      );

      elInput = searchbox.refs.searchInput.getDOMNode();

      // This one is valid and calls getResults
      TestUtils.Simulate.change(elInput, {target: {value: 'abcdefghij'}});

      expect(mockSearch.mock.calls.length).toBe(1);

      // This one is not valid so count stays same
      TestUtils.Simulate.change(elInput, {target: {value: 'abcd'}});

      expect(mockSearch.mock.calls.length).toBe(1);

      // Same length should trigger getResults
      TestUtils.Simulate.change(elInput, {target: {value: 'abcde'}});

      expect(mockSearch.mock.calls.length).toBe(2);

    });

  });

  describe('When the inputbox term changes', function() {

    // Init 

    var el, searchbox, q = 'my query';

    searchbox = TestUtils.renderIntoDocument(

      <Searchbox getResults={mockPromise} />

    );
    
    el = searchbox.refs.searchInput.getDOMNode();

    TestUtils.Simulate.change(el, {target: {value: q}});

    // Tests

    it('updates the query attr of the state to the value of inputbox', function() {

      expect(searchbox.state.query).toBe(q);

    });

    it('sets state to busy', function() {

      expect(searchbox.state.isBusy).toBe(true);

    });

  });

  describe('The validation', function() {

    var searchbox = TestUtils.renderIntoDocument(

      <Searchbox minQueryTextLength={3} getResults={mockPromise} />

    );

    it('determines if a search term is long enough', function() {

      expect(searchbox.isSearchTermValid("my search term")).toBe(true);

      expect(searchbox.isSearchTermValid("a")).toBe(false);

      expect(searchbox.isSearchTermValid("123")).toBe(true);

      expect(searchbox.isSearchTermValid(null)).toBe(false);

      expect(searchbox.isSearchTermValid()).toBe(false);

    });

  });

});

