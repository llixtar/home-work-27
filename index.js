const imgsSrc = [
    'https://picsum.photos/id/10/200/300',
    'https://picsum.photos/id/20/200/300',
    'https://picsum.photos/id/30/200/300',
    'https://picsum.photos/id/40/200/300',
    'https://picsum.photos/id/50/200/300',
    'https://picsum.photos/id/60/200/300',
    'https://picsum.photos/id/70/200/300',
    'https://picsum.photos/id/80/200/300',
    'https://picsum.photos/id/90/200/300',
    'https://picsum.photos/id/100/200/300',
    'https://picsum.photos/id/110/200/300',
    'https://picsum.photos/id/120/200/300',
    'https://picsum.photos/id/130/200/300',
    'https://picsum.photos/id/140/200/300',

];

const singleImgSize = 200;
const body = document.body;

function createElement(tag, classNames) {
    const el = document.createElement(tag);
    for (let i = 0; i < classNames.length; i++) {
        el.classList.add(classNames[i]);
    }
    return el;
}

function createImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.setAttribute('draggable', 'false');
    return img;
}

function getNextPosition(slidesCount) {
    let current = 0;

    return function (forward) {
        if (typeof forward === 'undefined') {
            forward = true;
        }

        if (forward) {
            current++;
            if (current === slidesCount) {
                current = 0;
            }
        } else {
            current--;
            if (current < 0) {
                current = slidesCount - 1;
            }
        }

        return current;
    };
}


function updateSlide(index) {
    const firstImg = document.querySelector("img[src='https://picsum.photos/id/10/200/300']");
    if (firstImg) {
        firstImg.style.marginLeft = (-index * singleImgSize) + 'px';
    }

    const indicators = document.getElementsByClassName('slider-indicator');
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.toggle('slider-indicator-active', i === index);
    }
}


function renderImages(sources, container) {
    for (let i = 0; i < sources.length; i++) {
        container.appendChild(createImage(sources[i]));
    }
}

function createButton(text, onClick) {
    const btn = document.createElement('button');
    btn.innerText = text;
    if (onClick) {
        btn.addEventListener('click', onClick);
    }
    return btn;
}

function createSliderButtons(getNextSlide, btnContainer) {
    const prevBtn = createButton('Prev', function () {
        updateSlide(getNextSlide(false));
    });
    const nextBtn = createButton('Next', function () {
        updateSlide(getNextSlide(true));
    });
    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(nextBtn);
}

function createPlayPauseButton(btnContainer) {
    const btn = createButton('Pause');
    let isPaused = false;

    btn.addEventListener('click', function () {
        isPaused = !isPaused;
        btn.innerText = isPaused ? 'Start' : 'Stop';
    });

    btnContainer.appendChild(btn);

    return function () {
        return !isPaused;
    };
}

function createIndicators(count) {
    const container = createElement('div', ['slider-indicator-container']);
    for (let i = 0; i < count; i++) {
        const indicator = createElement('div', ['slider-indicator']);
        if (i === 0) {
            indicator.classList.add('slider-indicator-active');
        }
        container.appendChild(indicator);
    }
    body.appendChild(container);
}

function addSwipe(element, getNextSlide) {
    let startX = 0;

    element.addEventListener('mousedown', function (e) {
        startX = e.x;
    });

    element.addEventListener('mouseup', function (e) {
        const dx = e.x - startX;

        updateSlide(getNextSlide(dx > 0));

    });
}

function initializeSlider() {
    const main = createElement('div', ['main-container']);
    body.appendChild(main);

    renderImages(imgsSrc, main);

    const getNextSlide = getNextPosition(imgsSrc.length);

    createIndicators(imgsSrc.length);

    const buttonContainer = createElement('div', ['button-container']);
    body.appendChild(buttonContainer);
    createSliderButtons(getNextSlide, buttonContainer);

    const isAutoPlay = createPlayPauseButton(buttonContainer);

    setInterval(function () {
        if (isAutoPlay()) {
            updateSlide(getNextSlide(true));
        }
    }, 1000);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            updateSlide(getNextSlide(false));
        } else if (e.key === 'ArrowRight') {
            updateSlide(getNextSlide(true));
        }
    });

    addSwipe(main, getNextSlide);
}

initializeSlider();
