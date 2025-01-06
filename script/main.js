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

rubixs_cube_element = document.getElementsByClassName('cube-rotate')[0];
rubixs_cube = new Cube(rubixs_cube_element);
