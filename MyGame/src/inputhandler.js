class InputHandler {
    constructor(game) {
        this.keysPressed = [ ];
        document.addEventListener("keydown", (event) => {
             // check if the key is not in the array yet
             // if not in the array add it to the array
            if ( !this.keysPressed.includes( event.code ) )
            {
                this.keysPressed.push( event.code );
                //console.log( this.keysPressed ); // here for testing
            }         
            this.keysPressed.forEach(element => {
                switch (element) {
                    // player 1 controls
                    case "KeyW": // player 1 jump - w
                        game.player1.jump();
                        break;
                    case "KeyA": // player 1 move left - a
                        game.player1.moveLeft();
                        break;
                    case "KeyD": // player 1 move right - d
                        game.player1.moveRight();
                        break;
                    case "KeyS": // player 1 brakes
                        game.player1.stop();
                        break;
                    // end player 1 controls
                    // player 2 controls
                    case "ArrowUp": // player 2 jump - arrowup
                        game.player2.jump();
                        break;
                    case "ArrowLeft": // player 2 move left - arrowleft
                        game.player2.moveLeft();
                        break;
                    case "ArrowRight": // player 2 move right - arrowright
                        game.player2.moveRight();
                        break;
                    case "ArrowDown": // player 2 brakes - arrowdown
                        game.player2.stop();
                        break;
                    // end player 2 controls
                    case "KeyP":
                        game.pauseGame();
                        break;  
                    case "Enter":
                        game.startGame();
                        break;   
                }   
            });

        });
        document.addEventListener( "keyup", (event) => {
            this.keysPressed.pop( event.code ); // remove the key from the list
        });
    }
}