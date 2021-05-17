class Scoreboard
{
    constructor( gameWidth, gameHeight )
    {
        this.orangeScore = 0;
        this.blueScore = 0;
        this.size = {
            width: 100,
            height: 50,
        }
        this.position = {
            x: gameWidth / 2 - this.size.width / 2,
            y: 0,
        }
    }
    draw(ctx) 
    {
        // blue score box
        ctx.fillStyle = 'blue';
        ctx.fillRect( this.position.x, 0, this.size.width / 2, this.size.height );
        // print blue teams score
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.blueScore, this.position.x + this.size.width / 4,
             this.size.height - 10 );
        // orange score box
        ctx.fillStyle = "orange";
        ctx.fillRect( this.position.x + this.size.width / 2, 0, this.size.width / 2,
            this.size.height );
        // print blue teams score
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.orangeScore, this.position.x + 75,
             this.size.height - 10 );
    }
    update( deltaTime )
    {
        
    }
    orangeScored()
    {
        this.orangeScore++;
    }
    blueScored()
    {
        this.blueScore++;
    }
}