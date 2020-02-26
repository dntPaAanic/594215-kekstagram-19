'use strict';

(function () {
  // Масштаб изображения
  var RESIZE_STEP = 25;
  var IMAGE_MIN_SIZE = 25;
  var IMAGE_MAX_SIZE = 100;
  var IMAGE_DEFAULT_SIZE = 100;

  var scaleControlValueNumber = IMAGE_DEFAULT_SIZE;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var imgUploadPreview = window.popupElements.imgUploadPreview;
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

  window.scale = {
    defaultScaleValue: defaultScaleValue,
    onSmallerControlPush: onSmallerControlPush,
    onBiggerControlPush: onBiggerControlPush,
    scaleControlBigger: scaleControlBigger,
    scaleControlSmaller: scaleControlSmaller
  };
})();
