import $ from 'jquery';
import SearchActions from '../actions/SearchActions';

var jqXHR = null;

const SearchSource = {
  performSearch: {
    // remotely fetch something (required)
    remote(state) {
      let search_params = {
        'q': state.searchText,
        'limit': '8'
      };

      // if (boundsCenter) {
      //   search_params.lon = boundsCenter.lng;
      //   search_params.lat = boundsCenter.lat;
      // }

      // Abort current request if another one was launched in the mean time
      if (jqXHR !== null) {
        jqXHR.abort();
      }

      console.log(jqXHR);

      return $.getJSON('https://photon.komoot.de/api/', search_params);
    },

    // this function checks in our local cache first
    // if the value is present it'll use that instead (optional).
    // local(state) {
    //   return state.results[state.value] ? state.results : null;
    // },

    shouldFetch(state) {
      return true;
    },

    // here we setup some actions to handle our response
    // loading: SearchActions.loadingResults, // (optional)
    success: SearchActions.receivedResults, // (required)
    error: SearchActions.fetchingResultsFailed // (required)
  }
};

export default SearchSource;
