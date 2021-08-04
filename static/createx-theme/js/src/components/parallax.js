/**
 * Mouse move parallax effect
 * @requires https://github.com/wagerfield/parallax
*/

const parallax = (() => {

  let element = document.querySelectorAll('.parallax');

  for (let i = 0; i < element.length; i++) {
    let parallaxInstance = new Parallax(element[i]);
  }

})();

export default parallax;
