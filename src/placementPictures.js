export function placementPictur(markup) {
    return markup
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, download }) => {
            return `div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${download}
    </p>
  </div></div>`
        }).join('');
    
}