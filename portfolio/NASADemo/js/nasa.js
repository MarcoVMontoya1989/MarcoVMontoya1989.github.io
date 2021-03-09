const secretKey = 'UnaIAajeQePZFUU5O5X61P8PTyYAtmw0gnbNaV9y';
const count = 10;
const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${secretKey}&count=${count}`;

const resultsNav = document.querySelector('#resultsNav');
const favoriteNav = document.querySelector('#favoritesNav');
const imagesContainer = document.querySelector(`.images-container`);
const loader = document.querySelector('.loader');
const saveConfirm = document.querySelector('.save-confirmed');

let imagesResult = [];
let favorites = {};

function saveToFav(itemUrl) {
    imagesResult.forEach(item => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            saveConfirm.hidden = false;
            setTimeout(() => {
                saveConfirm.hidden = true;
            }, 2000);

            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    })
}

function removeFav(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }
}

function createNodesDOM(page) {
    const currentArray = page === 'results' ? imagesResult : Object.values(favorites);

    currentArray.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = image.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';

        const imageNasa = document.createElement('img');
        imageNasa.src = image.url;
        imageNasa.alt = 'NASA Picture of the Day';
        imageNasa.loading = 'lazy';
        imageNasa.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = image.title;

        const saveText = document.createElement('p');
        saveText.classList.add('clickable');

        if(page === 'results') {
            saveText.textContent = 'Add To Favorites';
            saveText.setAttribute('onclick', `saveToFav('${image.url}')`);
        } else {
            saveText.textContent = 'Remove Favorite';
            saveText.setAttribute('onclick', `removeFav('${image.url}')`);
        }

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = image.explanation;

        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        const date = document.createElement('strong');
        date.textContent = image.date;

        const copyright = document.createElement('span');
        const copyRightResult = image.copyright === undefined ? image.copyright : 'NASA All Rights Reserved'
        copyright.textContent = ` ${copyRightResult}`;

        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.append(imageNasa);
        card.append(link, cardBody);

        imagesContainer.appendChild(card);

    });
}

function updateDOM(page) {
    //get favs
    if(localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'))
    }

    imagesContainer.textContent = '';

    createNodesDOM(page);
    showContent(page);
}

function showContent(page) {
    window.scrollTo({top: 0, behavior: 'smooth'});

    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favoriteNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favoriteNav.classList.remove('hidden');
    }
    loader.classList.add('hidden');
}

async function getNASAImages() {
    loader.classList.remove('hidden');

    try {
        const response = await fetch(nasaUrl);
        imagesResult = await response.json();
        updateDOM('results');
    } catch (e) {
        console.log(e);
        getNASAImages();
    }
}


getNASAImages();