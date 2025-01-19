class Cube {
    constructor (element, transform = {x: -40, y: -45}) {
        this.element = element;
        this.transform = transform;

        this.mouse_down = false;
        
        this.__init__();
    }

    __init__() {
        let _touch_pos = { x: 0, y: 0 };
        function _update_touch_pos(touch) {
            _touch_pos = {
                x: touch.clientX,
                y: touch.clientY
            }
        }

        function update_transform(cube, movement_x, movement_y) {
            let transform_x = cube.transform.x;

            cube.transform = {
                x: transform_x - (movement_y / 5),
                y: cube.is_upsidedown(transform_x) ? 
                   cube.transform.y - (movement_x / 5) : 
                   cube.transform.y + (movement_x / 5)
            }
        }

        this.element.addEventListener('touchstart', e => {
            _update_touch_pos(e.touches[0]);
        })

        this.element.addEventListener('touchmove', e => {
            let movementX = (e.touches[0].clientX - _touch_pos.x) / 2;
            let movementY = (e.touches[0].clientY - _touch_pos.y) / 2;
            _update_touch_pos(e.touches[0]);

            update_transform(this, movementX, movementY)
            console.log(movementX, movementY)
        })

        this.element.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.mouse_down = true;
        })

        window.addEventListener('mouseup', () => {
            this.mouse_down = false;
        })

        window.addEventListener('mousemove', (event) => {
            if (!this.mouse_down) return;

            update_transform(this, event.movementX, event.movementY);
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
    
    is_upsidedown(transform_x = this.transform.x) {
        return 0.5 < (Math.abs(transform_x) + 90) / 360 % 1;
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
        this.faces_array = [
            this.face.F, this.face.B, 
            this.face.R, this.face.L, 
            this.face.U, this.face.D
        ];

        this.cube_dimensions = 3
        this.squares_per_face = this.cube_dimensions ** 2 - 1;

        this.position;
        this.solved_position = {
            F: Array(this.squares_per_face).fill(this.face.F),
            B: Array(this.squares_per_face).fill(this.face.B),
            R: Array(this.squares_per_face).fill(this.face.R),
            L: Array(this.squares_per_face).fill(this.face.L),
            U: Array(this.squares_per_face).fill(this.face.U),
            D: Array(this.squares_per_face).fill(this.face.D)
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
        let count = { F: 0, B: 0, R: 0, L: 0, U: 0, D: 0 };

        [F, B, R, L, U, D].forEach((array) => {
            if (array.length !== this.squares_per_face) {
                console.error(`Rubix's cube: incorrect dimensions, every face must have exactly ${this.squares_per_face} squares, got ${array.length} for at least one of the faces`);
                return false;
            }

            for (let i = 0; i < array.length; i++) {
                if (!this.faces_array.includes(array[i])) {
                    console.error(`Rubix's cube: incorrect position values, only the following values are valid: "F", "B", "R", "L", "U", "D", got ${array[i]}`);
                    return false;
                }
                count[array[i]]++
            }
        })

        if (!Object.values(count).every(value => { return value === this.squares_per_face})) {
            console.error(`Rubix's cube: incorrect square count, each there must be exactly ${this.squares_per_face} squares for every face, got ${JSON.stringify(count)}`);
            return false;
        }

        return true;
    }

    set_position(position) {
        if (!this.#valid_position(position)) return;
        this.position = position;
    }

    rotate_face(face, direction = 1) {
        if (!this.faces_array.includes(face)) {
            console.error(`Rubix's cube: incorrect face value, only the following values are valid: "F", "B", "R", "L", "U", "D"`);
            return false;
        }

        let result = this.matrix_transform(this.face_parse_matrix(face), direction);

        result.splice(this.squares_per_face/2, 1);

        return result;
        
    }

    face_parse_matrix(face) {
        // TODO: Optimize this rotate function 

        let data = this.position[face];
        data.splice(this.squares_per_face/2, 0, face);

        let matrix = [];
        for (let i = 0; i < data.length; i++) {
            let y = Math.floor((i) / this.cube_dimensions);
            let x = i - y * this.cube_dimensions;
            if (y === 0) matrix.push([]);

            matrix[x][this.cube_dimensions - 1 - y] = data[i];
        }

        return matrix;
    }

    /**
     * Rotate a matrix
     * @param {Array[]} matrix
     * @param {Number} direction negative is clockwise, positive is counterclockwise 
     */
    matrix_transform(matrix, direction = 1) {
        // TODO: Add directionality 
        let result = [];
        for (let i = 0; i < matrix.length; i++) {
            result.push(...matrix[i]);
        }

        // TODO: Make this return a matrix 

        return result;
    }

    rotate_shift_squares(face, clockwise = true) {
        if (!this.faces_array.includes(face)) {
            console.error(`Rubix's cube: incorrect face value, only the following values are valid: "F", "B", "R", "L", "U", "D"`);
            return false;
        }

        // TODO 
    }

    apply_move(move) {
        if (0 > move > 11) {
            console.error(`Rubix's cube: invalid move`);
            return;
        }

        // TODO: Add functionality 

    }
}
