'use strict';

var PICTURE_COUNT = 25;
var LIKE_COUNT_MIN = 15;
var LIKE_COUNT_MAX = 200;
var AUTHOR_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_AUTHOR_NAMES = ['Jozef Contreras', 'Mohammed Robson', 'Gabriela Jefferson', 'Wyatt Alcock', 'Arjan Clarke', 'Dionne Burgess', 'Dewi Pace', 'Mujtaba Yates', 'Donnell Yoder', 'Axel Vega', 'Khaleesi Sargent', 'Lord James Sweeney', 'Frank Wade', 'Robert Santiago'];

var templatePictureItem = document.querySelector('#picture').content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomComment = function () {
  var Сomment = {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomArrElement(AUTHOR_COMMENTS),
    name: getRandomArrElement(COMMENT_AUTHOR_NAMES),
  };
  return Сomment;
};

var getCommentsList = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments.push(getRandomComment());
  }
  return comments;
};

var getRandomPictureItem = function (imgUrl, description, likesCount, comment) {
  var Photo = {
    url: imgUrl,
    description: description,
    likes: likesCount,
    comments: comment,
  };
  return Photo;
};

var getPictureList = function (pictureCount) {
  var arr = [];
  for (var i = 1; i <= pictureCount; i++) {
    var pictureUrl = 'photos/' + i + '.jpg';
    var pictureDescription = 'Описание фотографии - ' + i;
    var pictureLikesCount = getRandomNumber(LIKE_COUNT_MIN, LIKE_COUNT_MAX);
    var pictureComments = getCommentsList(getRandomNumber(1, 2));
    arr.push(getRandomPictureItem(pictureUrl, pictureDescription, pictureLikesCount, pictureComments));
  }
  return arr;
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
