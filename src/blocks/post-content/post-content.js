// window.addEventListener('scroll', () => {
//   const parallax = document.querySelector('.post-content__image');
//   const scrolled = window.pageYOffset;
//   const limit = parallax.offsetTop + parallax.offsetHeight;

//   if (scrolled > parallax.offsetTop && scrolled <= limit) {
//     parallax.style.top = (scrolled - parallax.offsetTop) / 2 + 'px';
//   } else {
//     parallax.style.top = -limit; /* сброс позиции фона */
//   }
// });