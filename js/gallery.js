// Модуль добавления галереи на страницу

'use strict';

(function () {
  // Ищет шаблон изображения случайного пользователя
  var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
  // Ищет контейнер для изображений от других пользователей
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

  // Добавляет фотографии на страницу
  var renderPhotos = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(makePhotoCard(photosArray[i]));
    }
    pictureList.appendChild(fragment);
  };

  // Создает обработчик по клику на фотокарточку
  var addPhotoCardListener = function (photoCard, photoData) {
    onPhotoCardClick = function () {
      window.fullScreen.showFullScreenPopup(photoData);
    };
    photoCard.addEventListener('click', onPhotoCardClick);
  };

  // Добавляет обработчики на все фотокарточки
  var addAllPhotoCardListener = function (photoData) {
    var photoPreviews = pictureList.querySelectorAll('.picture');
    for (var j = 0; j < photoPreviews.length; j++) {
      addPhotoCardListener(photoPreviews[j], photoData[j]);
    }
  };

  // Функция для получения фотографии с сервера при загрузке страницы
  var onLoad = function (photoData) {
    renderPhotos(photoData);
    addAllPhotoCardListener(photoData);
  };

  window.backend.load(onLoad, window.utils.onLoadError);

})();
