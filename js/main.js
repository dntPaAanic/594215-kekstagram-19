'use strict';

var PICTURE_COUNT = 25;
var LIKE_COUNT_MIN = 15;
var LIKE_COUNT_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var AUTHOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var COMMENT_AUTHOR_NAMES = [
  'Jozef Contreras',
  'Mohammed Robson',
  'Gabriela Jefferson',
  'Wyatt Alcock',
  'Arjan Clarke',
  'Dionne Burgess',
  'Dewi Pace',
  'Mujtaba Yates',
  'Donnell Yoder',
  'Axel Vega',
  'Khaleesi Sargent',
  'Lord James Sweeney',
  'Frank Wade',
  'Robert Santiago'
];

var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomArrElement(AUTHOR_COMMENTS),
    name: getRandomArrElement(COMMENT_AUTHOR_NAMES),
  };
  return comment;
};

var getCommentsList = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments.push(getRandomComment());
  }
  return comments;
};

var getPictureList = function (pictureCount) {
  var array = [];
  for (var i = 1; i <= pictureCount; i++) {
    array.push({
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии - ' + i,
      likes: getRandomNumber(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
      comments: getCommentsList(getRandomNumber(1, 2))
    });
  }
  return array;
};

var makePicture = function (pictureItem) {
  var newPictureElement = templatePictureItem.cloneNode(true);
  var newPictureElementImg = newPictureElement.querySelector('.picture__img');

  newPictureElementImg.src = pictureItem.url;
  newPictureElementImg.alt = pictureItem.description;
  newPictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
  newPictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

  return newPictureElement;
};

var createPictureList = function (photosArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosArray.length; i++) {
    fragment.appendChild(makePicture(photosArray[i]));
  }
  return fragment;
};

var completedPhotoList = getPictureList(PICTURE_COUNT);

pictureList.appendChild(createPictureList(completedPhotoList));


// Лекция 4
var ESC_KEY = 'Escape';
// var ENTER_KEY = 'Enter';


// Открытие/закрытие окна редактирования фото
var imgUploadForm = document.querySelector('.img-upload__form');
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var imgUploadButton = imgUploadForm.querySelector('#upload-file');
var closeEditButton = imgUploadForm.querySelector('#upload-cancel');

var onEditFormEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeEditForm();
  }
};

var openEditForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  closeEditButton.addEventListener('click', closeEditForm);
  document.addEventListener('keydown', onEditFormEscPress);
  defaultScaleValue();
};

var closeEditForm = function () {
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  document.addEventListener('keydown', onEditFormEscPress);
  resetFilter();
};

imgUploadButton.addEventListener('change', openEditForm);
//


// Масштаб изображения
var RESIZE_STEP = 25;
var IMAGE_MIN_SIZE = 25;
var IMAGE_MAX_SIZE = 100;
var IMAGE_DEFAULT_SIZE = 100;

var scaleControlValueNumber = IMAGE_DEFAULT_SIZE;

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');


// Показываем дефолтный масштаб при открытии формы редактирования фото
var defaultScaleValue = function () {
  scaleControlValue.value = IMAGE_DEFAULT_SIZE + '%';
  imgUploadPreview.children[0].style.transform = 'scale(' + IMAGE_DEFAULT_SIZE / 100 + ')';
  scaleControlValueNumber = IMAGE_DEFAULT_SIZE;
};

// Расчет уменьшения масштаба изображения
var onSmallerControlPush = function () {
  if (scaleControlValueNumber > IMAGE_MIN_SIZE && scaleControlValueNumber <= IMAGE_MAX_SIZE) {
    scaleControlValueNumber -= RESIZE_STEP;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// Расчет увеличения масштаба изображения
var onBiggerControlPush = function () {
  if (scaleControlValueNumber >= IMAGE_MIN_SIZE && scaleControlValueNumber < IMAGE_MAX_SIZE) {
    scaleControlValueNumber += RESIZE_STEP;
    scaleControlValue.value = scaleControlValueNumber + '%';
  }
};

// Присваивание стиля фотографии
var resize = function () {
  imgUploadPreview.children[0].style.transform = 'scale(' + scaleControlValueNumber / 100 + ')';
};

var getBiggerPhoto = function () {
  onBiggerControlPush();
  resize();
};

var getSmallerPhoto = function () {
  onSmallerControlPush();
  resize();
};

scaleControlSmaller.addEventListener('click', getSmallerPhoto);
scaleControlBigger.addEventListener('click', getBiggerPhoto);


// Фильтры
var MAX_BLUR = 3;
var MAX_BRIGHTNESS = 3;
var MIN_BRIGHTNESS = 1;
var DEFAULT_EFFECT_FILTER_LEVEL = 100;


var effectController = imgUploadOverlay.querySelector('.img-upload__effect-level');
var effectLevelInput = effectController.querySelector('.effect-level__value');
var effectLevelLine = effectController.querySelector('.effect-level__line');
var effectLevelBar = effectController.querySelector('.effect-level__depth');
var effectLevelPin = effectController.querySelector('.effect-level__pin');
var filters = imgUploadOverlay.querySelectorAll('.effects__radio');
var currentFilter;

// Показ/скрытие полоски фильтра
var toggleEffectVisibility = function (filter) {
  if (filter === 'none') {
    effectController.classList.add('hidden');
  } else {
    effectController.classList.remove('hidden');
  }
};

// Устанавливает положение фильтра
var setEffectLevel = function (level) {
  effectLevelInput.value = level;
  effectLevelBar.style.width = level + '%';
  effectLevelPin.style.left = level + '%';
};

var getCurrentFilter = function () {
  return imgUploadOverlay.querySelector('.effects__radio:checked').value;
};

var applyFilter = function (filter) {
  imgUploadPreview.children[0].classList.add('effects__preview--' + filter);
};

// Показывает интенсивность фильтра в зависимости от положения ползунка
var setEffect = function (filter, level) {
  var filterEffect = '';

  switch (filter) {
    case 'chrome':
      filterEffect = 'grayscale(' + level / 100 + ')';
      break;
    case 'sepia':
      filterEffect = 'sepia(' + level / 100 + ')';
      break;
    case 'marvin':
      filterEffect = 'invert(' + level + '%)';
      break;
    case 'phobos':
      filterEffect = 'blur(' + (level / 100 * MAX_BLUR) + 'px)';
      break;
    case 'heat':
      filterEffect = 'brightness(' + (MIN_BRIGHTNESS + level / 100 * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)) + ')';
      break;
    default:
      filterEffect = 'none';
  }

  imgUploadPreview.children[0].style.filter = filterEffect;
};

var resetFilter = function () {
  imgUploadPreview.children[0].classList.remove('effects__preview--' + currentFilter);
  imgUploadPreview.children[0].style.filter = '';
};

var toggleFilter = function () {
  resetFilter();
  currentFilter = getCurrentFilter();
  toggleEffectVisibility(currentFilter);
  setEffectLevel(DEFAULT_EFFECT_FILTER_LEVEL);
  applyFilter(currentFilter);
};

for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener('input', toggleFilter);
  toggleFilter();
}

// Применяет эффект после установки ползунка
var onPinMouseUp = function () {
  var effectLevel = Math.round((effectLevelPin.offsetLeft / effectLevelLine.offsetWidth) * 100);
  setEffectLevel(effectLevel);
  setEffect(getCurrentFilter(), effectLevel);
};

effectLevelPin.addEventListener('mouseup', onPinMouseUp);


// Хэштеги
var hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
var descriptionInput = imgUploadOverlay.querySelector('.text__description');
