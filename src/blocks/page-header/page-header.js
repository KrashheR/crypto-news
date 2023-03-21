let progressHandler = document.querySelector(".page-header__progress-handle");
let progressBar = document.querySelector(".page-header__progress-bar");

window.onscroll = function() {
  progressUpdate()
};

// window.addEventListener('scroll', function() {
//   if (document.documentElement.scrollHeight > 100) {
//     progressBar.classList.remove('non-display');
//   } else {
//     progressBar.classList.add('non-display');
//   }
// });



function progressUpdate() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  progressHandler.style.width = scrolled + "%";

}

// function toggleProgressBar(height) {
//   console.log(height);
//   if (height > 100) {
//     progressBar.classList.remove('non-display');
//   } else {
//     progressBar.classList.add('non-display');
//   }
// }