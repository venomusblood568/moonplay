console.clear(); // Clears the console.

/*--------------------
Utils
--------------------*/
const deg = (a) => (Math.PI / 180) * a; // Converts degrees to radians.
const randomness = () => Math.floor(40 + Math.random() * 1080) * Math.random(); // Generates a random number for the points' positions.

/*--------------------
Setup
--------------------*/
const Points = []; // Initializes an empty array to store points.
let rotation = 0; // Initializes the rotation variable.
let newRotation = Math.random() * 360; // Sets a random initial rotation.

function setup() {
    createCanvas(windowWidth, windowHeight); // Creates a canvas that fits the window.
    for (let i = 0; i < 180; i += 1) {
        Points.push({
            ox: 0, // Original x-coordinate.
            oy: 0, // Original y-coordinate.
            x: 0, // Current x-coordinate.
            y: 0 // Current y-coordinate.
        });
    }
    createLines(); // Calls the function to create lines.
}

/*--------------------
Lines
--------------------*/
function createLines() {
    const radius = Math.min(250, window.innerWidth * 0.48); // Determines the radius for the points.
    const increment = 2; // Sets the increment value for the loop.
    newRotation = rotation + 45; // Updates the rotation.
    const r1 = randomness(); // Generates a random number for the points' positions.
    const r2 = randomness(); // Generates another random number for the points' positions.
    const r3 = randomness(); // Generates another random number for the points' positions.
    const r4 = r1 !== 0 && r2 !== 0 && r3 !== 0 ? randomness() : Math.random() * 360; // Generates another random number or uses a new random value.
    for (let i = 0; i < 180; i += increment) {
        const x1 = radius * sin(deg(i + r1)); // Calculates the x-coordinate using sine.
        const y1 = radius * cos(deg(i + r2)); // Calculates the y-coordinate using cosine.
        Points[i].x = x1; // Updates the x-coordinate in the Points array.
        Points[i].y = y1; // Updates the y-coordinate in the Points array.
        const x2 = radius * sin(deg(i + r3)); // Calculates the x-coordinate for the next point.
        const y2 = radius * cos(deg(i + r4)); // Calculates the y-coordinate for the next point.
        Points[i + 1].x = x2; // Updates the next x-coordinate in the Points array.
        Points[i + 1].y = y2; // Updates the next y-coordinate in the Points array.
    }
}

/*--------------------
Redraw
--------------------*/
function mousePressed() {
    createLines(); // Creates new lines when the mouse is pressed.
}
function touchStarted() {
    createLines(); // Creates new lines when the screen is touched.
}

/*--------------------
Draw Lines
--------------------*/
function drawLines(clock) {
    const smooth = 0.06; // Sets the smoothness factor.
    const stagger = 0.005; // Sets the stagger factor.
    for (let i = 0; i < Points.length; i += 2) {
        stroke(255, i * 0.4); // Sets the stroke color and transparency.
        Points[i].ox = lerp(Points[i].ox, Points[i].x, smooth + i * stagger); // Interpolates the original x-coordinate to the current x-coordinate.
        Points[i].oy = lerp(Points[i].oy, Points[i].y, smooth + i * stagger); // Interpolates the original y-coordinate to the current y-coordinate.
        Points[i + 1].ox = lerp(
            Points[i + 1].ox,
            Points[i + 1].x,
            smooth + i * stagger
        ); // Interpolates the next original x-coordinate to the next current x-coordinate.
        Points[i + 1].oy = lerp(
            Points[i + 1].oy,
            Points[i + 1].y,
            smooth + i * stagger
        ); // Interpolates the next original y-coordinate to the next current y-coordinate.
        const x = lerp(Points[i].ox, Points[i + 1].ox, 0.3); // Calculates the control point x-coordinate for the bezier curve.
        const y = lerp(Points[i].oy, Points[i + 1].oy, 0.7); // Calculates the control point y-coordinate for the bezier curve.
        bezier(
            Points[i].ox,
            Points[i].oy,
            y,
            x,
            x,
            y,
            Points[i + 1].ox,
            Points[i + 1].oy
        ); // Draws a bezier curve between the points.
    }
}

/*--------------------
Draw
--------------------*/
let time = 0; // Initializes the time variable.
const smooth = 0.06; // Sets the smoothness factor.
function draw() {
    time += 0.01; // Increments the time.
    background(0); // Sets the background color to black.
    strokeWeight(1); // Sets the stroke weight.
    noFill(); // Disables filling shapes.
    translate(width / 2, height / 2); // Translates the origin to the center of the canvas.
    rotation = lerp(rotation, newRotation, smooth); // Smoothly interpolates the rotation.
    rotate(deg(rotation)); // Rotates the canvas.
    drawLines(time); // Calls the function to draw lines.
}

/*--------------------
Resize
--------------------*/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resizes the canvas when the window is resized.
}

setTimeout(createLines, 1500); // Calls the createLines function after 1.5 seconds.
