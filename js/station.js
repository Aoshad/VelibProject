// Station Object creation  
var Station = {

  coords: null,
  name: null,
  address: null,
  status: null,
  availableStands: null,
  availableBikes: null,

  construct: function (coords, name, address, status, availableStands, availableBikes) {

    this.coords = coords;
    this.name = name;
    this.address = address;
    this.status = status;
    this.availableStands = availableStands;
    this.availableBikes = availableBikes;

  },

  // Translate method for station status
  translate: function(word) {

    if (word == 'OPEN') {
      word = 'Ouvert';
      return(word);
    }
    else if (word == 'CLOSED') {
      word == 'Fermé';
      return(word);
    }

  }

}

