const GAMESTATE = { 
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
}


class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gravity = 0.9;
        this.gameState = GAMESTATE.MENU;
        this.player1 = new Player(this);
        this.player2 = new Player(this);
        this.scoreBoard = new Scoreboard( this.gameWidth, this.gameHeight );
        this.ball = new Ball(this);
        new InputHandler( this );
        this.gameObjects = [];
    }
    
    startGame() 
    {
        if ( this.gameState !== GAMESTATE.MENU )
        {
            return;
        }
        this.gameObjects = [this.player1, this.player2, this.ball,
             this.scoreBoard];
        // set player2's position
        this.player2.position.x = this.gameWidth - 210 - this.player2.width;
        // make player2's face the right way
        this.player2.speed.last = -1;
        // set player2's car
        this.player2.imageRight = document.getElementById('img_player2_right');
        this.player2.imageLeft = document.getElementById('img_player2_left');
        // set the game to run
        this.gameState = GAMESTATE.RUNNING;
    }
    pauseGame() {
        if ( this.gameState === GAMESTATE.PAUSED )
        {
            this.gameState = GAMESTATE.RUNNING;
        }
        else{
            this.gameState = GAMESTATE.PAUSED;
        }
    }
    update(deltaTime) 
    {
        if ( this.gameState === GAMESTATE.PAUSED 
            || this.gameState === GAMESTATE.MENU )
        {
            return;
        }
        this.gameObjects.forEach((object) => object.update(deltaTime));
    }
    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));

        // pause screen
        if ( this.gameState === GAMESTATE.PAUSED )
        { 
            // grey out the screen
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            // print "paused"
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
            // print the controls for player1
            ctx.font = "15px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText( "Player 1 Controls:", this.gameWidth / 4, this.gameHeight / 2 - 40 );
            ctx.fillText( "w: jump", this.gameWidth / 4, this.gameHeight / 2 - 20 );
            ctx.fillText( "a: drive left", this.gameWidth / 4, this.gameHeight / 2 );
            ctx.fillText( "d: drive right", this.gameWidth / 4, this.gameHeight / 2 + 20 );
            ctx.fillText( "s: brake", this.gameWidth / 4, this.gameHeight / 2 + 40 )
            // print the controls for player1
            ctx.fillText( "Player 2 Controls:", this.gameWidth * 3 / 4, this.gameHeight / 2 - 40 );
            ctx.fillText( "ArrowUp: jump", this.gameWidth * 3 / 4, this.gameHeight / 2 - 20 );
            ctx.fillText( "ArrowLeft: drive left", this.gameWidth * 3 / 4, this.gameHeight / 2 );
            ctx.fillText( "ArrowRight: drive right", this.gameWidth * 3 / 4, this.gameHeight / 2 + 20 );
            ctx.fillText( "ArrowDown: brake", this.gameWidth * 3 / 4, this.gameHeight / 2 + 40 )
            // press p to pause
            ctx.fillText( "press \"p\" to unpause", this.gameWidth / 2, this.gameHeight / 2 + 40 );
        }
        // menu screen
        else if ( this.gameState === GAMESTATE.MENU )
        { 
            // grey out the screen
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            // print "press ENTER to start the game"
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText( "press ENTER to start the game",
                          this.gameWidth / 2, this.gameHeight / 2);
            
            // print the controls for player1
            ctx.font = "15px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText( "Player 1 Controls:", this.gameWidth / 4, this.gameHeight / 2 - 40 );
            ctx.fillText( "w: jump", this.gameWidth / 4, this.gameHeight / 2 - 20 );
            ctx.fillText( "a: drive left", this.gameWidth / 4, this.gameHeight / 2 );
            ctx.fillText( "d: drive right", this.gameWidth / 4, this.gameHeight / 2 + 20 );
            ctx.fillText( "s: brake", this.gameWidth / 4, this.gameHeight / 2 + 40 )
            // print the controls for player1
            ctx.fillText( "Player 2 Controls:", this.gameWidth * 3 / 4, this.gameHeight / 2 - 40 );
            ctx.fillText( "ArrowUp: jump", this.gameWidth * 3 / 4, this.gameHeight / 2 - 20 );
            ctx.fillText( "ArrowLeft: drive left", this.gameWidth * 3 / 4, this.gameHeight / 2 );
            ctx.fillText( "ArrowRight: drive right", this.gameWidth * 3 / 4, this.gameHeight / 2 + 20 );
            ctx.fillText( "ArrowDown: brake", this.gameWidth * 3 / 4, this.gameHeight / 2 + 40 )
            // press p to pause
            ctx.fillText( "press \"p\" to pause", this.gameWidth / 2, this.gameHeight / 2 + 40 );
        }
        
    }
    reset()
    {
        // set player1's position
        this.player1.position.x = 210;
        this.player1.position.y = this.player1.floor;
        // make player1 face the right way
        this.player2.speed.last = 1;
        // reset player1's speed
        this.player1.speed.x = 0;
        this.player1.speed.y = 0;

        // set player2's position
        this.player2.position.x = this.gameWidth - 210 - this.player2.width;
        this.player2.position.y = this.player2.floor;
        // make player2 face the right way
        this.player2.speed.last = -1;
        // reset player1's speed
        this.player2.speed.x = 0;
        this.player2.speed.y = 0;

        // set the balls position
        this.ball.position.x = this.ball.gameWidth / 2 - this.ball.width / 2;
        this.ball.position.y = this.ball.floor; 
        this.ball.speed.x = 0;
        this.ball.speed.y = 0;
    }
}