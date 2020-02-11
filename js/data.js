// Модуль для генерации постов

'use strict';

(function () {
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

  var getPictureList = function (pictureCount) {
    var array = [];
    for (var i = 1; i <= pictureCount; i++) {
      array.push({
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии - ' + i,
        likes: window.utils.getRandomNumber(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
        comments: getCommentsList(window.utils.getRandomNumber(1, 2))
      });
    }
    return array;
  };

  var getRandomComment = function () {
    var comment = {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: window.utils.getRandomArrElement(AUTHOR_COMMENTS),
      name: window.utils.getRandomArrElement(COMMENT_AUTHOR_NAMES),
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

  var completedPhotoList = getPictureList(PICTURE_COUNT);

  window.data = {
    completedPhotoList: completedPhotoList
  };

})();
