// Function to draw a simple planet with rasterized effect
function drawPlanet(ctx, centerX, centerY, radius) {
    // Create radial gradient for the planet
    let gradient = ctx.createRadialGradient(centerX - radius / 2, centerY, radius * 0.1, centerX, centerY, radius);
    gradient.addColorStop(0, '#000'); // Dark side of the planet
    gradient.addColorStop(0.7, '#00c2f7'); // Color of the planet blending with the sky/water color
    gradient.addColorStop(1, '#fff'); // Highlight of the planet

    // Draw the planet
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

}


// The drawing function
function drawScene(ctx) {
    // Fill the background with sky/water color
    ctx.fillStyle = '#00c2f7';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the planet
    let planetX = ctx.canvas.width / 2;
    let planetY = (ctx.canvas.height / 4) + 80; // Position the planet a bit lower
    let planetRadius = ctx.canvas.height / 4; // Set the planet size relative to the canvas height
    drawPlanet(ctx, planetX, planetY, planetRadius);

    // Draw random clouds
    drawRandomClouds(ctx);

    // Additional drawing code for other elements would go here...
}

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');

    // Resize and draw the canvas scene
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawScene(ctx);
    }

    // Resize the canvas to full window size and draw the scene
    resizeCanvas();

    // Make sure the canvas gets resized whenever the window size changes
    window.addEventListener('resize', resizeCanvas);
});

// Function to draw a single cloud with a flat bottom
function drawCloud(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x, y); // start at the bottom left of the cloud
    // Create arcs to form the top of the cloud
    ctx.arc(x + width * 0.2, y - height * 0.5, width * 0.2, Math.PI, 0, false); // left arc
    ctx.arc(x + width * 0.5, y - height * 0.7, width * 0.3, Math.PI, 0, false); // middle arc
    ctx.arc(x + width * 0.8, y - height * 0.5, width * 0.2, Math.PI, 0, false); // right arc
    // Draw the flat bottom of the cloud
    ctx.lineTo(x + width, y);
    ctx.closePath();

    // Fill the cloud
    ctx.fillStyle = 'ffffe1';
    ctx.fill();
}

// Function to add randomness and stretched effects
function drawRandomClouds(ctx) {
    // Number of clouds
    const cloudCount = 4;

    for (let i = 0; i < cloudCount; i++) {
        // Randomize the cloud dimensions and position
        const cloudWidth = ctx.canvas.width * (0.1 + Math.random() * 0.1); // between 10% and 20% of canvas width
        const cloudHeight = ctx.canvas.height * (0.05 + Math.random() * 0.05); // between 5% and 10% of canvas height
        const x = Math.random() * ctx.canvas.width;
        const y = Math.random() * ctx.canvas.height * 0.3; // top 30% of the canvas

        drawCloud(ctx, x, y, cloudWidth, cloudHeight);
    }
}