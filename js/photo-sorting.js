// Модуль сортировки фотографий

'use strict';

(function () {
  var RANDOM_COUNT_PICTURE = 10;

  var randomPhotos = [];
  var filteredPhotos = [];

  // Выбирает случайные фотографии
  var showRandomPhotos = function () {
    randomPhotos = window.utils.getRandomArray(window.initialData, RANDOM_COUNT_PICTURE);
    window.updateGallery(randomPhotos);
  };

  // Дополнительная сортировка на случай если количество комментариев окажется одинаковым
  var likesComparator = function (a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сортирует фотографии по убыванию количества комментариев
  var sortPhotos = function () {
    filteredPhotos = window.initialData.slice();
    filteredPhotos.sort(function (a, b) {
      var commentsDiff = b.comments.length - a.comments.length;
      return (commentsDiff === 0) ? likesComparator(a.likes, b.likes) : commentsDiff;
    });
    return filteredPhotos;
  };

  var showDiscussedPhotos = function () {
    var discussedPhotos = sortPhotos();
    window.updateGallery(discussedPhotos);
  };

  window.photoSorting = {
    showRandomPhotos: showRandomPhotos,
    showDiscussedPhotos: showDiscussedPhotos
  };
})();
