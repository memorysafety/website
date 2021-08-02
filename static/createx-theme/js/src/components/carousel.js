/**
 * Content carousel with extensive options to control behaviour and appearance
 * @requires https://github.com/ganlanyuan/tiny-slider
*/

const carousel = (() => {

  // forEach function
  let forEach = function (array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  };

  // Carousel initialization
  let carousels = document.querySelectorAll('.tns-carousel-wrapper .tns-carousel-inner');
  forEach(carousels, function (index, value) {
    let defaults = {
      container: value,
      controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
      navPosition: 'top',
      controlsPosition: 'top',
      mouseDrag: true,
      speed: 600,
      autoplayHoverPause: true,
      autoplayButtonOutput: false
    };
    let userOptions;
    if(value.dataset.carouselOptions != undefined) userOptions = JSON.parse(value.dataset.carouselOptions);
    let options = {...defaults, ...userOptions};
    let carousel = tns(options);
  });

})();

export default carousel;
