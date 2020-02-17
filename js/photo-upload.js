// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var uploadForm = window.popupElements.uploadForm;
  var imgUploadForm = window.popupElements.imgUploadForm;
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var closeEditButton = window.popupElements.closeEditButton;
  var effectController = window.popupElements.effectController;
  var hashtagInput = window.hasgtagValidation.hashtagInput;
  var descriptionInput = window.hasgtagValidation.descriptionInput;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorTemplate.querySelector('.error__button');
  var successElement;
  var errorElement;

  var onUploadSuccess = function () {
    closeEditForm();
    document.querySelector('main').appendChild(successTemplate);
    successElement = document.querySelector('.success');
  };

  var closeSuccessWindow = function () {
    successTemplate.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var closeErrorWindow = function () {
    errorTemplate.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onSuccessEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessWindow);
  };

  var onErrorEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeErrorWindow);
  };

  // Закрывает окно редактирования фото по нажатию на Esc
  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  // Открывает окно редактироания фото
  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    window.scale.defaultScaleValue();
  };

  // Показывает окно с ошибкой при неудачной отправке фото
  var onUploadError = function (message) {
    closeEditForm();
    document.querySelector('main').appendChild(errorTemplate);
    errorElement = document.querySelector('.error');
    window.utils.onUploadError(message);
  };

  // Закрывает окно редактирования фото
  var closeEditForm = function () {
    imgUploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    window.filters.resetFilter();
  };

  var onCloseElementClick = function () {
    closeEditForm();
  };

  imgUploadButton.addEventListener('change', function () {
    openEditForm();
  });

  successButton.addEventListener('click', function () {
    successTemplate.remove();
  });

  document.addEventListener('keydown', onSuccessEscPress);

  successTemplate.addEventListener('click', function (evt) {
    if (evt.target === successElement) {
      successTemplate.remove();
    }
  });

  errorButton.addEventListener('click', function () {
    errorTemplate.remove();
  });

  document.addEventListener('keydown', onErrorEscPress);

  errorTemplate.addEventListener('click', function (evt) {
    if (evt.target === errorElement) {
      errorTemplate.remove();
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadForm), onUploadSuccess, onUploadError);
  });


  // Потеря фокуса полями ввода по нажатию Esc
  window.utils.setFieldEscListener(hashtagInput);
  window.utils.setFieldEscListener(descriptionInput);

})();
