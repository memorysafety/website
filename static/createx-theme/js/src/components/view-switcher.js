/**
 * View switcher
*/

const viewSwitcher = (() => {

  let switcher = document.querySelectorAll('[data-view]');

  if (switcher.length > 0) {

    for (let i = 0; i < switcher.length; i++) {
      switcher[i].addEventListener('click', function(e) {
        let target = this.dataset.view;
        viewSwitch(target);
        if (this.getAttribute('href') === '#') e.preventDefault();
      });
    }
  }

  let viewSwitch = (target) => {
    let targetView = document.querySelector(target),
        targetParent = targetView.parentNode,
        siblingViews = targetParent.querySelectorAll('.view');
    
    for (let n = 0; n < siblingViews.length; n++) {
      siblingViews[n].classList.remove('show');
    }

    targetView.classList.add('show');
  }

})();

export default viewSwitcher;
