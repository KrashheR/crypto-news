const progressHandler = document.querySelector('.page-header__progress-handle');

function progressUpdate() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressHandler.style.width = `${scrolled}%`;
}
