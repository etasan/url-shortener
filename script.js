const btnHamburger = document.querySelector('#btnhamburger');
const body = document.querySelector('body');
const menu = document.querySelector('.headerMenu');
const formInput = document.querySelector('#shortenInput');
const form = document.querySelector('form');
const submitButton = document.querySelector('#submitButton');
const outputDiv = document.querySelector('#output');


    
form.addEventListener('submit', (event) => {
    outputDiv.classList.remove('active');
    event.preventDefault();
    let url = formInput.value;
    console.log(url);
    getUrl(url);
});

async function getUrl(url) {
    submitButton.classList.add('button-p-0');
    submitButton.innerHTML = `<img style="height: 40px; width: 40px;" class="img-fluid" src="/images/loader.gif" alt="">`;
    await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((response) => response.json())
        .then((data) => writeLink(data))
        .catch(() => writeError());
}

const linkEntered = document.querySelector('.linkEntered');
const shortened1 = document.querySelector('.shortlink1');
const shortened2 = document.querySelector('.shortlink2');


function writeLink(data) {
    console.log(data);
    outputDiv.classList.add('active');
    let url = formInput.value;
    let windowSize = window.outerWidth;
    if (windowSize >= 1920) {
        if (url.length > 84) {
            let urlShortened = url.substring(0,60) + "..." + url.substring((url.length - 20),url.length);
            linkEntered.innerHTML = urlShortened;
            sessionStorage.setItem('urlShortened', urlShortened);
        }
    } else if (windowSize >= 1280) {
        if (url.length > 64) {
            let urlShortened = url.substring(0,40) + "..." + url.substring((url.length - 20),url.length);
            linkEntered.innerHTML = urlShortened;
            sessionStorage.setItem('urlShortened', urlShortened);
        }
    } else if (windowSize >= 768) {
        if (url.length > 48) {
            let urlShortened = url.substring(0,24) + "..." + url.substring((url.length - 16),url.length);
            linkEntered.innerHTML = urlShortened;
            sessionStorage.setItem('urlShortened', urlShortened);
        }
    } else if (windowSize >= 360) {
        if (url.length > 25) {
            let urlShortened = url.substring(0,17) + "..." + url.substring((url.length - 8),url.length);
            linkEntered.innerHTML = urlShortened;
            sessionStorage.setItem('urlShortened', urlShortened);
        }
    };
    submitButton.classList.remove('button-p-0');
    submitButton.innerHTML = "Shorten It!";
    shortened1.innerHTML = data.result.short_link;
    shortened2.innerHTML = data.result.short_link2;
    sessionStorage.setItem('shortened1', data.result.short_link);
    sessionStorage.setItem('shortened2', data.result.short_link2);
}

const error = document.querySelector('.error');

function writeError() {
    outputDiv.classList.add('active');
    submitButton.classList.remove('button-p-0');
    submitButton.innerHTML = "Shorten It!";
    copyButton1.classList.add('d-none');
    copyButton2.classList.add('d-none');
    shortened1.classList.add('d-none');
    shortened1.parentElement.classList.remove('p-4', 'pe-2', 'ps-2');
    shortened2.classList.add('d-none');
    shortened2.parentElement.classList.remove('p-4', 'pe-2', 'ps-2');
    error.innerHTML = "Something went wrong! Try again with a valid Url adress.";
}

const copyButton1 = document.querySelector('#copyButton1');
const copyButton2 = document.querySelector('#copyButton2');

function copyText() {
    if(this.id === "copyButton1") {
        copyButton1.style.backgroundColor = "hsl(256, 26%, 38%)";
        copyButton1.innerHTML = "Copied!";
        copyButton2.innerHTML = "Copy It!";
        copyButton2.style.backgroundColor = "hsl(257, 27%, 26%)";
        navigator.clipboard.writeText(shortened1.innerHTML);
    } else {
        copyButton2.style.backgroundColor = "hsl(256, 26%, 38%)";
        copyButton2.innerHTML = "Copied!";
        copyButton1.innerHTML = "Copy It!";
        copyButton1.style.backgroundColor = "hsl(257, 27%, 26%)";
        navigator.clipboard.writeText(shortened2.innerHTML);
    }
}


copyButton1.addEventListener('click', copyText);
copyButton2.addEventListener('click', copyText);


function openMenu() {
    if (btnHamburger.classList.contains('open')) {
        body.classList.remove('noscroll');
        btnHamburger.classList.remove('open');
        menu.classList.remove('active');
    }
    else {
        body.classList.add('noscroll');
        btnHamburger.classList.add('open');
        menu.classList.add('active');
    }
}

btnHamburger.addEventListener('click', openMenu);

window.onload = function() {
    let reloadUrl = sessionStorage.getItem('urlShortened');
    let reloadLink1 = sessionStorage.getItem('shortened1');
    let reloadLink2 = sessionStorage.getItem('shortened2');
    if(reloadUrl !== null) {
        linkEntered.innerHTML = reloadUrl;
        shortened1.innerHTML = reloadLink1;
        shortened2.innerHTML = reloadLink2;
        outputDiv.classList.add('active');
    } else {
        outputDiv.classList.remove('active');
    }
}


// pencere boyutuna göre link uzunluğu
// pencere daraltırken header bozuluyor