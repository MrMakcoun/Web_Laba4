const toastDuration = 4000;
let hideTimer;

export function showToast(toastElement, message) {
  window.clearTimeout(hideTimer);
  toastElement.textContent = message;
  toastElement.classList.add('toast_visible');

  hideTimer = window.setTimeout(() => {
    toastElement.classList.remove('toast_visible');
    toastElement.textContent = '';
  }, toastDuration);
}
