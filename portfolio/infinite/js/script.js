const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let initialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialPhotosToLoad = 5;

const secret = 'nx3DrZye9ogOlFiG1eXiFxzrchar_9TmVSWVcbeG44U';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${secret}&count=${initialPhotosToLoad}`

function setAttributesToElement(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${secret}&count=${picCount}`;
}

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        // photosToLoad = 25;
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');

        setAttributesToElement(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');

        setAttributesToElement(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);

        imageContainer.appendChild(item);
    });
}

async function getPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(initialLoad) {
            updateAPIURLWithNewCount(30);
            initialLoad = false;
        }
    } catch (e) {
        console.log(e);
    }
}

window.addEventListener('scroll', event => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
  && ready) {
      ready = false;
      getPhotosFromAPI();
  }
});

getPhotosFromAPI();