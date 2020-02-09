'use strict';

(function () {
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

  var createPictureList = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(makePicture(photosArray[i]));
    }
    return fragment;
  };

  pictureList.appendChild(createPictureList(completedPhotoList));


  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    defaultScaleValue();
  };

  var closeEditForm = function () {
    imgUploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    resetFilter();
  };

  var onCloseElementClick = function () {
    closeEditForm();
  };

  imgUploadButton.addEventListener('change', openEditForm);

  // Масштаб изображения
  var RESIZE_STEP = 25;
  var IMAGE_MIN_SIZE = 25;
  var IMAGE_MAX_SIZE = 100;
  var IMAGE_DEFAULT_SIZE = 100;

  var scaleControlValueNumber = IMAGE_DEFAULT_SIZE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');


  // Показываем дефолтный масштаб при открытии формы редактирования фото
  var defaultScaleValue = function () {
    scaleControlValue.value = IMAGE_DEFAULT_SIZE + '%';
    imgUploadPreview.children[0].style.transform = 'scale(' + IMAGE_DEFAULT_SIZE / 100 + ')';
    scaleControlValueNumber = IMAGE_DEFAULT_SIZE;
  };

  // Расчет уменьшения масштаба изображения
  var onSmallerControlPush = function () {
    if (scaleControlValueNumber > IMAGE_MIN_SIZE && scaleControlValueNumber <= IMAGE_MAX_SIZE) {
      scaleControlValueNumber -= RESIZE_STEP;
      scaleControlValue.value = scaleControlValueNumber + '%';
    }
    imgUploadPreview.children[0].style.transform = 'scale(' + scaleControlValueNumber / 100 + ')';
  };

  // Расчет увеличения масштаба изображения
  var onBiggerControlPush = function () {
    if (scaleControlValueNumber >= IMAGE_MIN_SIZE && scaleControlValueNumber < IMAGE_MAX_SIZE) {
      scaleControlValueNumber += RESIZE_STEP;
      scaleControlValue.value = scaleControlValueNumber + '%';
    }
    imgUploadPreview.children[0].style.transform = 'scale(' + scaleControlValueNumber / 100 + ')';

  };

  scaleControlSmaller.addEventListener('click', onSmallerControlPush);
  scaleControlBigger.addEventListener('click', onBiggerControlPush);
})();
