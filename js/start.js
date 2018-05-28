// On load of the page, check for timestamp/countdown existence
$( window ).load(function() {

  if(sessionStorage.getItem('timestamp')) {
    
    // If there's a countdown, calculation of delta
  	var oldTimestamp = sessionStorage.getItem('timestamp');
  	var newTimestamp = Math.round(new Date().getTime() / 1000);

  	var deltaTimestamp = newTimestamp - oldTimestamp;

  	if(deltaTimestamp > (20 * 60)) {

  		sessionStorage.clear();

  	} else {
      // And re-creation of countdown
      var minutes = Math.floor(((20 * 60) - deltaTimestamp) / 60);
      var secondes = Math.round((20 - minutes) * 60 - deltaTimestamp);

  		compteur.instance = compteur.construct(minutes, secondes);

  	}
  }
});

