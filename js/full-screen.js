// Модуль просмотра фотографии

'use strict';

(function () {
  var DEFAULT_COMMENTS_NUMBER = 5;

  var fullScreenPopup = document.querySelector('.big-picture');
  var fullScreenPhoto = fullScreenPopup.querySelector('.big-picture__img').children[0];
  var fullScreenHeading = fullScreenPopup.querySelector('.social__caption');
  var fullScreenLikes = fullScreenPopup.querySelector('.likes-count');
  var fullScreenCommentsCounter = fullScreenPopup.querySelector('.social__comment-count');
  var fullScreenTotalCommentsAmount = fullScreenCommentsCounter.querySelector('.comments-count');
  var fullScreenVisibleCommentsNumber = fullScreenCommentsCounter.querySelector('.comments-count-amount');
  var fullScreenCommentsList = fullScreenPopup.querySelector('.social__comments');
  var fullScreenComment = fullScreenCommentsList.querySelector('.social__comment');
  var fullScreenCommentsLoader = fullScreenPopup.querySelector('.comments-loader');
  var fullScreenCloseButton = fullScreenPopup.querySelector('.big-picture__cancel');

  var totalCommentsAmount;
  var currentCommentsAmount;
  var hiddenComments;

  // Подставляет данные для окна открытой фотокарточки
  var setFullScreenPopup = function (photo) {
    fullScreenPhoto.src = photo.url;
    fullScreenPhoto.alt = photo.description;
    fullScreenHeading.textContent = photo.description;
    fullScreenLikes.textContent = photo.likes;
    totalCommentsAmount = photo.comments.length;
    fullScreenTotalCommentsAmount.textContent = totalCommentsAmount;
  };

  // Подставляет комментарии к посту
  var setComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {

      var commentBlock = fullScreenComment.cloneNode(true);
      var commentatorAvatar = commentBlock.querySelector('.social__picture');
      var commentText = commentBlock.querySelector('.social__text');

      commentatorAvatar.src = comments[i].avatar;
      commentatorAvatar.alt = comments[i].name;
      commentText.textContent = comments[i].message;
      // Если комментариев больше 5, то скрываем лишние
      if (i >= DEFAULT_COMMENTS_NUMBER) {
        commentBlock.classList.add('visually-hidden');
      }

      fragment.appendChild(commentBlock);
    }

    // Выводит список комментариев
    fullScreenCommentsList.innerHTML = '';
    fullScreenCommentsList.appendChild(fragment);
  };

  // Закрывает окна загрузки файла по нажатию Esc
  var onEscapePress = function (evt) {
    window.utils.isEscEvent(evt, closeFullScreenPopup);
  };

  // Убирает кнопку загрузки дополнительных комментариев
  var toggleCommentsLoader = function () {
    if (!hiddenComments.length) {
      fullScreenCommentsLoader.classList.add('hidden');
    } else if (fullScreenCommentsLoader.classList.contains('hidden')) {
      fullScreenCommentsLoader.classList.remove('hidden');
    }
  };

  // Обновляет счетчик комментариев
  var updateCommentsAmount = function () {
    hiddenComments = fullScreenCommentsList.querySelectorAll('.social__comment.visually-hidden');
    currentCommentsAmount = totalCommentsAmount - hiddenComments.length;
    fullScreenVisibleCommentsNumber.textContent = currentCommentsAmount;
  };

  // Показывает готовое полноразмерное изображение
  var showFullScreenPopup = function (photoData) {
    setFullScreenPopup(photoData);
    setComments(photoData.comments);
    updateCommentsAmount();
    toggleCommentsLoader();
    document.addEventListener('keydown', onEscapePress);
    fullScreenPopup.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  // Закрывает окно просмотра фотографии
  var closeFullScreenPopup = function () {
    fullScreenPopup.classList.add('hidden');
    document.removeEventListener('keydown', onEscapePress);
    document.body.classList.remove('modal-open');
  };

  fullScreenCloseButton.addEventListener('click', function () {
    closeFullScreenPopup();
  });

  // Показывает следующие комментарии при нажатии на кнопку
  var showMoreComments = function () {
    for (var i = 0; i < hiddenComments.length; i++) {
      if (i < DEFAULT_COMMENTS_NUMBER) {
        hiddenComments[i].classList.remove('visually-hidden');
      }
    }
  };

  fullScreenCommentsLoader.addEventListener('click', function () {
    showMoreComments();
    updateCommentsAmount();
    toggleCommentsLoader();
  });

  window.fullScreen = {
    showFullScreenPopup: showFullScreenPopup
  };

})();
