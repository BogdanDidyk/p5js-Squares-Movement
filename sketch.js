const DIRECTIONS = ["up", "right", "down", "left"];
let rndBackground;
let squares;

function setup() {
    const canvas = createCanvas(500, 500);
    const canvasElement = canvas.elt;
    noStroke();

    rndBackground = random(255);
    squares = createMovableSquares(50);

    canvasElement.addEventListener('click', mouseClick);
}

function draw() {
    background(rndBackground);

    squares.forEach(square => square.updatePosition());
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

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Square {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }

    draw() {
        square(this.position.x, this.position.y, this.size);
    }
}

class MovableSquare extends Square {
    _direction;

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this._direction = value;

        switch(this._direction) {
            case "u":
            case "up":
                this.move = function() {
                    this.position.y = (this.position.y - this.speed) % height;
                };
            break;
            case "r":
            case "right":
                this.move = function() {
                    this.position.x = (this.position.x + this.speed) % width;
                };
            break;
            case "d":
            case "down":
                this.move = function() {
                    this.position.y = (this.position.y + this.speed) % height;
                };
            break;
            case "l":
            case "left":
                this.move = function() {
                    this.position.x = (this.position.x - this.speed) % width;
                };
            break;
            default:
            break;
        }
    }

    constructor(position, size, color, direction, speed = 1) {
        super(position, size);

        this.color = color;
        this.direction = direction;
        this.speed = speed;
    }

    updatePosition() {
        this.draw();
        this.move();
    }

    draw() {
        fill(this.color);
        super.draw();

        if (this.position.y < 0) {
            square(this.position.x, this.position.y + height, this.size);
        }

        if (this.position.x + this.size > width) {
            square(this.position.x - width, this.position.y, this.size);
        }

        if (this.position.y + this.size > height) {
            square(this.position.x, this.position.y - height, this.size);
        }

        if (this.position.x < 0) {
            square(this.position.x + width, this.position.y, this.size);
        }
    }
}