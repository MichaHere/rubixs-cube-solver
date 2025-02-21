rubixs_cube_element = document.getElementsByClassName('cube-rotate')[0];
rubixs_cube = new RubixsCube(rubixs_cube_element);


console.log(rubixs_cube.position);

rubixs_cube.face_rotation_animation();

rubixs_cube.set_position({
    "F": [
    "B",
    "R",
    "L",
    "U",
    "D",
    "F",
    "R",
    "B"
    ],
    "B": [
    "F",
    "F",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B"
    ],
    "R": [
    "F",
    "R",
    "R",
    "F",
    "R",
    "R",
    "R",
    "R"
    ],
    "L": [
    "F",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L",
    "L"
    ],
    "U": [
    "F",
    "U",
    "U",
    "U",
    "U",
    "U",
    "U",
    "U"
    ],
    "D": [
    "F",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D",
    "D"
    ]
})

console.log(rubixs_cube.position.F);
console.log(rubixs_cube.rotate_face(rubixs_cube.face.F))
