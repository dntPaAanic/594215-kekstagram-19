'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

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

  // Окно не закрывается при нажатии на Esc
  var preventEsc = function (field) {
    field.addEventListener('keydown', function (evt) {
      isEscEvent(evt, function () {
        evt.stopPropagation();
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
    getRandomArrElement: getRandomArrElement,
    isEscEvent: isEscEvent,
    preventEsc: preventEsc,
    getRandomArray: getRandomArray,
    debounce: debounce,
  };
})();
