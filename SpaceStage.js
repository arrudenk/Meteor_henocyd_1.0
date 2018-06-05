//Kernel Class
var SpaceStage = (function(){


    return SpaceStage;
})();
var pressed = {};

var KeyCode = {
    Up : 87,
    Down : 83,
    Left : 65,
    Right : 68,
    Space : 32,
    Enter : 13
};

var DEFAULT_AMMO_COUNT = 5;

function SpaceStage() {
    PIXI.Container.call(this);

    this.ammo = 20;
    this.mouse_loc = {};
    this.game_start = false;

    this.meteors = [];
    this.meteors_col = 5;
    this.bullets = [];
    this.bulletspeed = 20;
    this.player = null;
    this.menu = null;
    this.background =  new PIXI.Sprite.fromImage('https://i.imgur.com/m0dV5B9.png');
    this.background.anchor.set(0.5, 0.5);
    this.addChild(this.background);

    this.addPlayer();
    this.addMenu();
    this.addMeteors();
    this.score = 0;
    this.text_style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ff81dc', '#1323ff'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });
    this.richText = new PIXI.Text("SCORE: ", this.text_style);
    this.richText.x = -300;
    this.richText.y = -300;
    this.addChild(this.richText);
    console.log(app);
    console.log(this);
}

SpaceStage.prototype = Object.create(PIXI.Container.prototype);

SpaceStage.prototype.addMenu = function(){
    this.menu = new Menu();

    this.menu.ammo.position.set(-300, 250);
    this.menu.init.position.set(0,0);
    this.addChild(this.menu);
    this.menu.on('reload game', this.gameOver, this)
};

SpaceStage.prototype.addPlayer = function(){
    this.player = new Player();
    this.addChild(this.player);
    // this.player.on("bullets_create", this.bullets_create, this)
    this.player.on("mouse loc", this.mouse, this);
    this.player.on("click", this.shoot, this);
};

SpaceStage.prototype.playerCollision = function ()
{
	if (this.player.y < -300 || this.player.y > 300) {
		this.player.y = Math.min(300, Math.max(-300, this.player.y));
		this.player.y *= -1;
	}
	if (this.player.x < -300 || this.player.x > 300) {
		this.player.x = Math.min(300, Math.max(-300, this.player.x));
		this.player.x *= -1;
	}
	for (var i = 0; i < this.meteors.length; i++){
		if(circleCircleCollision(this.meteors[i], this.player))
		{
			this.menu.reloadButton.x = 0;
			this.menu.reloadButton.y = 0;
			this.game_start = false;
			this.menu.init.visible = true;
		}
	}
};

SpaceStage.prototype.playerMovement = function(delta){
	this.player.y += this.player.y_velocity * delta;
	this.player.x += this.player.x_velocity * delta;
	this.player.x_velocity *= 0.9;
	this.player.y_velocity *= 0.9;
};

SpaceStage.prototype.addMeteors = function () {
    for (var i = 0; i < 1; i++)
    {
        var meteor = new Meteor();
        meteor.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
        this.meteors.push(meteor);
        this.addChild(meteor);
    }
};

SpaceStage.prototype.meteorOutOfMeteor = function(a, b)
{
    var r1_r2 = Math.pow(a.radius + b.radius, 2);
    var i_j = Math.pow(a.x - b.x, 2)
        + Math.pow(a.y - b.y, 2);
    var diff = r1_r2 - i_j;
    var outof_J = v1Minusv2(b, a);
    var outof_I = v1Minusv2(a, b);
    outof_J = scalarVector(-1, outof_J);
    outof_I = scalarVector(-1, outof_I);
    a.x += outof_J.x * diff / 1000;
    a.y += outof_J.y * diff / 1000;
    b.x += outof_I.x * diff / 1000;
    b.y += outof_I.y * diff / 1000;
};

SpaceStage.prototype.meteorsCollision = function() {
    for (var i = 0; i < this.meteors.length; i++)
    {
        for (var j = i + 1; j < this.meteors.length; j++)
        {
            if(circleCircleCollision(this.meteors[i], this.meteors[j]))
            {
                this.meteorOutOfMeteor(this.meteors[i], this.meteors[j]);
                this.meteors[i].dir = normalize(vectorReflection(this.meteors[i], this.meteors[j]));
                this.meteors[j].dir = normalize(vectorReflection(this.meteors[j], this.meteors[i]));
            }
        }
    }
};

SpaceStage.prototype.meteorsMovement = function(delta)
{
	for (var i = 0; i < this.meteors.length; i++) {
		this.meteors[i].tick(delta);
	}
};

SpaceStage.prototype.bulletsCreate = function(loc){
	var bullet =  new PIXI.Graphics();
	bullet.radius = 3;
	bullet.beginFill(0xff0000)
		.drawCircle(0, 0, bullet.radius)
		.endFill();
	var normal  = Math.sqrt(loc.x * loc.x + loc.y * loc.y);
	bullet.dir = {
		x : loc.x / normal,
		y : loc.y / normal
	};
	this.addChild(bullet);
	bullet.x = (this.player.x);
	bullet.y = (this.player.y) - 20;
	this.bullets.push(bullet);
};

SpaceStage.prototype.bulletShoot = function(delta){
	for (var i = 0; i < this.bullets.length; i++) {
		this.bullets[i].y += this.bullets[i].dir.y * delta * this.bulletspeed;
		this.bullets[i].x += this.bullets[i].dir.x * delta * this.bulletspeed;
		if (Math.abs(this.bullets[i].x) > 600 || Math.abs(this.bullets[i].y) > 600)
		{
			this.removeChild(this.bullets[i]);
			this.bullets.splice(i,1);
			i--;
		}
	}
};

SpaceStage.prototype.bulletsCollision = function (){
    for (var i = 0; i < this.meteors.length; i++) {
        for (var k = 0; k < this.bullets.length; k++) {
            if (circleCircleCollision(this.meteors[i], this.bullets[k])) {
                this.meteors[i].radius /= 2;
                this.meteors[i].spriteImage.width /= 2;
                this.meteors[i].spriteImage.height /= 2;
                this.meteors[i].redraw();
                if (this.meteors[i].radius < 10) {
                    if ((this.score % 10 === 0) && this.score > 1) {
                        console.log(this.score % 10);
                        this.meteors_col += 2;
                    }
                    this.score++;
                    this.removeChild(this.meteors[i]);
                    this.meteors.splice(i, 1);
                    i = i > 0 ? i-- : 0;
                    break;
                }
                this.removeChild(this.bullets[k]);
                this.bullets.splice(k, 1);
                k--;
            }
        }
    }
};
//

SpaceStage.prototype.shoot = function(loc){
    this.ammo = 5;
};

SpaceStage.prototype.mouse = function(loc){
	this.mouse_loc = loc;
};

SpaceStage.prototype.keypadEvents = function () {
    if (pressed[KeyCode.Up])
        this.player.y_velocity -= 0.7;
    if (pressed[KeyCode.Down])
        this.player.y_velocity += 0.7;
    if (pressed[KeyCode.Right])
        this.player.x_velocity += 0.7;
    if (pressed[KeyCode.Left])
        this.player.x_velocity -= 0.7;
    if (pressed[KeyCode.Enter])
    {
        this.game_start = true;
        this.menu.init.visible = false;
        this.gameOver();
    }
    if (pressed[KeyCode.Space])
    {
        this.ammo = 5;
        pressed[KeyCode.Space] = false;
    }
};

SpaceStage.prototype.gameOver = function(){
    console.log("hello2");
	app.ticker.stop();
	for (var i = this.meteors.length; i > -1; i--)
	{
		this.removeChild(this.meteors[i]);
		this.meteors.splice(i, 1);
	}
	this.removeChild(this.player);
	this.removeChild(this.menu);
	this.addPlayer();
    this.addMeteors();
    this.addMenu();
	this.menu.init.visible = false;
	this.score = 0;
	this.meteors_col = 5;
	this.ammo = 5;
	for (var i = this.bullets.length; i > 0; i--)
	{
		this.removeChild(this.bullets[i]);
		this.bullets.splice(i, 1);
	}
	this.game_start = true;
	app.ticker.start();
};

SpaceStage.prototype.tick = function (delta) {
    if (this.game_start) {
        if (this.meteors.length < this.meteors_col)
            this.addMeteors();
        this.richText.text = "SCORE: " + this.score;
        this.meteorsMovement(delta);
        this.meteorsCollision();
        this.bulletsCollision();
    }
    this.playerCollision();
    var dir = {x : this.mouse_loc.x, y : this.mouse_loc.y};
    dir = normalize(dir);
    if (this.ammo > 1)
    {
        this.bulletsCreate(dir);
        this.ammo--;
    }
    this.menu.ammo.text = "METEORS: " + this.meteors_col;
    this.playerMovement(delta);
    this.bulletShoot(delta);
    this.keypadEvents();
};

window.addEventListener("keydown", function (event) {
    pressed[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete pressed[event.keyCode];
});
