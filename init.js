


var app = new PIXI.Application({width: WIDTH, height:HEIGHT});

document.body.appendChild(app.view);

PIXI.loader
	.add('Explosion_Sequence_A ', 'https://raw.githubusercontent.com/arrudenk/Meteor_henocyd_1.0/master/image/ms.json')
	.load();

var stage = new SpaceStage();

app.stage.addChild(stage);

stage.position.set(WIDTH / 2, HEIGHT /2);

app.ticker.add(stage.tick.bind(stage));
