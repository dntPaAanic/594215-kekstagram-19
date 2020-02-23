// Модуль добавления галереи на страницу

'use strict';

(function () {
  var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
  // Переменная для хранения обработчика в области видимости (для последующего удаления обработчика)
  var onPhotoCardClick;

  // создает разметку для миниатюры фотографии
  var makePhotoCard = function (pictureItem) {
    var newPictureElement = templatePictureItem.cloneNode(true);
    var newPictureElementImg = newPictureElement.querySelector('.picture__img');

    newPictureElementImg.src = pictureItem.url;
    newPictureElementImg.alt = pictureItem.description;
    newPictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    newPictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

    return newPictureElement;
  };

  // Добавляет фотографии на страницу и добавляет обработчики на каждую из них
  var renderPhotos = function (photoData) {
    var fragment = document.createDocumentFragment();
    var pictureElement;
    for (var i = 0; i < photoData.length; i++) {
      pictureElement = fragment.appendChild(makePhotoCard(photoData[i]));
      addPhotoCardListener(pictureElement, photoData[i]);
    }
    pictureList.appendChild(fragment);
  };

  // Создает обработчик по клику на фотокарточку
  var addPhotoCardListener = function (photoCard, photoData) {
    onPhotoCardClick = function () {
      window.fullSize.showFullSizePopup(photoData);
    };
    photoCard.addEventListener('click', onPhotoCardClick);
  };

  // Удаляет фотографии
  // var clearGallery = function () {
  //   var galleryPhotos = pictureList.querySelectorAll('.picture');
  //   [].forEach.call(galleryPhotos, function (photo) {
  //     photo.removeEventListener('click', onPhotoCardClick);
  //     photo.remove();
  //   });
  // };

  var clearGallery = function () {
    pictureList.querySelectorAll('.picture').forEach(function (photo) {
      photo.removeEventListener('click', onPhotoCardClick);
      photo.remove();
    });
  };

  // Обновляет галерею
  var updateGallery = function (photoData) {
    // Очищает галерею
    clearGallery();
    // Заполняет галерею новыми фотографиями
    renderPhotos(photoData);
  };

  // Получает фотографии с сервера
  var getPhotos = function (response) {
    // Заполняет галерею фотографиями
    renderPhotos(response);
    // Показывает кнопки фильтров для сортировки полученных фото
    window.sortingActivation.activateSortingFilters();
    // Сохраняет исходный массив после его загрузки с сервера
    window.initialData = response;
  };

  var onLoad = function (response) {
    getPhotos(response);
  };

  window.backend.load(onLoad, window.utils.onLoadError);

  window.gallery = {
    updateGallery: updateGallery
  };

})();
