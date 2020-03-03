'use strict';

(function () {
  var RESIZE_STEP = 25;

  var ImageSize = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var scaleControlValueNumber = ImageSize.DEFAULT;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');


  // Показываем дефолтный масштаб при открытии формы редактирования фото
  var defaultScaleValue = function () {
    scaleControlValue.value = ImageSize.DEFAULT + '%';
    imgUploadPreview.children[0].style.transform = 'scale(' + ImageSize.DEFAULT / 100 + ')';
    scaleControlValueNumber = ImageSize.DEFAULT;
  };

  // Расчет уменьшения масштаба изображения
  var onSmallerControlPush = function () {
    if (scaleControlValueNumber > ImageSize.MIN && scaleControlValueNumber <= ImageSize.MAX) {
      scaleControlValueNumber -= RESIZE_STEP;
      scaleControlValue.value = scaleControlValueNumber + '%';
    }
    imgUploadPreview.children[0].style.transform = 'scale(' + scaleControlValueNumber / 100 + ')';
  };

  // Расчет увеличения масштаба изображения
  var onBiggerControlPush = function () {
    if (scaleControlValueNumber >= ImageSize.MIN && scaleControlValueNumber < ImageSize.MAX) {
      scaleControlValueNumber += RESIZE_STEP;
      scaleControlValue.value = scaleControlValueNumber + '%';
    }
    imgUploadPreview.children[0].style.transform = 'scale(' + scaleControlValueNumber / 100 + ')';
  };

  var initControlListeners = function () {
    scaleControlSmaller.addEventListener('click', onSmallerControlPush);
    scaleControlBigger.addEventListener('click', onBiggerControlPush);
  };

  var removeControlListeners = function () {
    scaleControlSmaller.removeEventListener('click', onSmallerControlPush);
    scaleControlBigger.removeEventListener('click', onBiggerControlPush);
  };

  window.scale = {
    defaultScaleValue: defaultScaleValue,
    initControlListeners: initControlListeners,
    removeControlListeners: removeControlListeners
  };
})();
