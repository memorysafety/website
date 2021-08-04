/**
 * Filter and Sort grid of items
 * @requires https://github.com/patrickkunka/mixitup
*/

const filterSort = (() => {

  let grid = document.querySelectorAll('[data-filter-grid]'),
      filterGrid;

  if (grid === null) return;

  for (let i = 0; i < grid.length; i++) {
    filterGrid = mixitup(grid[i], {
      selectors: {
        target: '.grid-item'
      },
      controls: {
        scope: 'local'
      },
      classNames: {
        block: '',
        elementFilter: '',
        modifierActive: 'active'
      },
      animation: {
        duration: 350
      }
    });
  }

})();

export default filterSort;
