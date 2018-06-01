//Menu class


function Menu() {
    PIXI.Container.call(this);

    this.reload_texture = null;
    this.ammo = null;
    this.init = null;
    this.add_init();
    this.add_ammo();
    this.add_reload_button();
    this.reload_texture.on('pointerdown', this.click);
}

Menu.prototype = Object.create(PIXI.Container.prototype);

Menu.prototype.add_init = function(){
      this.init = new PIXI.Sprite.fromImage('https://i.imgur.com/YU7yjcW.png');
      this.init.anchor.set(0.5, 0.5);
      this.init.width = 600;
      this.init.height = 600;
      this.init.x = 0;
      this.init.y = 0;
      this.addChild(this.init);
};

Menu.prototype.add_ammo = function() {
    this.text_style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ff3e00', '#f127ff'], // gradient
        stroke: '#f9ff00',
        strokeThickness: 5,
        dropShadow: false,
        dropShadowColor: '#ffac94',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });
    this.ammo = new PIXI.Text('999', this.text_style);
    this.ammo.x = 300;
    this.ammo.y = -300;
    this.addChild(this.ammo);
};

Menu.prototype.add_reload_button = function () {
    var reload_texture = new PIXI.Sprite.fromImage('https://i.imgur.com/XEk014z.png');
    reload_texture.anchor.set(0.5, 0.5);
    reload_texture.width = 30;
    reload_texture.height = 30;
    reload_texture.x = 275;
    reload_texture.y = -275;
    reload_texture.interactive = true;
    reload_texture.buttonMode = true;
    this.reload_texture = reload_texture;
    this.addChild(this.reload_texture);

};
Menu.prototype.click = function () {
    // console.log('hello');
    this.emit('reload game');
};