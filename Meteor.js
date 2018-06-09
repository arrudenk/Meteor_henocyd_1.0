// Meteor class file



function Meteor() {
    GameObject.apply(this, arguments);
	// GameObject.prototype.addDirection.apply(this);
    GameObject.prototype.addGraphics.apply(this);
    GameObject.prototype.addTexture.apply(this);
    this.animationTextures = textures.meteorAnimation;
    this.texture.visible = false;
    this.graphics.visible = false;
	this.dirLine = null;
    this.drawDirection();
    this.meteorAnimation();
}

Meteor.prototype = Object.create(GameObject.prototype);

Meteor.prototype.drawDirection = function () {
	// if (this.dirLine !== null)
	// 	this.dirLine.clear();
	// var dirLine = new PIXI.Graphics();
	// dirLine.lineStyle(5, 0xff0000);
	// // dirLine.anchor.set(0.5, 0.5);
	// // dirLine.rotation = findAngle(this.x + this.dir.x * 5,t this.dir.y * 5, this.x, this.y);
	// dirLine.moveTo(0, 0);
	// dirLine.lineTo(this.direction.x * 30, this.direction.y * 30);
	// dirLine.endFill();
	// this.dirLine = dirLine;
	// this.addChild(this.dirLine);
	this.texture.rotation = findAngle(0,0,this.direction.x * 30, this.direction.y * 30);
};

Meteor.prototype.meteorWallCollision = function () {
	//check collision with horizontal walls
	if (this.x < 0 - WIDTH / 2 - 100 || this.x > WIDTH / 2 + 100) {
		this.x = Math.min(WIDTH / 2, Math.max(0 - WIDTH / 2 - 100, this.x));// check+++++
		// this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
		this.direction.x *= -1;
	}
	//check collision with vertical walls
	if (this.y < 0 - HEIGHT / 2 - 100 || this.y > HEIGHT / 2 + 100) {
		this.y = Math.min(HEIGHT / 2, Math.max(0 - HEIGHT / 2 - 100, this.y));// check+++++
		// this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
		this.direction.y *= -1;
	}
};

Meteor.prototype.meteorAnimation = function(){
	// create an array and store the textures --->
	//  <----
	this.animationTexture = new PIXI.extras.AnimatedSprite(this.animationTextures);
	this.animationTexture.x = this.x;
	this.animationTexture.y = this.y;
	this.animationTexture.anchor.set(0.5);
	this.animationTexture.scale.set(0.70);

	this.animationTexture.animationSpeed = 0.50;
	this.animationTexture.gotoAndPlay(Math.random() * 64);
	this.addChild(this.animationTexture);
};

Meteor.prototype.tick = function (delta) {
    this.movement(delta);
    this.meteorWallCollision();
    this.drawDirection();
};
