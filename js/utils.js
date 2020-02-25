'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Получает случайное значение из массива
  var getRandomArrElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Выбирает случайные элементы массива заданной длины
  var getRandomArray = function (array, elementsAmount) {
    var selectedElements = [];
    var element;

    while (selectedElements.length < elementsAmount) {
      element = getRandomArrElement(array);

      if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element);
      }
    }

    return selectedElements;
  };

  // Ивент по нажатию клавиши escape
  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  // Потеря фокуса при нажании на Esc в текстовом поле
  var setFieldEscListener = function (field) {
    field.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        evt.stopPropagation();
        evt.target.blur();
      });
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
    isEscEvent: isEscEvent,
    setFieldEscListener: setFieldEscListener,
    getRandomArray: getRandomArray,
    debounce: debounce,
  };
})();
