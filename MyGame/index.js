let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

function playerBallCollision(gamePlayer, gameBall) {
    // variables to hold the ball's hitbox
    let bottomOfBall = gameBall.position.y + gameBall.height;
    let midYOfBall = gameBall.position.y + gameBall.height / 2;
    let topOfBall = gameBall.position.y;
    let leftOfBall = gameBall.position.x;
    let midXOfBall = gameBall.position.x + gameBall.width / 2;
    let rightOfBall = gameBall.position.x + gameBall.width;
    // variables to hold the player's hitbox
    let bottomOfPlayer = gamePlayer.position.y + gamePlayer.height;
    let midYOfPlayer = gamePlayer.position.y + gamePlayer.height / 2;
    let topOfPlayer = gamePlayer.position.y;
    let leftOfPlayer = gamePlayer.position.x;
    let midXOfPlayer = gamePlayer.position.x + gamePlayer.width / 2;
    let rightOfPlayer = gamePlayer.position.x + gamePlayer.width;
    let playerXSpeed = gamePlayer.speed.x;
    let playerYSpeed = gamePlayer.speed.y;

    // check for ball/player collision

    // check for vetical allignment
    if (!(bottomOfBall < topOfPlayer || topOfBall > bottomOfPlayer)) {
        // left of ball hits right of player
        if (leftOfBall <= rightOfPlayer && rightOfBall > rightOfPlayer) {
            // add the cars speed to the ball speed and check for maxspeed
            gameBall.speed.x = Math.abs(playerXSpeed) + Math.abs(gameBall.speed.x);
            if (Math.abs(gameBall.speed.x) >= gameBall.maxSpeed) {
                gameBall.speed.x = gameBall.maxSpeed;
            }
            // check if the ball should go up, down or straight
            if (midYOfBall < topOfPlayer) // the player hits the lower half of the ball
            {
                gameBall.speed.y = gameBall.speed.x;
            }
            else if (midYOfBall > bottomOfPlayer) // player hits the top half of the ball
            {
                gameBall.speed.y = -gameBall.speed.x;
            }
        }
        // right of ball hits left of player
        else if (rightOfBall >= leftOfPlayer && leftOfBall < leftOfPlayer) {
            // add the cars speed to the ball speed and check for maxspeed
            gameBall.speed.x = -Math.abs(playerXSpeed) - Math.abs(gameBall.speed.x);
            if (-gameBall.speed.x >= gameBall.maxSpeed) {
                gameBall.speed.x = -gameBall.maxSpeed;
            }
            // check if the ball should go up, down or straight
            if (midYOfBall < topOfPlayer) // the player hits the lower half of the ball
            {
                gameBall.speed.y = -gameBall.speed.x;
            }
            else if (midYOfBall > bottomOfPlayer) // player hits the top half of the ball
            {
                gameBall.speed.y = gameBall.speed.x;
            }
        }
    }
    // check for horizantal allignment
    if ( !(leftOfBall > rightOfPlayer || rightOfBall < leftOfPlayer) ) 
    {
        if (bottomOfBall >= topOfPlayer && topOfBall < topOfPlayer)
        {
            gameBall.position.y = topOfPlayer - gameBall.width; // keep the ball from meshing through player
            gameBall.speed.y = -Math.abs(gameBall.speed.y * gameBall.speed.loss + playerYSpeed);  // combine the players vertical speed with the balls
            if (Math.abs(gameBall.speed.y) >= gameBall.maxSpeed)   // check for the maxspeed
            {
                gameBall.speed.y = - gameBall.maxSpeed;
            }
        }
        else if (topOfBall <= bottomOfPlayer && bottomOfBall > bottomOfPlayer) {
            gamePlayer.position.y = topOfBall - gamePlayer.height;
            gameBall.speed.y = -gameBall.speed.y;
        }
    }
}
function objectEnviromentCollision(gameObject) {
    if (gameObject.position.y < gameObject.floor) // if the gameObject is floating
    {
        gameObject.speed.y += gameObject.speed.g; // add gravity
    }
    // left wall collision or right wall collision
    if (gameObject.position.x < 0 || gameObject.position.x > GAME_WIDTH - gameObject.width) {
        if (gameObject.position.x < 0) // was it the left wall
        {
            gameObject.position.x = 0; // don't let the gameObject pass the left wall
        }
        else // don't let it pass the right wall
        {
            gameObject.position.x = GAME_WIDTH - gameObject.width;
        }
        // object loses energy when it bounces
        gameObject.speed.x = - gameObject.speed.x * gameObject.speed.loss;
        if (gameObject instanceof Player) // player specific instructions
        {
            gameObject.accellerating = false;
            gameObject.speed.last = gameObject.speed.x;
        }
    }
    // floor collision || or ceiling collision
    if (gameObject.position.y > gameObject.floor || gameObject.position.y < 10) {
        // prevents the gameObject from going through the floor
        if (gameObject.position.y > gameObject.floor) {
            gameObject.position.y = gameObject.floor;
            // gameObject loses energy when it bounces
            gameObject.speed.y = - gameObject.speed.y * gameObject.speed.loss;
            if (gameObject instanceof Player) // player specific instructions
            {
                gameObject.accellerating = false;
                gameObject.speed.y = 0; // don't let the player bounce
            }
        }
        else {
            gameObject.position.y = 10
            gameObject.speed.y = -gameObject.speed.y;
        }

    }
}
class Player {
    constructor(game) {
        this.game = game;
        this.imageRight = document.getElementById('img_player_right');
        this.imageLeft = document.getElementById('img_player_left');
        this.width = 120;
        this.height = 40;
        this.floor = GAME_HEIGHT - this.height - 10;
        this.position = {
            x: GAME_WIDTH/2 - this.width/2,
            y: this.floor,
        }
        this.speed = {
            x: 0,                       // horizantal speed ex: driving
            y: 0,                       // vertical speed   ex: jumping
            g: this.game.gravity,       // game gravity value
            loss: .8,                   // speed loss when not driving
            last: 1,                    // keeps the car facing the same way when it stop
        }
        this.accellerating = false;
        this.maxSpeed = 20;
    }
    moveLeft() {
        if (this.speed.x > 0) {
            this.speed.x = -this.speed.x / 2;
        }
        if (this.speed.x >= -this.maxSpeed + 2) {
            this.speed.x -= 2;
        }
        if ( this.speed.x >= -2 )
        {
            this.speed.x -= 2;
        }
        this.speed.last = this.speed.x;
        this.accellerating = true;
    }
    moveRight() {
        if (this.speed.x < 0) {
            this.speed.x = -this.speed.x / 2;
        }
        if (this.speed.x <= this.maxSpeed - 2) {
            this.speed.x += 2;
        }
        if ( this.speed.x <= 2 )
        {
            this.speed.x += 2;
        }
        this.speed.last = this.speed.x;
        this.accellerating = true;
    }
    stop() {
        this.accellerating = false;
    }
    jump() {
        if (this.position.y == this.floor) {
            this.speed.y = -this.maxSpeed;
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
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.accellerating == false) {
            this.speed.x *= this.speed.loss;
        }
        // collision with enviroment
        objectEnviromentCollision(this);
    }
}
class InputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 32: // jump - spacebar
                    this.player.jump();
                    break;
                case 65: // move left - a
                    this.player.moveLeft();
                    break;
                case 68: // move right - d
                    this.player.moveRight();
                    break;
                case 83: // tiltDown - s
                    this.player.tiltDown();
                    break;
                case 87: // tilt up - w
                    this.player.tiltUp();
                    break;
            }
        });
        document.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 65: // move left - a
                    if (this.player.speed.x < 0)
                        this.player.stop();
                    break;
                case 68: // move right - d
                    if (this.player.speed.x > 0)
                        this.player.stop();
                    break;
            }
        });
    }
}
class Ball {
    constructor(game) {
        this.game = game;
        this.height = 100;
        this.width = 100;
        this.image = document.getElementById('img_ball');
        this.floor = GAME_HEIGHT - this.height - 10;
        this.position = {
            x: GAME_WIDTH / 2 - this.width / 2,
            y: 0 //this.floor,
        }
        this.speed = {
            x: 0,                       // horizantal speed
            y: 0,                       // vertical speed
            g: this.game.gravity,       // effect of gravity
            loss: .8                    // amount of energy lost on a bounce
        }
        this.maxSpeed = 30;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.height,
            this.width);
    }
    update(deltaTime) {
        if (!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed.x *= .99; // ball loses energy / speed over time
        // if the ball is the close to the ground with low speed stop it from bouncing
        if (this.position.y >= this.floor - 2 && this.speed.y <= .7) {
            this.speed.y = 0;
            this.position.y = this.floor;
        }
        // collision with enviroment
        objectEnviromentCollision(this);
        // collision with player
        playerBallCollision(this.game.player, this);
    }
}
class Game {
    constructor() {
        this.gravity = 0.9;
    }
    startGame() {
        this.player = new Player(this);
        this.ball = new Ball(this);
        this.gameObjects = [this.player, this.ball];
        new InputHandler(this.player);
    }
    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }
    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));
    }
}

let grass = document.getElementById('img_grass');

let game = new Game;
game.startGame();
let lastTime = 0;

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // draw the grass in 3 sectionss to keep textures
    ctx.drawImage(grass, 0, GAME_HEIGHT - 15, GAME_WIDTH / 3, 15);
    ctx.drawImage(grass, GAME_WIDTH / 3, GAME_HEIGHT - 15, GAME_WIDTH / 3, 15);
    ctx.drawImage(grass, 2 * GAME_WIDTH / 3, GAME_HEIGHT - 15, GAME_WIDTH / 3, 15);

    // update and draw game objects
    game.update(deltaTime);
    game.draw(ctx);


    requestAnimationFrame(gameLoop);
}

gameLoop(lastTime);