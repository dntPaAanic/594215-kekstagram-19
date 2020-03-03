// Модуль работы окна с загруженным фото

'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadButton = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var closeEditButton = imgUploadForm.querySelector('#upload-cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];
  var effectController = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var fileChooser = imgUploadForm.querySelector('.img-upload__input');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorTemplate.querySelector('.error__title');
  var errorButton = errorTemplate.querySelector('.error__button');
  var successElement;
  var errorElement;

  var onUploadImageChange = function () {
    if (isValidExtension()) {
      changeImage();
      openEditForm();
    } else {
      formReset();
      showFileExtensionError();
    }
  };

  var isValidExtension = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });
  };

  var changeImage = function () {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imgUploadPreview.src = reader.result;
    });

    reader.readAsDataURL(fileChooser.files[0]);
  };

  // Открывает окно редактироания фото
  var openEditForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    closeEditButton.addEventListener('click', onCloseElementClick);
    document.addEventListener('keydown', onEscPress);
    effectController.classList.add('hidden');
    window.scale.defaultScaleValue();
    window.scale.initControlListeners();
  };

  // Закрывает окно редактирования фото
  var closeEditForm = function () {
    imgUploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    window.filters.resetFilter();
    imgUploadButton.value = '';
    window.fullSize.hashtagInput.value = '';
    window.fullSize.hashtagInput.style.border = 'none';
    window.fullSize.hashtagInput.setCustomValidity('');
    window.fullSize.descriptionInput.value = '';
    document.removeEventListener('keydown', onEscPress);
    closeEditButton.removeEventListener('click', onCloseElementClick);
    window.scale.removeControlListeners();
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
    successButton.removeEventListener('click', onSuccessButtonClick);
  };

  var closeErrorWindow = function () {
    errorTemplate.remove();
    document.removeEventListener('keydown', onErrorEscPress);
    errorButton.removeEventListener('click', onErrorButtonClick);
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
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onErrorButtonClick = function () {
    errorTemplate.remove();
    errorButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorEscPress);
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
