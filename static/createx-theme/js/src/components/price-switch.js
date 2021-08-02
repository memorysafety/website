/**
 * Switch price inside pricing plans
*/

const priceSwitch = (() => {

  let pricing = document.querySelectorAll('.pricing-wrap');

  if (pricing === null) return;

  for (let i = 0; i < pricing.length; i++) {

    let priceSwitch = pricing[i].querySelector('.switch'),
        priceSwitchInput = priceSwitch.querySelector('input[type="checkbox"]'),
        priceElement = pricing[i].querySelectorAll('.price');

    let changeState = () => {
      if(priceSwitchInput.checked) {
        priceSwitch.parentNode.classList.add('price-switch-on');

        for (let n = 0; n < priceElement.length; n++) {
          priceElement[n].innerHTML = priceElement[n].dataset.newPrice;
        }

      } else {
        priceSwitch.parentNode.classList.remove('price-switch-on');

        for (let m = 0; m < priceElement.length; m++) {
          priceElement[m].innerHTML = priceElement[m].dataset.currentPrice;
        }
      }
    }
    changeState();

    priceSwitchInput.addEventListener('change', function() {
      changeState();
    });
  }

})();

export default priceSwitch;
