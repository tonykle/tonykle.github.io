// all images have width of 800px

window.onload = () => {
  let images =
  [
    { url : 'http://i.imgur.com/PInwDSB.jpg?1',
      location : 'San Francisco, CA',
      date : '08/15/2016'
    },
    { url : 'http://i.imgur.com/wtSdnvZ.jpg',
      location : 'San Francisco, CA',
      date : '08/15/2016'
    },
    { url : 'http://i.imgur.com/tQaufLI.jpg',
      location : 'San Francisco, CA',
      date : '08/14/2016'
    }
  ];
  loadImageLinks();

  function loadImageLinks() {
    let doc = document;
    let imagesContainer = doc.createElement('div');
    images.forEach(imageInfo => {
      let imageContainer = doc.createElement('div');

      // Image location
      let imageLocation= doc.createElement('div');
      imageLocation.setAttribute('class', 'imageTitles');
      imageLocation.innerHTML = imageInfo.location;

      // Image date
      let imageDate = doc.createElement('div');
      imageDate.setAttribute('class', 'imageDates');
      imageDate.innerHTML = imageInfo.date;

      // Image itself
      let image = doc.createElement('img');
      image.setAttribute('class', 'allImages');
      image.setAttribute('src', imageInfo.url);
      image.setAttribute('alt', 'image-' + imageInfo.location + imageInfo.date);

      // Append everything
      imagesContainer.appendChild(imageLocation);
      imagesContainer.appendChild(imageDate);
      imagesContainer.appendChild(image);
    });
    doc.getElementById('content').appendChild(imagesContainer);
  };
};
