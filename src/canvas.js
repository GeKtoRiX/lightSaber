import style from './main.css';

const htmlCanvas = document.getElementById('canvas');
const canvas = htmlCanvas.getContext('2d');

htmlCanvas.width = window.innerWidth - 4;
htmlCanvas.height = window.innerHeight - 4;

addEventListener('resize', () => {
    htmlCanvas.width = window.innerWidth - 4;
    htmlCanvas.height = window.innerHeight - 4;
})

const center = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}

const mouse = {
    x: center.x,
    y: center.y,
}

let angle = 0;

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX - htmlCanvas.width / 2;
    mouse.y = event.clientY - htmlCanvas.height / 2;
    // Получение угла theta.
    angle = Math.atan2(mouse.y, mouse.x);
})

class Particle {
    constructor(x, y, radius, distFromCenter, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.distFromCenter = distFromCenter;
        this.color = color;
    }

    draw() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 180, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
    }
    update() {
        this.draw();
        this.x = center.x + (this.distFromCenter * Math.cos(angle));
        this.y = center.y + (this.distFromCenter * Math.sin(angle));
    }
}
let particles;
function init() {
    const radius = 5;
    const particleValue = 200;
    const hueIncrement = 360 / particleValue;
    particles = [];
    for (let i = 0; i < particleValue; i++) {
        const x = (center.x) + (i * Math.cos(Math.PI));
        const y = (center.y) + (i * Math.sin(-Math.PI));
        const hue = 30;
        particles.push(new Particle(x, y, radius, i, `hsl(${hueIncrement * i},50%,50%)`));
    }
}

function animate() {
    canvas.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvas.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
    particles.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(animate);
}
init();
animate();

