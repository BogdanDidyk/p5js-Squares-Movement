const DIRECTIONS = ["up", "right", "down", "left"];
let rndBackground;
let squares;

function setup() {
    createCanvasInside("canvas");

    noStroke();
    rndBackground = random(255);
    squares = createMovableSquares(50);

    canvas.addEventListener('click', mouseClick);
}

function draw() {
    background(rndBackground);

    squares.forEach(square => square.updatePosition());
}

function createCanvasInside(containerId) {
    const container = document.getElementById(containerId);
    const canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent(containerId);
}

function getRandomRGBA(alphaFrom = 0.1, alphaTo = 0.7) {
    const r = int(random(256));
    const g = int(random(256));
    const b = int(random(256));
    const alpha = random(alphaFrom, alphaTo);

    return `rgba(${r},${g},${b},${alpha})`;
}

function getRandomMovableSquare(rndSizeMin, rndSizeMax) {
    const size = random(rndSizeMin, rndSizeMax);
    const position = new Point(random(width - size), random(height - size));

    return new MovableSquare(
        position,
        size,
        getRandomRGBA(),
        random(DIRECTIONS),
        random(0.2, 0.8)
    );
}

function createMovableSquares(count) {
    return Array.from({ length: count }, () => getRandomMovableSquare(width / 30, width / 15));
}

function mouseClick() {
    squares.forEach(square => square.speed = (square.speed + 1) % 4);
}

function keyPressed() {
    if (keyCode === 32) {
        rndBackground = random(255);
    }
}