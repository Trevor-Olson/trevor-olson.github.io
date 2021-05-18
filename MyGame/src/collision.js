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
    // check for vetical allignment ... ball hits the front or back of the car
    if (!(bottomOfBall < topOfPlayer || topOfBall > bottomOfPlayer)) {
        // left of ball hits right of player
        if (leftOfBall <= rightOfPlayer && rightOfBall > rightOfPlayer) {
            // add the cars speed to the ball speed and check for maxspeed
            gameBall.speed.x = Math.abs(playerXSpeed) + Math.abs(gameBall.speed.x);
            // prevent the ball from meshing through player
            gameBall.position.x = rightOfPlayer;
            if (Math.abs(gameBall.speed.x) >= gameBall.maxSpeed) {
                gameBall.speed.x = gameBall.maxSpeed;
            }
            // check if the ball should go up, down or straight
            if (midYOfBall < topOfPlayer) // the player hits the lower half of the ball
            {
                gameBall.speed.y = gameBall.speed.x / 2;
            }
            else if (midYOfBall > bottomOfPlayer) // player hits the top half of the ball
            {
                gameBall.speed.y = -gameBall.speed.x / 2;
            }
            return;
        }
        // right of ball hits left of player
        else if (rightOfBall >= leftOfPlayer && leftOfBall < leftOfPlayer) {
            // add the cars speed to the ball speed and check for maxspeed
            gameBall.speed.x = -Math.abs(playerXSpeed) - Math.abs(gameBall.speed.x);
            // prevent the ball from meshing through player
            gameBall.position.x = leftOfPlayer - gameBall.width;
            if (-gameBall.speed.x >= gameBall.maxSpeed) {
                gameBall.speed.x = -gameBall.maxSpeed;
            }
            // check if the ball should go up, down or straight
            if (midYOfBall < topOfPlayer) // the player hits the lower half of the ball
            {
                gameBall.speed.y = -gameBall.speed.x / 2;
            }
            else if (midYOfBall > bottomOfPlayer) // player hits the top half of the ball
            {
                gameBall.speed.y = gameBall.speed.x / 2;
            }
            return;
        }
    }
    // check for horizantal allignment ... ball hits the top or bottom of the car
    if ( !(leftOfBall > rightOfPlayer || rightOfBall < leftOfPlayer) ) 
    {
        // ball hits the top of the player
        if (bottomOfBall >= topOfPlayer && topOfBall < topOfPlayer)
        {
            gameBall.position.y = topOfPlayer - gameBall.width; // keep the ball from meshing through player
            gameBall.speed.y = -Math.abs(gameBall.speed.y * gameBall.speed.loss * gameBall.speed.g + playerYSpeed);  // combine the players vertical speed with the balls
            if (Math.abs(gameBall.speed.y) >= gameBall.maxSpeed)   // check for the maxspeed
            {
                gameBall.speed.y = - gameBall.maxSpeed;
            }
            // check if the ball should go left or right
            if ( midXOfBall < midXOfPlayer ) // the ball hits the left half of the player
            {
                gameBall.speed.x = gameBall.speed.y / 2;
            }
            else if (midXOfBall > midXOfPlayer ) // the ball hits the right half of the player
            {
                gameBall.speed.x = -gameBall.speed.y / 2;
            }
        }
        // ball hits the bottom of the player
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
function ballGoalCollision( gameBall )
{
    // ball enters right / orange goal
    if ( gameBall.position.x > gameBall.gameWidth - 200 
         && gameBall.position.y < 200 )
    {
        gameBall.game.scoreBoard.blueScored();
        gameBall.game.reset( "Player 1 Scored!" );
        return;

    }
    // ball enters left / blue goal
    if ( gameBall.position.x + gameBall.width < 200 
         && gameBall.position.y < 200)
    {
        gameBall.game.scoreBoard.orangeScored();
        gameBall.game.reset( "Player 2 Scored!" );
    }
}