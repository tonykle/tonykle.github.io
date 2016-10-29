// all images have width of 800px

window.onload = () => {
  let images =
  [
    { url : 'http://i.imgur.com/PInwDSB.jpg?1', locationAndDate : 'San Francisco, CA - 08/15/2016' },
    { url : 'http://i.imgur.com/wtSdnvZ.jpg', locationAndDate : 'San Francisco, CA - 08/15/2016' },
    { url : 'http://i.imgur.com/tQaufLI.jpg', locationAndDate : 'San Francisco, CA - 08/14/2016'}

  ];
  loadImageLinks();

  function loadImageLinks() {
    let doc = document;
    let imagesContainer = doc.createElement('div');
    images.forEach(imageInfo => {
      let imageContainer = doc.createElement('div');

      // Image title
      let imageTitle = doc.createElement('div');
      imageTitle.setAttribute('class', 'imageTitles');
      imageTitle.innerHTML = imageInfo.locationAndDate;

      // Image itself
      let image = doc.createElement('img');
      image.setAttribute('class', 'allImages');
      image.setAttribute('src', imageInfo.url);
      image.setAttribute('alt', 'image-' + imageInfo.locationAndDate);

      // Append everything
      imagesContainer.appendChild(imageTitle);
      imagesContainer.appendChild(image);
    });
    doc.getElementById('content').appendChild(imagesContainer);
  };
};
