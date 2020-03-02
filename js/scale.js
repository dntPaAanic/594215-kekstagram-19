'use strict';

(function () {
  var RESIZE_STEP = 25;
  var IMAGE_MIN_SIZE = 25;
  var IMAGE_MAX_SIZE = 100;
  var IMAGE_DEFAULT_SIZE = 100;

  var scaleControlValueNumber = IMAGE_DEFAULT_SIZE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
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

  var initSmallerControlListener = function () {
    scaleControlSmaller.addEventListener('click', onSmallerControlPush);
  };

  var initBiggerControlListener = function () {
    scaleControlBigger.addEventListener('click', onBiggerControlPush);
  };

  var removeSmallerControlListener = function () {
    scaleControlSmaller.removeEventListener('click', onSmallerControlPush);
  };

  var removeBiggerControlListener = function () {
    scaleControlBigger.removeEventListener('click', onBiggerControlPush);
  };

  window.scale = {
    defaultScaleValue: defaultScaleValue,
    initSmallerControlListener: initSmallerControlListener,
    initBiggerControlListener: initBiggerControlListener,
    removeSmallerControlListener: removeSmallerControlListener,
    removeBiggerControlListener: removeBiggerControlListener
  };
})();
