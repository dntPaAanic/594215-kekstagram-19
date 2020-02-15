// Модуль работы с фильтрами для фото

'use strict';

(function () {
  var MAX_BLUR = 3;
  var MAX_BRIGHTNESS = 3;
  var MIN_BRIGHTNESS = 1;
  var DEFAULT_EFFECT_FILTER_LEVEL = 100;

  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var imgUploadPreview = window.popupElements.imgUploadPreview;
  var effectController = window.popupElements.effectController;

  var effectLevelInput = effectController.querySelector('.effect-level__value');
  var effectLevelLine = effectController.querySelector('.effect-level__line');
  var effectLevelBar = effectController.querySelector('.effect-level__depth');
  var effectLevelPin = effectController.querySelector('.effect-level__pin');
  var filters = imgUploadOverlay.querySelectorAll('.effects__radio');
  var currentFilter;
  var effectControllerCoordinate;
  var effectControllerMinPosition;
  var effectControllerWidth;
  var effectLevel;

  // Ищет параметры полоски фильтра
  var setEffectControllerCoord = function () {
    effectControllerCoordinate = effectLevelLine.getBoundingClientRect();
    effectControllerMinPosition = effectControllerCoordinate.left;
    effectControllerWidth = effectControllerCoordinate.width;
  };

  // Показ/скрытие полоски фильтра
  var toggleEffectVisibility = function (filter) {
    if (filter === 'none') {
      effectController.classList.add('hidden');
    } else {
      effectController.classList.remove('hidden');
      setEffectControllerCoord();
    }
  };

  // Расчет положения пина в процентах
  var getPinPosition = function (evt) {
    var pinCoord = evt.clientX - effectControllerMinPosition;
    effectLevel = Math.round((pinCoord / effectControllerWidth) * 100);

    if (effectLevel < 0) {
      effectLevel = 0;
    } else if (effectLevel > 100) {
      effectLevel = 100;
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
        filterEffect = 'brightness(' + (MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
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
    setEffectLevel(DEFAULT_EFFECT_FILTER_LEVEL);
    applyFilter(currentFilter);
  };

  for (var indexFilter = 0; indexFilter < filters.length; indexFilter++) {
    filters[indexFilter].addEventListener('input', onFilterClick);
  }

  var onPinMove = function (evt) {
    evt.preventDefault();
    getPinPosition(evt);
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
