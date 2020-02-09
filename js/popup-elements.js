
// Модуль для работы с элементами всплывающей формы
'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadButton = imgUploadForm.querySelector('#upload-file');
  var closeEditButton = imgUploadForm.querySelector('#upload-cancel');

  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var effectController = imgUploadOverlay.querySelector('.img-upload__effect-level');




  window.popupElements = {
    imgUploadForm: imgUploadForm,
    imgUploadOverlay: imgUploadOverlay,
    imgUploadButton: imgUploadButton,
    closeEditButton: closeEditButton,
    imgUploadPreview: imgUploadPreview,
    effectController: effectController
  };
})();
