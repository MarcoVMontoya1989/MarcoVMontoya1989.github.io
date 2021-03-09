const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuotes() {
    showLoadingSpinner();

    const quoteAPI = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        // const response = await fetch(proxyUrl + quoteAPI); //local test
        const response = await fetch(quoteAPI); //cloud
        const data = await response.json();

        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        completeLoadingSpinner();

    } catch (error) {
        getQuotes();
        console.error(error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


newQuoteButton.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();

