// Bullet class


function Bullet() {
    PIXI.Container.call(this);
    this.graphics = null;
    this.radius = null;
    this.speed = 15;
    this.dir = {x : 0, y : 0};
    this.addGraphics();
}

Bullet.prototype = Object.create(PIXI.Container.prototype);

Bullet.prototype.addGraphics = function () {
    this.graphics = new PIXI.Graphics();
    this.radius = 3;
    this.graphics.beginFill(0xff0000)
        .drawCircle(0, 0, this.radius)
        .endFill();
    this.addChild(this.graphics);
};

Bullet.prototype.setupDirection = function (vector) {
    this.dir = normalize(vector);
};

Bullet.prototype.setupPosition = function (startPosition) {
    this.x = startPosition.x;
    this.y = startPosition.y - 20;
};

Bullet.prototype.bulletMovement = function(delta){
    this.x += this.dir.x * delta * this.speed;
    this.y += this.dir.y * delta * this.speed;
};

Bullet.prototype.tick = function (delta) {
    this.bulletMovement(delta);
};
