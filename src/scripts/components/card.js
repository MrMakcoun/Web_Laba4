const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

export function likeCard(likeButton) {
  const liked = likeButton.classList.toggle('card__like-button_is-active');
  likeButton.setAttribute('aria-pressed', String(liked));
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

function getTemplate() {
  return cardTemplate.cloneNode(true);
}

export function createCardElement(data, { onPreviewPicture, onLikeIcon, onDeleteCard }) {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__control-button_type_delete');
  const previewButton = cardElement.querySelector('.card__preview');
  const cardImage = previewButton.querySelector('.card__image');
  const regionElement = cardElement.querySelector('.card__region');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;
  if (data.region) {
    regionElement.textContent = data.region;
    regionElement.hidden = false;
  }

  likeButton.addEventListener('click', () => onLikeIcon(likeButton));
  deleteButton.addEventListener('click', () => onDeleteCard(cardElement));
  previewButton.addEventListener('click', () => onPreviewPicture(data));

  return cardElement;
}
