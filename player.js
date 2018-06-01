


function Player() {
    PIXI.Container.call(this);

    this.player = null;
    this.radius = 20;
    this.add_player();
    this.interactive = true;
    this.on("pointermove", this.bullet_shoot, this);
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.hitArea = new PIXI.Rectangle(-600, -600, 1200, 1200);
    // console.log(this.hitArea);
}

Player.prototype = Object.create(PIXI.Container.prototype);

Player.prototype.add_player = function () {
  this.player = new PIXI.Graphics();
  this.player.beginFill(0xFFFFFF).drawCircle(0, 0, this.radius).endFill();
  this.rocket =  new PIXI.Sprite.fromImage('https://i.imgur.com/nqv5NiU.png');
  this.player.visible = false;
  this.rocket.width = 60;
  this.rocket.height = 60;
  this.rocket.anchor.set(0.5, 0.5);


  this.addChild(this.player);
    this.addChild(this.rocket);
};

Player.prototype.bullet_shoot = function (e) {
    var loc = e.data.getLocalPosition(this);
    console.log(loc);
    this.emit("bullets_create", loc);
    this.emit("mouse loc", loc);
};
