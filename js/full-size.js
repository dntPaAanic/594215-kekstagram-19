// Модуль просмотра фотографии

'use strict';

(function () {
  var MAX_DISPLAY_COMMENTS = 5;

  var fullSizePopup = document.querySelector('.big-picture');
  var commentsCountBlock = fullSizePopup.querySelector('.social__comment-count');
  var fullSizeVisibleCommentsNumber = commentsCountBlock.querySelector('.comments-count-amount');
  var fullSizePhoto = fullSizePopup.querySelector('.big-picture__img').children[0];
  var fullSizeHeading = fullSizePopup.querySelector('.social__caption');
  var fullSizeLikes = fullSizePopup.querySelector('.likes-count');
  var commentsCountMax = commentsCountBlock.querySelector('.comments-count');
  var fullSizeCommentsLoader = fullSizePopup.querySelector('.comments-loader');
  var fullSizeCloseButton = fullSizePopup.querySelector('.big-picture__cancel');
  var fullSizeCommentsList = fullSizePopup.querySelector('.social__comments');
  var fullSizeComment = fullSizeCommentsList.querySelector('.social__comment');
  var currentComments = [];

  // Собирает один комментарий
  var getCommentBlock = function (comment) {
    var commentBlock = fullSizeComment.cloneNode(true);
    var commentatorAvatar = commentBlock.querySelector('.social__picture');
    var commentText = commentBlock.querySelector('.social__text');

    commentatorAvatar.src = comment.avatar;
    commentatorAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    return commentBlock;
  };

  // Собирает все комментарии в один фрагмент для удобства вывода с n-ого комментария
  var getCommentList = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(getCommentBlock(comment));
    });
    return fragment;
  };

  // Показывает комментарии
  var loadComments = function (comments) {
    var startCommentsCount = fullSizeCommentsList.querySelectorAll('.social__comment').length;
    var commentsSection = comments.slice(startCommentsCount, startCommentsCount + MAX_DISPLAY_COMMENTS);
    fullSizeCommentsList.appendChild(getCommentList(commentsSection));

    var totalCommentsCount = fullSizeCommentsList.querySelectorAll('.social__comment').length;
    if (totalCommentsCount === comments.length) {
      fullSizeCommentsLoader.classList.add('hidden');
      fullSizeCommentsLoader.removeEventListener('click', onLoadCommentsClick);
    }

    fullSizeVisibleCommentsNumber.textContent = totalCommentsCount;
  };

  var onLoadCommentsClick = function () {
    loadComments(currentComments);
  };

  // Подставляет данные для окна открытой фотокарточки
  var setFullSizePopup = function (photo) {
    fullSizePhoto.src = photo.url;
    fullSizePhoto.alt = photo.description;
    fullSizeLikes.textContent = photo.likes;
    fullSizeHeading.textContent = photo.description;
    commentsCountMax.textContent = photo.comments.length;
    fullSizeCommentsList.innerHTML = '';
    fullSizeCommentsLoader.classList.remove('hidden');
    currentComments = photo.comments;
    loadComments(currentComments);
    fullSizeCommentsLoader.addEventListener('click', onLoadCommentsClick);
  };

  // Показывает готовое полноразмерное изображение
  var showFullSizePopup = function (photoData) {
    setFullSizePopup(photoData);
    document.addEventListener('keydown', onEscapePress);
    fullSizePopup.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  // Закрывает окно по нажатию Esc
  var onEscapePress = function (evt) {
    window.utils.isEscEvent(evt, closeFullSizePopup);
  };

  // Закрывает окно просмотра фотографии
  var closeFullSizePopup = function () {
    fullSizePopup.classList.add('hidden');
    document.removeEventListener('keydown', onEscapePress);
    document.body.classList.remove('modal-open');
  };

  fullSizeCloseButton.addEventListener('click', function () {
    closeFullSizePopup();
  });

  window.fullSize = {
    showFullSizePopup: showFullSizePopup,
    fullSizePhoto: fullSizePhoto
  };

})();
