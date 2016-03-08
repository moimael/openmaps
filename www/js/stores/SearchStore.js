import alt from '../alt';
import { bind, createStore, datasource } from 'alt-utils/lib/decorators';
import AppUtils from '../utils/AppUtils';
import Actions from '../actions/Actions';
import SearchActions from '../actions/SearchActions';
import SearchSource from '../sources/SearchSource';

@createStore(alt)
@datasource(SearchSource)
class SearchStore {
  constructor() {
    this.searchText = "";
    this.results = [];

    // this.bindListeners({
    //   handleLoadingResults: SearchActions.LOADING_RESULTS,
    //   handleUpdateLocations: Actions.UPDATE_LOCATIONS,
    //   handleFetchLocations: Actions.FETCH_LOCATIONS,
    //   handleLocationsFailed: Actions.LOCATIONS_FAILED,
    // });
  }

  @bind(SearchActions.loadingResults)
  handleLoadingResults() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    if (this.getInstance().isLoading()){
      if (this.searchText !== "") {
        this.showSuggestions = true;
      } else {
        this.showSuggestions = false;
      }
    }
  }

  handleUpdateLocations(locations) {
    this.locations = locations.map(function(location) {
      return ({
          'id': location.id,
          'mainText':  (location.housenumber ? location.housenumber + ' ' : '') + (location.street ? location.street : location.name),
          'subText': (location.city ? location.city + ', ' : '') + location.country,
          'data': location
        }
      );
    });
    this.errorMessage = null;
  }

  @bind(SearchActions.fetchResults)
  handleFetchLocations(searchText) {
    this.searchText = searchText;
    if (!this.getInstance().isLoading()){
      this.getInstance().performSearch();
    }

    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleClearText() {
    this.searchText = "";
    this.showSuggestions = false;
    this.locations = [];
  }

  handleUserPosition(location) {
    this.userPosition = location.latlng;
    this.accuracy = location.accuracy;
    this.hasUserPosition = true;
    this.center = this.userPosition;
    this.zoom = 13;
  }

  handleCurrentLocation(item) {
    this.currentLocation = item.data;
    this.searchText = (this.currentLocation.housenumber ? this.currentLocation.housenumber + ' ' : '')
      + (this.currentLocation.street ? this.currentLocation.street + ', ' : this.currentLocation.name)
      + (this.currentLocation.city ? this.currentLocation.city : '');
    this.hasCurrentLocation = true;
    this.zoom = 16;
    this.center = this.currentLocation.latlng;
    this.showSuggestions = false;
  }
}

export default SearchStore;
