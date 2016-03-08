import alt from '../alt';

class SearchActions {

  fetchResults(searchText, bounds) {
    return searchText;
  }

  loadingResults() {
    return function(dispatch) {
      dispatch();
    }
  }

  receivedResults(results) {
    return results;
  }

  fetchingResultsFailed(error) {
    return error;
  }
}

export default alt.createActions(SearchActions);
