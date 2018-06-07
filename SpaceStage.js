//Kernel Class



function SpaceStage() {
    PIXI.Container.call(this);

    this.ammo = DEFAULT_AMMO_COUNT;
    this.mouseLoc = {};
    this.hit = {};
    this.game_start = false;
    this.meteors = [];
    this.meteors_col = DEFAULT_METEORS_COUNT;
    this.bullets = [];
    this.player = null;
    this.menu = null;
	this.score = 0;
    this.addBackground();
    this.addPlayer();
	this.addMenu();
	this.addMeteors();
    this.addScoreText();
    this.explosionTextures = [];
    console.log(app);
    console.log(this);
}

SpaceStage.prototype = Object.create(PIXI.Container.prototype);

SpaceStage.prototype.addScoreText = function(){
	this.scoreTextStyle = new PIXI.TextStyle({
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
	this.scoreText = new PIXI.Text("SCORE: ", this.scoreTextStyle);
	this.scoreText.x = SCREEN_CENTER.x - HEIGHT / 2;
	this.scoreText.y = SCREEN_CENTER.y - WIDTH / 2;
	this.addChild(this.scoreText);
};

SpaceStage.prototype.addBackground = function(){
	this.background =  new PIXI.Sprite.fromImage(BACKGROUND_TEXTURE_URL);
	this.background.anchor.set(0.5, 0.5);
	// this.background.scale.set(1.5, 1.5);
	this.addChild(this.background);
};

SpaceStage.prototype.addMenu = function(){
    this.menu = new Menu();
    this.menu.ammo.position.set(-300, 250);
    this.menu.init.position.set(0,0);

    this.addChild(this.menu);
	this.menu.reloadButton.x = 0;
	this.menu.reloadButton.y = 0;
	this.menu.reloadButton.scale.set(0.5, 0.5);
    this.menu.on('reload game', this.gameOver, this)
};

SpaceStage.prototype.addPlayer = function(){
    this.player = new Player("circle", 20, 0, 0, PLAYER_TEXTURE_URL,"random", 0);
    this.player.texture.width +=20;
    this.player.texture.height +=20;
    this.player.graphics.visible = false;
    this.addChild(this.player);
    // this.player.on("bullets_create", this.bullets_create, this)
    this.player.on("mouse loc", this.getMousePosition, this);
	this.player.on("click", this.shoot, this);
};

SpaceStage.prototype.addMeteors = function (position) {
	var random_radius = Math.random() * (40 - 20 + 1) + 20; // random radius from 40 to 20
	var randomVector = {
		x: Math.random() * WIDTH - WIDTH / 2,
		y: Math.random() * HEIGHT - HEIGHT / 2
	};
	var meteor = new Meteor("circle", random_radius, 0, 0, METEOR_TEXTURE_URL, randomVector, 3);
	if (position === undefined)
		meteor.position.set(Math.random() * (-400 - HEIGHT) + HEIGHT, Math.random() * (-400 - -300) + -300);
	else
		meteor.position.set(position.x, position.y);
	this.meteors.push(meteor);
	this.addChild(meteor);


};

SpaceStage.prototype.bulletsCreate = function(){
	var vector = {x : 0, y: -1};
	var bullet =  new Bullet(
		"circle",
		10,
		0,0,
		"without_texture",
		this.mouseLoc,
		20
	);
	bullet.setupPosition(this.player);
	this.addChild(bullet);
	this.bullets.push(bullet);
};

SpaceStage.prototype.playerMeteorCollision = function ()
{
	for (var i = 0; i < this.meteors.length; i++){
		if(circleCircleCollision(this.meteors[i], this.player))
		{
			this.destructAnimation(this.player, 3);
			window.alert("SCORE: " + this.score);
			// this.destructAnimation(this.player, 3);
			// this.destructAnimation(this.player, 3);

			this.menu.reloadButton.visible = true;
			this.game_start = false;
		}
	}
};

SpaceStage.prototype.meteorOutOfMeteor = function(a, b)
{
    var r1_r2 = Math.pow(a.radius + b.radius, 2);
    var i_j = Math.pow(a.x - b.x, 2)
        + Math.pow(a.y - b.y, 2);
    var diff = r1_r2 - i_j;
    var outof_J = (v1Minusv2(b, a));
    var outof_I = (v1Minusv2(a, b));
    outof_J = scalarVector(-1, outof_J);
    outof_I = scalarVector(-1, outof_I);
    a.x += outof_J.x * diff / 800;
    a.y += outof_J.y * diff / 800;
    b.x += outof_I.x * diff / 800;
    b.y += outof_I.y * diff / 800;
};

SpaceStage.prototype.meteorsCollision = function() {
    for (var i = 0; i < this.meteors.length; i++)
    {
        for (var j = i + 1; j < this.meteors.length; j++)
        {
            if(circleCircleCollision(this.meteors[i], this.meteors[j]))
            {
                this.meteors[i].direction = normalize(vectorReflection(this.meteors[i], this.meteors[j]));
                this.meteors[j].direction = normalize(vectorReflection(this.meteors[j], this.meteors[i]));
				this.meteorOutOfMeteor(this.meteors[i], this.meteors[j]);
            }
        }
    }
};

SpaceStage.prototype.meteorsTick = function(delta)
{
	for (var i = 0; i < this.meteors.length; i++) {
		this.meteors[i].tick(delta);

	}
};



SpaceStage.prototype.bulletTick = function(delta)
{
	for (var i = 0; i < this.bullets.length; i++) {
		this.bullets[i].tick(delta);
	}
};


SpaceStage.prototype.bulletsWallCollision = function(){
	// Bullet-Wall collision
	for (var i = 0; i < this.bullets.length; i++) {
		if (Math.abs(this.bullets[i].x) > HEIGHT || Math.abs(this.bullets[i].y) > WIDTH)
		{
			this.removeChild(this.bullets[i]);
			this.bullets.splice(i,1);
			i--;
		}
	}
};

SpaceStage.prototype.bulletsMeteorCollision = function (){
    for (var i = 0; i < this.meteors.length; i++) {
        for (var k = 0; k < this.bullets.length; k++) {
            if (circleCircleCollision(this.meteors[i], this.bullets[k])) {
                this.meteors[i].radius /= 2;
                this.meteors[i].texture.width /= 2;
                this.meteors[i].texture.height /= 2;
                this.meteors[i].redraw();
				this.destructAnimation(this.meteors[i], 0.5);
                if (this.meteors[i].radius < 10) {
                    if ((this.score % 10 === 0) && this.score > 1) {
                        console.log(this.score % 10);
                        this.meteors_col += 2;
                    }
                    this.score++;
                    this.destructAnimation(this.meteors[i], 0.250);
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


SpaceStage.prototype.shoot = function(loc){
    this.ammo = DEFAULT_AMMO_COUNT;
};

SpaceStage.prototype.getMousePosition = function(loc){
	this.mouseLoc = loc;
};

SpaceStage.prototype.addExplosionTexture = function(){
	// create an array and store the textures --->
	var explosionTextures = [];
	for (var i = 0; i < 26; i++) {
		var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
		explosionTextures.push(texture);
	}
	this.explosionTextures = explosionTextures;
	//  <----
};

SpaceStage.prototype.destructAnimation = function(loc, scale){
	this.addExplosionTexture();
	var explosion = new PIXI.extras.AnimatedSprite(this.explosionTextures);
	explosion.x = loc.x;
	explosion.y = loc.y;
	explosion.anchor.set(0.5);
	explosion.scale.set(scale);
	explosion.loop = false;
	explosion.animationSpeed = 0.50;
	this.addChild(explosion);
	explosion.play();
	explosion.onComplete = () => {
		explosion.destroy();
	};
};

SpaceStage.prototype.destroyAllMeteors = function(){
	for (var i = 0; i < this.meteors.length; i++)
	{
		this.destructAnimation(this.meteors[i],0.5);
	}
	for (var i = this.meteors.length; i > -1; i--)
	{
		this.removeChild(this.meteors[i]);
		this.meteors.splice(i, 1);
	}
};

SpaceStage.prototype.gameOver = function(){
    console.log("hello2");
	app.ticker.stop();
	this.destroyAllMeteors();
	this.removeChild(this.player);
	this.removeChild(this.menu);
	this.addPlayer();
	this.addMenu();
    this.addMeteors();
	this.menu.init.visible = false;
	this.menu.reloadButton.visible = false;
	this.score = 0;
	this.meteors_col = DEFAULT_METEORS_COUNT;
	this.ammo = DEFAULT_AMMO_COUNT;
	for (var i = this.bullets.length; i > 0; i--)
	{
		this.removeChild(this.bullets[i]);
		this.bullets.splice(i, 1);
	}
	this.game_start = true;
	app.ticker.start();
};

SpaceStage.prototype.tick = function (delta) {
    if (!this.game_start)
    	return (0);
	this.player.tick(delta);
	this.bulletTick(delta);
	this.meteorsTick(delta);
	if (this.meteors.length < this.meteors_col)
		this.addMeteors();
	this.meteorsCollision();
	this.bulletsMeteorCollision();
	this.playerMeteorCollision();
    if (this.ammo > 1)
    {
        this.bulletsCreate();
        this.ammo--;
    }
    if (this.meteors.length === 40)
	{
		this.destroyAllMeteors();
		this.meteors_col = 10;
	}
   	this.bulletsWallCollision();
	this.menu.ammo.text = "METEORS: " + this.meteors_col;
	this.scoreText.text = "SCORE: " + this.score;

};

