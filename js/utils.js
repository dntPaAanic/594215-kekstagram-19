'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Получаем случайное значение из массива
  var getRandomArrElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
  // ивент по нажатию клавиши escape
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


  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
    isEscEvent: isEscEvent,
    setFieldEscListener: setFieldEscListener
  };
})();
