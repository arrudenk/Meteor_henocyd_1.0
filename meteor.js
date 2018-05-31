// Meteor class file

function Meteor() {
    PIXI.Container.call(this);

    this.meteor = null;
    this.radius = Math.random() * (40 - 20 + 1) + 20;
    this.dir = {x : 0, y : 0};
    this.speed = 2;
    this.add_meteor();
    this.asteroid =  new PIXI.Sprite.fromImage('https://i.imgur.com/lJeRD0x.png');
    // this.test.radius = 30;
    this.asteroid.anchor.set(0.5, 0.5);
    this.asteroid.height = this.radius * 2;
    this.asteroid.width = this.radius * 2;
    this.addChild(this.asteroid);
}

Meteor.prototype = Object.create(PIXI.Container.prototype);


Meteor.prototype.add_meteor = function() {
  this.meteor = new PIXI.Graphics();
  this.meteor.beginFill(0x937239).drawCircle(0, 0, this.radius).endFill();
  // var sprite = new PIXI.Sprite(PIXI.loader.resources["/image/test.png"]);

  this.dir = {x: Math.random() * 600 - 300, y : Math.random() * 600 - 300};
  var normal = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y);
  this.dir.x = this.dir.x / normal;
  this.dir.y = this.dir.y / normal;

  this.addChild(this.meteor);
  // this.addChild(sprite);
};

Meteor.prototype.redraw = function(){
    this.meteor.clear()
    .beginFill(0x937239)
    .drawCircle(0, 0, this.radius)
    .endFill();
};

Meteor.prototype.move = function () {
    this.y += this.dir.y * this.speed;
    this.x += this.dir.x * this.speed;
};

Meteor.prototype.collision = function () {
    if (this.y < -400 || this.y > 400) {
        this.y = Math.min(400, Math.max(-400, this.y));// check+++++
        this.dir.y *= -1;
    }
    if (this.x < -400 || this.x > 400) {
        this.x = Math.min(400, Math.max(-400, this.x));// check+++++
        this.dir.x *= -1;
    }
};

Meteor.prototype.ishit = function () {

};

Meteor.prototype.tick = function (delta) {
    this.move();
    this.collision();
    // console.log(this.dir);
};