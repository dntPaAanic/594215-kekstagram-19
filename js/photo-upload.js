// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var imgUploadForm = window.popupElements.imgUploadForm;
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var closeEditButton = window.popupElements.closeEditButton;
  var effectController = window.popupElements.effectController;
  var hashtagInput = window.hasgtagValidation.hashtagInput;
  var descriptionInput = window.hasgtagValidation.descriptionInput;

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

  imgUploadButton.addEventListener('change', openEditForm);


  // Потеря фокуса полями ввода по нажатию Esc
  window.utils.setFieldEscListener(hashtagInput);
  window.utils.setFieldEscListener(descriptionInput);

})();
