//Player

function Player() {
	GameObject.apply(this, arguments);
	GameObject.prototype.addGraphics.apply(this);
	GameObject.prototype.addTexture.apply(this);
    this.interactive = true;
    this.on("pointermove", this.mousePosition, this);
    this.on("pointerdown", this.bulletShoot, this);
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.mouseLoc = 0;
    this.hitArea = new PIXI.Rectangle(0-WIDTH, 0-HEIGHT, WIDTH * 2, HEIGHT * 2);
}

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.bulletShoot = function(e) {
    var loc = e.data.getLocalPosition(this);
	this.emit("click", loc);
};

Player.prototype.mousePosition = function (e) {
    this.mouseLoc = e.data.getLocalPosition(this);
    // this.emit("bullets_create", loc);
    this.emit("mouse loc", this.mouseLoc);
};

Player.prototype.playerMovement = function(delta){
    this.y += this.y_velocity * delta;
    this.x += this.x_velocity * delta;
    this.x_velocity *= 0.9;
    this.y_velocity *= 0.9;
};

Player.prototype.keypadEvents = function () {
    if (PRESSED_KEYS[KEY_CODES.Up])
        this.y_velocity -= 0.7;
    if (PRESSED_KEYS[KEY_CODES.Down])
        this.y_velocity += 0.7;
    if (PRESSED_KEYS[KEY_CODES.Right])
        this.x_velocity += 0.7;
    if (PRESSED_KEYS[KEY_CODES.Left])
        this.x_velocity -= 0.7;
    if (PRESSED_KEYS[KEY_CODES.Enter])
        this.emit("game_start");
};

Player.prototype.tick = function (delta) {
    this.playerMovement(delta);
    GameObject.prototype.wallCollision.apply(this);
	this.texture.rotation = findAngle(0,0,this.mouseLoc.x, this.mouseLoc.y);

    this.keypadEvents();
};

window.addEventListener("keydown", function (event) {
    PRESSED_KEYS[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete PRESSED_KEYS[event.keyCode];
});