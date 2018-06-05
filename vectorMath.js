//math

function dotProduct(vec_1, vec_2) {
    var r = vec_1.x * vec_2.x + vec_1.y * vec_2.y;
    return (r);
}

function normalize(vec) {
    var norm = {};
    var normal = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    norm.x = vec.x / normal;
    norm.y = vec.y / normal;
    return (norm);
}

function v1Minusv2(vec_1, vec_2) {
    var vec = {};
    vec.x = vec_1.x - vec_2.x;
    vec.y = vec_1.y - vec_2.y;
    vec = normalize(vec);
    return (vec);
}


function v1Plusv2(vec_1, vec_2) {
    var vec = {};
    vec.x = vec_1.x + vec_2.x;
    vec.y = vec_1.y + vec_2.y;
    vec = normalize(vec);
    return (vec);
}

function scalarVector(s, vec) {
    var ret = {};
    ret.x = vec.x * s;
    ret.y = vec.y * s;
    return (ret);
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
}
function vectorReflection(vec_A, vec_B) {
    // REFLECT = A> - 2 * (DOT[A>;N>;]) * N>
    var reflection = {};
    //__________|>N> = Vec_B - Vec_A      |4
    var normal = v1Minusv2(vec_B, vec_A);
    //_________DOT[A>;N>]                   |3
    var dot = dotProduct(vec_A.dir, normal);
    //___________(2 * DOT[A>;N>]) * N>         |2
    reflection = scalarVector(2 * dot, normal);
    //___________|_A> - ((2 * DOT[A>;N>]) * N>)    |1
    reflection = v1Minusv2(vec_A.dir, reflection);
    return (reflection);//                         |DONE
}

function circleCircleCollision(circle_a, circle_b) {
	var a_b = Math.pow(circle_a.x - circle_b.x, 2) + Math.pow(circle_a.y - circle_b.y, 2);
	var a_rad_b_rad  = Math.pow(circle_a.radius + circle_b.radius, 2);
	if (a_b <= a_rad_b_rad) {
		return (true);
	}
	return (false)
}

function circle_rectangle_collision(circle, rectangle)
{
	var closestX = clamp(circle.x, rectangle.x, rectangle.x + rectangle.width);
	var closestY = clamp(circle.y, rectangle.y, rectangle.y + rectangle.height);

	var distanceX = circle.x - closestX;
	var distanceY = circle.y - closestY;

	var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
	if (distanceSquared <= (circle.radius * circle.radius))
		return (true);
	return (false);
};

function findAngle(mx, my, px, py){
	var dist_Y = my - py;
	var dist_X = mx - px;
	var angle = Math.atan2(dist_Y,dist_X);
	//var degrees = angle * 180/ Math.PI;
	return angle;
}



