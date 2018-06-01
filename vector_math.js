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


function v1_plus_v2(vec_1, vec_2) {
    var vec = {};
    vec.x = vec_1.x + vec_2.x;
    vec.y = vec_1.y + vec_2.y;
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
}
function vector_reflection(vec_A, vec_B) {
    // REFLECT = A> - 2 * (DOT[A>;N>;]) * N>
    var reflection = {};
    //__________|>N> = Vec_B - Vec_A      |4
    var normal = v1_minus_v2(vec_B, vec_A);
    //_________DOT[A>;N>]                   |3
    var dot = dot_product(vec_A.dir, normal);
    //___________(2 * DOT[A>;N>]) * N>         |2
    reflection = scalar_vector(2 * dot, normal);
    //___________|_A> - ((2 * DOT[A>;N>]) * N>)    |1
    reflection = v1_minus_v2(vec_A.dir, reflection);
    return (reflection);//                         |DONE
}



