// Meteor Player Bullet

function GameObject(type, radius, width, height, texture, direction, speed) {
	PIXI.Container.call(this);
	if (type === "circle")
		this.radius = radius;
	else if (type === "rect") {
		this.width = width;
		this.height = height;
	}
	else
		console.log("Usage: Wrong game object type ->" + type);
	this.direction = normalize(direction);
	this.speed = speed;
	this.type = type;
	this.color = 0xff0000;
	this.graphics = null;
	this.texture = new PIXI.Sprite.fromImage(texture)
		|| new PIXI.Sprite.fromImage('https://i.imgur.com/NXdhAOM.png');
}

GameObject.prototype = Object.create(PIXI.Container.prototype);

GameObject.prototype.wallCollision = function(){
	if (this.y < -300 || this.y > 300) {
		this.y = Math.min(300, Math.max(-300, this.y));
		this.y *= -1;
	}
	if (this.x < -300 || this.x > 300) {
		this.x = Math.min(300, Math.max(-300, this.x));
		this.x *= -1;
	}
};

GameObject.prototype.addDirection = function(direction) {
	if (this.direction === "random") {
		var randomVector = {
			x: Math.random() * WIDTH - WIDTH / 2,
			y: Math.random() * HEIGHT - HEIGHT / 2
		};
		this.direction = normalize(randomVector);
	}
	else if (direction !== undefined)
		this.direction = normalize(direction);
};
GameObject.prototype.addGraphics = function(){
	this.graphics = new PIXI.Graphics();
	this.graphics.beginFill(this.color).drawCircle(0, 0, this.radius).endFill();
	this.graphics.visible = true;
	this.addChild(this.graphics);
};

GameObject.prototype.redraw = function(){
	if (this.type === "circle") {
		this.graphics.clear()
			.beginFill(this.color)
			.drawCircle(0, 0, this.radius)
			.endFill();
	}
	if (this.type === "rect") {
		//as need
		console.log('none redraw rect');
	}
};

GameObject.prototype.addTexture = function () {
	this.texture.anchor.set(0.5, 0.5);
	this.texture.height = this.radius * 2;
	this.texture.width = this.radius * 2;
	this.texture.visible = true;
	this.addChild(this.texture);
};

GameObject.prototype.movement = function (delta) {
	this.y += this.direction.y * this.speed * delta;
	this.x += this.direction.x * this.speed * delta;
};