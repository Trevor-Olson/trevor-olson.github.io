class Ball {
    constructor(game) {
        this.game = game;
        this.height = 100;
        this.width = 100;
        this.image = document.getElementById('img_ball');
        this.floor = game.gameHeight - this.height - 10;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;
        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: this.floor,
        }
        this.speed = {
            x: 0,                       // horizantal speed
            y: 0,                       // vertical speed
            g: game.gravity,            // effect of gravity
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
        if (this.position.y >= this.floor - 5 && this.speed.y <= .99 ) {
            this.speed.y = 0;
            this.position.y = this.floor;
        }
        // collision with enviroment
        objectEnviromentCollision(this);
        // collision with the goal
        ballGoalCollision( this );
        // collision with player
        playerBallCollision(this.game.player1, this);
        playerBallCollision(this.game.player2, this);
    }
}