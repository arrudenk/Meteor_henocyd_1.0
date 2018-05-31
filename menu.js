//Menu class


function Menu() {
    PIXI.Container.call(this);

    this.reload_texture = null;
    this.add_reload_button();
    this.reload_texture.on('pointerdown', this.click);
}

Menu.prototype = Object.create(PIXI.Container.prototype);

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