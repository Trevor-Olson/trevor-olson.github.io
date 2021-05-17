class Player
{
    constructor(game) {
        this.imageRight = document.getElementById('img_player1_right');
        this.imageLeft = document.getElementById('img_player1_left');
        //this.width = 120; // long car width
        this.width = 100; // octane width
        this.height = 40;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;
        this.floor = game.gameHeight - this.height - 10;
        this.position = {
            x: 210,
            y: this.floor,
        }
        this.speed = {
            x: 0,                       // horizantal speed ex: driving
            y: 0,                       // vertical speed   ex: jumping
            g: game.gravity,            // game gravity value
            loss: .8,                   // speed loss when not driving
            last: 1,                    // keeps the car facing the same way when it stop
        }
        this.accellerating = false;
        this.maxSpeed = 20;
    }
    moveLeft() {
        if (this.speed.x > 0) // if car is moving right
        { // cut the speed in half and change directions
            this.speed.x = -this.speed.x / 2; 
        }
        else if (this.speed.x >= -this.maxSpeed + 2) // if not at max speed
        {
            this.speed.x -= 2; // increase the speed by 2
        }
        else if ( this.speed.x >= -2 ) // if the car is moving slow
        {
            this.speed.x -= 2; // initial speed boost
        }
        this.speed.last = this.speed.x;
        this.accellerating = true;
    }
    moveRight() {
        if (this.speed.x < 0) {
            this.speed.x = -this.speed.x / 2;
        }
        else if (this.speed.x <= this.maxSpeed - 2) {
            this.speed.x += 2;
        }
        else if ( this.speed.x <= 2 )
        {
            this.speed.x += 2;
        }
        this.speed.last = this.speed.x;
        this.accellerating = true;
    }
    stop() 
    {
        this.accellerating = false;
    }
    jump() 
    {
        if (this.position.y == this.floor) {
            this.speed.y = -this.maxSpeed * .75;
        }
    }
    draw(ctx) {
        if (this.speed.x > 0 || this.speed.last > 0) {
            ctx.drawImage(this.imageRight, this.position.x, this.position.y, this.width,
                this.height);
        }
        else {
            ctx.drawImage(this.imageLeft, this.position.x, this.position.y, this.width,
                this.height);
        }

    }
    update(deltaTime) {
        if (!deltaTime) return;
        if ( this.accellerating == false )
        {
            this.speed.x *= this.speed.loss;
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        // collision with enviroment
        objectEnviromentCollision(this);
    }
}