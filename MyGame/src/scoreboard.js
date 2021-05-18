class Scoreboard
{
    constructor( gameWidth, gameHeight )
    {
        this.orangeScore = 0;
        this.blueScore = 0;
        this.size = {
            width: 200,
            height: 50,
        }
        this.position = {
            x: gameWidth / 2 - this.size.width / 2,
            y: 0,
        }
        this.timer = 
        {
            // get the amount of time left ... default is 5 minutes
            timeLeft: 5 * 1000 * 60,
            // get the time left in minutes
            minutesLeft: 5,
            // get the time left in seconds
            secondsLeft: 0,
        }
        this.timer.secondsLeft =  this.timer.secondsLeft.toLocaleString('en-US', { minimumIntegerDigits: 2, }); 
    }
    draw(ctx) 
    {
        // blue score box
        ctx.fillStyle = 'blue';
        ctx.fillRect( this.position.x, 0, this.size.width / 4, this.size.height );
        // print blue teams score
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.blueScore, this.position.x + this.size.width / 8,
             this.size.height - 10 );
        // print the time left box
        ctx.fillStyle = 'black';
        ctx.fillRect( this.position.x + this.size.width / 4, 0, this.size.width / 2, this.size.height );
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.timer.minutesLeft + ":" + this.timer.secondsLeft, this.position.x + this.size.width / 2,
             this.size.height - 10 );
        // orange score box
        ctx.fillStyle = "orange";
        ctx.fillRect( this.position.x + this.size.width * 3 / 4, 0, this.size.width / 4,
            this.size.height );
        // print blue teams score
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.orangeScore, this.position.x + this.size.width * 7 / 8,
             this.size.height - 10 );
    }
    update( deltaTime )
    {
        // update the game time
        this.timer.timeLeft -= deltaTime; 
        // no time left ... keep the countdown at 0:00
        if ( this.timer.timeLeft <= 0 )
        {
            this.timer.timeLeft = 0;
            this.timer.minutesLeft = 0;
            this.timer.secondsLeft = 0;
        }
        // if time left on the clock update the countdown
        else
        {
            this.timer.minutesLeft = Math.floor( (this.timer.timeLeft % (1000 * 60 * 60)) / (1000 * 60) );
            this.timer.secondsLeft = Math.floor( (this.timer.timeLeft % (1000 * 60)) / 1000 );
        }
        // seconds will be formatted to 2 digits
        this.timer.secondsLeft =  this.timer.secondsLeft.toLocaleString('en-US', { minimumIntegerDigits: 2, });   
    }
    orangeScored( )
    {
        this.orangeScore++;
    }
    blueScored( )
    {
        this.blueScore++;
    }
}