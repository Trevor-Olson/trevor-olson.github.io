let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
let grass = document.getElementById('img_grass');
let blueGoal = document.getElementById('img_blue_goal');
let orangeGoal = document.getElementById('img_orange_goal');
let blueWall = document.getElementById('img_blue_wall');
let orangeWall = document.getElementById('img_orange_wall');
// here for testing
// document.addEventListener("keydown", (event) => console.log(event.key));
let game = new Game( GAME_WIDTH, GAME_HEIGHT );
let lastTime = 0;

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // draw the grass in 3 sectionss to keep textures
    ctx.drawImage(grass, 0, GAME_HEIGHT - 20, GAME_WIDTH / 3, 20);
    ctx.drawImage(grass, GAME_WIDTH / 3, GAME_HEIGHT - 20, GAME_WIDTH / 3, 20);
    ctx.drawImage(grass, 2 * GAME_WIDTH / 3, GAME_HEIGHT - 20, GAME_WIDTH / 3, 20);

    // draw the blue and orange wall

    // draw the blue and orange goal
    ctx.drawImage( blueGoal, 0, GAME_HEIGHT - 210, 200, 200 );
    ctx.drawImage( orangeGoal, GAME_WIDTH -200, GAME_HEIGHT - 210, 200, 200 );

    // update and draw game objects
    game.update(deltaTime);
    game.draw(ctx);

    


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);