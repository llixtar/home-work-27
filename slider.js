export class Slider {
    constructor(images, container, interval) {
        this.images = images;
        this.container = container;
        this.intervalAutoPlay = interval;
        this.current = 0;
        this.singleImgSize = 200;
        this.isPaused = false;
        this.imgElements = [];
        this.indicators = [];

        this.init();
    }

    init() {
        this.renderImages();
        this.renderIndicators();
        this.renderButtons();
        this.enableKeyboard();
        this.enableMouseSwipe();
        this.enableTouchSwipe();
        this.enableHoverPause();
        this.startAutoPlay();
    }

    renderImages() {
        for (let i = 0; i < this.images.length; i++) {
            const img = document.createElement('img');
            img.src = this.images[i];
            img.setAttribute('draggable', 'false');
            this.container.appendChild(img);
            this.imgElements.push(img);
        }
    }

    renderIndicators() {
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
    }

    renderButtons() {
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
    }

    showSlide(forward) {
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
    }

    enableHoverPause() {
        const thisSlider = this;

        this.container.addEventListener('mouseenter', function () {
            thisSlider._pausedByHover = true;
            thisSlider.isPaused = true;
        });

        this.container.addEventListener('mouseleave', function () {
            thisSlider._pausedByHover = false;
            thisSlider.isPaused = false;
        });
    }

    startAutoPlay() {
        const thisSlider = this;
        setInterval(function () {
            if (!thisSlider.isPaused) {
                thisSlider.showSlide(true);
            }
        }, this.intervalAutoPlay);
    }

    enableKeyboard() {
        const thisSlider = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                thisSlider.showSlide(false);
            } else if (e.key === 'ArrowRight') {
                thisSlider.showSlide(true);
            }
        });
    }

    enableMouseSwipe() {
        const thisSlider = this;
        let startX = 0;

        this.container.addEventListener('mousedown', function (e) {
            startX = e.pageX;
        });

        this.container.addEventListener('mouseup', function (e) {
            const dx = e.pageX - startX;
            thisSlider.showSlide(dx < 0);

        });
    }

    enableTouchSwipe() {
        const thisSlider = this;
        let startX = 0;

        this.container.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', function (e) {
            const dx = e.changedTouches[0].clientX - startX;
            thisSlider.showSlide(dx < 0);
        });
    }
}
