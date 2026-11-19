import { initialCards } from './cards.js';
import avatarUrl from '../images/avatar.jpg';
import { createCardElement, deleteCard, likeCard } from './components/card.js';
import {
  openModalWindow, closeModalWindow, setCloseModalWindowEventListeners,
} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { showToast } from './components/toast.js';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const places = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const imagePopup = document.querySelector('.popup_type_image');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];
const profileNameInput = profileForm.elements['user-name'];
const profileDescriptionInput = profileForm.elements['user-description'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements['place-link'];
const cardRegionInput = cardForm.elements['place-region'];
const avatarInput = avatarForm.elements['user-avatar'];
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const toast = document.querySelector('.toast');

function openImage({ name, link, region }) {
  image.src = link;
  image.alt = name;
  caption.textContent = region ? `${name} · ${region}` : name;
  openModalWindow(imagePopup);
}

function makeCard(data) {
  return createCardElement(data, {
    onPreviewPicture: openImage,
    onLikeIcon: likeCard,
    onDeleteCard: deleteCard,
  });
}

function resetForm(form) {
  form.reset();
  clearValidation(form, validationSettings);
}

function setAvatar(url) {
  profileAvatar.style.backgroundImage = `url(${JSON.stringify(url)})`;
}

enableValidation(validationSettings);
setAvatar(avatarUrl);
initialCards.forEach((card) => places.append(makeCard(card)));
document.querySelectorAll('.popup').forEach(setCloseModalWindowEventListeners);

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationSettings);
  openModalWindow(profilePopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
  resetForm(cardForm);
  openModalWindow(cardPopup);
});

profileAvatar.addEventListener('click', () => {
  resetForm(avatarForm);
  openModalWindow(avatarPopup);
});

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!profileForm.checkValidity()) return;
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModalWindow(profilePopup);
});

avatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!avatarForm.checkValidity()) return;
  setAvatar(new URL(avatarInput.value).href);
  resetForm(avatarForm);
  closeModalWindow(avatarPopup);
});

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!cardForm.checkValidity()) return;

  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    region: cardRegionInput.value,
  };
  places.prepend(makeCard(card));
  resetForm(cardForm);
  closeModalWindow(cardPopup);
  showToast(toast, `Место «${card.name}» добавлено`);
});
