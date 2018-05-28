// Modal Object 
var ModalObject = {

  modal: null,
  closeSpan: null,

  construct: function(modal, closeSpan) {

    ModalObject.modal = modal;
    ModalObject.closeSpan = closeSpan;

    // Events
    $(ModalObject.closeSpan).click(function() {

      ModalObject.modal.style.display = 'none';

    });

    $(ModalObject.window).click(function(e) {

      if (e.target === modal) {
        ModalObject.modal.style.display = 'none';
      }
    });

  }

};

ModalObject.construct (
  document.getElementById("myModal"),
  document.getElementsByClassName("close")
)


// Canvas Object
var Canvas = {

    canvas: null,

    clickX: null,
    clickY: null,
    clickDrag: null,

    paint: false,

    timerStation: null,

    construct: function (canvas, clickX, clickY, clickDrag, paint) {

      var chrono;

      // 2D context declaration
      context = canvas.getContext("2d");

      this.canvas = canvas;
      this.clickX = clickX;
      this.clickY = clickY;
      this.clickDrag = clickDrag;
      this.paint = paint;

      // On mouse down
      $('#canvas').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
              
        Canvas.paint = true;
        Canvas.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        Canvas.redraw();
      });

      // On mouse move
      $('#canvas').mousemove(function(e){
        if(Canvas.paint){
          Canvas.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          Canvas.redraw();
        }
      });

      // On mouse up and leave
      $('#canvas').mouseup(function(e){
        Canvas.paint = false;
      });

      $('#canvas').mouseleave(function(e){
        Canvas.paint = false;
      });

      // On click on erase button, X & Y arrays reset     
      $('#clear').click(function() {
        Canvas.clear();
      });
       
      // Event allowing modal showing
      $('#formButton').click(function() {
          $('#myModal').show();
      }); 

      // Error management of white canvas
      $('#validation').click(function() {

        if(canvas.toDataURL() == document.getElementById('blank').toDataURL())
          alert("N'oubliez pas de signer");
        else {

          alert("La réservation est enregistrée");

          // Erase and close of Canvas window 
          Canvas.clear(); 
          ModalObject.modal.style.display = 'none';
      

          sessionStorage.setItem('reservationName', $('#nameStation').text());
          sessionStorage.setItem('reservationStation', $('#addressStation').text());

          // Countdown & sessionStorage set up
          compteur.instance = compteur.construct(20, 0);

          // TimeStamp creation for when we reload page
          var timestamp = Math.round(new Date().getTime() / 1000);
          sessionStorage.setItem('timestamp', timestamp);  

        }

      });
      

    },

    // Filling coordinates arrays function
    addClick: function(x, y, dragging) {
      Canvas.clickX.push(x);
      Canvas.clickY.push(y);
      Canvas.clickDrag.push(dragging);
    },

    // Erase method creation 
    clear: function() {

        context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height); 
        Canvas.clickX = new Array();
        Canvas.clickY = new Array();
        Canvas.clickDrag = new Array();
    },

    // Draw function : trace creation & effective trace
    redraw: function() {
       context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
  
        context.strokeStyle = 'black';
        context.lineJoin = 'round';
        context.lineWidth = 5;
            
      for(var i=0; i < Canvas.clickX.length; i++) {        
        context.beginPath();
        if(Canvas.clickDrag[i] && i){
          context.moveTo(Canvas.clickX[i-1], Canvas.clickY[i-1]);
        }else{
          context.moveTo(Canvas.clickX[i]-1, Canvas.clickY[i]);
        }
          context.lineTo(Canvas.clickX[i], Canvas.clickY[i]);
          context.closePath();
          context.stroke();    
      }
    }

};

// Canvas variables initialization by construct
Canvas.construct(

  document.getElementById('canvas'),
  new Array(),
  new Array(),
  new Array(),
  false

);
