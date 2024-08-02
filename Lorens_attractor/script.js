// Define constants for the Lorenz attractor simulation
var dt = 0.005,           // Time step for the simulation
    p = 28,               // Parameter p for the Lorenz system
    w = 10,               // Parameter w for the Lorenz system
    beta = 8 / 3,         // Parameter beta for the Lorenz system
    x0 = 0.5,            // Initial x-coordinate
    y0 = 0.5,            // Initial y-coordinate
    z0 = 10;             // Initial z-coordinate

// Set up the dimensions of the canvas
var width = window.innerWidth / 2; // Width of the canvas (half of viewport width)
var height = window.innerHeight;   // Height of the canvas (full viewport height)

// Select the canvas element and set its dimensions
var canvas = d3.select("#lorenzCanvas")
    .attr("width", width)         // Set the canvas width
    .attr("height", height);      // Set the canvas height

// Create a color scale for the visualization
var color = d3.scale.linear()
    .domain([0, 20, 30, 45])       // Domain of the color scale (range of z-values)
    .range(["#6b5b95", "#feb236", "#d64161","#ff7b25"])  // Colors corresponding to domain values
    .interpolate(d3.interpolateHsl); // Interpolation method for color blending

// Get the 2D rendering context of the canvas
var context = canvas.node().getContext("2d");

// Set up the drawing context properties
context.globalCompositeOperation = "lighter"; // Blending mode to lighten the drawn image
context.translate(width / 2, height / 2);     // Translate the origin to the center of the canvas
context.scale(12, 8);                        // Scale the drawing coordinates
context.lineWidth = 0.25;                    // Set the line width for drawing

// Update the initial coordinates based on mouse position
d3.select("#lorenzCanvas").on("mousemove", function() {
    var m = d3.mouse(canvas.node());  // Get the mouse position relative to the canvas
    x0 = (m[0] - width / 2) / 12;    // Update x0 based on mouse x-coordinate
    y0 = (m[1] - height / 2) / 12;   // Update y0 based on mouse y-coordinate
    z0 = 10;                         // Reset z0 to its initial value
});

// Create a timer to update and draw the Lorenz attractor
d3.timer(function() {
    var x = x0 + (Math.random() - 0.5) * 4; // Randomize x within a range
    var y = y0 + (Math.random() - 0.5) * 4; // Randomize y within a range
    var z = z0 + (Math.random() - 0.5) * 4; // Randomize z within a range
    var n = (Math.random() * 30) | 0;      // Number of lines to draw
    var t1 = Math.random() * 500;         // Duration of the drawing phase

    d3.timer(function(t0) {
        for (var i = 0; i < n; ++i) {      // Loop to draw multiple lines
            context.strokeStyle = color(z); // Set stroke color based on z value
            context.beginPath();           // Begin a new path for drawing
            context.moveTo(x, y);          // Move to the starting point
            x += dt * w * (y - x);        // Update x using Lorenz equations
            y += dt * (x * (p - z) - y);  // Update y using Lorenz equations
            z += dt * (x * y - beta * z); // Update z using Lorenz equations
            context.lineTo(x, y);         // Draw line to the updated point
            context.stroke();             // Stroke the path
        }
        return t0 > t1;                   // Stop drawing after the duration t1
    });

    // Clear the canvas with a slight opacity to create a fading effect
    context.save();                        // Save the current drawing state
    context.setTransform(1, 0, 0, 1, 0, 0); // Reset any transformations
    context.globalCompositeOperation = "source-atop"; // Blending mode for fading effect
    context.fillStyle = "rgba(0,0,0,0.03)"; // Fill color with slight opacity
    context.fillRect(0, 0, width, height);  // Fill the canvas with the fill color
    context.restore();                     // Restore the previous drawing state
});
