let particles = [];

// setup fucntion
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    let particlesCount = Math.floor(width / 10);
    let i = 0;
    while (i < particlesCount) {
        particles.push(new Particle());
        i++;
    }
}

// draw function
function draw() {
    background(55, 100, 144);
    particles.forEach((particle, index) => {
        particle.update();
        particle.drawCircle();
        particle.connectParticles(particles.slice(index));
    });
}

// a single particle
class Particle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.size = 10;
        this.speed = createVector(random(-1, 1), random(-1, 1));
    }

    // drawing particles
    drawCircle() {
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.position.x, this.position.y, this.size);
    }

    // updating particles
    update() {
        this.position.add(this.speed);
        this.checkEdges();
    }

    // checking boundaries
    checkEdges() {
        if (this.position.x < 0 || this.position.x > width) this.speed.x *= -1;
        if (this.position.y < 0 || this.position.y > height) this.speed.y *= -1;
    }

    // connecting particles
    connectParticles(particles) {
        particles.forEach((particle) => {
            let d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
            if (d < 80) {
                stroke('rgba(255,255,255,0.1)');
                line(this.position.x, this.position.y, particle.position.x, particle.position.y);
            }
        });
    }
}