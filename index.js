import { Slider } from './slider.js';
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

    new Slider(imgsSrc, container, 1250);

    const container2 = document.createElement('div');
    container2.className = 'main-container';
    document.body.appendChild(container2);

    const imgsSrc2 = [
        'https://picsum.photos/id/5/200/300',
        'https://picsum.photos/id/15/200/300',
        'https://picsum.photos/id/25/200/300',
        'https://picsum.photos/id/35/200/300',
        'https://picsum.photos/id/45/200/300'
    ];

    new Slider(imgsSrc2, container2, 1000);
    
