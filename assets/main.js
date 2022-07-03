document.addEventListener('DOMContentLoaded', () => {
  const $triggers = document.querySelectorAll('[data-target]');
  if ($triggers.length === 0) return;

  $triggers.forEach((el) => el.addEventListener('click', () => {
    const target = el.dataset.target;
    const $target = document.getElementById(target);

    el.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  }));
});
