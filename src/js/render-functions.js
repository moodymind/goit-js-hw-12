import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

export function addImages(images) {
  const imageMarkup = images
    .map(image => {
      return `<li class='image-card'>
            <a href="${image.largeImageURL}" class="gallery-link">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image">
            </a>
            <div class="info">
            <p class="info-item">
            <b>Likes: ${image.likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${image.views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${image.comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${image.downloads}</b>
            </p>
            </div>
            </li>`;
    })
    .join('');

  gallery.innerHTML = imageMarkup;
}

export function imageGalleryLightbox() {
  let lightbox = new SimpleLightbox('.gallery, a', {
    captionsData: 'alt',
    captionDelay: 250,
    overlay: true,
    overlayOpacity: 0.8,
  });
  lightbox.refresh();
}
