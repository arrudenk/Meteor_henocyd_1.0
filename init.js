


var app = new PIXI.Application({width: 600, height:600});

document.body.appendChild(app.view);

var stage = new Space_Stage();

app.stage.addChild(stage);

stage.position.set(300, 300);

app.ticker.add(stage.tick.bind(stage));
