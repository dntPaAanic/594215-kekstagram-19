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

  // Создание DOM-элемента, показывающего ошибку при сохранении формы
  var showErrorPopup = function () {
    var errorTemplate = document.querySelector('#error').content;
    var errorMessagePopup = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessagePopup);
  };

  // Создание DOM-элемента, показывающего ошибку при загрузке
  var onLoadError = function (response) {
    showErrorPopup();
    var errorWrapper = document.querySelector('.error__inner');
    var errorTitle = errorWrapper.querySelector('.error__title');
    var errorButton = errorWrapper.querySelector('.error__button');
    var errorText = document.createElement('p');
    errorTitle.textContent = 'Ошибка загрузки данных';
    errorWrapper.removeChild(errorButton);
    errorText.innerHTML = response;
    errorWrapper.insertBefore(errorText, errorButton);
  };


  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
    isEscEvent: isEscEvent,
    setFieldEscListener: setFieldEscListener,
    onLoadError: onLoadError
  };
})();
