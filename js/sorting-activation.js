'use strict';

(function () {
  var filtersList = document.querySelector('.img-filters');
  var filtersButton = filtersList.querySelectorAll('.img-filters__button');
  var filterDefault = filtersList.querySelector('#filter-default');
  var filterRandom = filtersList.querySelector('#filter-random');
  var filterDiscussed = filtersList.querySelector('#filter-discussed');
  var filterActive;

  var addFiltersClickListeners = function () {
    for (var i = 0; i < filtersButton.length; i++) {
      filtersButton[i].addEventListener('click', function (evt) {
        filterActive = filtersList.querySelector('.img-filters__button--active');
        filterActive.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      });
    }

    filterDefault.addEventListener('click', window.utils.debounce(function () {
      window.updateGallery(window.initialData);
    }));
    filterRandom.addEventListener('click', window.utils.debounce(function () {
      window.photoSorting.showRandomPhotos();
    }));
    filterDiscussed.addEventListener('click', window.utils.debounce(function () {
      window.photoSorting.showDiscussedPhotos();
    }));
  };

  var activateSortingFilters = function () {
    filtersList.classList.remove('img-filters--inactive');
    addFiltersClickListeners();
  };

  window.sortingActivation = {
    activateSortingFilters: activateSortingFilters
  };
})();
