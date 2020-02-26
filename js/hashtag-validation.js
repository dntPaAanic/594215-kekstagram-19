// Модуль для валидации хештегов

'use strict';

(function () {
  var HASHTAG_LIMIT = 5;
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var hashtagInput = window.popupElements.hashtagInput;
  var descriptionInput = window.popupElements.descriptionInput;

  var imgUploadForm = document.querySelector('.img-upload__form');
  var submitFormButton = imgUploadForm.querySelector('#upload-submit');


  var validateHashtags = function () {
    hashtagInput.style.border = 'none';
    var hashtagValue = hashtagInput.value.toLowerCase();
    var errorArray = [];

    if (hashtagValue) {
      var hashtags = hashtagValue.split(' ');

      if (hashtags.length > HASHTAG_LIMIT) {
        errorArray.push('Нельзя указывать больше пяти хэш-тегов');
      } else {
        hashtags.forEach(function (currentHashtag, i) {
          var hashtagSymbol = currentHashtag.split('#');

          if (hashtagSymbol.length > 2) {
            errorArray.push('Хэш-теги должны разделяться пробелами');
          } else if (currentHashtag.indexOf('#') !== 0) {
            errorArray.push('Хэш-тег должен начинаться с символа #');
          } else if (currentHashtag.length < HASHTAG_MIN_LENGTH) {
            errorArray.push('Хеш-тег не может состоять только из одной решётки');
          } else if (currentHashtag.length > HASHTAG_MAX_LENGTH) {
            errorArray.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          } else if (hashtags.slice(i + 1).find(function (item) {
            return item === currentHashtag;
          })) {
            errorArray.push('Один и тот же хэш-тег не может быть использован дважды');
          } else if (!currentHashtag.match(/^#[\wа-яА-я]+/)) {
            errorArray.push('строка после решётки должна состоять из букв и чисел и не может содержать спецсимволы, символы пунктуации, эмодзи');
          }
        });
      }
    }

    // Ищем уникальные значения в массиве
    var getUniqTags = function (tags) {
      var results = [];

      tags.forEach(function (value) {
        value = value.trim();

        if (results.indexOf(value) === -1) {
          results.push(value);
        }
      });

      return results;
    };

    hashtagInput.setCustomValidity(getUniqTags(errorArray).join(', '));
  };

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });

  submitFormButton.addEventListener('click', function () {
    var invalidInput = imgUploadForm.querySelector('input:invalid');
    if (invalidInput) {
      invalidInput.style.border = '2px solid red';
    }
  });

  window.hashgtagValidation = {
    hashtagInput: hashtagInput,
    descriptionInput: descriptionInput
  };
})();
