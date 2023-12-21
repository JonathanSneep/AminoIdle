document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#102030';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate shapes at random intervals
    setInterval(() => {
        const shape = generateRandomShape(3, 15);
        const gradientKeys = Object.keys(colorGradients);
        const randomGradientKey = gradientKeys[Math.floor(Math.random() * gradientKeys.length)];
        const gradient = colorGradients[randomGradientKey];
        const direction = Math.random() < 0.5 ? 'vertical' : 'horizontal'; // Randomly pick direction

        let startPos;
        if (direction === 'vertical') {
            startPos = Math.random() * canvas.width; // Random horizontal position for vertical shapes
        } else {
            startPos = Math.random() * canvas.height; // Random vertical position for horizontal shapes
        }

        animateShape(ctx, shape, gradient, startPos, 2, direction); // Speed is 2 pixels per frame
    }, Math.random() * 200 + 100); // Between 0.5 to 1.5 seconds
});

const colorGradients = {
    gradient1: ['#E0009D', '#CB0392', '#B60687', '#A20A7C', '#8D0D71', '#781067', '#63135C', '#4E1651', '#3A1A46', '#251D3B', '#102030'],
    gradient2: ['#E00047', '#CB0345', '#B60642', '#A20A40', '#8D0D3E', '#78103C', '#631339', '#4E1637', '#3A1A35', '#251D32', '#102030'],
    gradient3: ['#005AE0', '#0254CE', '#034EBD', '#0549AB', '#06439A', '#083D88', '#0A3776', '#0B3165', '#0D2C53', '#0E2642', '#102030'],
    gradient4: ['#00E0D1', '#02CDC1', '#03BAB1', '#05A6A1', '#069391', '#088081', '#0A6D70', '#0B5A60', '#0D4650', '#0E3340', '#102030'],
    gradient5: ['#CAE000', '#B7CD05', '#A5BA0A', '#92A60E', '#809313', '#6D8018', '#5A6D1D', '#485A22', '#354626', '#23332B', '#102030'],
    gradient6: ['#FF8400', '#E77A05', '#CF700A', '#B7660E', '#9F5C13', '#885218', '#70481D', '#583E22', '#403426', '#282A2B', '#102030'],
    gradient7: ['#FF5208', '#E74D0C', '#CF4810', '#B74314', '#9F3E18', '#88391C', '#703420', '#582F24', '#402A28', '#28252C', '#102030'],
    gradient8: ['#40FF5C', '#3BE958', '#36D253', '#32BC4F', '#2DA64A', '#289046', '#237942', '#1E633D', '#1A4D39', '#153634', '#102030'],
    gradient9: ['#9029FF', '#8328EA', '#7627D6', '#6A26C1', '#5D25AC', '#502598', '#432483', '#36236E', '#2A2259', '#1D2145', '#102030'],
    gradient10: ['#FF1414', '#E71517', '#CF161A', '#B7181C', '#9F191F', '#881A22', '#701B25', '#581C28', '#401E2A', '#281F2D', '#102030'],
    gradient11: ['#00BBFF', '#02ACEA', '#039CD6', '#058DC1', '#067DAC', '#086E98', '#0A5E83', '#0B4F6E', '#0D3F59', '#0E3045', '#102030'],
    gradient12: ['#FFFFE8', '#E7E9D6', '#CFD2C3', '#B7BCB1', '#9FA69E', '#88908C', '#70797A', '#586367', '#404D55', '#283642', '#102030'],
    gradient13: ['#97FF21', '#8AE923', '#7CD224', '#6FBC26', '#61A627', '#549029', '#46792A', '#39632C', '#2B4D2D', '#1E362F', '#102030'],
    gradient14: ['#F763DA', '#E05CC9', '#C956B8', '#B24FA7', '#9B4896', '#844285', '#6C3B74', '#553463', '#3E2D52', '#272741', '#102030'],
    gradient15: ['#8FDDFF', '#82CAEA', '#76B7D6', '#69A4C1', '#5C91AC', '#507F98', '#436C83', '#36596E', '#294659', '#1D3345', '#102030'],
};

    
 
 

 // Function to generate a random Tetris-like shape
function generateRandomShape(minSize, maxSize) {
    const shapeSize = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    const shape = [];
    let currentX = 0, currentY = 0;
    shape.push({ x: currentX, y: currentY });

    for (let i = 1; i < shapeSize; i++) {
        const direction = Math.random();
        if (direction < 0.25) {
            currentX--;
        } else if (direction < 0.5) {
            currentX++;
        } else if (direction < 0.75) {
            currentY--;
        } else {
            currentY++;
        }
        shape.push({ x: currentX, y: currentY });
    }
    return shape;
}


function animateShape(ctx, shape, gradient, start, speed, direction) {
    let position = 0; // yPos for vertical, xPos for horizontal
    const pathMap = new Map();
    let shapeStopped = false;
    const previousShapePositions = new Set(); // Track previous shape positions

    function draw() {
        pathMap.forEach((colorIdx, key) => {
            if (!previousShapePositions.has(key) || colorIdx > 0) { // Draw tail if not part of current shape position or if it's fading
                const [px, py] = key.split(',').map(Number);
                const gradientColor = gradient[Math.min(colorIdx, gradient.length - 1)];
                ctx.fillStyle = gradientColor;
                ctx.fillRect(px, py, 1, 1);
            }
            if (colorIdx < gradient.length - 1) {
                pathMap.set(key, colorIdx + 1);
            } else {
                pathMap.delete(key); // Delete fully faded tail segments
            }
        });

        previousShapePositions.clear(); // Clear previous shape positions

        if (!shapeStopped) {
            shape.forEach(part => {
                const xPos = direction === 'vertical' ? part.x + start : position + part.x; // Horizontal or vertical position
                const yPos = direction === 'vertical' ? position + part.y : part.y + start; // Horizontal or vertical position
                ctx.fillStyle = gradient[0];
                ctx.fillRect(xPos, yPos, 1, 1);
                const key = `${xPos},${yPos}`;
                previousShapePositions.add(key); // Track current shape position
                if (!pathMap.has(key)) {
                    pathMap.set(key, 0);
                }
            });

            position += speed;
            if ((direction === 'vertical' && position >= ctx.canvas.height) || (direction === 'horizontal' && position >= ctx.canvas.width)) {
                shapeStopped = true; // Stop moving the shape
            }
        }


        if (!shapeStopped || pathMap.size > 0) {
            requestAnimationFrame(draw); // Continue the animation
        }
    }

    draw();
}




function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // You can call animateShape here again if you want to restart the animation on resize
}


