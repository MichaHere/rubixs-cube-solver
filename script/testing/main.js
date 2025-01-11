rubixs_cube_element = document.getElementsByClassName('cube-rotate')[0];
rubixs_cube = new RubixsCube(rubixs_cube_element);


console.log(rubixs_cube.position);

rubixs_cube.set_position({
    "F": [
    "B",
    "R",
    "L",
    "U",
    "D"
    ],
    "B": [
    "F",
    "B",
    "B",
    "B",
    "B"
    ],
    "R": [
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
    "L"
    ],
    "U": [
    "F",
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
    "D"
    ]
})

rubixs_cube.rotate_face(rubixs_cube.face.F);