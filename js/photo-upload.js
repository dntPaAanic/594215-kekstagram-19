// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgUploadForm = window.popupElements.imgUploadForm;
  var imgUploadButton = window.popupElements.imgUploadButton;
  var imgUploadOverlay = window.popupElements.imgUploadOverlay;
  var closeEditButton = window.popupElements.closeEditButton;
  var effectController = window.popupElements.effectController;
  var fileChooser = window.popupElements.fileChooser;
  var imgUploadPreview = window.popupElements.imgUploadPreview.children[0];

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorTemplate.querySelector('.error__title');
  var errorButton = errorTemplate.querySelector('.error__button');
  var successElement;
  var errorElement;

  var onUploadImageChange = function () {
    if (imageUpload()) {
      openEditForm();
    } else {
      formReset();
      showFileExtensionError();
    }
  };

  var imageUpload = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    return matches;
  };

  // Открывает окно редактироания фото
  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    window.scale.defaultScaleValue();
    window.scale.scaleControlSmaller.addEventListener('click', window.scale.onSmallerControlPush);
    window.scale.scaleControlBigger.addEventListener('click', window.scale.onBiggerControlPush);
  };

  // Закрывает окно редактирования фото
  var closeEditForm = function () {
    imgUploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    window.filters.resetFilter();
    imgUploadButton.value = '';
    window.hashgtagValidation.hashtagInput.value = '';
    window.hashgtagValidation.hashtagInput.style.border = 'none';
    window.hashgtagValidation.hashtagInput.setCustomValidity('');
    window.hashgtagValidation.descriptionInput.value = '';
    document.removeEventListener('keydown', onEscPress);
    closeEditButton.removeEventListener('click', onCloseElementClick);
    window.scale.scaleControlSmaller.removeEventListener('click', window.scale.onSmallerControlPush);
    window.scale.scaleControlBigger.removeEventListener('click', window.scale.onBiggerControlPush);
  };

  var onUploadSuccess = function () {
    document.addEventListener('keydown', onSuccessEscPress);
    closeEditForm();
    document.querySelector('main').appendChild(successTemplate);
    successElement = document.querySelector('.success');
    successButton.addEventListener('click', onSuccessButtonClick);
    successButton.focus();
  };

  var showPopupError = function () {
    document.querySelector('main').appendChild(errorTemplate);
    errorElement = document.querySelector('.error');
    errorButton.focus();
  };

  var onError = function (response) {
    closeEditForm();
    showPopupError();
    errorTitle.textContent = response;
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var showFileExtensionError = function () {
    showPopupError();
    errorTitle.textContent = 'Неверный формат изображения';
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscPress);
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

  var onEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  var onCloseElementClick = function () {
    closeEditForm();
  };

  var formReset = function () {
    imgUploadForm.reset();
    window.filters.resetFilter();
  };

  var onSuccessButtonClick = function () {
    successTemplate.remove();
    successButton.removeEventListener('click', onSuccessButtonClick);
  };

  var onErrorButtonClick = function () {
    errorTemplate.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
  };

  imgUploadButton.addEventListener('change', onUploadImageChange);

  successTemplate.addEventListener('click', function (evt) {
    if (evt.target === successElement) {
      successTemplate.remove();
    }
  });

  errorTemplate.addEventListener('click', function (evt) {
    if (evt.target === errorElement) {
      errorTemplate.remove();
    }
  });

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(imgUploadForm), onUploadSuccess, onError);
  });

  window.photoUpload = {
    onError: onError
  };

})();
