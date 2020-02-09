// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var closeEditButton = window.popupElements.closeEditButton;
  var hashtagInput = window.hasgtagValidation.hashtagInput;
  var descriptionInput = window.hasgtagValidation.descriptionInput;


  // Потеря фокуса полями ввода по нажатию Esc
  window.utils.setFieldEscListener(hashtagInput);
  window.utils.setFieldEscListener(descriptionInput);

})();
