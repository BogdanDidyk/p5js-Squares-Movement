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