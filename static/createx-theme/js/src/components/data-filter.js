/**
 * Filter list of items by typing in the search field
 *
*/

const dataFilter = (() => {

  let filterListWidget = document.querySelectorAll('.filter')

  for (let i = 0; i < filterListWidget.length; i++) {

    let filterInput = filterListWidget[i].querySelector('.filter-search'),
        filterList = filterListWidget[i].querySelector('.filter-list'),
        filterItems = filterList.querySelectorAll('.filter-item');

    if (! filterInput) {
      continue;
    }

    filterInput.addEventListener('keyup', filterListFunc);

    function filterListFunc() {

      let filterValue = filterInput.value.toLowerCase();

      for (let i = 0; i < filterItems.length; i++) {

        let filterText = filterItems[i].querySelector('.filter-item-text').innerHTML;

        if(filterText.toLowerCase().indexOf(filterValue) > -1) {
          filterItems[i].classList.remove('d-none');
        } else {
          filterItems[i].classList.add('d-none');
        }

      }
    }
  }

})();

export default dataFilter;
