let activePopup;
let previousFocus;

function handleEscUp(event) {
  if (event.key === 'Escape') closeModalWindow(activePopup);
}

export function openModalWindow(modalWindow) {
  if (activePopup) closeModalWindow(activePopup);
  previousFocus = document.activeElement;
  activePopup = modalWindow;
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
  const firstControl = modalWindow.querySelector('input') ?? modalWindow.querySelector('.popup__close');
  firstControl.focus();
}

export function closeModalWindow(modalWindow) {
  if (modalWindow !== activePopup) return;
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
  activePopup = undefined;
  previousFocus?.focus();
}

export function setCloseModalWindowEventListeners(modalWindow) {
  modalWindow.querySelector('.popup__close').addEventListener('click', () => {
    closeModalWindow(modalWindow);
  });

  modalWindow.addEventListener('mousedown', (event) => {
    if (event.target === modalWindow) closeModalWindow(modalWindow);
  });
}
