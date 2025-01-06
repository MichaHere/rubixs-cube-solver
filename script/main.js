class Cube {
    constructor (element, transform = {x: -40, y: -45}) {
        this.element = element;
        this.transform = transform;

        this.mouse_down = false;
        
        this.__init__();
    }

    __init__() {
        this.element.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.mouse_down = true;
        })

        window.addEventListener('mouseup', () => {
            this.mouse_down = false;
        })

        window.addEventListener('mousemove', (event) => {
            if (!this.mouse_down) return;

            this.transform = {
                x: this.transform.x - (event.movementY / 5),
                y: this.transform.y + (event.movementX / 5)
            }
        })
    }

    get transform() {
        return {
            x: parseFloat(this.element.style.transform.match(/(?<=rotateX\()[0-9-.]*(?=deg\))/)[0]),
            y: parseFloat(this.element.style.transform.match(/(?<=rotateY\()[0-9-.]*(?=deg\))/)[0])
        }
    }

    set transform({x, y}) {
        this.element.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    }
}

const Colors = {
    F: "var(--front)",
    B: "var(--back)",
    R: "var(--right)",
    L: "var(--left)",
    U: "var(--up)",
    D: "var(--down)",
    I: "var(--inner)"
}

class RubixsCube extends Cube {
    constructor (element, transform) {
        super(element, transform);

        this.face = { 
            F: "F", B: "B", 
            R: "R", L: "L", 
            U: "U", D: "D" 
        };
        this.faces = [
            this.face.F, this.face.B, 
            this.face.R, this.face.L, 
            this.face.U, this.face.D
        ];

        this.position;
        this.solved_position = {
            F: Array(5).fill(this.face.F),
            B: Array(5).fill(this.face.B),
            R: Array(5).fill(this.face.R),
            L: Array(5).fill(this.face.L),
            U: Array(5).fill(this.face.U),
            D: Array(5).fill(this.face.D)
        }

        this.set_position(this.solved_position);

        this.moves = {
            cF: 0, acF: 1,
            cB: 2, acB: 3,
            cR: 4, acR: 5,
            cL: 6, acL: 7,
            cU: 8, acU: 9,
            cD: 10, acD: 11
        }
    }

    #valid_position({ F, B, R, L, U, D }) {
        let count_shifts = { F: 1, B: 10, R: 100, L: 1000, U: 10000, D: 100000 }
        let count = 0;

        [F, B, R, L, U, D].forEach((array) => {
            if (array.length !== 5) {
                console.error(`Rubix's cube: incorrect dimensions`);
                return false;
            }

            for (let i = 0; i < array.length; i++) {
                if (!this.faces.includes(array[i])) {
                    console.error(`Rubix's cube: incorrect position values, only the following values are valid: "F", "B", "R", "L", "U", "D"`);
                    return false;
                }
                count += count_shifts[array[i]];
            }
        })

        if (count !== 555555) {
            console.error(`Rubix's cube: incorrect square count, each there must be exactly 6 squares for every face`);
            return false;
        }

        return true;
    }

    set_position(position) {
        if (!this.#valid_position(position)) return;
        this.position = position;
    }

    // TODO: Make this private 
    rotate_face(face, clockwise = true) {
        if (!this.faces.includes(face)) {
            console.error(`Rubix's cube: incorrect face value, only the following values are valid: "F", "B", "R", "L", "U", "D"`);
            return false;
        }

        // TODO: Make this matrix transformation work 

        console.log(this.position[face])
    }

    apply_move(move) {
        if (0 > move > 11) {
            console.error(`Rubix's cube: invalid move`);
            return;
        }

        // TODO: Rotate the rotating face 

        // TODO Make all the other faces rotate with 

    }
}

// Testing code 
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
