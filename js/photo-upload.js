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
  var mainElement = document.querySelector('main');


  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButtonElement = successTemplate.querySelector('.success__button');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorButton = error.querySelector('.error__button');
  var successElement;
  var errorElement;

  var onSuccessUpload = function () {
    closeEditForm();
    document.querySelector('main').appendChild(successTemplate);
    successElement = document.querySelector('.success');
  };

  var closeSuccessWindow = function () {
    successTemplate.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessWindow);
  };

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    window.scale.defaultScaleValue();
  };

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

  successButtonElement.addEventListener('click', function () {
    successTemplate.remove();
  });

  document.addEventListener('keydown', onSuccessEscPress);

  successTemplate.addEventListener('click', function (evt) {
    if (evt.target === successElement) {
      successTemplate.remove();
    }
  });


  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(uploadForm), onSuccessUpload, window.utils.onUploadError);
  });


  // Потеря фокуса полями ввода по нажатию Esc
  window.utils.setFieldEscListener(hashtagInput);
  window.utils.setFieldEscListener(descriptionInput);

})();
