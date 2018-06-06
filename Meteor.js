// Meteor class file

function Meteor() {
    PIXI.Container.call(this);

    this.graphics = null;
    this.radius = Math.random() * (40 - 20 + 1) + 20;
    this.dir = {x : 0, y : 0};
    this.speed = 3;
    this.addMeteor();
    this.spriteImage =  new PIXI.Sprite.fromImage('https://i.imgur.com/lJeRD0x.png');
    // this.test.radius = 30;
    this.spriteImage.anchor.set(0.5, 0.5);
    this.spriteImage.height = this.radius * 2;
    this.spriteImage.width = this.radius * 2;
    this.addChild(this.spriteImage);
}

Meteor.prototype = Object.create(PIXI.Container.prototype);


Meteor.prototype.addMeteor = function() {
  this.graphics = new PIXI.Graphics();
  this.graphics.beginFill(0x937239).drawCircle(0, 0, this.radius).endFill();
  // var sprite = new PIXI.Sprite(PIXI.loader.resources["/image/test.png"]);

  this.dir = {x: Math.random() * 600 - 300, y : Math.random() * 600 - 300};
  var normal = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y);
  this.dir.x = this.dir.x / normal;
  this.dir.y = this.dir.y / normal;
  this.graphics.visible = false;
  this.addChild(this.graphics);
  // this.addChild(sprite);
};

Meteor.prototype.redraw = function(){
    this.graphics.clear()
    .beginFill(0x937239)
    .drawCircle(0, 0, this.radius)
    .endFill();
};

Meteor.prototype.move = function (delta) {
    this.y += this.dir.y * this.speed * delta;
    this.x += this.dir.x * this.speed * delta;
};

Meteor.prototype.checkWallCollision = function () {

    //check collision with horizontal walls
    if (this.y < -400 || this.y > 400) {
        this.y = Math.min(400, Math.max(-400, this.y));// check+++++
        // this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
        this.dir.y *= -1;
    }

    //check collision with vertical walls
    if (this.x < -400 || this.x > 400) {
        this.x = Math.min(400, Math.max(-400, this.x));// check+++++
        // this.position.set(Math.random() * (-400 - 600) + 600, Math.random() * (-400 - -300) + -300);
        this.dir.x *= -1;
    }
};

Meteor.prototype.ishit = function () {

};

Meteor.prototype.tick = function (delta) {
    this.move(delta);
    this.checkWallCollision();
    this.rotation += delta;
    // console.log(this.dir);
};
