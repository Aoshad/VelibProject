// Countdown Object
var compteur = {

  minutes: null,
  secondes: null,
  time: null,
  instance: null,

  construct: function(minutes, secondes) {

    this.minutes = minutes;
    this.secondes = secondes;

    this.time = (this.minutes * 60 + this.secondes);

    var time = this.time;

    if(compteur.instance != null) {
      clearInterval(compteur.instance);
    }

    // Chrono set up with decrementing each second
    compteur.instance = setInterval(
      
      function() {

        var minutes = Math.floor(time / 60);
        var secondes = Math.floor(time - minutes * 60);
        time--;
        
        $('#footerText').text(" 1 vélo est réservé à : " + sessionStorage.getItem("reservationName") + " pendant " + minutes + " minutes et " + secondes + " secondes.");
            
        if (minutes === 0 & secondes === 0) {

            clearInterval(compteur.instance);
            $('#footerText').text("Votre réservation a expirée !");
            sessionStorage.clear();

        }

    }, 1000);

    return compteur.instance;

  }

};