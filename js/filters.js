// Модуль работы с фильтрами для фото

'use strict';

(function () {
  var MAX_BLUR = 3;

  var Brightness = {
    MIN: 0,
    MAX: 3,
  };

  var EffectLevel = {
    MIN: 0,
    MAX: 100,
    DEFAULT: 100
  };

  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectController = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelInput = effectController.querySelector('.effect-level__value');
  var effectLevelLine = effectController.querySelector('.effect-level__line');
  var effectLevelBar = effectController.querySelector('.effect-level__depth');
  var effectLevelPin = effectController.querySelector('.effect-level__pin');
  var filters = imgUploadOverlay.querySelectorAll('.effects__radio');
  var currentFilter;
  var effectLevel;

  // Показ/скрытие полоски фильтра
  var toggleEffectVisibility = function (filter) {
    if (filter === 'none') {
      effectController.classList.add('hidden');
    } else {
      effectController.classList.remove('hidden');
    }
  };

  var getValuePinAndDepth = function (evt) {
    // Ищет параметры полоски фильтра
    var effectControllerCoordinate = effectLevelLine.getBoundingClientRect();
    var effectControllerMinPosition = effectControllerCoordinate.left;
    var effectControllerWidth = effectControllerCoordinate.width;

    // Расчет положения пина в процентах
    var pinCoordinate = evt.clientX - effectControllerMinPosition;
    effectLevel = Math.round((pinCoordinate / effectControllerWidth) * 100);

    if (effectLevel < EffectLevel.MIN) {
      effectLevel = EffectLevel.MIN;
    } else if (effectLevel > EffectLevel.MAX) {
      effectLevel = EffectLevel.MAX;
    }
  };

  // Устанавливает положение пина
  var setEffectLevel = function (level) {
    effectLevelInput.setAttribute('value', level);
    effectLevelBar.style.width = level + '%';
    effectLevelPin.style.left = level + '%';
  };

  // Узнает текущее значение фильтра
  var getCurrentFilter = function () {
    return imgUploadOverlay.querySelector('.effects__radio:checked').value;
  };

  var applyFilter = function (filter) {
    imgUploadPreview.children[0].classList.add('effects__preview--' + filter);
  };

  // Показывает интенсивность фильтра в зависимости от положения ползунка
  var setEffect = function (filter, level) {
    var filterEffect = '';

    switch (filter) {
      case Effect.CHROME:
        filterEffect = 'grayscale(' + level / 100 + ')';
        break;
      case Effect.SEPIA:
        filterEffect = 'sepia(' + level / 100 + ')';
        break;
      case Effect.MARVIN:
        filterEffect = 'invert(' + level + '%)';
        break;
      case Effect.PHOBOS:
        filterEffect = 'blur(' + (level / 100 * MAX_BLUR) + 'px)';
        break;
      case Effect.HEAT:
        filterEffect = 'brightness(' + (Brightness.MIN + level / 100 * (Brightness.MAX - Brightness.MIN)) + ')';
        break;
      default:
        filterEffect = 'none';
    }

    imgUploadPreview.children[0].style.filter = filterEffect;
  };

  // Сбрасывает эффект на значения по умолчанию
  var resetFilter = function () {
    imgUploadPreview.children[0].classList.remove('effects__preview--' + currentFilter);
    imgUploadPreview.children[0].style.filter = '';
  };

  var onFilterClick = function () {
    resetFilter();
    currentFilter = getCurrentFilter();
    toggleEffectVisibility(currentFilter);
    setEffectLevel(EffectLevel.DEFAULT);
    applyFilter(currentFilter);
  };

  // Добавляет обработчики на каждый фильтр
  filters.forEach(function (filterIndex) {
    filterIndex.addEventListener('click', function () {
      onFilterClick();
    });
  });

  var onPinMove = function (evt) {
    evt.preventDefault();
    getValuePinAndDepth(evt);
    setEffectLevel(effectLevel);
    setEffect(getCurrentFilter(), effectLevel);
  };

  var onPinUp = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onPinMove);
    document.removeEventListener('mouseup', onPinUp);
  };

  var onPinDown = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);

  };

  effectLevelPin.addEventListener('mousedown', onPinDown);

  window.filters = {
    resetFilter: resetFilter
  };

})();
