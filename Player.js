
var pressed = {};

var KeyCode = {
    Up : 87,
    Down : 83,
    Left : 65,
    Right : 68,
    Space : 32,
    Enter : 13
};

function Player() {
    PIXI.Container.call(this);

    this.player = null;
    this.sprite = null;
    this.radius = 20;
    this.add_player();
    this.interactive = true;
    this.on("pointermove", this.mousePosition, this);
    this.on("pointertap", this.bulletShoot, this);
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.hitArea = new PIXI.Rectangle(-600, -600, 1200, 1200);
    // console.log(this.hitArea);
}

Player.prototype = Object.create(PIXI.Container.prototype);

Player.prototype.add_player = function () {
  this.player = new PIXI.Graphics();
  this.player.beginFill(0xFFFFFF).drawCircle(0, 0, this.radius).endFill();
  this.sprite =  new PIXI.Sprite.fromImage('https://i.imgur.com/nqv5NiU.png');
  this.player.visible = false;
  this.sprite.width = 60;
  this.sprite.height = 60;
  this.sprite.anchor.set(0.5, 0.5);
  this.addChild(this.player);
  this.addChild(this.sprite);
};

Player.prototype.bulletShoot = function(e) {
    var loc = e.data.getLocalPosition(this);
    this.emit("click", loc);

};

Player.prototype.mousePosition = function (e) {
    var loc = e.data.getLocalPosition(this);
    this.emit("bullets_create", loc);
    this.emit("mouse loc", loc);
};

Player.prototype.playerWallCollision = function () {
    if (this.y < -300 || this.y > 300) {
        this.y = Math.min(300, Math.max(-300, this.y));
        this.y *= -1;
    }
    if (this.x < -300 || this.x > 300) {
        this.x = Math.min(300, Math.max(-300, this.x));
        this.x *= -1;
    }
};

Player.prototype.playerMovement = function(delta){
    this.y += this.y_velocity * delta;
    this.x += this.x_velocity * delta;
    this.x_velocity *= 0.9;
    this.y_velocity *= 0.9;
    // console.log("player move");
};

Player.prototype.keypadEvents = function () {
    if (pressed[KeyCode.Up])
        this.y_velocity -= 0.7;
    if (pressed[KeyCode.Down])
        this.y_velocity += 0.7;
    if (pressed[KeyCode.Right])
        this.x_velocity += 0.7;
    if (pressed[KeyCode.Left])
        this.x_velocity -= 0.7;
    if (pressed[KeyCode.Enter])
        this.emit("game_start");
};

Player.prototype.tick = function (delta) {
    this.playerMovement(delta);
    this.playerWallCollision();
    this.keypadEvents();
    // console.log("player tick");
};

window.addEventListener("keydown", function (event) {
    pressed[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete pressed[event.keyCode];
});