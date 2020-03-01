'use strict';

(function () {
  var RANDOM_COUNT_PICTURE = 10;

  var filtersList = document.querySelector('.img-filters');
  var filtersButton = filtersList.querySelectorAll('.img-filters__button');
  var filterDefault = filtersList.querySelector('#filter-default');
  var filterRandom = filtersList.querySelector('#filter-random');
  var filterDiscussed = filtersList.querySelector('#filter-discussed');

  // Дополнительная сортировка на случай если количество комментариев окажется одинаковым
  var likesComparator = function (a, b) {
    return b - a;
  };

  // Сортирует фотографии по убыванию количества комментариев
  var sortPhotosByComments = function () {
    var filteredPhotos = window.initialData.slice();
    filteredPhotos.sort(function (a, b) {
      var commentsDiff = b.comments.length - a.comments.length;
      return (commentsDiff === 0) ? likesComparator(a.likes, b.likes) : commentsDiff;
    });
    return filteredPhotos;
  };

  var removeButtonActiveClass = function () {
    filtersButton.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  filterDefault.addEventListener('click', window.utils.debounce(function (evt) {
    window.gallery.updateGallery(window.initialData);
    removeButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  filterRandom.addEventListener('click', window.utils.debounce(function (evt) {
    var randomPhotos = window.utils.getRandomArray(window.initialData, RANDOM_COUNT_PICTURE);
    window.gallery.updateGallery(randomPhotos);
    removeButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  filterDiscussed.addEventListener('click', window.utils.debounce(function (evt) {
    var discussedPhotos = sortPhotosByComments();
    window.gallery.updateGallery(discussedPhotos);
    removeButtonActiveClass();
    evt.target.classList.add('img-filters__button--active');
  }));

  var activateSortingFilters = function () {
    filtersList.classList.remove('img-filters--inactive');
  };

  window.sortingActivation = {
    activateSortingFilters: activateSortingFilters
  };
})();
