//math

function dot_product(vec_1, vec_2) {
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

function v1_minus_v2(vec_1, vec_2) {
    var vec = {};
    vec.x = vec_1.x - vec_2.x;
    vec.y = vec_1.y - vec_2.y;
    vec = normalize(vec);
    return (vec);
}

function scalar_vector(s, vec) {
    var ret = {};
    ret.x = vec.x * s;
    ret.y = vec.y * s;
    return (ret);
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
};



