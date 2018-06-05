//Kernel Class

var pressed = {};

var KeyCod = {
    Up : 87,
    Down : 83,
    Left : 65,
    Right : 68,
    Space : 32,
    Enter : 13
};

function Space_Stage() {
    PIXI.Container.call(this);

    this.fps = 20;
    this.mouse_loc = {};
    this.game_start = false;

    this.meteors = [];
    this.meteors_col = 15;
    this.bullets = [];
    this.bulletspeed = 20;
    this.player = null;
    this.menu = null;
    this.background =  new PIXI.Sprite.fromImage('https://i.imgur.com/m0dV5B9.png');
    this.background.anchor.set(0.5, 0.5);
    this.addChild(this.background);
    this.add_meteors();
    this.add_player();
    this.add_menu();
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
    this.richText = new PIXI.Text(this.score.toString(), this.text_style);
    this.richText.x = -300;
    this.richText.y = -300;
    this.addChild(this.richText);
    console.log(app);
    console.log(this)
}

Space_Stage.prototype = Object.create(PIXI.Container.prototype);

Space_Stage.prototype.add_menu = function(){
    this.menu = new Menu();

    this.addChild(this.menu);
    this.menu.ammo.position.set(-300, 250);
    this.menu.init.position.set(0,0);

    this.menu.reload_texture.on('reload game', this.game_over, this)
};

Space_Stage.prototype.add_player = function(){
    this.player = new Player();
    this.addChild(this.player);
    // this.player.on("bullets_create", this.bullets_create, this)
    this.player.on("mouse loc", this.mouse, this);
};


Space_Stage.prototype.player_collision = function ()
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
		if(circle_circle_collision(this.meteors[i], this.player))
		{
			this.menu.reload_texture.x = 0;
			this.menu.reload_texture.y = 0;
			this.game_start = false;
			this.menu.init.visible = true;
		}
	}
};

Space_Stage.prototype.player_movement = function(delta){
	this.player.y += this.player.y_velocity * delta;
	this.player.x += this.player.x_velocity * delta;
	this.player.x_velocity *= 0.9;
	this.player.y_velocity *= 0.9;
};

Space_Stage.prototype.add_meteors = function () {
    for (var i = 0; i < 1; i++)
    {
        var meteor = new Meteor();
        meteor.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
        this.meteors.push(meteor);
        this.addChild(meteor);
    }
};

Space_Stage.prototype.meteor_outof_meteor = function(a, b)
{
    var r1_r2 = Math.pow(a.radius + b.radius, 2);
    var i_j = Math.pow(a.x - b.x, 2)
        + Math.pow(a.y - b.y, 2);
    var diff = r1_r2 - i_j;
    var outof_J = v1_minus_v2(b, a);
    var outof_I = v1_minus_v2(a, b);
    outof_J = scalar_vector(-1, outof_J);
    outof_I = scalar_vector(-1, outof_I);
    a.x += outof_J.x * diff / 1000;
    a.y += outof_J.y * diff / 1000;
    b.x += outof_I.x * diff / 1000;
    b.y += outof_I.y * diff / 1000;
};

Space_Stage.prototype.meteors_collision = function() {
    for (var i = 0; i < this.meteors.length; i++)
    {
        for (var j = i + 1; j < this.meteors.length; j++)
        {
            if(circle_circle_collision(this.meteors[i], this.meteors[j]))
            {
                this.meteor_outof_meteor(this.meteors[i], this.meteors[j]);
                this.meteors[i].dir = normalize(vector_reflection(this.meteors[i], this.meteors[j]));
                this.meteors[j].dir = normalize(vector_reflection(this.meteors[j], this.meteors[i]));
            }
        }
    }
};

Space_Stage.prototype.meteors_movement = function(delta)
{
	for (var i = 0; i < this.meteors.length; i++) {
		this.meteors[i].tick(delta);
	}
};

Space_Stage.prototype.bullets_create = function(loc){
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

Space_Stage.prototype.bullet_shoot = function(delta){
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

Space_Stage.prototype.bullets_collision = function (){
    for (var i = 0; i < this.meteors.length; i++) {
        for (var k = 0; k < this.bullets.length; k++) {
            if (circle_circle_collision(this.meteors[i], this.bullets[k])) {
                this.meteors[i].radius /= 2;
                this.meteors[i].asteroid.width /= 2;
                this.meteors[i].asteroid.height /= 2;
                this.meteors[i].redraw();
                if (this.meteors[i].radius < 10) {
                    this.fps += 1;
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

Space_Stage.prototype.mouse = function(loc){
	this.mouse_loc = loc;
};

Space_Stage.prototype.keypad_events = function () {
    if (pressed[KeyCod.Up])
        this.player.y_velocity -= 0.7;
    if (pressed[KeyCod.Down])
        this.player.y_velocity += 0.7;
    if (pressed[KeyCod.Right])
        this.player.x_velocity += 0.7;
    if (pressed[KeyCod.Left])
        this.player.x_velocity -= 0.7;
    if (pressed[KeyCod.Enter])
    {
        this.game_start = true;
        this.menu.init.visible = false;
        this.game_over();
    }
    if (pressed[KeyCod.Space])
    {
        var dir = {x : this.mouse_loc.x, y : this.mouse_loc.y};
        dir = normalize(dir);
        if (this.fps > 1)
        {
            this.bullets_create(dir);
            this.fps--;
        }
    }
    if (!pressed[KeyCod.Space] && this.game_start)
    {
        this.fps += 0.25;
    }
};

Space_Stage.prototype.game_over = function(){

	app.ticker.stop();
	for (var i = this.meteors.length; i > -1; i--)
	{
		this.removeChild(this.meteors[i]);
		this.meteors.splice(i, 1);
	}
	this.removeChild(this.player);
	this.removeChild(this.menu);
	this.add_player();
	this.add_menu();
	this.add_meteors();
	this.menu.init.visible = false;
	this.score = 0;
	this.fps = 50;
	for (var i = this.bullets.length; i > 0; i--)
	{
		this.removeChild(this.bullets[i]);
		this.bullets.splice(i, 1);
	}
	this.game_start = true;
	app.ticker.start();
};

Space_Stage.prototype.tick = function (delta) {
    // console.log(delta);
    if (this.game_start) {
        if (this.meteors.length < this.meteors_col)
            this.add_meteors();
        this.richText.text = this.score.toString();
        this.meteors_movement(delta);
        this.meteors_collision();
        this.bullets_collision();
        this.player_collision();
    }
    this.menu.ammo.text = Math.floor(this.fps.toString());
    this.player_movement(delta);
    this.bullet_shoot(delta);
    this.keypad_events();
};

window.addEventListener("keydown", function (event) {
    pressed[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete pressed[event.keyCode];
});
