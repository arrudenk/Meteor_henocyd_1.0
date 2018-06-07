//Menu class


function Menu() {
    PIXI.Container.call(this);

    this.reloadButton = null;
    this.ammo = null;
    this.init = null;
    this.meteorsNumber = null;
    this.reloadButton = null;
    this.addInit();
    this.addAmmo();
    this.addReloadButton();
    this.reloadButton.on('pointerdown', this.click, this);
}

Menu.prototype = Object.create(PIXI.Container.prototype);

Menu.prototype.addInit = function(){
      this.init = new PIXI.Sprite.fromImage('https://i.imgur.com/WwUvBbJ.png');
      this.init.anchor.set(0.5, 0.5);
      this.addChild(this.init);
};

Menu.prototype.addAmmo = function() {
    this.meteorsNumber = new PIXI.TextStyle({
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
    this.ammo = new PIXI.Text('5', this.meteorsNumber);
    this.ammo.x = 300;
    this.ammo.y = -300;
    this.addChild(this.ammo);
};

Menu.prototype.addReloadButton = function () {
    this.reloadButton = new PIXI.Sprite.fromImage('https://i.imgur.com/XEk014z.png');
    this.reloadButton.anchor.set(0.5, 0.5);
    this.reloadButton.width = 30;
    this.reloadButton.height = 30;
    this.reloadButton.interactive = true;
    this.reloadButton.buttonMode = true;
    this.addChild(this.reloadButton);
};

Menu.prototype.click = function (e) {
    this.emit('reload game');
};