var app = new PIXI.Application({width: WIDTH, height:HEIGHT});

document.body.appendChild(app.view);

var textures = {
	explosionAnimation : [],
	meteorAnimation : []
};

var loader = PIXI.loader
	.add('Explosion_Sequence_A ', 'https://raw.githubusercontent.com/arrudenk/Meteor_henocyd_1.0/master/image/ms.json')
	.add('meteor (', 'https://raw.githubusercontent.com/arrudenk/Meteoroid_henocyd_1.24572552/master/image/meteorjson.json')
	.add('Player', 'https://i.imgur.com/WZpPBMs.png')
	.on("progress", loadProgressHandler)
	.load(setup);


function loadProgressHandler(loader, resource) {

	//Display the file `url` currently being loaded
	console.log("loading: " + resource.url);

	//Display the percentage of files currently loaded
	console.log("progress: " + loader.progress + "%");

	//If you gave your files names as the first argument
	//of the `add` method, you can access them like this
	//console.log("loading: " + resource.name);
}

function setup(){
	// create an array and store the textures --->
	for (var i = 0; i < 26; i++) {
		var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i + 1) + '.png');
		textures.explosionAnimation.push(texture);
	}

	for (var i = 0; i < 32; i++) {
		var meteor = PIXI.Texture.fromFrame((i + 1) + '.png');
		textures.meteorAnimation.push(meteor);
	}//  <----
	if (textures.meteorAnimation.length > 0 && textures.explosionAnimation.length > 0)
	{
		var stage = new SpaceStage();


		app.stage.addChild(stage);

		stage.position.set(WIDTH / 2, HEIGHT /2);

		app.ticker.add(stage.tick.bind(stage));
	}
}


