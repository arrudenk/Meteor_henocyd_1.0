//Kernel Class

function Main_Stage() {
    PIXI.Container.call(this);

    this.circle = null;
    this.add_circle();
    this.make_interactive();
    this.random_array = [];
}

Main_Stage.prototype = Object.create(PIXI.Container.prototype);

Main_Stage.prototype.add_random = function(){
  var x = Math.random() * 600 - 300;
  var y = Math.random() * 600 - 300;
  var rad = 10;
  var circle = new PIXI.Graphics();
  circle.dir = {x: Math.random() * 5, y : Math.random() * 5};
  circle.beginFill(0x0000FF).drawCircle(0, 0, rad).endFill();
  circle.position.set(this.circle.x, this.circle.y);
  this.random_array.push(circle);
  this.addChild(circle);
};

Main_Stage.prototype.add_circle = function () {
    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0xFF0000).drawCircle(0, 0, 50).endFill();

    this.circle.dir = {x: 0, y: -1};

    this.addChild(this.circle);
};

Main_Stage.prototype.make_interactive = function (){
    this.circle.interactive = true;
    this.circle.on("pointerdown", this.handle_down, this);
};

Main_Stage.prototype.handle_down = function (e) {
    // console.log(e.data.global.x, e.data.global.y);
    this.add_random();
    var local = e.data.getLocalPosition(this);
    // console.log(local);
};

Main_Stage.prototype.tick = function (delta) {
    // console.log(delta);
    this.circle.y += this.circle.dir.y;

    if (this.circle.y < -300 || this.circle.y > 300) {
        this.circle.y = Math.min(300, Math.max(-300, this.circle.y));// check+++++
        this.circle.dir.y *= -1;
    }

    for(var i = 0; i < this.random_array.length; i++)
    {
        this.random_array[i].x += this.random_array[i].dir.x;
        this.random_array[i].y += this.random_array[i].dir.y;
        if (this.random_array[i].y < -300 || this.random_array[i].y > 300) {
            this.random_array[i].y = Math.min(300, Math.max(-300, this.random_array[i].y));// check this in paper+++++
            this.random_array[i].dir.y *= -1;
        }
        if (this.random_array[i].x < -300 || this.random_array[i].x > 300) {
            this.random_array[i].x = Math.min(300, Math.max(-300, this.random_array[i].x));// check this in paper+++++
            this.random_array[i].dir.x *= -1;
        }
    }

};