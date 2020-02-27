'use strict';

(function () {
  var filtersList = document.querySelector('.img-filters');
  var filtersButton = filtersList.querySelectorAll('.img-filters__button');
  var filterDefault = filtersList.querySelector('#filter-default');
  var filterRandom = filtersList.querySelector('#filter-random');
  var filterDiscussed = filtersList.querySelector('#filter-discussed');

  var deleteClass = function () {
    filtersButton.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  filterDefault.addEventListener('click', window.utils.debounce(function (evt) {
    window.gallery.updateGallery(window.initialData);
    deleteClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  filterRandom.addEventListener('click', window.utils.debounce(function (evt) {
    window.photoSorting.showRandomPhotos();
    deleteClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  filterDiscussed.addEventListener('click', window.utils.debounce(function (evt) {
    window.photoSorting.showDiscussedPhotos();
    deleteClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  var activateSortingFilters = function () {
    filtersList.classList.remove('img-filters--inactive');
  };

  window.sortingActivation = {
    activateSortingFilters: activateSortingFilters
  };
})();
