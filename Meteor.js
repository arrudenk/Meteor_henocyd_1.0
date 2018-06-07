// Meteor class file



function Meteor() {
    GameObject.apply(this, arguments);
	// GameObject.prototype.addDirection.apply(this);
    GameObject.prototype.addGraphics.apply(this);
    GameObject.prototype.addTexture.apply(this);
	this.dirLine = null;
    this.drawDirection();
}

Meteor.prototype = Object.create(GameObject.prototype);

Meteor.prototype.drawDirection = function () {
	if (this.dirLine !== null)
		this.dirLine.clear();
	var dirLine = new PIXI.Graphics();
	dirLine.lineStyle(5, 0xff0000);
	// dirLine.anchor.set(0.5, 0.5);
	// dirLine.rotation = findAngle(this.x + this.dir.x * 5,t this.dir.y * 5, this.x, this.y);
	dirLine.moveTo(0, 0);
	dirLine.lineTo(this.direction.x * 30, this.direction.y * 30);
	dirLine.endFill();
	this.dirLine = dirLine;
	this.addChild(this.dirLine);
};

Meteor.prototype.meteorWallCollision = function () {
	//check collision with horizontal walls
	if (this.y < -400 || this.y > 400) {
		this.y = Math.min(400, Math.max(-400, this.y));// check+++++
		// this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
		this.direction.y *= -1;
	}
	//check collision with vertical walls
	if (this.x < -400 || this.x > 400) {
		this.x = Math.min(400, Math.max(-400, this.x));// check+++++
		// this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
		this.direction.x *= -1;
	}
};

Meteor.prototype.hit = function(e){
	var loc = e.data.getLocalPosition(this);
	this.emit("click", loc);
};

Meteor.prototype.tick = function (delta) {
    this.movement(delta);
    this.meteorWallCollision();
    this.drawDirection();
};
