// Модуль сортировки фотографий

'use strict';

(function () {
  var RANDOM_COUNT_PICTURE = 10;

  var randomPhotos = [];
  var filteredPhotos = [];

  // Выбирает случайные фотографии
  var showRandomPhotos = function () {
    randomPhotos = window.utils.getRandomArray(window.initialData, RANDOM_COUNT_PICTURE);
    window.gallery.updateGallery(randomPhotos);
  };

  // Дополнительная сортировка на случай если количество комментариев окажется одинаковым
  var likesComparator = function (a, b) {
    return b - a;
  };

  // Сортирует фотографии по убыванию количества комментариев
  var sortPhotosByComments = function () {
    filteredPhotos = window.initialData.slice();
    filteredPhotos.sort(function (a, b) {
      var commentsDiff = b.comments.length - a.comments.length;
      return (commentsDiff === 0) ? likesComparator(a.likes, b.likes) : commentsDiff;
    });
    return filteredPhotos;
  };

  var showDiscussedPhotos = function () {
    var discussedPhotos = sortPhotosByComments();
    window.gallery.updateGallery(discussedPhotos);
  };

  window.photoSorting = {
    showRandomPhotos: showRandomPhotos,
    showDiscussedPhotos: showDiscussedPhotos
  };
})();
