module.exports = {
  convertRawLocation(rawLocation) {
    return {
      lat: Number(rawLocation.get('lat')),
      lng: Number(rawLocation.get('lng')),
    };
  }
};
