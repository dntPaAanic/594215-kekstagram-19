// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var imgUploadForm = window.popupElements.imgUploadForm;
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var closeEditButton = window.popupElements.closeEditButton;
  var effectController = window.popupElements.effectController;
  var hashtagInput = window.hasgtagValidation.hashtagInput;
  var descriptionInput = window.hasgtagValidation.descriptionInput;
  var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
  var pictureList = document.querySelector('.pictures');


  var makePicture = function (pictureItem) {
    var newPictureElement = templatePictureItem.cloneNode(true);
    var newPictureElementImg = newPictureElement.querySelector('.picture__img');

    newPictureElementImg.src = pictureItem.url;
    newPictureElementImg.alt = pictureItem.description;
    newPictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
    newPictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

    return newPictureElement;
  };

  var onLoad = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(makePicture(photosArray[i]));
    }
    pictureList.appendChild(fragment);
  };

  // pictureList.appendChild(createPictureList(window.data.completedPhotoList));

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    window.scale.defaultScaleValue();
  };

  var closeEditForm = function () {
    imgUploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    window.filters.resetFilter();
  };

  var onCloseElementClick = function () {
    closeEditForm();
  };

  imgUploadButton.addEventListener('change', openEditForm);
  window.backend.load(onLoad, window.utils.onLoadError);


  // Потеря фокуса полями ввода по нажатию Esc
  window.utils.setFieldEscListener(hashtagInput);
  window.utils.setFieldEscListener(descriptionInput);

})();
