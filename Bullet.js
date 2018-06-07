//Bullet class


function Bullet() {
	GameObject.apply(this, arguments);
	GameObject.prototype.addGraphics.apply(this);
	GameObject.prototype.addDirection.apply(this);
}

Bullet.prototype = Object.create(GameObject.prototype);

Bullet.prototype.setupPosition = function (startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y - 20;
};

Bullet.prototype.tick = function (delta) {
    this.movement(delta);
};