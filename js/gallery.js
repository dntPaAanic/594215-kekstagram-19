// Модуль добавления галереи на страницу

'use strict';

(function () {
  var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');
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

  // Функция для получения фотографии с сервера при загрузке страницы
  var onLoad = function (photoData) {
    renderPhotos(photoData);
  };

  window.backend.load(onLoad, window.utils.onLoadError);

})();
