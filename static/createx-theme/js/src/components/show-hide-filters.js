/**
 * Show / hide sidebar with filters in shop catalog
*/

const filtersShowHide = (() => {

  const openFiltersBtn = document.querySelector('[data-filters-show]'),
        closeFiltersBtn = document.querySelector('[data-filters-hide]'),
        filtersColumns = document.querySelector('[data-filters-columns]');

  if (filtersColumns === null) return;

  closeFiltersBtn.addEventListener('click', (e) => {
    let target = e.target.dataset.filtersHide;
    closeFiltersBtn.classList.remove('d-lg-block');
    openFiltersBtn.classList.remove('d-lg-none');
    document.querySelector(target).classList.add('d-lg-none');
    filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
  });

  openFiltersBtn.addEventListener('click', (e) => {
    let target = e.target.dataset.filtersShow;
    closeFiltersBtn.classList.add('d-lg-block');
    openFiltersBtn.classList.add('d-lg-none');
    document.querySelector(target).classList.remove('d-lg-none');
    filtersColumns.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3';
  });

})();

export default filtersShowHide;
