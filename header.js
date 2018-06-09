// header.h


var DEFAULT_AMMO_COUNT = 4;
var DEFAULT_METEORS_COUNT = 15;
var WIDTH = 1200;
var HEIGHT = 600;
var SCREEN_CENTER = {x : 0, y: 0};
var RANDOM_RADIUS = Math.random() * (40 - 20 + 1) + 20; // random radius from 40 to 20
var METEOR_TEXTURE_URL = 'https://i.imgur.com/dAPy90y.png';
var BULLET_TEXTURE_URL = 'https://i.imgur.com/kA21fN8.png';
var PLAYER_TEXTURE_URL = 'https://i.imgur.com/WZpPBMs.png';
var BACKGROUND_TEXTURE_URL = 'https://i.imgur.com/aVKXTmP.png';
var METEORS_ANIMATION_JSON_URL = 'https://raw.githubusercontent.com/arrudenk/Meteoroid_henocyd_1.24572552/master/image/meteorjson.json';

var PRESSED_KEYS = {};

var KEY_CODES = {
	Up : 87,
	Down : 83,
	Left : 65,
	Right : 68,
	Space : 32,
	Enter : 13
};