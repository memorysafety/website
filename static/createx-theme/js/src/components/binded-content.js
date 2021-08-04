/**
 * Bind different content to different navs or even accordion.
*/

const bindedContent = (() => {

  let toggles = document.querySelectorAll('[data-binded-content]'),
      bindedContent = document.querySelector('.binded-content');

  // Get target element siblings
  let getSiblings = elem => {
    let siblings = [],
        sibling = elem.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', (e) => {
      let targetEl = document.querySelector(e.currentTarget.dataset.bindedContent),
          targetSiblings = getSiblings(targetEl);

      targetSiblings.map((sibling) => {
        sibling.classList.remove('active');
      });

      targetEl.classList.add('active');
    });
  }


})();

export default bindedContent;
