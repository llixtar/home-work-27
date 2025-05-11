function Slider(images, container) {
    this.images = images;
    this.container = container;
    this.current = 0;
    this.isPaused = false;
    this.singleImgSize = 200;
    this.imgElements = [];
    this.indicators = [];

    this.init();
}

Slider.prototype.init = function () {
    this.renderImages();
    this.renderIndicators();
    this.renderButtons();
    this.enableKeyboard();
    this.enableMouseSwipe();
    this.enableTouchSwipe();
    this.startAutoPlay();
};

Slider.prototype.renderImages = function () {
    for (let i = 0; i < this.images.length; i++) {
        const img = document.createElement('img');
        img.src = this.images[i];
        img.setAttribute('draggable', 'false');
        this.container.appendChild(img);
        this.imgElements.push(img);
    }
};

Slider.prototype.renderIndicators = function () {
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'slider-indicator-container';

    for (let i = 0; i < this.images.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'slider-indicator';
        if (i === 0) {
            dot.classList.add('slider-indicator-active');
        }
        indicatorContainer.appendChild(dot);
        this.indicators.push(dot);
    }

    document.body.appendChild(indicatorContainer);
};

Slider.prototype.renderButtons = function () {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'button-container';

    const thisSlider = this;

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Prev';
    prevBtn.onclick = function () {
        thisSlider.showSlide(false);
    };

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.onclick = function () {
        thisSlider.showSlide(true);
    };

    const pauseBtn = document.createElement('button');
    pauseBtn.innerText = 'Pause';
    pauseBtn.onclick = function () {
        thisSlider.isPaused = !thisSlider.isPaused;
        pauseBtn.innerText = thisSlider.isPaused ? 'Start' : 'Pause';
    };

    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(nextBtn);
    btnContainer.appendChild(pauseBtn);

    document.body.appendChild(btnContainer);
};

Slider.prototype.showSlide = function (forward) {
    if (forward) {
        this.current++;
        if (this.current === this.images.length) {
            this.current = 0;
        }
    } else {
        this.current--;
        if (this.current < 0) {
            this.current = this.images.length - 1;
        }
    }

    const offset = -this.current * this.singleImgSize;
    this.imgElements[0].style.marginLeft = offset + 'px';

    for (let i = 0; i < this.indicators.length; i++) {
        this.indicators[i].classList.toggle('slider-indicator-active', i === this.current);
    }
};

Slider.prototype.startAutoPlay = function () {
    const thisSlider = this;
    setInterval(function () {
        if (!thisSlider.isPaused) {
            thisSlider.showSlide(true);
        }
    }, 1000);
};

Slider.prototype.enableKeyboard = function () {
    const thisSlider = this;
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            thisSlider.showSlide(false);
        } else if (e.key === 'ArrowRight') {
            thisSlider.showSlide(true);
        }
    });
};

Slider.prototype.enableMouseSwipe = function () {
    const thisSlider = this;
    let startX = 0;

    this.container.addEventListener('mousedown', function (e) {
        startX = e.pageX;
    });

    this.container.addEventListener('mouseup', function (e) {
        const dx = e.pageX - startX;
        thisSlider.showSlide(dx < 0);
    });
};

Slider.prototype.enableTouchSwipe = function () {
    const thisSlider = this;
    let startX = 0;

    this.container.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchend', function (e) {
        const endX = e.changedTouches[0].clientX;
        const dx = endX - startX;
        thisSlider.showSlide(dx < 0);
    });
};


const container = document.createElement('div');
container.className = 'main-container';
document.body.appendChild(container);

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
    'https://picsum.photos/id/140/200/300'
];

new Slider(imgsSrc, container);
