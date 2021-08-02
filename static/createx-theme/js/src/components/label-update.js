/**
 * Updated the text of the label when radio button changes (mainly for color options)
*/

const labeUpdate = (() => {

  let radioBtns = document.querySelectorAll('[data-label]');

  for (let i = 0; i < radioBtns.length; i++ ) {
    radioBtns[i].addEventListener('change', function() {
      let target = this.dataset.label;
      try {
        document.getElementById(target).textContent = this.value;
      }
      catch(err) {
        if (err.message = "Cannot set property 'textContent' of null") {
          console.error('Make sure the [data-label] matches with the id of the target element you want to change text of!');
        }
      }
    });
  }

})();

export default labeUpdate;
