// Slider Object creation
var Slider = {

    previous: null,
    next: null,
    slides: null,
    currentSlide: null,

    construct: function (next, previous, slides, currentSlide) {

        Slider.previous = previous;
        Slider.next = next;
        Slider.slides = slides;
        Slider.currentSlide = currentSlide;

        // Showing Class add on central pic
        $('li:nth-child(3)').addClass("showing");

        $(Slider.previous).click(Slider.previousSlide);
        $(Slider.next).click(Slider.nextSlide);

        $(document).keydown(function (e) {
            if (e.keyCode == 37) {

                Slider.previousSlide();

            } else if (e.keyCode == 39) {

                Slider.nextSlide();

            }
        });

    },

    // Calculation of current slide and showing class assignment
    goToSlide: function (n) {
        Slider.slides[Slider.currentSlide].className = 'slide';
        Slider.currentSlide = (n + Slider.slides.length) % Slider.slides.length;
        Slider.slides[Slider.currentSlide].className = 'slide showing';
    },

    previousSlide: function () {
        Slider.goToSlide(Slider.currentSlide - 1);
        $('li:last').prependTo('ul');
    },

    nextSlide: function () {
        Slider.goToSlide(Slider.currentSlide + 1);
        $('li:first').appendTo('ul');
    }

};

Slider.construct(

    document.getElementById('next'),
    document.getElementById('previous'),
    document.querySelectorAll('#slides .slide'),
    Math.floor(document.querySelectorAll('#slides .slide').length / 2)

);