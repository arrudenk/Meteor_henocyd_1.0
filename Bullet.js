//Bullet class


function Bullet() {
	GameObject.apply(this, arguments);
	GameObject.prototype.addGraphics.apply(this);
	GameObject.prototype.addDirection.apply(this);
	GameObject.prototype.addTexture.apply(this);
}

Bullet.prototype = Object.create(GameObject.prototype);

Bullet.prototype.setupPosition = function (x,y) {
    this.x = x;
    this.y = y;
};

Bullet.prototype.tick = function (delta) {
    this.movement(delta);
};