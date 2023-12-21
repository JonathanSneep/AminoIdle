
// The function to add a tendon
function addTendon() {
  var svg = document.getElementById('tendon');
  var newTendon = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  newTendon.setAttribute("id", "tendon-" + tendons);

  var startPointX = 400 + Math.floor(Math.random() * 30) - 15;
  var startPointY = 400 + Math.floor(Math.random() * 30) - 15;

  var endPointX, endPointY;
  let maxIterations = 1000;
  let iterations = 0;
  let distance = 0;

  while ((distance <= 25 || distance > 250) && iterations < maxIterations) {
    console.log("Had to recalculate a tendon endpoint.");
    // Constrain the end point to the left side
    endPointX = Math.floor(Math.random() * 400);
    endPointY = Math.floor(Math.random() * 650) + 75;
    distance = Math.sqrt(Math.pow(endPointX - 400, 2) + Math.pow(endPointY - 400, 2));
    iterations++;
  }

  // Calculate control points a little farther from the midpoint for more curve
  var controlPointX = Math.floor((startPointX + endPointX) / 2) + (Math.random() * 40) - 20;
  var controlPointY = Math.floor((startPointY + endPointY) / 2) + (Math.random() * 40) - 20;

  if (iterations === maxIterations) {
    console.warn("Max iterations reached, tendon endpoint might not be ideal.");
  }

  newTendon.setAttribute("d", `M${startPointX} ${startPointY} Q${controlPointX} ${controlPointY} ${endPointX} ${endPointY}`);
  newTendon.setAttribute("stroke", getTendonColor());
  newTendon.setAttribute("stroke-width", "2");
  newTendon.setAttribute("fill", "transparent");
  newTendon.setAttribute("filter", "url(#wiggleOnly)");
  
  var length = newTendon.getTotalLength();
  newTendon.style.strokeDasharray = length;
  newTendon.style.strokeDashoffset = length;
  newTendon.style.transition = 'stroke-dashoffset 2s linear';

  setTimeout(function() {
    newTendon.style.strokeDashoffset = 0;
  }, 100);

  var animate = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
  animate.setAttribute("attributeName", "d");
  animate.setAttribute("dur", "10s");
  animate.setAttribute("repeatCount", "indefinite");
  animate.setAttribute("values", `
    M${startPointX} ${startPointY} Q${controlPointX} ${controlPointY} ${endPointX} ${endPointY};
    M${startPointX} ${startPointY} Q${controlPointX + 10} ${controlPointY + 10} ${endPointX} ${endPointY};
    M${startPointX} ${startPointY} Q${controlPointX} ${controlPointY} ${endPointX} ${endPointY}
  `);

  newTendon.appendChild(animate);  
  svg.insertBefore(newTendon, svg.firstChild);
  
  startNewParagraph = true;
  updateStory("tendon");
  if (!sensorUpgradePurchased) {
    tendonEndpoints.push({x: endPointX, y: endPointY});
  }
  if (sensorUpgradePurchased) {
    sensorPositions.push({x: endPointX, y: endPointY});  // Update sensorPositions first
    setTimeout(function() {
      let sensorID = 'sensor' + sensorCounter;  // Use and increment the sensorCounter
      let sensor = createSensor(endPointX, endPointY, sensorID);
      svg.appendChild(sensor);
      applySensorUpgrades(); // adds spikes, suction cups, feathered antenna if/where appropriate
    }, 2700);
  }
  updateTendonUI();
}


function updateTendonUI() {
    // Debugging information
    console.log(`Debug: Current number of tendons = ${tendons}, tendogenesisStudyCompleted = ${tendogenesisStudyCompleted}`);
    if (tendons < 5) {
        // Allow the purchase of the first 5 tendons
        document.getElementById("tendonButton").style.display = 'inline-block';
        document.getElementById("tendonButton").innerHTML = `Grow Tendon (${tendonCosts[tendons]}n)`;
    } else if (tendogenesisStudyCompleted && tendons < 10) {
        // Show the button for tendons 6 to 10 if the tendogenesis study is completed
        document.getElementById("tendonButton").style.display = 'inline-block';
        // Calculate the exponential growth cost for tendons 6 through 10
        const cost = {
            nourishment: 2500 * Math.pow(2, tendons - 5),
            warmth: 2500 * Math.pow(2, tendons - 5),
            energy: 2500 * Math.pow(2, tendons - 5)
        };
        // Display the cost in a more compact way
        document.getElementById("tendonButton").innerHTML = `Grow Tendon (${cost.nourishment}n ${cost.warmth}w ${cost.energy}e)`;
    } else {
        // If all tendons have been purchased, hide the button
        document.getElementById("tendonButton").style.display = 'none';
        document.getElementById("tendonButton").innerHTML = `Grow Tendon (Maxed out)`;
    }
    // Update the visibility of the "Sense", "Glow", and "Grab" buttons
    if (tendons >= 1) {
        document.getElementById("senseButton").style.display = 'inline-block';
    }
    if (tendons >= 2) {
        document.getElementById("glowButton").style.display = 'inline-block';
    }
    if (tendons >= 3) {
        document.getElementById("grabButton").style.display = 'inline-block';
    }
}




updateTendonUI();


function addTendonTooltipEvents() {
  let tendonButton = document.getElementById("tendonButton");
  let tooltip = document.getElementById("tendonTooltipText");

  tendonButton.addEventListener('mousemove', function(e) {
    tooltip.style.left = "120px";
    tooltip.style.top = "60px";
  });
  tendonButton.addEventListener('mouseenter', function() {
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
  });
  tendonButton.addEventListener('mouseleave', function() {
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  });
}




// Function to help add sensors to pre-existing tendons
function addSensorsToExistingTendons() {
    console.log('Tendon Endpoints:', tendonEndpoints);
    var svg = document.getElementById('tendon');
    for (let i = 0; i < tendonEndpoints.length; i++) {
        sensorPositions.push({ x: tendonEndpoints[i].x, y: tendonEndpoints[i].y });
        let sensor = createSensor(tendonEndpoints[i].x, tendonEndpoints[i].y, 'sensor' + i);
        svg.appendChild(sensor);
    }
}

// Improved function for sensor creation (on regular tendons)
function createSensor(x, y, id) {
  let sensorGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  sensorGroup.setAttribute('id', 'sensor'+sensorCounter);  // Assign the ID to the group
  let sensor = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  let color = getContrastTendonColor();
  sensor.setAttribute("cx", x);
  sensor.setAttribute("cy", y);
  sensor.setAttribute("r", "0");  // Set initial radius to 0
  sensor.setAttribute("fill", color);
  sensor.setAttribute('id', 'original_' + sensorCounter);
  sensorCounter++;
  sensor.setAttribute("filter", "url(#wiggleOnly)");
  // Animation to make the sensor "grow"
  let animateGrow = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animateGrow.setAttribute("attributeName", "r");
  animateGrow.setAttribute("begin", "0s");
  animateGrow.setAttribute("dur", "15.5s");  // Duration of the growth animation; adjust as desired
  animateGrow.setAttribute("fill", "freeze");
  animateGrow.setAttribute("from", "0");
  animateGrow.setAttribute("to", "3");
  sensor.appendChild(animateGrow);  // Append growth animation to the sensor
  // Animation for the sensor group's movement
  let animateTransform = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  animateTransform.setAttribute("attributeName", "transform");
  animateTransform.setAttribute("type", "translate");
  animateTransform.setAttribute("values", `0 0; 2 2; 0 0`);
  animateTransform.setAttribute("dur", "10s");
  animateTransform.setAttribute("repeatCount", "indefinite");
  sensorGroup.appendChild(animateTransform);  // Append animation to the sensor group
  sensorGroup.appendChild(sensor);
  return sensorGroup;
}



// Increase Cell Membrane Thickness, to be used when the user buys the membrane thickness upgrade
function increaseCellMembraneThickness() {
    // Get the cell element
    let cell = document.getElementById('cell');
    // Get the current stroke width
    let currentStrokeWidth = parseFloat(cell.getAttribute('stroke-width'));
    // Increase the stroke width by a small amount (let's say 1)
    let newStrokeWidth = currentStrokeWidth + 10;
    // Set the stroke color to a darker shade
    cell.setAttribute('stroke', '#444');
    // Set the new stroke width
    cell.setAttribute('stroke-width', newStrokeWidth);
}


// Function to add membranes to worker cells
function addMembraneToWorkerCells() {
    // Check if Cellular Encapsulation Research is completed
    if (cellularEncapsulationResearchCompleted) {
        // Get the cell group element
        const cellGroup = document.getElementById('cellGroup');
        // Get all child elements in cellGroup, which should be the worker cells
        const workerCells = cellGroup.querySelectorAll('circle[id^="workercell-"]');
        // Loop through each worker cell
        workerCells.forEach((workerCell) => {
            // Get current stroke width, default to 0 if not set
            let currentStrokeWidth = parseFloat(workerCell.getAttribute('stroke-width') || 0);
            
            // Only add membrane (stroke) if it's not added yet (we consider stroke-width = 0 as not added)
            if (currentStrokeWidth === 0) {
                let newStrokeWidth = 1;  // Initial membrane thickness
                workerCell.setAttribute('stroke', '#444');  // Membrane color
                workerCell.setAttribute('stroke-width', newStrokeWidth);  // Set the membrane thickness
            }
        });
    }
}


function addSynapticGlacialis() {
    const cellGroup = document.getElementById('cellGroup'); // Assuming 'cellGroup' contains the worker cells
    const workerCells = cellGroup.querySelectorAll('[id^="workercell-"]');
    workerCells.forEach((workerCell) => {
        // Set the worker cell fill to a light-grey/blue-ish color
        workerCell.style.fill = '#ADD8E6'; // Light blue color
    });
}

function addCalorimetricGranulum() {
    const svgns = "http://www.w3.org/2000/svg"; // The namespace for SVG elements
    const cellGroup = document.getElementById('cellGroup'); // Assuming 'cellGroup' contains the worker cells
    const workerCells = cellGroup.querySelectorAll('[id^="workercell-"]');
    
    // Create the filter element
    const filter = document.createElementNS(svgns, "filter");
    filter.setAttribute("id", "red-glow-filter");
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
    
    // Create the feDropShadow element
    const feDropShadow = document.createElementNS(svgns, "feDropShadow");
    feDropShadow.setAttribute("dx", "0");
    feDropShadow.setAttribute("dy", "0");
    feDropShadow.setAttribute("stdDeviation", "2");
    feDropShadow.setAttribute("flood-color", "#FF6347");
    
    // Append feDropShadow to filter
    filter.appendChild(feDropShadow);
    
    // Add the filter to the defs of the SVG (assuming svgElement is your main SVG)
    const svgElement = document.querySelector('svg');
    const defs = svgElement.querySelector('defs') || svgElement.insertBefore(document.createElementNS(svgns, 'defs'), svgElement.firstChild);
    defs.appendChild(filter);
    
    // Apply the filter to each worker cell
    workerCells.forEach((workerCell) => {
        workerCell.style.filter = "url(#red-glow-filter)";
    });
}



// Function to add Mitochondria to our cell
function addMitochondria() {
  generateUniqueColors(); // Call the function to generate tertiary and quaternary colors
  // Get a reference to the SVG
  var svg = document.getElementById('tendon');
  // Decide how many mitochondria to add (between 4 and 8)
  var numMitochondria = Math.floor(Math.random() * 5) + 4;
  // Delay between each mitochondrion's appearance (in milliseconds)
  var delay = 2000; // 2 seconds
  // Function to create a single mitochondrion
  function createMitochondrion(i) {
    // Create a new SVG rectangle
    var mitochondria = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // Set the position of the mitochondria to a random point inside the cell
    var x = 390 + Math.floor(Math.random() * 20); // Random number between 140 and 160
    var y = 390 + Math.floor(Math.random() * 20); // Random number between 140 and 160
    // Set the attributes of the mitochondria
    mitochondria.setAttribute('x', x);
    mitochondria.setAttribute('y', y);
    mitochondria.setAttribute('width', 1);
    mitochondria.setAttribute('height', 1);
    // Choose either the tertiary or quaternary color based on the index
    var fillColor = i % 2 === 0 ? window.tertiaryColor : window.quaternaryColor;
    mitochondria.setAttribute('fill', fillColor);
    mitochondria.setAttribute('opacity', '0'); // Initially set to invisible
    // Assign a unique ID to the mitochondria
    mitochondria.setAttribute('id', 'mitochondrion-' + i);

    // Animation to fade in the mitochondria
    var animateFadeIn = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateFadeIn.setAttribute('attributeName', 'opacity');
    animateFadeIn.setAttribute('begin', '0s'); // Start immediately
    animateFadeIn.setAttribute('from', '0');
    animateFadeIn.setAttribute('to', '1');
    animateFadeIn.setAttribute('dur', '5s');
    animateFadeIn.setAttribute('fill', 'freeze');
    mitochondria.appendChild(animateFadeIn);

    // Add the original color-changing animation
    var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'fill');
    animate.setAttribute('values', `${fillColor};${fillColor === window.tertiaryColor ? window.quaternaryColor : window.tertiaryColor};${fillColor}`);
    animate.setAttribute('dur', '9s');
    animate.setAttribute('repeatCount', 'indefinite');
    mitochondria.appendChild(animate);

    // Append the mitochondria to the SVG
    svg.appendChild(mitochondria);
  }

  // For each mitochondrion, create it with a delay
  for (var i = 0; i < numMitochondria; i++) {
    setTimeout(createMitochondrion, i * delay, i);
  }
}




// Function to add our nucleus to the cell. It's a small piece that moves around inside the cell.
function addNucleus(color = null) {
    var nucleusColor = color || getRandomColor();
    var svg = document.getElementById("tendon");
    var nucleus = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    nucleus.setAttribute("id", "nucleus");
    nucleus.setAttribute("cx", 400);  
    nucleus.setAttribute("cy", 400);  
    nucleus.setAttribute("r", 1);  
    nucleus.setAttribute("fill", nucleusColor);
    const numPoints = 100;  // Increased number of points
    const cellRadius = 25;
    const nucleusRadius = 1;
    let valuesX = "400";
    let valuesY = "400";
    for (let i = 0; i < numPoints; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * (cellRadius - nucleusRadius);
        let offsetX = 400 + distance * Math.cos(angle);
        let offsetY = 400 + distance * Math.sin(angle);
        valuesX += `;${offsetX}`;
        valuesY += `;${offsetY}`;
    }
    valuesX += ";400";  // Return to the starting point
    valuesY += ";400";  // Return to the starting point
    var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateX.setAttribute("attributeName", "cx");
    animateX.setAttribute("values", valuesX);
    animateX.setAttribute("dur", "190s");  // Increased duration
    animateX.setAttribute("repeatCount", "indefinite");
    nucleus.appendChild(animateX);
    var animateY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateY.setAttribute("attributeName", "cy");
    animateY.setAttribute("values", valuesY);
    animateY.setAttribute("dur", "190s");  // Increased duration
    animateY.setAttribute("repeatCount", "indefinite");
    nucleus.appendChild(animateY);
    svg.appendChild(nucleus);
}




// Modified removeNucleus to return the current nucleus color
function removeNucleus() {
    var nucleus = document.getElementById("nucleus");
    var currentColor = null;
    if (nucleus) {
        currentColor = nucleus.getAttribute("fill");
        nucleus.remove();
    }
    return currentColor;
}


// Function to add our Endoplasmic Reticulum. A complex structure inside the cell.
function addEndoplasmicReticulum() {
    console.log("Endoplasmic Reticulum upgrade purchased");
    var svg = document.getElementById('tendon');
    var cell = document.getElementById("cell");
    var color = getContrastTendonColor();
    var centerX = 400, centerY = 400, radius = 20;
    function randomWithinRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomPathData() {
        var c1x = randomWithinRange(centerX - radius/2, centerX + radius/2);
        var c1y = randomWithinRange(centerY - radius/2, centerY + radius/2);
        var c2x = randomWithinRange(centerX - radius/2, centerX + radius/2);
        var c2y = randomWithinRange(centerY - radius/2, centerY + radius/2);
        var endx = randomWithinRange(centerX - radius, centerX + radius);
        var endy = randomWithinRange(centerY - radius, centerY + radius);
        return `M ${centerX} ${centerY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endx} ${endy}`;
    }
    var firstMitochondrion = document.getElementById('mitochondrion-0');
    for (let i = 0; i < 6; i++) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute("d", getRandomPathData());
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", "0.2"); // Initially set to a very thin stroke
        path.setAttribute("fill", "transparent");
        path.setAttribute('id', 'endoplasmicreticulum-' + i);
        path.setAttribute('stroke-opacity', '0.2'); // Initially set to low visibility
        path.style.filter = "url(#wiggleOnly)"; 
        // Animation to make the ER path fade in
        let animateFadeIn = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animateFadeIn.setAttribute("attributeName", "stroke-opacity");
        animateFadeIn.setAttribute("begin", "0s");
        animateFadeIn.setAttribute("dur", "15s");
        animateFadeIn.setAttribute("fill", "freeze");
        animateFadeIn.setAttribute("from", "0.2");
        animateFadeIn.setAttribute("to", "1");
        path.appendChild(animateFadeIn);
        // Animation to gradually increase the stroke width
        let animateStrokeWidth = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animateStrokeWidth.setAttribute("attributeName", "stroke-width");
        animateStrokeWidth.setAttribute("begin", "0s");
        animateStrokeWidth.setAttribute("dur", "15s");
        animateStrokeWidth.setAttribute("fill", "freeze");
        animateStrokeWidth.setAttribute("from", "0.2");
        animateStrokeWidth.setAttribute("to", "1");
        path.appendChild(animateStrokeWidth);
        svg.insertBefore(path, firstMitochondrion);
    }

    var nucleusColor = removeNucleus();
    addNucleus(nucleusColor);
}



// Function to add spikes to the sensors
function addSpikes() {
    var svg = document.getElementById('tendon');
    var cellCenter = { x: 400, y: 400 };
    for (let i = 0; i < 25; i++) {  
        let sensorID = 'sensor' + i;
        let sensorGroup = document.getElementById(sensorID);
        if (!sensorGroup) continue;  
        // Check if the sensor already has spikes
        let existingSpikes = sensorGroup.querySelectorAll(`[id^="spike_${i}_"]`);
        if (existingSpikes.length > 0) {
            continue; // Skip this sensor, it already has spikes
        }
        // Get the original sensor circle from the group
        let sensor = sensorGroup.querySelector("#original_" + i);
        // Check if the sensor circle exists
        if (!sensor) {
            console.error(`ERROR: Sensor circle not found in group ${sensorID}. Group contents:`, sensorGroup);
            continue;
        }
        // Calculate angle between sensor and cell center
        var dx = parseFloat(sensor.getAttribute('cx')) - cellCenter.x;
        var dy = parseFloat(sensor.getAttribute('cy')) - cellCenter.y;
        var baseAngle = Math.atan2(dy, dx);
        // Randomly determine the number of spikes for this sensor
        var numSpikes = Math.floor(Math.random() * 3) + 1;  
        // For multiple spikes, adjust the angle slightly for each one
        var angleAdjustment = Math.PI / 8;  // 22.5 degrees in radians
        for (let j = 0; j < numSpikes; j++) {
            var adjustedAngle = baseAngle + (j - Math.floor(numSpikes / 2)) * angleAdjustment;
            // Randomize the spike length between 8 and 11
            var spikeLength = Math.floor(Math.random() * 4) + 8;
            var startX = parseFloat(sensor.getAttribute('cx')) + Math.cos(adjustedAngle) * 3;
            var startY = parseFloat(sensor.getAttribute('cy')) + Math.sin(adjustedAngle) * 3;
            var endX = startX + Math.cos(adjustedAngle) * spikeLength;
            var endY = startY + Math.sin(adjustedAngle) * spikeLength;
            let spike = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            var controlPointX = (startX + endX) / 2 + Math.cos(adjustedAngle + Math.PI / 2) * 2;
            var controlPointY = (startY + endY) / 2 + Math.sin(adjustedAngle + Math.PI / 2) * 2;
            spike.setAttribute('d', `M${startX} ${startY} Q${controlPointX} ${controlPointY} ${endX} ${endY}`);
            // Randomly select the stroke color between tertiaryColor and quaternaryColor
            var strokeColor = Math.random() < 0.5 ? window.tertiaryColor : window.quaternaryColor;
            spike.setAttribute('stroke', strokeColor);
            spike.setAttribute('stroke-width', '1.2'); // Increased width
            spike.setAttribute("id", "spike_"+i+"_"+j);
            // Calculate the length of the spike path
            var length = spike.getTotalLength();
            // Set the initial stroke-dasharray and stroke-dashoffset to the length of the path
            spike.style.strokeDasharray = length;
            spike.style.strokeDashoffset = length;
            // Add transition to the stroke-dashoffset
            spike.style.transition = 'stroke-dashoffset 1s ease-out ' + j * 0.3 + 's'; // Staggered start time
            // After appending the spike, set the stroke-dashoffset to 0 to start the animation
            sensorGroup.insertBefore(spike, sensor); // Add spike to the group before the sensor circle
            setTimeout(function() {
                spike.style.strokeDashoffset = 0;
            }, 100 + j * 300); // Staggered start time
        }

    }
    enableEchoButton(); // Unhide the echo button
    unlockAchievement(23);
}



// Function to grow sensors (currently, only used when suction cup upgrade is purchased)
function growSensors() {
    for (let i = 0; i < sensorCounter; i++) {
        let sensorID = 'sensor' + i;
        let sensorGroup = document.getElementById(sensorID);
        if (!sensorGroup) continue;
        let sensor = sensorGroup.querySelector("#original_" + i);
        if (!sensor || sensor.classList.contains('upgraded')) {
            continue;  // Skip if the sensor is not found or already upgraded
        }
        sensor.classList.add('upgraded');  // Add a class to indicate the sensor has been upgraded
        let currentRadius = parseFloat(sensor.getAttribute("r"));
        let newRadius = currentRadius * 1.5;  // Grow by 50% for example, adjust as needed
        sensor.setAttribute("r", newRadius);
        // If you have an animation, you might want to update that too
        let animateGrow = sensor.querySelector("animate");
        if (animateGrow) {
            let toValue = parseFloat(animateGrow.getAttribute("to"));
            animateGrow.setAttribute("to", toValue * 1.5);
        }
    }
}



// Function to add suction cups to the sensors
function addSuctionCups() {
    var svg = document.getElementById('tendon');
    growSensors(); // first grow the sensors a little
    for (let i = 0; i < sensorCounter; i++) {
        let sensorID = 'sensor' + i;
        let sensorGroup = document.getElementById(sensorID);
        if (!sensorGroup) continue;
        let sensor = sensorGroup.querySelector("#original_" + i);
        if (!sensor) {
            console.error(`ERROR: Sensor circle not found in group ${sensorID}. Group contents:`, sensorGroup);
            continue;
        }
        // Check if the sensor already has suction cups
        let existingSuctionCups = sensorGroup.querySelectorAll(`[id^="suctionCup_${i}_"]`);
        if (existingSuctionCups.length > 0) {
            continue; // Skip this sensor, it already has suction cups
        }
        let initialAngle = Math.random() * 360;
        let numberOfSuctionCups = 5 // Math.floor(Math.random() * 3) + 2;  // 2 to 4 suction cups
        let angleIncrement = 360 / numberOfSuctionCups;
        for (let j = 0; j < numberOfSuctionCups; j++) {
            let angle = initialAngle + j * angleIncrement;
            let dx = 4.5 * Math.cos(angle * Math.PI / 180);
            let dy = 4.5 * Math.sin(angle * Math.PI / 180);
            let x = parseFloat(sensor.getAttribute('cx')) + dx;
            let y = parseFloat(sensor.getAttribute('cy')) + dy;
            let suctionCup = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            let color = getTendonColor();
            let rgbColor = hexToRgb(color);
            let darkenedColor = darkenColor(rgbColor, 0.2);  // 0.2 is 20% darker
            suctionCup.setAttribute("cx", x);
            suctionCup.setAttribute("cy", y);
            suctionCup.setAttribute("r", "2");  // Increased size
            suctionCup.setAttribute("fill", color);
            suctionCup.setAttribute("stroke", `rgb(${darkenedColor[0]},${darkenedColor[1]},${darkenedColor[2]})`);
            suctionCup.setAttribute("stroke-width", "0.5");  // 0.5px stroke width
            suctionCup.setAttribute("id", "suctionCup_" + i + "_" + j);  // Unique ID
            suctionCup.style.filter = "url(#wiggleOnly)";
            sensorGroup.appendChild(suctionCup);
        }
    }
    enableEchoButton(); // Unhide the echo button
    unlockAchievement(32);
}


function addFeatheredAntenna() {
    var svg = document.getElementById('tendon');
    for (let i = 0; i < sensorCounter; i++) {
        let sensorID = 'sensor' + i;
        let sensorGroup = document.getElementById(sensorID);
        if (!sensorGroup) continue;
        let sensor = sensorGroup.querySelector("#original_" + i);
        if (!sensor) {
            console.error(`ERROR: Sensor circle not found in group ${sensorID}. Group contents:`, sensorGroup);
            continue;
        }
        // Check if the sensor already has feathers
        let existingFeathers = sensorGroup.querySelectorAll(`[id^="feather_${i}_"]`);
        if (existingFeathers.length > 0) {
            continue;  // Skip this sensor, it already has feathers
        }
        let initialAngle = Math.random() * 360;
        let numberOfFeathers = 20;  // More feathers
        let angleIncrement = 360 / numberOfFeathers;
        let color = getTendonColor();
        let darkenedColor = darkenColor(hexToRgb(color), 0.2);
        let featherColor = `rgb(${darkenedColor[0]},${darkenedColor[1]},${darkenedColor[2]})`;
        for (let j = 0; j < numberOfFeathers; j++) {
            let angle = initialAngle + j * angleIncrement;
            let dx = 10 * Math.cos(angle * Math.PI / 180);  // Longer feathers
            let dy = 10 * Math.sin(angle * Math.PI / 180);
            let x1 = parseFloat(sensor.getAttribute('cx'));
            let y1 = parseFloat(sensor.getAttribute('cy'));
            let x2 = x1 + dx;
            let y2 = y1 + dy;
            // Create main feather line
            let feather = document.createElementNS("http://www.w3.org/2000/svg", "line");
            feather.setAttribute("x1", x1);
            feather.setAttribute("y1", y1);
            feather.setAttribute("x2", x2);
            feather.setAttribute("y2", y2);
            feather.setAttribute("stroke", featherColor);
            feather.setAttribute("stroke-width", "1");
            feather.setAttribute("id", "feather_"+i+"_"+j);
            sensorGroup.insertBefore(feather, sensor);  // Insert behind the sensor
            // Create small perpendicular lines along the main feather line to give it a feathered appearance
            for (let k = 0; k < 5; k++) {
                let t = 0.2 * k;
                let px = x1 + t * dx;
                let py = y1 + t * dy;
                let perpDx = 2 * Math.sin(angle * Math.PI / 180);
                let perpDy = -2 * Math.cos(angle * Math.PI / 180);
                let smallFeather = document.createElementNS("http://www.w3.org/2000/svg", "line");
                smallFeather.setAttribute("x1", px - perpDx);
                smallFeather.setAttribute("y1", py - perpDy);
                smallFeather.setAttribute("x2", px + perpDx);
                smallFeather.setAttribute("y2", py + perpDy);
                smallFeather.setAttribute("stroke", featherColor);
                smallFeather.setAttribute("stroke-width", "0.5");
                sensorGroup.insertBefore(smallFeather, feather);  // Insert behind the main feather
            }
        }
    }
    enableEchoButton(); // Unhide the echo button
    unlockAchievement(33);
}




function addSensorStroke() { // adds a darkened edge/border to the sensors
    for (let i = 0; i < sensorCounter; i++) {
        let sensorID = 'sensor' + i;
        let sensorGroup = document.getElementById(sensorID);
        if (!sensorGroup) continue;
        let sensor = sensorGroup.querySelector("#original_" + i);
        if (!sensor) {
            console.error(`ERROR: Sensor circle not found in group ${sensorID}. Group contents:`, sensorGroup);
            continue;
        }
        let color = getTendonColor();
        let darkenedColor = darkenColor(hexToRgb(color), 0.2);
        let strokeColor = `rgb(${darkenedColor[0]},${darkenedColor[1]},${darkenedColor[2]})`;
        sensor.setAttribute("stroke", strokeColor);
        sensor.setAttribute("stroke-width", "0.5");
    }
}



// Function to add our Echo Chamber to the cell, an upgrade available after the first echo
function addEchoChamber() {
    var svg = document.getElementById('tendon');
    color = hexToRgb(getTendonColor());
    var echoChamber = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    function randomOffset(base, range) {
        return base + Math.floor(Math.random() * range) - (range / 2);
    }

    var pathData = `
        M ${randomOffset(393, 4)} ${randomOffset(400, 4)}
        C ${randomOffset(384, 3)} ${randomOffset(392, 3)}, ${randomOffset(384, 3)} ${randomOffset(408, 3)}, ${randomOffset(389, 3)} ${randomOffset(409, 3)}
        C ${randomOffset(396, 3)} ${randomOffset(413, 3)}, ${randomOffset(412, 3)} ${randomOffset(413, 3)}, ${randomOffset(404, 3)} ${randomOffset(401, 3)}
        C ${randomOffset(412, 3)} ${randomOffset(392, 3)}, ${randomOffset(396, 3)} ${randomOffset(388, 3)}, ${randomOffset(393, 4)} ${randomOffset(400, 4)}
    `;
    echoChamber.setAttribute("d", pathData);
    echoChamber.setAttribute("id", "echoChamber");
    echoChamber.setAttribute("fill", "none"); // Initially no fill
    echoChamber.setAttribute("stroke", "#555");
    echoChamber.setAttribute("stroke-width", "1");
    var rotation = Math.random() * 360;
    echoChamber.setAttribute("transform", `rotate(${rotation},400,400)`);
    echoChamber.style.filter = "url(#wiggleOnly)";
    var firstMitochondrion = document.getElementById('endoplasmicreticulum-0');
    svg.insertBefore(echoChamber, firstMitochondrion);

    var pathLength = echoChamber.getTotalLength();
    echoChamber.style.strokeDasharray = pathLength + ' ' + pathLength;
    echoChamber.style.strokeDashoffset = pathLength;

    var strokeAnimation = setInterval(function() {
        if (echoChamber.style.strokeDashoffset > 0) {
            echoChamber.style.strokeDashoffset -= pathLength / 50;
        } else {
            clearInterval(strokeAnimation);
            echoChamber.setAttribute("fill", getTendonColor()); // Set the fill color without opacity
            echoChamber.classList.add("echoChamberFill"); // Apply the fill animation class
        }
    }, 20);

    displayOnChat(
        "Your interior shifts, forming an intricate chamber that resonates with the call of the cosmos. " +
        "This newly-formed 'echo chamber' amplifies your attempts to communicate, turning your feeble cries into powerful symphonies. " +
        "The vast expanse outside, once silent and indifferent, now seems more accessible. " +
        "A sense of purpose fills you. With this chamber, you might not only send signals but also decipher the enigmatic whispers of the universe. " +
        "As the echoes resonate within the chamber, you can't help but wonder: what mysteries await in the vast beyond? What knowledge remains hidden, just beyond reach? "
    );
}



// Function to add resonance tendrils to the cell, an upgrade available after the second echo
function addResonanceTendrils() {
    var svg = document.getElementById('tendon');
    var numTendrils = Math.floor(Math.random() * 4) + 3; // Random number between 3 and 6
    // Define the gradient for the tendrils
    var gradient = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
    gradient.setAttribute('id', 'tendrilGradient');
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#444');
    gradient.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', getTendonColor());
    gradient.appendChild(stop2);
    svg.appendChild(gradient);
    for (var i = 0; i < numTendrils; i++) {
        var angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 2*PI
        var startX = 400 + 23 * Math.cos(angle);  // Adjusted the distance slightly inward
        var startY = 400 + 23 * Math.sin(angle);  // Adjusted the distance slightly inward
        var tendrilLength = Math.random() * 5 + 7; // Adjusted the random length to compensate
        var segments = 3; // Number of segments to make it twirly
        var pathData = `M ${startX} ${startY} `;
        for (var j = 1; j <= segments; j++) {
            var segmentLength = tendrilLength / segments;
            var endX = startX + segmentLength * Math.cos(angle + j * Math.PI / 6); // Varying the angle to give it a twirl
            var endY = startY + segmentLength * Math.sin(angle + j * Math.PI / 6);
            var controlX = (startX + endX) / 2 + Math.random() * 4 - 2; // Random shift for bezier curve control point
            var controlY = (startY + endY) / 2 + Math.random() * 4 - 2;
            pathData += `Q ${controlX} ${controlY}, ${endX} ${endY} `;
            startX = endX;
            startY = endY;
        }
        resonanceTendrilEndpoints.push({ x: endX, y: endY }); // Capture final endX/endY for later use
        var tendril = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        tendril.setAttribute("d", pathData);
        tendril.setAttribute("id", "resonancetendril-" + i);
        tendril.setAttribute("stroke", "url(#tendrilGradient)");  // Using the gradient for the stroke
        tendril.setAttribute("stroke-width", "1");
        tendril.setAttribute("fill", "none");
        tendril.setAttribute("filter", "url(#glowWiggle)");
        // Adding a subtle sway animation
        var swayDuration = Math.random() * 2 + 3;
        tendril.style.animation = "sway " + swayDuration + "s infinite alternate";  // Duration between 3 to 5 seconds
        resonanceTendrilSwayDurations.push(swayDuration); // Capture for use on later upgrades/changes
        svg.appendChild(tendril);
    }
    // Add CSS for the sway animation (can be added to your CSS file)
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes sway {
            0% { transform: translateX(0); }
            100% { transform: translateX(2px); }  // Small horizontal sway
        }
    `;
    document.head.appendChild(style);
}


// Function to add Sensory Pulsars to resonance tendrils
function addSensoryPulsars() {
    var svg = document.getElementById('tendon');
    // Define the radial gradient for the pulsars
    var gradient = document.createElementNS("http://www.w3.org/2000/svg", 'radialGradient');
    gradient.setAttribute('id', 'pulsarGradient');
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#FFFFFF'); // Center of the gradient is bright white
    gradient.appendChild(stop1);
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'transparent'); // Edges of the gradient are transparent
    gradient.appendChild(stop2);
    svg.appendChild(gradient);
    // Iterate over each tendril endpoint and add a pulsar
    resonanceTendrilEndpoints.forEach(function(endpoint, index) {
        var pulsar = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        pulsar.setAttribute("cx", endpoint.x);
        pulsar.setAttribute("cy", endpoint.y);
        pulsar.setAttribute("r", 2); // Size of the pulsar
        pulsar.setAttribute("fill", "url(#pulsarGradient)");
        pulsar.setAttribute("id", "sensorypulsar-" + index);
        // Adding a subtle pulse animation
        var tendrilSwayDuration = resonanceTendrilSwayDurations[index] || 3; // Default to 3 seconds if not found
        pulsar.style.animation = "sway " + tendrilSwayDuration + "s infinite alternate, pulsarGlow " + (Math.random() * 1 + 1) + "s infinite alternate";
        svg.appendChild(pulsar);
    });
    // Add CSS for the pulse animation (can be added to your CSS file)
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulsarGlow {
            0% { opacity: 0.5; }
            100% { opacity: 1; }  
        }
    `;
    document.head.appendChild(style);
}



// Function to add our Monotrichous Flagella, following the 9th echo
function addMonotrichousFlagella() {
    const svgNS = "http://www.w3.org/2000/svg";
    const cellSvg = document.getElementById('tendon');
    const FlagellaColor = getTendonColor();
    const segments = [
        { d: 'M 400 400 Q 450 405 460 410', width: 4, animD: 'M 400 400 Q 445 402 455 407' },
        { d: 'M 460 410 Q 465 412 470 415', width: 3.5, animD: 'M 455 407 Q 460 409 465 412' },
        { d: 'M 470 415 Q 475 417 480 420', width: 3, animD: 'M 465 412 Q 470 414 475 417' },
        { d: 'M 480 420 Q 485 422 490 425', width: 2.5, animD: 'M 475 417 Q 480 419 485 422' },
        { d: 'M 490 425 Q 495 427 500 430', width: 2, animD: 'M 485 422 Q 490 424 495 427' },
        { d: 'M 500 430 Q 505 432 510 435', width: 1.5, animD: 'M 495 427 Q 500 429 505 432' },
        { d: 'M 510 435 Q 515 437 520 440', width: 1, animD: 'M 505 432 Q 510 434 515 437' },
        { d: 'M 520 440 Q 525 442 530 445', width: 0.5, animD: 'M 515 437 Q 520 439 525 442' }
    ];
    for (let segment of segments) {
        const part = document.createElementNS(svgNS, 'path');
        part.setAttribute('d', segment.d);
        part.setAttribute('stroke', FlagellaColor);
        part.setAttribute('stroke-width', segment.width.toString());
        part.setAttribute('fill', 'none');
        part.setAttribute('stroke-linecap', 'round');
        part.setAttribute('id', 'flagella-1');
        part.setAttribute("filter", "url(#wiggleOnly)");
        const animate = document.createElementNS(svgNS, 'animate');
        animate.setAttribute('attributeName', 'd');
        animate.setAttribute('values', `${segment.d};${segment.animD};${segment.d}`);
        animate.setAttribute('dur', '15s');
        animate.setAttribute('repeatCount', 'indefinite');
        part.appendChild(animate);
        if (cellSvg.firstChild) {
            cellSvg.insertBefore(part, cellSvg.firstChild);
        } else {
            cellSvg.appendChild(part);
        }
    }
    //
    researchQueue.push('ChemicalSensing'); // unlock chemical sensing 
    populateResearchTab();
}



function addLophotrichousFlagella() {
    const svgNS = "http://www.w3.org/2000/svg";
    const cellSvg = document.getElementById('tendon');
    // Array of flagella segments
    const segmentsArray = [
      // Second flagella
      [
          { d: 'M 395 405 Q 435 395 450 390', width: 4, animD: 'M 395 405 Q 430 392 445 387' },
          { d: 'M 450 390 Q 460 388 465 387', width: 3.5, animD: 'M 445 387 Q 455 385 460 384' },
          { d: 'M 465 387 Q 475 384 480 382', width: 3, animD: 'M 460 384 Q 470 381 475 379' },
          { d: 'M 480 382 Q 488 380 495 378', width: 2.5, animD: 'M 475 379 Q 483 377 490 375' },
          { d: 'M 495 378 Q 503 375 510 372', width: 2, animD: 'M 490 375 Q 498 372 505 369' },
          { d: 'M 510 372 Q 518 369 525 366', width: 1.5, animD: 'M 505 369 Q 513 366 520 363' },
          { d: 'M 525 366 Q 532 363 538 360', width: 1, animD: 'M 520 363 Q 527 360 533 357' },
          { d: 'M 538 360 Q 544 357 550 354', width: 0.5, animD: 'M 533 357 Q 539 354 545 351' }
      ],
      // Third flagella
      [
          { d: 'M 405 395 Q 440 385 450 380', width: 4, animD: 'M 405 395 Q 435 382 445 377' },
          { d: 'M 450 380 Q 460 378 465 377', width: 3.5, animD: 'M 445 377 Q 455 375 460 374' },
          { d: 'M 465 377 Q 475 374 480 372', width: 3, animD: 'M 460 374 Q 470 371 475 369' },
          { d: 'M 480 372 Q 488 370 495 368', width: 2.5, animD: 'M 475 369 Q 483 367 490 365' },
          { d: 'M 495 368 Q 503 365 510 362', width: 2, animD: 'M 490 365 Q 498 362 505 359' },
          { d: 'M 510 362 Q 518 359 525 356', width: 1.5, animD: 'M 505 359 Q 513 356 520 353' },
          { d: 'M 525 356 Q 532 353 538 350', width: 1, animD: 'M 520 353 Q 527 350 533 347' },
          { d: 'M 538 350 Q 544 347 550 344', width: 0.5, animD: 'M 533 347 Q 539 344 545 341' }
      ],
      // Fourth flagella
      [
          { d: 'M 395 395 Q 425 405 435 410', width: 4, animD: 'M 395 395 Q 420 407 430 412' },
          { d: 'M 435 410 Q 440 412 445 415', width: 3.5, animD: 'M 430 412 Q 435 414 440 417' },
          { d: 'M 445 415 Q 450 418 455 421', width: 3, animD: 'M 440 417 Q 445 420 450 423' },
          { d: 'M 455 421 Q 460 424 465 427', width: 2.5, animD: 'M 450 423 Q 455 426 460 429' },
          { d: 'M 465 427 Q 470 430 475 433', width: 2, animD: 'M 460 429 Q 465 432 470 435' },
          { d: 'M 475 433 Q 480 436 485 439', width: 1.5, animD: 'M 470 435 Q 475 438 480 441' },
          { d: 'M 485 439 Q 490 442 495 445', width: 1, animD: 'M 480 441 Q 485 444 490 447' },
          { d: 'M 495 445 Q 500 448 505 451', width: 0.5, animD: 'M 490 447 Q 495 450 500 453' }
      ]
    ];
    // Loop through each flagella segments and add to the SVG
    let flagellaIDCounter = 2; // Counter starting at 2
    for (let segments of segmentsArray) {
      const FlagellaColor = getTendonColor();
        for (let segment of segments) {
            const part = document.createElementNS(svgNS, 'path');
            part.setAttribute('d', segment.d);
            part.setAttribute('stroke', FlagellaColor);
            part.setAttribute('stroke-width', segment.width.toString());
            part.setAttribute('fill', 'none');
            part.setAttribute('stroke-linecap', 'round');
            part.setAttribute('id', 'flagella-' + flagellaIDCounter); // Set the ID using the counter
            part.setAttribute("filter", "url(#wiggleOnly)");
            const animate = document.createElementNS(svgNS, 'animate');
            animate.setAttribute('attributeName', 'd');
            animate.setAttribute('values', `${segment.d};${segment.animD};${segment.d}`);
            animate.setAttribute('dur', '15s');
            animate.setAttribute('repeatCount', 'indefinite');
            part.appendChild(animate);
            if (cellSvg.firstChild) {
                cellSvg.insertBefore(part, cellSvg.firstChild);
            } else {
                cellSvg.appendChild(part);
            }
        }
    }
    revealProtozoidEvolutions(); // Reveal the first major evolution options
    navigationcost = 500; // decrease the costs for the player to navigate
}


const protozoidEvolutionTooltips = {
  "protowormEvolution": `
      <strong>Title: ProtoWorm</strong>
      <br>
      <b>Description:</b> In the silent depths of cellular mystery, you embrace the spiral of transformation, weaving the fabric of a new existence.
      <br>
      <b>Effect:</b> Embark on a sinuous journey, morphing into a <b>worm-like</b> entity, unlocking new pathways and alter your form permanently.
      <br>
      <b>Requirement:</b> 75K cells.`,
  "protopodEvolution": `
      <strong>Title: ProtoPod</strong>
      <br>
      <b>Description:</b> Beneath the ancient seas of time, your form shifts, echoing the enduring dance of primordial trilobites.
      <br>
      <b>Effect:</b> Transform into a <b>trilobite-like</b> entity, unveiling ancient secrets and reshaping your journey with the wisdom of epochs.
      <br>
      <b>Requirement:</b> 75K cells.`,
  "protocystEvolution": `
      <strong>Title: ProtoCyst</strong>
      <br>
      <b>Description:</b> In the silent depths of primordial waters, your essence unfolds, embracing the fluid dance of ancient jellyfish.
      <br>
      <b>Effect:</b> Morph into a <b>jellyfish-like</b> being, drifting through the currents of existence, revealing hidden paths and enlightening your odyssey with the grace of the deep.
      <br>
      <b>Requirement:</b> 75K cells.`,
  "protogradeEvolution": `
      <strong>Title: ProtoGrade</strong>
      <br>
      <b>Description:</b> In the hidden realms of the microscopic, you embrace resilience.
      <br>
      <b>Effect:</b> Evolve into a <b>tardigrade-like</b> form and reshape your existence with unparalleled fortitude.
      <br>
      <b>Requirement:</b> 75K cells.`,
};



function revealProtozoidEvolutions() {
  if (lophotrichousFlagellaUpgradePurchased && !evolvedToProtoWorm && !evolvedToProtoPod  && !evolvedToProtoCyst && !evolvedToProtoGrade) {
    ['protowormEvolution', 'protopodEvolution', 'protocystEvolution', 'protogradeEvolution'].forEach((buttonId) => {
      let button = document.getElementById(buttonId);
      button.style.display = "block";

      // Create tooltip container
      let tooltipContainer = document.createElement("div");
      tooltipContainer.className = "tooltip";

      // Create tooltip text
      let tooltipText = document.createElement("span");
      tooltipText.className = "tooltiptext";
      tooltipText.innerHTML = protozoidEvolutionTooltips[buttonId];
      
      // Wrap the button with the tooltip container
      button.parentNode.insertBefore(tooltipContainer, button);
      tooltipContainer.appendChild(button);
      tooltipContainer.appendChild(tooltipText);

      // Add tooltip positioning and visibility event listeners
      button.addEventListener('mousemove', () => {
        tooltipText.style.left = "120px";
        tooltipText.style.top = "60px";
      });

      button.addEventListener('mouseenter', () => {
        tooltipText.style.visibility = 'visible';
        tooltipText.style.opacity = '1';
      });

      button.addEventListener('mouseleave', () => {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.opacity = '0';
      });
      button.disabled = true;
    });
  }
}




// The below is used when protozoids are unlocked via solara upgrades
function enableProtozoidEvolutions() {
  // Check if 'Protozoid Evolutions' is included in 'ritualsPerformed'
  if (!ritualsPerformed.includes('Protozoid Evolutions')) {
    console.log('Protozoid Evolutions not yet performed. Exiting function.');
    return; // Exit the function if the condition is not met
  }
  // Check if any major evolutionary choice has already been made
  if (evolvedToProtoWorm || evolvedToProtoPod || evolvedToProtoCyst || evolvedToProtoGrade) {
    console.log('A major evolutionary choice has already been made. Exiting function.');
    return; // Exit the function if any evolutionary choice has been made
  }
  let protowormButton = document.getElementById("protowormEvolution");
  let protopodButton = document.getElementById("protopodEvolution");
  // Function to safely add event listeners
  function addEvolutionListener(button, evolutionFunction) {
    if (button) {
      // Remove existing listener to avoid duplicates
      button.removeEventListener('click', evolutionFunction);
      // Add new listener
      button.addEventListener('click', evolutionFunction);
      button.disabled = false; // Enable the button
    }
  }
  // Add listeners to both buttons
  addEvolutionListener(protowormButton, evolveToProtoWorm);
  addEvolutionListener(protopodButton, evolveToProtoPod);
}




// Evolve the single cell into a multi-cell early-worm-like being
function evolveToProtoWorm() {
    // Show the custom confirmation modal
    document.getElementById("confirmationModal").style.display = "block";
    document.getElementById("confirmEvolution").onclick = function() {
      // Close the modal
      document.getElementById("confirmationModal").style.display = "none";

      // Check if player has enough cellworkers
      if (cellworkers < 75000) {
          // Not enough cellworkers, flash the button red
          let protowormButton = document.getElementById("protowormEvolution");
          protowormButton.style.backgroundColor = "red";
          setTimeout(function() {
              protowormButton.style.backgroundColor = "";
          }, 300);
          return;
      }

      // Deduct the cellworkers cost
      cellworkers -= 75000;
      totalcellworkers -= 75000;

      // Proceed with the protoworm evolution
      let cellGroup = document.getElementById("cellGroup");
      let originalCell = document.getElementById("cell");
      let lastSegment = originalCell;  // Initialize the last segment to the original cell
      let lastRadius = 25;  // Radius of the original cell
      let lastX = 400;     // Starting X position of the original cell
      // We'll add 4 segments (excluding the original cell circle)
      for(let i = 1; i < 5; i++) {
        cellsegments++; // increment the cell segments counter
        let radius = 25 - (i * 3);      // Decrease size for each segment
        let segment = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // Adjust the position based on the size of the segment
        let gap;
        if (i === 1) { 
            gap = lastRadius - (i * 2);  // Closer gap for the first segment
        } else if (i === 2) {
            gap = lastRadius - (i + 0.5);  // Slightly further out for the second segment
        } else if (i === 3) {
            gap = (lastRadius + radius - (i * 5.5));  // Even closer gap for the third segment
        } else {
            gap = (lastRadius + radius - (i * 3.9));
        }
        let xPosition = lastX + gap;  // Adjust the gap between segments
        segment.setAttribute("cx", xPosition); 
        segment.setAttribute("cy", 400);
        segment.setAttribute("r", radius);
        segment.setAttribute("fill", "#888");
        segment.setAttribute("id", "protowormsegment-" + i);
        segment.setAttribute("stroke", "#444");
        segment.setAttribute("stroke-width", "1");
        segment.style.filter = "url(#glowWiggle)";
        // Insert the segment just before the last segment that was added
        cellGroup.insertBefore(segment, lastSegment);
        lastSegment = segment;  // Update the last segment to the current one for the next iteration
        lastRadius = radius;    // Update the last radius for the next iteration
        lastX = xPosition;      // Update the last X position for the next iteration
      }
      document.getElementById("protowormEvolution").style.display = 'none'; // Hide the protoworm evolve button
      document.getElementById("protopodEvolution").style.display = "none";
      document.getElementById("protocystEvolution").style.display = "none";
      document.getElementById("protogradeEvolution").style.display = "none";
      evolvedToProtoWorm = true;
      updateActionButtonsBasedOnEvolution(); // replaces wiggle with desired new functionality
      // call glow to reduce glow
      glow();
      unlockAchievement(8);
    }
    document.getElementById("cancelEvolution").onclick = function() {
        // Close the modal without doing anything
        document.getElementById("confirmationModal").style.display = "none";
    }
}



// Evolve the single cell into a Protopod, an early-arthropod sort of being
function evolveToProtoPod() {
    // Show the custom confirmation modal
    document.getElementById("confirmationModal").style.display = "block";
    document.getElementById("confirmEvolution").onclick = function() {
        // Check if player has enough cellworkers
        if (cellworkers < 75000) {
            // Not enough cellworkers, flash the button red
            let protopodButton = document.getElementById("protopodEvolution");
            protopodButton.style.backgroundColor = "red";
            setTimeout(function() {
                protopodButton.style.backgroundColor = "";
            }, 300);
            document.getElementById("confirmationModal").style.display = "none";
            return;
        }

        // Deduct the cellworkers cost
        cellworkers -= 75000;
        totalcellworkers -= 75000;

        // Close the modal
        document.getElementById("confirmationModal").style.display = "none";

        // Proceed with the protopod evolution
        let cellGroup = document.getElementById("cellGroup");
        let originalCell = document.getElementById("cell");
        // Add one cell segment to the right of the original cell
        let newSegmentRadius = 22; // Slightly smaller than original cell
        // Adjust the new segment to be an ellipse (egg shape) and 25% larger
        let newSegmentWidth = 25 * 1.25; // 25% larger than original cell's width
        let newSegmentHeight = 22; // Original height
        let newSegment = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        newSegment.setAttribute("cx", 400 + 25 + newSegmentWidth - 15); 
        newSegment.setAttribute("cy", 400);
        newSegment.setAttribute("rx", newSegmentWidth);
        newSegment.setAttribute("ry", newSegmentHeight);
        newSegment.setAttribute("fill", "#888");
        newSegment.setAttribute("id", "protopodsegment");
        newSegment.setAttribute("stroke", "#444");
        newSegment.setAttribute("stroke-width", "1");
        newSegment.style.filter = "url(#glowWiggle)";
        cellGroup.insertBefore(newSegment, originalCell); // Insert it below the original cell
        cellsegments++; // One additional segment
        // Function to add limbs to a segment
        function addLimbsToSegment(x, y, isOriginalCell = false) {
          let limbLength = isOriginalCell ? 90 : 77; // Increased length for original cell limbs
          let idOffset = isOriginalCell ? 0 : 4;
          // Add four limbs (2 on top and 2 at the bottom)
          for (let i = 0; i < 4; i++) {
            let limbId = i + idOffset; // determine a unique ID for the limb
            // Check if it's the first top or bottom limb, and adjust the starting x value
            let startX = x;
            if (i === 0 || i === 2) {
                startX -= 15; // Start 15 pixels further to the left
            }
            let curveDirection;
            let endX, endY;
            if (i === 0 || i === 1) {  // Top limbs
                curveDirection = -1;  // Curve upwards
                endX = x + limbLength;
                endY = y - (i === 0 ? limbLength * 0.6 : limbLength * 0.8);
            } else {  // Bottom limbs
                curveDirection = 1;  // Curve downwards
                endX = x + limbLength;
                endY = y + (i === 2 ? limbLength * 0.6 : limbLength * 0.8);
            }
            let controlPointX = x + limbLength / (isOriginalCell ? 2 : 2.5); // Reduced curvature for original cell limbs
            let controlPointY = y + curveDirection * limbLength / (i < 2 ? 1.2 : 1.5);  // Adjust the control point for the Bezier curve
            protoPodLimbsInfo.push({ // track limb data for various usages
              startX: startX,
              startY: y,
              controlPointX: controlPointX,
              controlPointY: controlPointY,
              endX: endX,
              endY: endY,
              originalEndX: endX,  // capture original endX
              originalEndY: endY,  // capture original endY
              id: "protopod-protopodlimb-" + limbId,
              outlineId: "protopod-protopodlimb-outline-" + limbId
            });
            // Function to create a limb path
            function createLimbPath(strokeColor, strokeWidth, id) {
              let limb = document.createElementNS("http://www.w3.org/2000/svg", "path");
              limb.setAttribute("d", `M${startX} ${y} Q${controlPointX} ${controlPointY}, ${endX} ${endY}`);
              limb.setAttribute("fill", "none");
              limb.setAttribute("stroke", strokeColor);
              limb.setAttribute("stroke-width", strokeWidth);
              limb.setAttribute("id", "protopod-"+id);
              limb.style.filter = "url(#wiggleOnly)";
              return limb;
            }
            // Create and append the outline of the limb (black, 4px wide)
            let outlineLimb = createLimbPath("#444", "4", "protopodlimb-outline-" + limbId);
            cellGroup.insertBefore(outlineLimb, cellGroup.firstChild);
            // Create and append the actual limb (grey, 2-3px wide)
            let actualLimb = createLimbPath("#888", "2", "protopodlimb-" + limbId); // You can change the width to 3 if desired
            cellGroup.appendChild(actualLimb);
          }
        }
        // Add limbs to the original cell
        addLimbsToSegment(400, 400, true);
        // Add limbs to the new segment
        addLimbsToSegment(400 + 25 + newSegmentRadius - 10, 400);
        glow(); // reduces overall glow
        removeFlagella(); // Protopods don't have flagelle :(
        document.getElementById("protopodEvolution").style.display = 'none'; // Hide the protopod evolve button
        document.getElementById("protowormEvolution").style.display = "none"; // Remove the protoworm evolution option
        document.getElementById("protocystEvolution").style.display = "none";
        document.getElementById("protogradeEvolution").style.display = "none";
        evolvedToProtoPod = true;
        updateActionButtonsBasedOnEvolution(); // replaces wiggle with desired new functionality
        var tendonContainerSvg = document.getElementById('container');
        tendonContainerSvg.style.transform = 'rotate(90deg)';
        currentRotationCell = 90; 
        unlockAchievement(22);
    }
    document.getElementById("cancelEvolution").onclick = function() {
        // Close the modal without doing anything
        document.getElementById("confirmationModal").style.display = "none";
    }

}


function resetLimbPositions() { // used to reset limb positions back to origin
  // Check if the player is a Protopod and if limb data is available
  if (evolvedToProtoPod && protoPodLimbsInfo.length > 0) {
    protoPodLimbsInfo.forEach((limbInfo) => {
      // Reset endX and endY to their original values
      limbInfo.endX = limbInfo.originalEndX;
      limbInfo.endY = limbInfo.originalEndY;
      // Update the SVG path to reflect the reset positions
      let limb = document.getElementById(limbInfo.id);
      let outlineLimb = document.getElementById(limbInfo.outlineId);
      if (limb && outlineLimb) {
        let newPath = `M${limbInfo.startX} ${limbInfo.startY} Q${limbInfo.controlPointX} ${limbInfo.controlPointY}, ${limbInfo.endX} ${limbInfo.endY}`;
        limb.setAttribute("d", newPath);
        outlineLimb.setAttribute("d", newPath);
      }
    });
  }
  // Insert code for resetting limbs of other evolutions here when they are added
}



function updateActionButtonsBasedOnEvolution() {
  if (evolvedToProtoPod) {
    // Remove wiggle button and add crawl button if not already present
    removeWiggleButton();
    if (!document.getElementById("crawlButton")) {
      addCrawlButton();
    }
  } else if (evolvedToProtoWorm) {
    // Remove wiggle button and add slither button if not already present
    removeWiggleButton();
    if (!document.getElementById("slitherButton")) {
      addSlitherButton();
    }
  } else {
    // TBD, future evolutions etc.
  }
}





function removeFlagella() {
    // Loop through the flagella IDs and remove each element
    for (let i = 1; i <= 4; i++) {
        let flagella = document.querySelectorAll(`[id^=flagella-${i}]`);
        flagella.forEach(element => {
            element.remove();
        });
    }
}


function tendonOnClick() {
  let canAfford = false;

  // For tendons 1-5
  if (tendons < 5) {
    canAfford = nourishment >= tendonCosts[tendons];
    if (canAfford) {
      nourishment -= tendonCosts[tendons];
    }
  } 
  // For tendons 6-10
  else if (tendons >= 5 && tendons < 10) {
    const cost = {
      nourishment: 5000 * Math.pow(2, tendons - 5),
      warmth: 3500 * Math.pow(2, tendons - 5),
      energy: 2500 * Math.pow(2, tendons - 5)
    };
    canAfford = nourishment >= cost.nourishment && warmth >= cost.warmth && energy >= cost.energy;
    if (canAfford) {
      nourishment -= cost.nourishment;
      warmth -= cost.warmth;
      energy -= cost.energy;
    }
  }

  if (canAfford) {
    tendons++;
    addTendon();
    firstTendonGrown = true;
    updateStory("tendon"); // Update story
    updateResources();     // Refresh resources UI
    document.getElementById('tendon').style.display = 'block';
    nourishmentRate += 0.03;
    informationRate += 0;
    warmthRate += 0;
    energyRate += 0;

    if (tendons == 1) {
      updateStory("tendon");
      unlockAchievement(9);
    } else if (tendons == 5) {
      unlockAchievement(10);
      showFifthTendonSoulModal();
      checkSoulModalsAndUnlock();
    } else if (tendons == 10) {
      unlockAchievement(28);
      removeTendonSwayAnimation(); // no more tendon sway
    }

    // Update button text for next tendon
    if (tendons < 5) {
      document.getElementById("tendonButton").innerHTML = `Grow Tendon (${tendonCosts[tendons]}n)`;
    } else if (tendons < 10) {
      const nextCost = {
        nourishment: 5000 * Math.pow(2, tendons - 5),
        warmth: 3500 * Math.pow(2, tendons - 5),
        energy: 2500 * Math.pow(2, tendons - 5)
      };
      document.getElementById("tendonButton").innerHTML = `Grow Tendon (${nextCost.nourishment}n ${nextCost.warmth}w ${nextCost.energy}e)`;
    } else {
      // If all tendons have been purchased, hide the button
      document.getElementById("tendonButton").style.display = 'none';
    }
  }

  // Check if research tab should be unlocked
  checkResearchTabUnlock();
}



function applySensorUpgrades() {
    if (spikesUpgradePurchased) {
        addSpikes();
    }
    if (suctionCupsUpgradePurchased) {
        addSuctionCups();
    }
    if (featheredAntennaUpgradePurchased) {
        addFeatheredAntenna();
    }
}




function showFifthTendonSoulModal() {
    if (tendons === 5 && !shownSoulModals.includes('soulModal_3')) {
        var prompt = "Your tendrils reach out, brushing against the boundaries of your existence. Each new addition is a fragment of possibility, a question unanswered. What does your form say about your fate?";
        var choices = [
            {trait: 'Loneliness', line: 'You feel confined, each new tendril a string that ties you to solitude.', increment: 6},
            {trait: 'Empathy', line: 'You see these appendages as instruments of touch, feeling the heartbeats of a lifeless world.', increment: 6},
            {trait: 'Resilience', line: 'You feel your form harden, each new tendril a fortification against the relentless emptiness.', increment: 6},
            {trait: 'Curiosity', line: 'You quiver in anticipation, eager to explore new textures and horizons.', increment: 6},
            {trait: 'Optimism', line: 'You sense a glimmering pathway opening, a bright tunnel amid perpetual shadow.', increment: 6},
            {trait: 'Anger', line: 'You bristle with each new addition, a growing storm against the cosmos.', increment: 6}
        ];
        showSoulModal(prompt, choices);
        unlockAchievement(33);  // This is the achievement ID for reaching this soul modal
        shownSoulModals.push('soulModal_3'); // Add the ID to the array to prevent re-displaying
    }
}


// Function to remove a specified number of tendons
function removeTendons(numToRemove) {
  // Check the number of existing tendons
  if (tendons <= 0) {
    console.log("No tendons to remove.");
    return;
  }
  // Make sure not to exceed the number of available tendons
  numToRemove = Math.min(numToRemove, tendons);
  // Create an array of all existing tendons
  var tendonArray = [];
  for (var i = 0; i < tendons; i++) {
    tendonArray.push(document.getElementById("tendon-" + i));
  }
  // Remove the selected number of tendons
  for (var i = 0; i < numToRemove; i++) {
    // Select a random index from the existing tendons
    var randomIndex = Math.floor(Math.random() * tendonArray.length);
    // Get the tendon to remove
    var tendonToRemove = tendonArray[randomIndex];
    if (tendonToRemove) {
      // Construct the corresponding sensor group ID
      var sensorGroupId = "sensor" + (parseInt(tendonToRemove.id.split("-")[1]) - 1);
      // Get the corresponding sensor group
      var sensorGroupToRemove = document.getElementById(sensorGroupId);
      // Remove the sensor group if found
      if (sensorGroupToRemove) {
        sensorGroupToRemove.parentNode.removeChild(sensorGroupToRemove);
      }
      // Remove the tendon from the SVG
      tendonToRemove.parentNode.removeChild(tendonToRemove);
      // Decrement the global tendons variable
      tendons--;
      // Remove the tendon from the array to avoid trying to remove it again
      tendonArray.splice(randomIndex, 1);
    }
  }
  document.getElementById('tendonButton').style.display = 'block'; // ensure the tendon purchase button is back available
  if (tendons < 5) {
    document.getElementById("tendonButton").innerHTML = `Grow Tendon (${tendonCosts[tendons]}n)`;
  }
}





function glow() {
    if (warmth > 0) {
        var cell = document.getElementById("cell");
        var blurFilter = document.getElementById("blurFilter");
        var floodColor = document.getElementById("floodColor");
        cell.style.filter = "url(#glowWiggle)"; // apply the glow filter to the cell
        var glowRadius;
        if (typeof glowColor === 'undefined') {
            glowColor = getContrastTendonColor();
        }
        if (evolvedToProtoWorm || evolvedToProtoPod) {
            glowRadius = 3; // Reduced glow after evolution
        } else {
            if (radiatorUpgradePurchased) {
                glowRadius = Math.min(warmth, 11); // bigger glow for those with radiator upgrade purchased
                floodColor.setAttribute("flood-color", glowColor);
            } else {
                glowRadius = Math.min(warmth, 10); // limit the maximum glow radius to 10 if the radiators are not yet purchased
            }
        }
        // adjust the blur radius based on the warmth
        blurFilter.setAttribute("stdDeviation", glowRadius); // adjust the blur radius based on the warmth
    }
}



// Function to emit an echo...
function emitEcho() {
    console.log("Echo function triggered!");  // Added this for debugging
    var currentEchoCost = baseEchoCost * Math.pow(echoUses + 1, growthExponent); // +1 since we're calculating for the next use
    // Check if the player has enough energy
    if (energy >= currentEchoCost) {
        energy -= currentEchoCost; // Deduct the energy cost
        echoUses++; // Increment the usage count
        // Create the echo wave
        var svg = document.getElementById('tendon');
        var echoWave = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        echoWave.setAttribute('cx', 400);
        echoWave.setAttribute('cy', 400);
        echoWave.setAttribute('r', 25);  // Starting at the cell's radius
        echoWave.setAttribute('fill', 'transparent');
        echoWave.setAttribute('stroke', '#00FFFF');  // A light blue color for the echo wave
        echoWave.setAttribute('stroke-opacity', '0.8');
        echoWave.setAttribute('stroke-width', '2');
        echoWave.setAttribute('id', 'echowave'); // for cleanup use on game load
        svg.appendChild(echoWave);
        // Animate the echo wave to expand and fade out
        var animateRadius = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateRadius.setAttribute('attributeName', 'r');
        animateRadius.setAttribute('begin', 'indefinite');
        animateRadius.setAttribute('fill', 'freeze');
        animateRadius.setAttribute('from', '25');
        animateRadius.setAttribute('to', '200');
        animateRadius.setAttribute('dur', '5s');
        echoWave.appendChild(animateRadius);
        var animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'stroke-opacity');
        animateOpacity.setAttribute('begin', 'indefinite');
        animateOpacity.setAttribute('fill', 'freeze');
        animateOpacity.setAttribute('from', '0.8');
        animateOpacity.setAttribute('to', '0');
        animateOpacity.setAttribute('dur', '5s');
        echoWave.appendChild(animateOpacity);
        animateRadius.beginElement();
        animateOpacity.beginElement();
        // Remove the echo wave after animation
        setTimeout(function() {
            svg.removeChild(echoWave);
        }, 5000);
        // Generate the returning echo wave, starting from the second echo use
        if (echoUses > 2) {
            // Delay the start of the returning wave until the outgoing wave has finished expanding
            setTimeout(function() {
                // Create the returning echo wave
                var returnWave = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                returnWave.setAttribute('cx', 400);
                returnWave.setAttribute('cy', 400);
                returnWave.setAttribute('r', 200);  // Starting at the outgoing wave's final radius
                returnWave.setAttribute('fill', 'transparent');
                returnWave.setAttribute('stroke', '#00FFFF');  // Same color as the outgoing wave
                returnWave.setAttribute('id', 'echowave'); // for cleanup use on game load
                // Increase the opacity with each echo, up to the 10th echo
                var opacity = Math.min(echoUses / 10, 1);
                returnWave.setAttribute('stroke-opacity', opacity.toString());
                returnWave.setAttribute('stroke-width', '2');
                svg.appendChild(returnWave);
                // Animate the returning echo wave to shrink and fade in
                var animateReturnRadius = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                animateReturnRadius.setAttribute('attributeName', 'r');
                animateReturnRadius.setAttribute('begin', 'indefinite');
                animateReturnRadius.setAttribute('fill', 'freeze');
                animateReturnRadius.setAttribute('from', '200');
                animateReturnRadius.setAttribute('to', '25');  // Shrink to the cell's radius
                animateReturnRadius.setAttribute('dur', '5s');
                returnWave.appendChild(animateReturnRadius);
                var animateReturnOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                animateReturnOpacity.setAttribute('attributeName', 'stroke-opacity');
                animateReturnOpacity.setAttribute('begin', 'indefinite');
                animateReturnOpacity.setAttribute('fill', 'freeze');
                animateReturnOpacity.setAttribute('from', opacity.toString());
                animateReturnOpacity.setAttribute('to', '0');  // Fade out
                animateReturnOpacity.setAttribute('dur', '5s');
                returnWave.appendChild(animateReturnOpacity);
                animateReturnRadius.beginElement();
                animateReturnOpacity.beginElement();
                // Remove the returning echo wave after animation
                setTimeout(function() {
                    svg.removeChild(returnWave);
                }, 5000);
            }, 5000);
        }
        // Progress the story
        switch(echoUses) {
            case 1:
                displayOnChat("The echo resonates outward, but silence is all that returns.");
                displayOnChat("Perhaps a stronger echo might receive a response?", "hint");
                document.getElementById("echoButton").disabled = true; // Disable the echo button until the echo chambers upgrade
                playEchoSound(0.1,0);
                break;
            case 2:
                displayOnChat("With renewed determination and a little more energy, you call out again. Your echo travels farther, but the return is still just silence.");
                displayOnChat("Increasing the echo's power might provide clarity.", "hint");
                document.getElementById("echoButton").disabled = true; // Disable the echo button until the resonance tendrils upgrade
                playEchoSound(0.3,0);
                break;
            case 3:
                displayOnChat("A new sensation - a faint stirring, a gentle rebound. Is it just an illusion, or... could it be a response?");
                displayOnChat("Is there something out there? Enhancing resonance tendrils might help discern distant signals.", "hint");
                document.getElementById("echoButton").disabled = true; // Disable the echo button until the sensory pulsars upgrade
                playEchoSound(0.3,0.3);
                break;
            case 4:
                displayOnChat("The response is louder now. You can almost make out patterns in the echoes.");
                playEchoSound(0.6,0.6);
                break;
            case 5:
                displayOnChat("Adjusting your echo, you try once again to communicate using the patterns deciphered. Yet the response remains the same.");
                displayOnChat("The environment might be playing tricks. Understand it better.", "hint");
                playEchoSound(0.8,0.8);
                break;
            case 6:
                displayOnChat("With each echo, there's a haunting familiarity. Yet a subtle variation in the response intrigues you.");
                playEchoSound(1,1);
                break;
            case 7:
                displayOnChat("You mimic the new patterns. The ensuing silence is palpable.");
                playEchoSound(1.2,1.2);
                if (echoUses === 7 && !shownSoulModals.includes('soulModal_2')) {
                  var prompt = "You mimic the new patterns, casting your essence into the abyss. The ensuing silence is a mirror, throwing back a distorted version of you. Who are you in this echo chamber of existence?";
                  var choices = [
                      {trait: 'Loneliness', line: 'You feel a cavernous emptiness, each echo a reminder of your isolation.', increment: 7},
                      {trait: 'Empathy', line: 'You resonate with the stillness, a shared ache with the universe.', increment: 7},
                      {trait: 'Resilience', line: 'You feel the fibers of your being tighten, preparing you for the eternal struggle ahead.', increment: 7},
                      {trait: 'Curiosity', line: 'You ponder the disquieting quiet, desperate to understand its subtle reverberations.', increment: 7},
                      {trait: 'Optimism', line: 'You feel a hesitant cheer, like a firefly flickering in the abyss.', increment: 7},
                      {trait: 'Anger', line: 'You feel a seething silence, as if the void itself has betrayed you.', increment: 7}
                  ];
                  showSoulModal(prompt, choices);
                  shownSoulModals.push('soulModal_2'); // Add the ID to the array to prevent re-displaying
                }
                break;
            case 8:
                displayOnChat("An idea forms. You start using its echoes not to communicate, but to map your surroundings.");
                enableViewSwitchIfAppropriate();
                playEchoSound(1.3,1.3);
                unlockAchievement(1); 
                createTerraformingResearchButton();
                break;
            case 9:
                displayOnChat("Through countless echoes, you gain a deep understanding of your environment. Each reflection carries information, each silence tells a tale.");
                playEchoSound(1.4,1.4);
                break;
            case 10:
                displayOnChat("The solitude remains, but with it comes clarity.");
                playEchoSound(1.6,1.6);
                document.getElementById("echoButton").style.display = 'none'; // remove the button once the final echo is used
                break;
              }
              startNewParagraph = true; // make sure the next lines becomes a new paragraph following the echo story
    } else {
        // If the player does not have enough resources, turn the button red briefly
        var echoButton = document.getElementById("echoButton");
        echoButton.style.backgroundColor = "red";
        setTimeout(function() {
            echoButton.style.backgroundColor = "";
        }, 300);
    }
}


function enableEchoButton() {
    if ((spikesUpgradePurchased || suctionCupsUpgradePurchased || featheredAntennaUpgradePurchased) && echoUses < 10) {
        const echoButton = document.getElementById("echoButton");
        echoButton.style.display = "block";
        echoButton.addEventListener('click', emitEcho);
    }
}


function enableViewSwitchIfAppropriate() { // enables the ability to switch between Cell/Map/Cave when appropriate
  console.log("switch view if appropriate is called. echo uses are at:"+echoUses);
  if (echoUses >= 8) {
    document.getElementById('viewButtons').style.display = 'flex';
    document.getElementById("cellViewButton").disabled = false;
    document.getElementById("discoveryViewButton").disabled = false;
    // If the ice cave has been discovered & analysed, show and enable the cave view button
    if (icecaveDiscovered === true) {
      document.getElementById("caveViewButton").style.display = 'inline-block'; // Show the button
      document.getElementById("caveViewButton").disabled = false; // Enable the button
    }
  }
}


// Function for endosymbiotic evolutions
function performEndosymbioticEvolution(evolutionType) {
  console.log(`Endosymbiotic evolution performed: ${evolutionType}`);
  endosymbiosisPerformed = true; // Update Global Variable
  renameCellViewButton();
  // Build the button ID and hide the button
  const buttonId = evolutionType.replace(/\s+/g, '') + 'Button';
  const evolutionButton = document.getElementById(buttonId);
  if (evolutionButton) {
    evolutionButton.style.display = 'none';
  }
  // Check for specific evolution type and load the appropriate image and setup
  if (evolutionType === 'Trilactic Cactolith') {
    var tendonContainerSvg = document.getElementById('container');
    tendonContainerSvg.style.transform = 'rotate(0deg)';
    currentRotationCell = 0; 
    loadTrilacticCactolith();
  } else if (evolutionType === 'Cactolith Serpent') {
    var tendonContainerSvg = document.getElementById('container');
    tendonContainerSvg.style.transform = 'rotate(0deg)';
    currentRotationCell = 0;
    loadCactolithSerpent();
  }
}


function renameCellViewButton() {
  // Check if endosymbiosis has been performed
  if (endosymbiosisPerformed) {
    var cellViewButton = document.getElementById('cellViewButton');
    if (cellViewButton) {
      cellViewButton.textContent = 'Entity View';
    }
  }
}


const endosymbiosisEvolutionTooltips = {
  "CactolithSerpent": `
      <strong>Title: Cactolith Serpent</strong>
      <br>
      <b>Description:</b> As the essence of Solara fuses with your sinuous form, you become a serpentine herald of the desert's whispers.
      <br>
      <b>Effect:</b> Transform into the Cactolith Serpent, a being of resilience and wisdom, navigating the sands of time with newfound purpose.`,
  "TrilacticCactolith": `
      <strong>Title: Trilactic Cactolith</strong>
      <br>
      <b>Description:</b> Your ancient trilobite spirit merges with Solara's stoic endurance, forging a creature of enduring tenacity.
      <br>
      <b>Effect:</b> Evolve into the Trilactic Cactolith, a testament to survival and adaptation in an ever-changing world.`,
  // Add similar entries for ProtoCyst and Protograde evolutions when defined
};


function loadTrilacticCactolith() {
  // Step 1: Remove the old cell (SVG element with id "tendon")
  const tendonSvg = document.getElementById('tendon');
  if (tendonSvg) {
    tendonSvg.parentNode.removeChild(tendonSvg);
  }
  // Step 2: Load and display the image inside the container div
  const containerDiv = document.getElementById('container');
  if (containerDiv) {
    const imageElement = document.createElement('img');
    imageElement.src = 'img/endosymb_protopod.png'; // Path to your image
    imageElement.style.border = '1px solid black'; // 1px black border
    imageElement.style.width = '350px'; // Set width to 250px
    imageElement.style.height = '350px'; // Set height to 250px
    imageElement.alt = 'Trilactic Cactolith'; // Alt text for accessibility
    // Disable right-click context menu on the image
    imageElement.addEventListener('contextmenu', (e) => e.preventDefault());
    // Prevent default drag behavior
    imageElement.addEventListener('dragstart', (e) => e.preventDefault());
    containerDiv.appendChild(imageElement);
    makeElementDraggable(imageElement, containerDiv); // adds draggability
  }
  endosymbiosisType = 'TrilacticCactolith';
}

function loadCactolithSerpent() {
  // Step 1: Remove the old cell (SVG element with id "tendon")
  const tendonSvg = document.getElementById('tendon');
  if (tendonSvg) {
    tendonSvg.parentNode.removeChild(tendonSvg);
  }
  // Step 2: Load and display the image inside the container div
  const containerDiv = document.getElementById('container');
  if (containerDiv) {
    const imageElement = document.createElement('img');
    imageElement.src = 'img/endosymb_protoworm.png'; // Path to the 'CactolithSerpent' image
    imageElement.style.border = '1px solid black'; // 1px black border
    imageElement.style.width = '350px'; // Set width
    imageElement.style.height = '350px'; // Set height
    imageElement.alt = 'Cactolith Serpent'; // Alt text for accessibility
    // Disable right-click context menu on the image
    imageElement.addEventListener('contextmenu', (e) => e.preventDefault());
    // Prevent default drag behavior
    imageElement.addEventListener('dragstart', (e) => e.preventDefault());
    containerDiv.appendChild(imageElement);
    makeElementDraggable(imageElement, containerDiv); // Adds draggability
  }
  endosymbiosisType = 'CactolithSerpent';
}
