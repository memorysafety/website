/**
 * Lightbox component for presenting various types of media
 * @requires https://github.com/sachinchoolur/lightgallery.js
*/

const gallery = (() => {

  let gallery = document.querySelectorAll('.gallery');
  if (gallery.length) {
    for (let i = 0; i < gallery.length; i++) {
      lightGallery(gallery[i], {
        selector: '.gallery-item',
        download: false,
        videojs: true,
        youtubePlayerParams: {
          modestbranding: 1,
          showinfo: 0,
          rel: 0
        },
        vimeoPlayerParams: {
          byline: 0,
          portrait: 0
        }
      });
    }
  }
})();

export default gallery;
