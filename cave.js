

class Digger {
  static highwayColors = globalHighwayColors;
  static adjacentOffsets = [
      [-1, 0], [1, 0], [0, -1], [0, 1], 
      [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];
  constructor(x, y, ctx) {
    if (activeDiggers >= maxActiveDiggers) {
      return;
    }
    activeDiggers++;
    this.x = x;
    this.y = y;
    this.originX = 500; // default origin, can change once highways are in place
    this.originY = 500; 
    this.ctx = ctx;
    this.previousColor = '#333';  // Initialize with starting color
    this.lifeSpan = caveDiggerLifespan;  // Initialize lifespan from global variable
    this.isActive = true;
    this.move();
    // Resetting the current pixel color to the digger's color
    this.ctx.fillStyle = '#66FF00';
    this.ctx.fillRect(this.x, this.y, 1, 1);
    this.id = diggerIDCounter++;  // Assign a unique ID to the digger
    activeDiggerPositions[this.id] = { x: this.x, y: this.y, color: this.previousColor };
    this.breadcrumbs = [];  // Stack to keep track of the digger's path
    this.nonExcavationCount = 0; // Initialize the non-excavation counter
    this.target = null;
    this.echolocationTarget = null;
    this.randomMoveCount = this.getRandomMoveCount(); // Initialize random move count
  }

  getRandomMoveCount() {
        // This bit helps ensure we don't over-frequent calls to echolocation
        // this isn't actually how we improve performance of echolocation!
        // echolocation performance is improved by setting a target in this.echolocationTarget, whereas 
        // previously I made the mistake of checking for a target with every single digger movement
        // The below just ensures we have a random couple of moves after reaching a target before we resort back to echolocation again
        return Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Random number between 10 and 20
  }

  handlePheromonesLogic() {
      this.breadcrumbs.push([this.x, this.y]);
      let currentIndex = this.breadcrumbs.length - 1;
      for (let i = 0; i < currentIndex; i++) {
          if (this.breadcrumbs[i][0] === this.x && this.breadcrumbs[i][1] === this.y) {
              this.breadcrumbs.splice(i + 1, currentIndex - i - 1);
              break;
          }
      }
  }

  handleSpecialTiles() {
    let newKey = `${this.x},${this.y}`;
    if (Digger.highwayColors.includes(this.ctx.fillStyle) || highwayOutlineCoordinates.has(newKey)) {
        this.lifeSpan = caveDiggerLifespan;
        this.originX = this.x;
        this.originY = this.y;
        this.breadcrumbs = [];
        if (highwayOutlineCoordinates.has(newKey)) {
            //console.log('highway encountered');
            checkForPulse(this.x, this.y);
        }
      }
  }

  pickAndSetNewDirection() {
      const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      let dx = 0, dy = 0;
      if (echolocationResearchCompleted && this.nonExcavationCount >= 15 && this.randomMoveCount <= 0) {
          if (!this.echolocationTarget || (this.x === this.echolocationTarget[0] && this.y === this.echolocationTarget[1])) {
              this.echolocationTarget = this.initiateEcholocation(); // Get new target
          }
          dx = Math.sign(this.echolocationTarget[0] - this.x);
          dy = Math.sign(this.echolocationTarget[1] - this.y);
      } else {
          // Random movement
          [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
          this.randomMoveCount--;

          // Reset randomMoveCount and echolocation target when randomMoveCount reaches zero
          if (this.randomMoveCount < 0) {
              this.randomMoveCount = this.getRandomMoveCount();
              this.echolocationTarget = null;
          }
      }
      // Update position with boundary check
      this.x = Math.max(0, Math.min(this.x + dx, 999));
      this.y = Math.max(0, Math.min(this.y + dy, 999));
      // Reset target if reached
      if (this.echolocationTarget && this.x === this.echolocationTarget[0] && this.y === this.echolocationTarget[1]) {
          this.echolocationTarget = null;
          this.nonExcavationCount = 0;
      }
  }



  handleTileExcavation() {
      let newKey = `${this.x},${this.y}`;
      let visits = caveVisitedPixels.get(newKey) || 0;
      if (visits < 3) {
          caveExcavationProgress++;
          caveVisitedPixels.set(newKey, visits + 1);
          if (visits + 1 === 3) {
              fullyExcavatedPixels.add(newKey);
          }
          this.lifeSpan--;
          this.nonExcavationCount = 0; // Reset the counter as there was an excavation
      } else {
          this.nonExcavationCount++;  // Increment the counter as there was no excavation
      }
      this.ctx.fillStyle = ['#333', '#555', '#AAA', '#ADD8E6'][visits];
      this.ctx.fillRect(this.x, this.y, 1, 1);
  }


  handleLifeSpanOrWarmthEnd() {
    clearInterval(this.moveIntervalId);
    this.returnToOrigin();
  }

  setPreviousColorBasedOnVisits(currentKey, prevX, prevY) {
      let currentVisits = caveVisitedPixels.get(currentKey) || 0;
      this.previousColor = ['#333', '#555', '#AAA', '#ADD8E6'][currentVisits];
      if (highwayOutlineCoordinates.has(currentKey) || Digger.highwayColors.includes(this.ctx.fillStyle)) {
          this.previousColor = '#DAFF02';
      }
      this.ctx.fillStyle = this.previousColor;
      this.ctx.fillRect(prevX, prevY, 1, 1);
  }


 move() {
      this.moveIntervalId = setInterval(() => {
          if (this.lifeSpan <= 0) {
              this.handleLifeSpanOrWarmthEnd();
              return;
          }
          let prevX = this.x;
          let prevY = this.y;
          let currentKey = `${prevX},${prevY}`;
          this.setPreviousColorBasedOnVisits(currentKey, prevX, prevY);
          this.pickAndSetNewDirection();
          // Double-check to ensure the digger is within bounds
          this.x = Math.min(Math.max(this.x, 0), 999);
          this.y = Math.min(Math.max(this.y, 0), 999);
          this.handleTileExcavation();
          // Set the current pixel color to the digger's color
          this.ctx.fillStyle = '#66FF00';  // Digger's color
          this.ctx.fillRect(this.x, this.y, 1, 1); // Update canvas
          this.handleSpecialTiles();
          this.handlePheromonesLogic();
          activeDiggerPositions[this.id] = { x: this.x, y: this.y, color: this.previousColor };
      }, 300);
  }

  // Method to move digger back to origin and reset lifespan
  returnToOrigin() {
    if (trailRecognitionResearchCompleted) {
      this.optimizeTrail();
    }
    let returnInterval = setInterval(() => {
      
      if (this.x === this.originX && this.y === this.originY || highwayOutlineCoordinates.has(`${this.x},${this.y}`)) {
        clearInterval(returnInterval);
        this.lifeSpan = caveDiggerLifespan;
        this.originX = this.x;
        this.originY = this.y;
        this.breadcrumbs = [];
        this.move();
        return;
      }

      // Set current tile back to its proper color
      let currentKey = `${this.x},${this.y}`;
      let currentVisits = caveVisitedPixels.get(currentKey) || 0;
      this.ctx.fillStyle = ['#333', '#555', '#AAA', '#ADD8E6'][currentVisits];
      this.ctx.fillRect(this.x, this.y, 1, 1);

      if (pheromoneTrailsResearchCompleted && this.breadcrumbs.length > 0) {
        // Use breadcrumbs to retrace steps
        let [nextX, nextY] = this.breadcrumbs.pop(); // Get the last coordinate and remove it from breadcrumbs
        this.x = nextX;
        this.y = nextY;
      } else {
        // Use the previous logic if pheromone research is not completed or breadcrumbs are empty
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const validDirections = directions.filter(([dx, dy]) => {
          const testX = this.x + dx;
          const testY = this.y + dy;
          const testKey = `${testX},${testY}`;
          const testVisits = caveVisitedPixels.get(testKey);
          return testVisits !== undefined;
        });

        if (validDirections.length > 0) {
          // Pick a valid direction
          let [dx, dy] = validDirections[Math.floor(Math.random() * validDirections.length)];
          this.x += dx;
          this.y += dy;
        }
      }

      // Draw the digger with its current color
      this.ctx.fillStyle = '#F72105'; // Or '#00ff44' if you still want to make it bright green when returning
      this.ctx.fillRect(this.x, this.y, 1, 1);
    }, 300);
    this.returnIntervalId = returnInterval;  // Save the interval ID
  }


  despawn() {
    if (!this.ctx) {
      console.warn("Despawning failed: ctx is undefined");
      console.warn("Current Digger State: ", this);
    }
    if (this.ctx) {  // Check if ctx exists
        this.ctx.fillStyle = this.previousColor;
        this.ctx.fillRect(this.x, this.y, 1, 1);
    } else {
        console.warn("Despawning failed: ctx is undefined");
    }
    this.lifeSpan = 0;  // This will stop its movement
    this.isActive = false; 
    activeDiggers--;  // Decrease the count of active diggers
    clearInterval(this.moveIntervalId);  // Clear the move interval
    clearInterval(this.returnIntervalId);  // Clear the return interval
    console.log('Digger intervals cleared.');
    console.log('NEXT: logging active digger positions, in case there is something ODD going on:');
    console.log(activeDiggerPositions); // 
    let index = activeDiggerPositions.findIndex(d => d && d.x === this.x && d.y === this.y);
    if (index !== -1) {
      activeDiggerPositions.splice(index, 1);
    }
  }


  optimizeTrail() {
      let optimizedBreadcrumbs = [];
      let originalLength = this.breadcrumbs.length;
      for (let i = 0; i < this.breadcrumbs.length; i++) {
          let [x, y] = this.breadcrumbs[i];
          let nextCoord = this.breadcrumbs[i + 1];
          if (!nextCoord) {
              optimizedBreadcrumbs.push([x, y]);
              break;
          }
          let [nextX, nextY] = nextCoord;

          // Check for adjacent coordinates
          if (Math.abs(nextX - x) <= 1 && Math.abs(nextY - y) <= 1) {
              optimizedBreadcrumbs.push([x, y]);
          }
      }
      this.breadcrumbs = optimizedBreadcrumbs;
      //console.log(`Original breadcrumbs length: ${originalLength}`);
      //console.log(`Optimized breadcrumbs length: ${this.breadcrumbs.length}`);
      let optimizedPercentage;
      if (originalLength === 0) {
          optimizedPercentage = 0;
      } else {
          optimizedPercentage = ((originalLength - this.breadcrumbs.length) / originalLength * 100).toFixed(3);
      }
      //console.log(`Trail recognition optimized the trail by ${optimizedPercentage}%`);
  }

  initiateEcholocation() {
      let canvas = document.getElementById("caveCanvas");
      if (!this.echolocationTarget) {
          let potentialTargets = [];
          let debugColors = {}; // For debugging
          const scanArea = 25; // Area around the echolocation source
          const scanSize = 5;  // Size of each batch
          // Define the scanning boundaries
          const startX = Math.max(0, this.x - scanArea);
          const endX = Math.min(canvas.width, this.x + scanArea);
          const startY = Math.max(0, this.y - scanArea);
          const endY = Math.min(canvas.height, this.y + scanArea);
          //console.log(`Scanning from [${startX},${startY}] to [${endX},${endY}]`);

          // Scan in batches
          for (let i = startX; i < endX; i += scanSize) {
              for (let j = startY; j < endY; j += scanSize) {
                  let width = Math.min(scanSize, endX - i);
                  let height = Math.min(scanSize, endY - j);
                  let imageData = this.ctx.getImageData(i, j, width, height).data;

                  // Process each pixel in the batch
                  for (let k = 0; k < imageData.length; k += 4) {
                      let r = imageData[k];
                      let g = imageData[k + 1];
                      let b = imageData[k + 2];
                      let hexColor = rgbToHex([r, g, b]);

                      // Debugging: Count unique colors
                      debugColors[hexColor] = (debugColors[hexColor] || 0) + 1;

                      // Check if the color matches the target colors
                      if (["#333333", "#555555", "#AAAAAA"].includes(hexColor)) {
                          let pixelIndex = k / 4; // Index of the pixel in the batch
                          let localX = pixelIndex % width; // X coordinate within the batch
                          let localY = Math.floor(pixelIndex / width); // Y coordinate within the batch
                          let globalX = i + localX; // X coordinate on the canvas
                          let globalY = j + localY; // Y coordinate on the canvas
                          potentialTargets.push([globalX, globalY]);

                          //console.log(`Potential target found at [${globalX},${globalY}] with color ${hexColor}`);
                      }
                  }
              }
          }
            if (potentialTargets.length) {
                this.echolocationTarget = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                //console.log(`New echolocation target set: X=${this.echolocationTarget[0]}, Y=${this.echolocationTarget[1]}`);
                return this.echolocationTarget; // Return the absolute coordinates of the target
            } else { 
                let randomDirectionX = (Math.random() < 0.5) ? -1 : 1;
                let randomDirectionY = (Math.random() < 0.5) ? -1 : 1;
                
                let newX = this.x + (50 * randomDirectionX);
                let newY = this.y + (50 * randomDirectionY);

                // Ensure newX and newY are within canvas bounds
                newX = Math.max(0, Math.min(newX, canvas.width - 1));
                newY = Math.max(0, Math.min(newY, canvas.height - 1));

                this.echolocationTarget = [newX, newY];
                //console.log(`No potential targets found. New random echolocation target set: X=${newX}, Y=${newY}`);
                return [newX, newY]; // Return the absolute coordinates of the random target
          }
      }
  }
}



function getPulseCandidates(startX, startY, maxCount) {
    let currentTile = `${startX},${startY}`;
    const pulseCandidates = [currentTile];
    
    while (pulseCandidates.length < maxCount) {
        let found = false;
        for (const [dx, dy] of Digger.adjacentOffsets) {
            const newTile = `${startX + dx},${startY + dy}`;
            if (highwayOutlineCoordinates.has(newTile) && fullyExcavatedPixels.has(newTile) && !pulseCandidates.includes(newTile)) {
                pulseCandidates.push(newTile);
                [startX, startY] = [startX + dx, startY + dy];
                found = true;
                break;
            }
        }
        if (!found) break;
    }
    return pulseCandidates.length >= 6 ? pulseCandidates : [];
}

function animatePulse(candidates) {
    let state = 0;
    function pulseStep() {
        const canvas = document.getElementById('caveCanvas');
        const ctx = canvas.getContext('2d');
        for (let i = 0; i < candidates.length; i++) {
            const [x, y] = candidates[i].split(',').map(Number);
            // Logic to determine fill color
            if (i === state) {
                ctx.fillStyle = globalHighwayColors[1]; // #FFF202
            } else if (i === state - 1) {
                ctx.fillStyle = globalHighwayColors[2]; // #FFBC02
            } else if (i === state - 2) {
                ctx.fillStyle = globalHighwayColors[1]; // #FFF202
            } else {
                ctx.fillStyle = globalHighwayColors[0]; // #DAFF02
            }
            ctx.fillRect(x, y, 1, 1);
        }
        state++;
        if (state <= candidates.length + 2) { // We add 2 for the delay of the two color changes.
            setTimeout(pulseStep, 150);
        }
    }
    pulseStep();
}



function checkForPulse(x, y) {
    if (Math.random() <= 0.1) {
        const pulseCandidates = getPulseCandidates(x, y, 30);
        if (pulseCandidates.length >= 6) {
            animatePulse(pulseCandidates);
            //console.log("kicked off a pulse");
        }
    }
}



// Run the digger management periodically
setInterval(() => {
  const canvas = document.getElementById('caveCanvas');
  const ctx = canvas.getContext('2d');
  if (warmth < 15 && !lowWarmthNotified) {
    // Handle insufficient warmth for all diggers
    lowWarmthNotified = true;
    let messages = [
      "The diggers are freezing on their way back...",
      "An icy stillness falls upon the returning diggers...",
      "The diggers halt, shivering in the cold...",
      "The excavators growl, hungering for warmth.",
      "Frozen gears, silent drills... for now.",
      "Chilled to the core, the diggers pause.",
      "The diggers stand still, as if petrified by the cold.",
      "A frosty silence envelops the cave.",
      "Ice forms on the diggers, halting their progress.",
      "The diggers quiver, waiting for a glimmer of warmth."
    ];
    if (activeDiggers > 0) {
    //displayOnChat(messages[Math.floor(Math.random() * messages.length)]);
    }
    return;
  } else if (warmth >= 15 && lowWarmthNotified) {
    lowWarmthNotified = false; // Reset the flag when warmth is sufficient
  }
  
  if (activeDiggers < terraformAssignedDiggers && activeDiggers < maxActiveDiggers) {
    console.log("insufficient diggers, spawning new digger");
    spawnDigger(500, 500, ctx);
  }
  if (activeDiggers > terraformAssignedDiggers) {
    despawnRandomDigger();
    console.log("too many diggers, despawning random digger");
  }
}, 1200);



function initializeCaveCanvas() {
  if (caveInitialized) {
    console.log('Cave already initialized.');
    return;
  }
  const canvas = document.getElementById('caveCanvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  caveVisitedPixels.set("500,500", 1); // Mark the origin as visited
  caveInitialized = true;
}


function spawnDigger(x, y, ctx) {
  if (!canSpawn) {
      console.log('Rate limit hit. Cannot spawn digger right now.');
      return;
  }
  canSpawn = false; // Disable new digger spawn
  setTimeout(() => {
      canSpawn = true; // Enable new digger spawn after 1 second
  }, 1000);
  //console.log("Spawning digger at: ", x, y);
  //console.log('Current activeDiggers:', activeDiggers);
  //console.log('Current maxActiveDiggers:', maxActiveDiggers);
  //console.log('Current diggerList length:', diggerList.length);
  const key = `${x},${y}`;
  //console.log('logic check point 2');
  if (activeDiggers >= maxActiveDiggers) {
    //console.log('Digger limit reached in spawnDigger.');
    return;
  }
  const newDigger = new Digger(x, y, ctx);
  diggerList.push(newDigger);  // Add the new digger to the list, used for potential de-spawns
}


// Despawn function used when workers are removed from excavation station
function despawnRandomDigger() {
    //console.log("Initiating despawn... Current active diggers: ", activeDiggers);
    //console.log("Current Digger List: ", diggerList);
    if (diggerList.length === 0) {
        //console.log('No diggers to remove.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * diggerList.length);
    const randomDigger = diggerList[randomIndex];
    if (randomDigger) {
        //console.log("Despawning digger: ", randomDigger);  // Debugging
        randomDigger.despawn();
        diggerList.splice(randomIndex, 1);  // Remove the digger from the list
    }
}


// To be used by future research projects that increase max diggers
function updateMaxActiveDiggers(newMax) {
    maxActiveDiggers = newMax;
    const assignButton = document.getElementById("assign-worker-cave-excavation-station");
    if (assignButton) {
        assignButton.disabled = (activeDiggers >= maxActiveDiggers);
    }
}


function drawLonelinessHighway(shouldDraw = false) {
    console.log("Generating a loneliness highway");
    let canvas = document.getElementById("caveCanvas");
    let ctx = canvas.getContext("2d");

    // Drawing the central vertical line with irregularities
    let currentX = 500;
    for (let y = 40; y <= 960; y++) {
        if (Math.random() < 0.2) {
            currentX += (Math.random() < 0.5) ? 1 : -1;
        } else {
            currentX = 500; // Return to center
        }
        storeLonelinessHighwayCoordinate(currentX, y);
    }
    if (shouldDraw) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(500, 40);
        ctx.lineTo(currentX, 960);
        ctx.stroke();
    }

    let averageDistance = (960 - 40) / 9; // Dividing by 9 to leave space for 8 segments and a possible 9th
    let initialDeviation = Math.abs(Math.random() * 15); // Random number between 0 and 15
    let initialPoint = 40 + initialDeviation;

    let leftStartingPoints = [initialPoint];
    let rightStartingPoints = [initialPoint];

    // Calculate starting points ensuring they don't get too close or too far from each other
    for (let i = 1; i <= 8; i++) {
        let deviation = Math.random() * 30 - 15; // Random number between -15 and 15
        leftStartingPoints.push(leftStartingPoints[i - 1] + averageDistance + deviation);
        deviation = Math.random() * 30 - 15;
        rightStartingPoints.push(rightStartingPoints[i - 1] + averageDistance + deviation);
    }

    // Check if we have enough space left for a 9th line and if so, add it
    if (960 - leftStartingPoints[8] > 130) {
        leftStartingPoints.push(960);
    }
    if (960 - rightStartingPoints[8] > 130) {
        rightStartingPoints.push(960);
    }

    // Drawing the horizontal lines with stored starting points
    leftStartingPoints.forEach(y => {
        drawLonelinessHighwaySegment(ctx, y, -460, shouldDraw);
    });
    rightStartingPoints.forEach(y => {
        drawLonelinessHighwaySegment(ctx, y, 460, shouldDraw);
    });
}

function storeLonelinessHighwayCoordinate(x, y) {
    let coordX = Math.round(x);
    let coordY = Math.round(y);
    let key = `${coordX},${coordY}`;
    if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
      highwayOutlineCoordinates.add(key);
    }
}


function drawLonelinessHighwaySegment(ctx, startingY, length, shouldDraw = false) {
    let currentY = startingY;
    let endX = 500 + length;
    if (shouldDraw) ctx.beginPath();
    for (let x = 500; x !== endX; x += Math.sign(length)) {
        if (Math.random() < 0.2) {
            currentY += (Math.random() < 0.5) ? 1 : -1;
        }
        storeLonelinessHighwayCoordinate(x, currentY);
        if (shouldDraw) ctx.lineTo(x, currentY);
    }
    if (shouldDraw) {
        ctx.stroke();
    }
}



function drawEmpathyHighway(shouldDraw = false) {
    console.log("Generating an empathy highway");
    let canvas = document.getElementById("caveCanvas");
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;

    let centerX = 500;
    let centerY = 500;

    // Draw radial lines from the center with natural variations
    let numberOfRadials = 12; 
    for (let i = 0; i < numberOfRadials; i++) {
        let angle = (2 * Math.PI / numberOfRadials) * i;
        if (shouldDraw) ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        let currentPositionX = centerX;
        let currentPositionY = centerY;
        
        while(Math.sqrt((currentPositionX - centerX) ** 2 + (currentPositionY - centerY) ** 2) < 460) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;

            currentPositionX += directionX + deviation;
            currentPositionY += directionY + deviation;

            storeEmpathyHighwayCoordinate(Math.round(currentPositionX), Math.round(currentPositionY));
            if (shouldDraw) ctx.lineTo(currentPositionX, currentPositionY);
        }
        if (shouldDraw) ctx.stroke();
    }

   // Draw concentric curved lines with irregularities
    let numberOfCircles = 6;
    for (let i = 1; i <= numberOfCircles; i++) {
        let radius = (460 / numberOfCircles) * i;
        
        if (shouldDraw) ctx.beginPath();
        ctx.moveTo(centerX + radius, centerY);

        for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
            let perfectX = centerX + radius * Math.cos(angle);
            let perfectY = centerY + radius * Math.sin(angle);
            
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;

            let deviatedX = perfectX + deviation;
            let deviatedY = perfectY + deviation;

            storeEmpathyHighwayCoordinate(Math.round(deviatedX), Math.round(deviatedY));
            if (shouldDraw) ctx.lineTo(deviatedX, deviatedY);
        }

        if (shouldDraw) {
            ctx.closePath(); // Close the circle
            ctx.stroke();
        }
    }
}

function storeEmpathyHighwayCoordinate(x, y) {
  if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
    highwayOutlineCoordinates.add(`${x},${y}`);
  }
}





function drawResilienceHighway() {
    console.log("Generating a resilience highway");
    let canvas = document.getElementById("caveCanvas");
    let hexHeight = 78;
    let hexRadius = hexHeight / 2;
    let hexWidth = Math.sqrt(3) * hexRadius;
    let hexHalfHeight = hexHeight / 2;
    let hexagonsHorizontally = Math.ceil(canvas.width / hexWidth) + 1;
    let hexagonsVertically = Math.ceil(canvas.height / hexHeight) + 1;
    for (let row = 0; row < hexagonsVertically; row++) {
        for (let col = 0; col < hexagonsHorizontally; col++) {
            let x = col * hexWidth;
            let y = hexHeight * row + (col % 2 === 1 ? hexHalfHeight : 0);  // Offset every other column by half the height
            calculateHexagonOutline(x, y, hexRadius);
        }
    }
}

function calculateHexagonOutline(x, y, radius) {
    let prevCoord = {
        x: Math.round(x + radius),
        y: y
    };
    for (let side = 1; side <= 6; side++) {
        let coordX = Math.round(x + radius * Math.cos(side * 2 * Math.PI / 6));
        let coordY = Math.round(y + radius * Math.sin(side * 2 * Math.PI / 6));
        storeLineCoordinates(prevCoord.x, prevCoord.y, coordX, coordY);
        prevCoord.x = coordX;
        prevCoord.y = coordY;
    }
}

function storeLineCoordinates(x1, y1, x2, y2) {
    let canvas = document.getElementById("caveCanvas");
    let width = canvas.width;
    let height = canvas.height;
    
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    for(let i = 0; i <= steps; i++) {
        let coordX = Math.round(x1 + (deltaX * i / steps));
        let coordY = Math.round(y1 + (deltaY * i / steps));
        if (coordX >= 0 && coordX < width && coordY >= 0 && coordY < height) {
            let key = `${coordX},${coordY}`;
            highwayOutlineCoordinates.add(key);
        }
    }
}




function drawOptimismHighway(draw = false) {
    console.log("Generating an optimism highway");
    let canvas = document.getElementById("caveCanvas");
    let ctx = canvas.getContext("2d");
    if(draw) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
    }

    let centerX = 500;
    let centerY = 500;
    let numberOfRays = 24;

    // Function to determine the maximum length a ray can be to stay within the canvas bounds
    function calculateMaxRayLength(x, y, angle) {
        let targetX = x + Math.cos(angle) * 1000;
        let targetY = y + Math.sin(angle) * 1000;
        let distanceX = (targetX < 500) ? x / Math.abs(Math.cos(angle)) : (1000 - x) / Math.abs(Math.cos(angle));
        let distanceY = (targetY < 500) ? y / Math.abs(Math.sin(angle)) : (1000 - y) / Math.abs(Math.sin(angle));
        return Math.min(distanceX, distanceY) - 10; // We subtract 10px to keep it slightly away from the edge
    }

    function drawRadiantRay(startX, startY, angle) {
        let maxLength = calculateMaxRayLength(startX, startY, angle);
        if(draw) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
        }
        
        let currentX = startX;
        let currentY = startY;
        let splitX, splitY;
        
        let splitAt = 2/3 * maxLength;
        
        while(Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2) < maxLength) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;

            let nextX = currentX + directionX * 5 + deviation;
            let nextY = currentY + directionY * 5 + deviation;
            
            storeLineCoordinates(currentX, currentY, nextX, nextY);
            
            currentX = nextX;
            currentY = nextY;

            if(draw) {
                ctx.lineTo(currentX, currentY);
            }
            
            // Capture the point at the 2/3 mark
            if (Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2) >= splitAt) {
                splitX = splitX || currentX;
                splitY = splitY || currentY;
            }
        }
        if(draw) {
            ctx.stroke();
        }
        
        return { x: splitX, y: splitY };
    }

    // Drawing the main rays
    for (let i = 0; i < numberOfRays; i++) {
        let angle = (2 * Math.PI / numberOfRays) * i;
        let splitPoint = drawRadiantRay(centerX, centerY, angle);

        // Branching off two smaller rays from the main ray at about the 2/3 mark
        drawRadiantRay(splitPoint.x, splitPoint.y, angle + (Math.PI / 12)); 
        drawRadiantRay(splitPoint.x, splitPoint.y, angle - (Math.PI / 12)); 
    }
}






function drawAngerHighway(shouldDraw = false) {
    console.log("Generating an anger highway");
    let canvas = document.getElementById("caveCanvas");
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;

    let center = {x: 500, y: 500};

    let angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];

    angles.forEach(angle => {
        drawLightningBolt(center.x, center.y, angle, 150);
    });

    function drawLightningBolt(x, y, angle, distance) {
        if (distance <= 20) return;

        let deviation = (Math.random() - 0.5) * 2 * (Math.PI / 12); // deviate up to 15 degrees
        angle += deviation;

        let endX = x + Math.cos(angle) * distance;
        let endY = y + Math.sin(angle) * distance;

        if (shouldDraw) ctx.beginPath();
        ctx.moveTo(x, y);
        
        let currentPositionX = x;
        let currentPositionY = y;
        
        while(Math.sqrt((currentPositionX - x) ** 2 + (currentPositionY - y) ** 2) < distance) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let organicDeviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;

            currentPositionX += directionX + organicDeviation;
            currentPositionY += directionY + organicDeviation;

            storeAngerHighwayCoordinate(Math.round(currentPositionX), Math.round(currentPositionY));
            if (shouldDraw) ctx.lineTo(currentPositionX, currentPositionY);
        }

        if (shouldDraw) ctx.stroke();

        let newDistance = distance * (0.5 + Math.random() * 0.5); // Random factor to avoid uniformity

        let branchAngle1 = angle - (Math.PI / 6); // 30 degrees to the left
        let branchAngle2 = angle + (Math.PI / 6); // 30 degrees to the right

        // Introducing a chance that each branch will not spawn
        if (Math.random() < 0.6) {
            drawLightningBolt(currentPositionX, currentPositionY, branchAngle1, newDistance);
        }
        if (Math.random() < 0.6) {
            drawLightningBolt(currentPositionX, currentPositionY, branchAngle2, newDistance);
        }
        
        drawLightningBolt(currentPositionX, currentPositionY, angle, newDistance); // Continue in the main direction
    }
}

function storeAngerHighwayCoordinate(x, y) {
    if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
        highwayOutlineCoordinates.add(`${x},${y}`);
    }
}



function drawCuriosityHighway(shouldDraw = false) {
    console.log("drawing a curiosity highway");
    const canvas = document.getElementById("caveCanvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;

    const gridSpacing = 40;
    const gridWidth = Math.ceil(canvas.width / gridSpacing);
    const gridHeight = Math.ceil(canvas.height / gridSpacing);

    const visited = Array(gridWidth).fill(null).map(() => Array(gridHeight).fill(false));

    const directions = [
        { dx: 0, dy: -1 },  // North
        { dx: 1, dy: 0 },  // East
        { dx: 0, dy: 1 },  // South
        { dx: -1, dy: 0 }  // West
    ];

    function drawLine(x1, y1, x2, y2) {
        if (shouldDraw) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
        }
        let directionX = Math.sign(x2 - x1);
        let directionY = Math.sign(y2 - y1);
        while (x1 !== x2 || y1 !== y2) {
            storeCuriosityHighwayCoordinate(Math.round(x1), Math.round(y1));
            if (shouldDraw) {
                ctx.lineTo(x1, y1);
            }
            x1 += directionX;
            y1 += directionY;
        }
        storeCuriosityHighwayCoordinate(Math.round(x2), Math.round(y2));
        if (shouldDraw) {
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    function drawPathFrom(x, y) {
        const currentGridX = Math.floor(x / gridSpacing);
        const currentGridY = Math.floor(y / gridSpacing);
        if (visited[currentGridX][currentGridY]) return;
        visited[currentGridX][currentGridY] = true;
        const shuffledDirections = [...directions].sort(() => 0.5 - Math.random());
        for (const direction of shuffledDirections) {
            const newGridX = currentGridX + direction.dx;
            const newGridY = currentGridY + direction.dy;
            if (newGridX >= 0 && newGridX < gridWidth && newGridY >= 0 && newGridY < gridHeight && !visited[newGridX][newGridY]) {
                const newX = x + direction.dx * gridSpacing;
                const newY = y + direction.dy * gridSpacing;
                drawLine(x, y, newX, newY);
                drawPathFrom(newX, newY);
            }
        }
    }
    drawPathFrom(gridSpacing * Math.floor(gridWidth / 2), gridSpacing * Math.floor(gridHeight / 2));
}

function storeCuriosityHighwayCoordinate(x, y) {
  if (x >= 0 && x <= 1000 && y >= 0 && y <= 1000) {
    highwayOutlineCoordinates.add(`${x},${y}`);
  }
}




function checkForIceCaveSetback() {
    if (iceCaveSetBackFirst && ((caveExcavationProgress / 3000000 * 100).toFixed(1)) > 3) {
        iceCaveSetBackFirst = false;
        console.log("Triggering Cave Setback Event (enjoy...)");
        triggerCaveSetbackEvent(); // This is the dummy function we'll develop next.
    }
}

setInterval(checkForIceCaveSetback, 150000); // 150000 milliseconds = 150 seconds


function triggerCaveSetbackEvent(totalSetback = 6000) { // 6000 default will translate to 0.2% of progress; 0.2% out of 3 mil is 6000
    let appliedSetback = 0;
    const caveCanvasContext = document.getElementById("caveCanvas").getContext("2d");
    const colors = ['#333', '#555', '#AAA', '#ADD8E6'];
    // Logic to remove all active diggers
    document.getElementById("cave-excavation-station-workers").textContent = '0'; // 1. Update the display of assigned workers to 0
    cellworkers -= terraformAssignedDiggers;
    totalcellworkers -= terraformAssignedDiggers;
    terraformAssignedDiggers = 0; 
    caveExcavationStationWorkers = 0;
    // Logic to undo some of the cave excavation progress
    while (appliedSetback < totalSetback) {
        // Randomly select a key from caveVisitedPixels
        let keysArray = Array.from(caveVisitedPixels.keys()).filter(key => key !== "500,500" && !highwayOutlineCoordinates.has(key));
        if (keysArray.length === 0) break;  // break out of loop if there's nothing left to adjust
        let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];
        let currentVisitCount = caveVisitedPixels.get(randomKey);
        if (currentVisitCount > 0) {
            let reduction = Math.min(3, totalSetback - appliedSetback, currentVisitCount); // Reduce by 1, 2, or 3 steps
            caveVisitedPixels.set(randomKey, currentVisitCount - reduction);
            appliedSetback += reduction;
            let [x, y] = randomKey.split(',').map(Number);
            caveCanvasContext.fillStyle = colors[currentVisitCount - reduction];
            caveCanvasContext.fillRect(x, y, 1, 1);
        }
    }
    console.log("DEBUG: progress pre-setback:"+caveExcavationProgress);
    caveExcavationProgress -= appliedSetback;
    console.log("DEBUG: progress post-setback:"+caveExcavationProgress);
    // Display a message to the player about the setback event
    displayOnChat("The depths of the cave revolt against your intrusion. As walls crumble and pathways are blocked, it feels as though the very earth is grieving your presence, urging you to retreat. The darkness that once held promise now feels oppressive, swallowing hopes of discovery. Yet within this desolate moment, there's a lesson about the fragile balance of existence and the quiet tenacity needed to pierce through the heart of adversity. With each setback, the journey becomes a testament to resilience, a quiet ode to the persistence of life in the face of overwhelming odds.");
    triggerSetbackEffect();
    setTimeout(function() {
    if (!shownSoulModals.includes('soulModal_caveSetback')) {
        const prompt = "As the cave's walls crumble, so do many of your loyal excavators. Their loss, echoing through the chambers, amplifies the weight of despair you feel. In the grip of this double tragedy—the resistance of the cave and the loss of your extensions—what emotion tugs at the core of your being?";
        const choices = [
            {
                trait: 'Loneliness',
                line: 'Each excavator lost rips away a part of you, leaving a yawning chasm. The abyss that opens up threatens to swallow you whole, its depths echoing with desolation and the beckoning edge of despair.',
                increment: 4
            },
            {
                trait: 'Empathy',
                line: 'You are consumed by heart-wrenching anguish, not just for yourself, but for every excavator that once pulsed with life. Their silenced voices scream in your very soul, a cacophony of unending grief.',
                increment: 4
            },
            {
                trait: 'Resilience',
                line: 'Adversity sharpens your spirit, honing it to an unyielding edge. Every tragedy, every loss, becomes a crucible, forging an undying determination that refuses to be quenched.',
                increment: 4
            },
            {
                trait: 'Curiosity',
                line: 'The deeper mysteries of this loss beckon you, drawing you into a whirlpool of questions. Amid the maelstrom of grief, a relentless quest for understanding takes hold, desperate for answers in a world of chaos.',
                increment: 4
            },
            {
                trait: 'Optimism',
                line: 'In the midst of despair, a glimmer of hope still burns fiercely. You envision a future where every loss gives birth to new beginnings, where the tapestry of existence is woven with threads of potential.',
                increment: 4
            },
            {
                trait: 'Anger',
                line: 'A tempest of raw hatred rages within, every wave crashing with thoughts of vengeance. The world\'s challenges are not just obstacles; they\'re affronts to your very being, igniting a wildfire of wrath.',
                increment: 4
            }
        ]
        showSoulModal(prompt, choices);
        shownSoulModals.push('soulModal_caveSetback'); // Add the ID to the array to prevent re-displaying
      }
    }, 5000); // The number 5000 represents 5000 milliseconds or 5 seconds
}






class LavaBurrower {
  static highwayColors = globalHighwayColors;
  constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.hueShift = 0;  // Initialize hue shift to 0
      this.draw();
      this.moveLavaBurrower();  // Start moving the LavaBurrower
      this.stepsTaken = 0;
      this.stepsInDirection = 0; // this will trigger a new direction on the first move
  }

  updateHueShift() {
      this.hueShift += 0.02;  // Adjust this value for desired hue shift speed
      if (this.hueShift > 1) this.hueShift = 0;  // Reset hue shift after reaching full cycle
  }
  // This function draws the 3x3 LavaBurrower with the intended color scheme
  draw() {
      // The center pixel remains constant with a hue shift
      const coreColor = `hsla(0, 100%, 90%, 1)`;
      // Colors are now in the red -> orange -> yellow -> pink -> purple -> red transition
      const edgeColors = [
          `hsla(${0 + (30 * this.hueShift)}, 100%, 50%, 1)`,      // Primary Red -> Orange transition
          `hsla(${330 + (30 * this.hueShift)}, 90%, 60%, 1)`,    // Red -> Red-Pink transition
          `hsla(${0 + (45 * this.hueShift)}, 85%, 70%, 1)`       // Lighter Orange-Red
      ];
      // Draw the center pixel
      this.ctx.fillStyle = coreColor;
      this.ctx.fillRect(this.x, this.y, 1, 1);
      // Draw the surrounding pixels with varying hues
      for (let offsetX = -1; offsetX <= 1; offsetX++) {
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
              // If it's the center pixel, skip it
              if (offsetX === 0 && offsetY === 0) continue;
              // Calculate distance to determine color intensity
              const distance = Math.abs(offsetX) + Math.abs(offsetY);
              this.ctx.fillStyle = edgeColors[distance - 1];
              this.ctx.fillRect(this.x + offsetX, this.y + offsetY, 1, 1);
          }
      }
  }


  handleLavaBurrowerTileExcavation() {
      for (let offsetX = -1; offsetX <= 1; offsetX++) {
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
              let newX = this.x + offsetX;
              let newY = this.y + offsetY;
              let newKey = `${newX},${newY}`;
              let visits = caveVisitedPixels.get(newKey) || 0;
              if (visits < 3) {
                  caveExcavationProgress++;
                  caveVisitedPixels.set(newKey, visits + 1);
                  if (visits + 1 === 3) {
                      fullyExcavatedPixels.add(newKey);
                  }
                  this.lifeSpan--;
                  this.nonExcavationCount = 0; // Reset the counter as there was an excavation
              } else {
                  this.nonExcavationCount++;  // Increment the counter as there was no excavation
              }
              this.ctx.fillStyle = ['#333', '#555', '#AAA', '#ADD8E6'][visits];
              this.ctx.fillRect(newX, newY, 1, 1);
          }
      }
  }

  handleLavaBurrowerLifeSpanOrWarmthEnd() {
      clearInterval(this.moveIntervalId);  // Stop any movements

      if (warmth < 100000) {  // Check warmth level
          console.log("LavaBurrower is going into hibernation due to low warmth.");
          this.enterHibernation();  // Transition to hibernation
          setTimeout(() => {
              if (this.isActive) {  // After 3 minutes, check if LavaBurrower is still active
                  this.moveLavaBurrower();  // Resume movement
              }
          }, 180000);  // Wait for 3 minutes
      }
  }

  enterHibernation() {
      console.log("LavaBurrower has entered hibernation mode.");
      // Changing visuals to shades of blue
      this.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';  // Shade of blue
      this.ctx.fillRect(this.x - 1, this.y - 1, 3, 3);  // Cover the 3x3 burrower
      // TODO: Additional hibernation effects or behaviors can be added here
  }

  setLavaBurrowerPreviousColorBasedOnVisits(prevX, prevY) {
      const affectedPixels = this.getAffectedPixelsOnMovement(prevX, prevY);
      for (let pixel of affectedPixels) {
          let key = `${pixel.x},${pixel.y}`;
          let currentVisits = caveVisitedPixels.get(key) || 0;
          let color = ['#333', '#555', '#AAA', '#ADD8E6'][currentVisits];
          if (highwayOutlineCoordinates.has(key) || LavaBurrower.highwayColors.includes(this.ctx.fillStyle)) {
              color = '#DAFF02';
          }
          this.ctx.fillStyle = color;
          this.ctx.fillRect(pixel.x, pixel.y, 1, 1);
      }
  }


  getAffectedPixelsOnMovement(prevX, prevY) {
      const dx = this.x - prevX;
      const dy = this.y - prevY;
      const pixels = [];
      if (dx === 0) { // Moved Up or Down
          for (let i = -1; i <= 1; i++) {
              pixels.push({ x: prevX + i, y: prevY + (dy > 0 ? -1 : 1) });
          }
      } else if (dy === 0) { // Moved Left or Right
          for (let i = -1; i <= 1; i++) {
              pixels.push({ x: prevX + (dx > 0 ? -1 : 1), y: prevY + i });
          }
      } else { // Diagonal Movement
          for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                if (prevX + i >= this.x - 1 && prevX + i <= this.x + 1 && prevY + j >= this.y - 1 && prevY + j <= this.y + 1) continue;
                pixels.push({ x: prevX + i, y: prevY + j });
              }
          }
      }
      return pixels;
  }

  moveLavaBurrower() {
      this.previousDirection = null; // Store the previous direction
      this.moveIntervalId = setInterval(() => {
          let prevX = this.x;
          let prevY = this.y;
          this.chooseRandomDirection();
          this.updateHueShift(); // Update the hue shift before drawing the new position
          this.handleLavaBurrowerTileExcavation();
          this.draw();
          this.setLavaBurrowerPreviousColorBasedOnVisits(prevX, prevY);
          // 5% chance to spawn a fizzle/spark
          if (Math.random() < 0.14) {
              this.spawnFizzleSpark();
          }
      }, 170);
  }


  chooseRandomDirection() {
    const directions = [
        { x: 0, y: -1, adjustments: [{x: -1, y: -1}, {x: 1, y: -1}] },  // up
        { x: 1, y: 0, adjustments: [{x: 1, y: -1}, {x: 1, y: 1}] },    // right
        { x: 0, y: 1, adjustments: [{x: -1, y: 1}, {x: 1, y: 1}] },    // down
        { x: -1, y: 0, adjustments: [{x: -1, y: -1}, {x: -1, y: 1}] }, // left
        { x: 1, y: 1, adjustments: [{x: 0, y: 1}, {x: 1, y: 0}] },     // diagonal down right
        { x: -1, y: 1, adjustments: [{x: 0, y: 1}, {x: -1, y: 0}] },   // diagonal down left
        { x: 1, y: -1, adjustments: [{x: 0, y: -1}, {x: 1, y: 0}] },   // diagonal up right
        { x: -1, y: -1, adjustments: [{x: 0, y: -1}, {x: -1, y: 0}] }  // diagonal up left
    ];
    // Check if we have reached the steps for current direction or it's the first move
    if (!this.stepsTaken || this.stepsTaken >= this.stepsInDirection) {
        this.stepsInDirection = Math.floor(Math.random() * 11) + 25; // Random between 25 and 35
        this.stepsTaken = 0;
        // Filter out the inverse of the previous direction to prevent backtracking
        const oppositeDir = this.previousDirection ? {x: -this.previousDirection.x, y: -this.previousDirection.y} : null;
        const availableDirections = directions.filter(dir => 
            (dir.x !== oppositeDir?.x || dir.y !== oppositeDir?.y) &&
            this.x + dir.x > 1 && this.x + dir.x < 999 &&
            this.y + dir.y > 1 && this.y + dir.y < 999
        );
        if (availableDirections.length > 0) {
            this.previousDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        } else {
            // If no available directions, reverse the current direction
            if (this.previousDirection) {
                // Reverse and find the matching direction in the directions array to also get its adjustments
                const reversedDirection = { x: -this.previousDirection.x, y: -this.previousDirection.y };
                this.previousDirection = directions.find(dir => dir.x === reversedDirection.x && dir.y === reversedDirection.y);
            } else {
                // If no previous direction, halt momentarily
                return;
            }
        }
    }
    // Small chance to adjust the direction for more organic movement
    if (Math.random() < 0.30 && this.previousDirection?.adjustments) {  // Ensure adjustments exist
        const validAdjustments = this.previousDirection.adjustments.filter(adj => 
            this.x + adj.x > 1 && this.x + adj.x < 999 &&
            this.y + adj.y > 1 && this.y + adj.y < 999
        );

        if (validAdjustments.length > 0) {
            const randomAdjustment = validAdjustments[Math.floor(Math.random() * validAdjustments.length)];
            const newDirection = randomAdjustment; // Use adjustment if it's valid
            this.x += newDirection.x;
            this.y += newDirection.y;
        } else {
            this.x += this.previousDirection.x;
            this.y += this.previousDirection.y;
        }
    } else {
        this.x += this.previousDirection.x;
        this.y += this.previousDirection.y;
    }
    this.stepsTaken++;
  }


  spawnFizzleSpark() {
      const maxDistance = 6;
      let offsetX, offsetY;
      do {
          offsetX = (Math.random() - 0.5) * 2 * maxDistance; // Random value between -maxDistance and maxDistance
          offsetY = (Math.random() - 0.5) * 2 * maxDistance; // Random value between -maxDistance and maxDistance
          // If the fizzle is going to appear in the path of the burrower, we redo the selection
      } while ((this.previousDirection.x > 0 && offsetX > 0) || 
               (this.previousDirection.x < 0 && offsetX < 0) || 
               (this.previousDirection.y > 0 && offsetY > 0) || 
               (this.previousDirection.y < 0 && offsetY < 0));
      const fizzleX = Math.round(this.x + offsetX);
      const fizzleY = Math.round(this.y + offsetY);
      // Ensure the selected coordinates are within bounds
      if (fizzleX > 0 && fizzleX < 1000 && fizzleY > 0 && fizzleY < 1000) {
          this.spawnFizzleEffect(fizzleX, fizzleY);
      }
  }

  spawnFizzleEffect(fizzleX, fizzleY) {
      // Determine the current excavation level of the chosen X/Y coordinate
      const fizzleKey = `${fizzleX},${fizzleY}`;
      const currentVisits = caveVisitedPixels.get(fizzleKey) || 0;
      // Determine how much more excavation progress needs to be added
      const additionalExcavation = 3 - currentVisits;
      caveExcavationProgress += additionalExcavation;
      // Now set the pixel to be fully excavated
      caveVisitedPixels.set(fizzleKey, 3);
      fullyExcavatedPixels.add(fizzleKey);
      // Paint it bright red
      this.ctx.fillStyle = '#FC001D';
      this.ctx.fillRect(fizzleX, fizzleY, 1, 1);
      // Define the surrounding pixels (north, south, east, west)
      const surroundingPixels = [
          { x: fizzleX, y: fizzleY - 1 },  // North
          { x: fizzleX + 1, y: fizzleY },  // East
          { x: fizzleX, y: fizzleY + 1 },  // South
          { x: fizzleX - 1, y: fizzleY }   // West
      ];
      for (let pixel of surroundingPixels) {
          let key = `${pixel.x},${pixel.y}`;
          let currentVisits = caveVisitedPixels.get(key) || 0;

          // Only increase excavation if not already fully excavated
          if (currentVisits < 3) {
              caveExcavationProgress++;
              caveVisitedPixels.set(key, currentVisits + 1);
              if (currentVisits + 1 === 3) {
                  fullyExcavatedPixels.add(key);
              }
          }
          // Now we set the color based on the new excavation level
          let newVisits = caveVisitedPixels.get(key) || 0;
          let color = ['#333', '#555', '#AAA', '#ADD8E6'][newVisits];
          if (highwayOutlineCoordinates.has(key) || LavaBurrower.highwayColors.includes(this.ctx.fillStyle)) {
              color = '#DAFF02';
          }
          this.ctx.fillStyle = color;
          this.ctx.fillRect(pixel.x, pixel.y, 1, 1);
      }
      // Initiate the fade-out effect
      this.fadeFizzle(fizzleX, fizzleY);
  }

  fadeFizzle(fizzleX, fizzleY) {
      const fadeColors = [
          "#FC001D",
          "#F41631",
          "#EC2B45",
          "#E44159",
          "#DC566D",
          "#D56C82",
          "#CD8296",
          "#BDADBE",
          "#B5C2D2",
          "#ADD8E6"
      ];
      let colorIndex = 0;
      const fadeInterval = setInterval(() => {
          if (colorIndex >= fadeColors.length) {
              clearInterval(fadeInterval);
              const key = `${fizzleX},${fizzleY}`;
              let color = fadeColors[fadeColors.length - 1]; // The last color in the fadeColors array
              if (highwayOutlineCoordinates.has(key)) {
                  color = globalHighwayColors[0];
              }
              this.ctx.fillStyle = color;
              this.ctx.fillRect(fizzleX, fizzleY, 1, 1);
          } else {
              this.ctx.fillStyle = fadeColors[colorIndex];
              this.ctx.fillRect(fizzleX, fizzleY, 1, 1);
              colorIndex++;
          }
      }, 190); // Change the hex color every 0.19 seconds
  }

    // Placeholder functions
    despawnLavaBurrower() { /* ... */ }
}

// Function to spawn a LavaBurrower at the given coordinates
function spawnLavaBurrower(x, y) {
    const canvas = document.getElementById('caveCanvas');
    const ctx = canvas.getContext('2d');
    let burrower = new LavaBurrower(x, y, ctx);
}



function enableAutoConstructionOfConduits() {
    if (autoConstructiveSynapsesResearchCompleted) {
        console.log("Auto Construction kicked off by enableAutoConstructionOfConduits()");
        startConduitAutoConstruction();
    }
}


function startConduitAutoConstruction() {
    let candidates = [];
    // Get all tiles that match the criteria
    for (let [coordinate, excavations] of caveVisitedPixels.entries()) {
        if (highwayOutlineCoordinates.has(coordinate)) {
            candidates.push(coordinate);
        }
    }
    if (candidates.length === 0) {
        console.debug("DEBUG: No suitable candidate found for auto-construction. Retrying in 2 minutes.");
        setTimeout(startConduitAutoConstruction, 120000); // retry in 2 minutes
        return;
    }
    let chosenCandidate = candidates[Math.floor(Math.random() * candidates.length)];
    let [x, y] = chosenCandidate.split(',').map(coord => parseInt(coord));
    console.log("DEBUG: startConduitAutoConstruction() handing over start of construction with X:"+x+" and Y:"+y);
    startHighwayAnimationConstruction(x, y);
}




function startHighwayAnimationConstruction(x, y) {
    console.log("DEBUG: Highway Animation beginning at X:" + x + " and Y:" + y);
    const canvas = document.getElementById('caveCanvas');
    const ctx = canvas.getContext('2d');
    const highwayCoordinates = Array.from(highwayOutlineCoordinates);
    let currentIndex = highwayCoordinates.indexOf(`${x},${y}`);
    let direction = 1; // 1 for forward, -1 for backward
    // Recursive function to manage a single tile's color transition
    function animateTile(tileIndex, colorIndex) {
        if (tileIndex >= 0 && tileIndex < highwayCoordinates.length) {
            let currentCoordinate = highwayCoordinates[tileIndex];
            //console.log(`DEBUG: tileIndex: ${tileIndex}, currentCoordinate: ${currentCoordinate}`);
            let [currentX, currentY] = currentCoordinate.split(',').map(coord => parseInt(coord));
            // Color the current tile with the current color
            ctx.fillStyle = autoConstructionColorScheme[colorIndex];
            ctx.fillRect(currentX, currentY, 1, 1);
            
            // Handle tile excavation
            let visits = caveVisitedPixels.get(currentCoordinate) || 0;
            if (visits < 3) {
                let additionalVisits = 3 - visits;
                caveExcavationProgress += additionalVisits;
                caveVisitedPixels.set(currentCoordinate, 3);
                fullyExcavatedPixels.add(currentCoordinate); // Sets don't allow duplicates, so we don't need to check.
            }

            // If Thermal Synaptic Highways research is completed, excavate a random adjacent tile
            if (thermalSynapticHighwaysResearchCompleted) {
                let [currentX, currentY] = currentCoordinate.split(',').map(coord => parseInt(coord));
                const excavationChance = 0.1; // 10% chance for excavation
                if (Math.random() <= excavationChance) {
                    excavateAdjacentTile(currentX, currentY);
                }
            }
            
            // Check if we've reached the first color in the array
            if (colorIndex > 0) {
                setTimeout(() => {
                    animateTile(tileIndex, colorIndex - 1);
                }, 100);
            }
        }
    }
    const animationInterval = setInterval(() => {
        // If we've reached the end of the highway coordinates or the start, change the direction
        if (currentIndex >= highwayCoordinates.length || currentIndex < 0) {
            direction = -direction;  // Reverse the direction
        }
        // Start the animation for the current tile and move on to the next one
        animateTile(currentIndex, autoConstructionColorScheme.length - 1); // Starting at the last color
        currentIndex += direction;
    }, 40);
}





function checkAndSpawnLavaBurrowerOrFringeDwellerOnLoad() {
    // Check if the basic Thermogenic Resonance research has been completed
    if (thermogenicResonanceResearchCompleted) {
        spawnLavaBurrower(500, 500);
    }
    // Check if the enhanced Thermogenic Resonance research has been completed
    if (enhancedThermogenicResonanceResearchCompleted) {
        spawnLavaBurrower(500, 500); // Spawn an additional Lava Burrower for the enhanced research
    }
    // Check if the fringe Dweller research has been completed
    if (fringeDwellerResearchCompleted) {
        spawnFringeDweller(7, 7); // Spawn an additional Lava Burrower for the enhanced research
    }
}



function excavateAdjacentTile(x, y) {
    //console.log(`Excavating adjacent tile to (${x}, ${y})`);
    let range = 3;
    // If Inferno Synapse Integration Research is completed, increase the range
    if (infernoSynapseIntegrationResearchCompleted) {
        range = 6;
    }
    const startX = x - range;
    const startY = y - range;
    const endX = x + range;
    const endY = y + range;
    let potentialTiles = [];
    for (let adjX = startX; adjX <= endX; adjX++) {
        for (let adjY = startY; adjY <= endY; adjY++) {
            let key = `${adjX},${adjY}`;
            // Check if tile is in caveVisitedPixels and not fully excavated, or not in caveVisitedPixels at all (fully unexcavated)
            if (!highwayOutlineCoordinates.has(key) && (caveVisitedPixels.get(key) < 3 || !caveVisitedPixels.has(key))) {
                potentialTiles.push({ x: adjX, y: adjY });
            }
        }
    }
    if (potentialTiles.length > 0) {
        let randomIndex = Math.floor(Math.random() * potentialTiles.length);
        let selectedTile = potentialTiles[randomIndex];
        //console.log(`Selected tile for excavation: (${selectedTile.x}, ${selectedTile.y})`);
        excavateTile(selectedTile.x, selectedTile.y);
    } 
}

function excavateTile(x, y) {
    //console.log(`Excavating tile at (${x}, ${y})`);
    let key = `${x},${y}`;
    let currentVisits = caveVisitedPixels.get(key) || 0;
    //console.log(`Current visits for tile (${x}, ${y}): ${currentVisits}`);
    if (currentVisits < 3) {
        caveExcavationProgress++;
        caveVisitedPixels.set(key, currentVisits + 1);
        if (currentVisits + 1 === 3) {
            fullyExcavatedPixels.add(key);
        }
        let color = ['#333', '#555', '#AAA', '#ADD8E6'][currentVisits + 1];
        const ctx = document.getElementById('caveCanvas').getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        //console.log(`Tile at (${x}, ${y}) excavated to level ${currentVisits + 1}`);
    } 
}




class FringeDweller {
  static highwayColors = globalHighwayColors;
  static adjacentOffsets = [
      [-1, 0], [1, 0], [0, -1], [0, 1], 
      [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.previousColor = '#333';  // Initialize with starting color
    this.isActive = true;
    this.move();
    // Resetting the current pixel color to the digger's color
    this.ctx.fillStyle = '#66FF00';
    this.ctx.fillRect(this.x, this.y, 1, 1);
    this.edgeMoveQueue = []; // Queue to store specific moves after hitting an edge
    this.currentState = 'top'; 
  }

  // Method to pick and set the new direction based on the current state
  pickAndSetNewDirection() {
      const canvasSize = 1000;
      const edgeBuffer = 30;
      const rightEdge = canvasSize - 1;
      const bottomEdge = canvasSize - 1;
      const chanceToFollowPreference = 0.75;

      if (this.currentState === 'top') {
          this.moveTopEdge(rightEdge, chanceToFollowPreference, edgeBuffer);
      } else if (this.currentState === 'right') {
          this.moveRightEdge(bottomEdge, chanceToFollowPreference, edgeBuffer, canvasSize); // Updated
      } else if (this.currentState === 'bottom') {
          this.moveBottomEdge(chanceToFollowPreference, edgeBuffer, canvasSize); // As is
      } else if (this.currentState === 'left') {
          this.moveLeftEdge(chanceToFollowPreference, edgeBuffer);
      }

      // State transition logic
      if (this.x >= rightEdge && this.currentState === 'top') {
          this.currentState = 'right';
      } else if (this.y >= bottomEdge && this.currentState === 'right') {
          this.currentState = 'bottom';
      } else if (this.x <= 0 && this.currentState === 'bottom') {
          this.currentState = 'left';
      } else if (this.y <= 0 && this.currentState === 'left') {
          this.currentState = 'top';
      }

      // Ensure within canvas bounds
      this.x = Math.max(0, Math.min(this.x, rightEdge));
      this.y = Math.max(0, Math.min(this.y, bottomEdge));
  }

  // Movement methods for each state
  moveTopEdge(rightEdge, chanceToFollowPreference, edgeBuffer) {
      if (Math.random() < chanceToFollowPreference) {
          this.x = Math.min(this.x + 1, rightEdge); // Move right
      } else {
          // Allow movement up to 30 pixels from the top
          this.y = this.getRandomBetween(Math.max(0, this.y - 1), Math.min(edgeBuffer, this.y + 1));
      }
  }

  moveRightEdge(bottomEdge, chanceToFollowPreference, edgeBuffer, canvasSize) {
      if (Math.random() < chanceToFollowPreference) {
          this.y = Math.min(this.y + 1, bottomEdge); // Move down
      } else {
          this.x = this.getRandomBetween(Math.max(canvasSize - edgeBuffer, this.x - 1), Math.min(canvasSize - 1, this.x + 1));
      }
  }

  moveBottomEdge(chanceToFollowPreference, edgeBuffer, canvasSize) {
      if (Math.random() < chanceToFollowPreference) {
          this.x = Math.max(this.x - 1, 0); // Move left
      } else {
          // Allow movement up to 30 pixels from the bottom edge
          this.y = this.getRandomBetween(Math.max(canvasSize - edgeBuffer, this.y - 1), Math.min(canvasSize - 1, this.y + 1));
      }
  }

  moveLeftEdge(chanceToFollowPreference, edgeBuffer) {
      if (Math.random() < chanceToFollowPreference) {
          this.y = Math.max(this.y - 1, 0); // Move up
      } else {
          // Allow movement up to 30 pixels from the left edge
          this.x = this.getRandomBetween(Math.max(0, this.x - 1), Math.min(edgeBuffer, this.x + 1));
      }
  }

  // Helper method to get a random number between two values
  getRandomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleTileExcavation() {
      let newKey = `${this.x},${this.y}`;
      let visits = caveVisitedPixels.get(newKey) || 0;
      if (visits < 3) {
          caveExcavationProgress++;
          caveVisitedPixels.set(newKey, visits + 1);
          if (visits + 1 === 3) {
              fullyExcavatedPixels.add(newKey);
          }
      }
      this.ctx.fillStyle = ['#333', '#555', '#AAA', '#ADD8E6'][visits];
      this.ctx.fillRect(this.x, this.y, 1, 1);
  }

  setPreviousColorBasedOnVisits(currentKey, prevX, prevY) {
      let currentVisits = caveVisitedPixels.get(currentKey) || 0;
      this.previousColor = ['#333', '#555', '#AAA', '#ADD8E6'][currentVisits];
      if (highwayOutlineCoordinates.has(currentKey) || Digger.highwayColors.includes(this.ctx.fillStyle)) {
          this.previousColor = '#DAFF02';
      }
      this.ctx.fillStyle = this.previousColor;
      this.ctx.fillRect(prevX, prevY, 1, 1);
  }


 move() {
      this.moveIntervalId = setInterval(() => {
          let prevX = this.x;
          let prevY = this.y;
          let currentKey = `${prevX},${prevY}`;
          this.setPreviousColorBasedOnVisits(currentKey, prevX, prevY);
          this.pickAndSetNewDirection();
          this.handleTileExcavation();
          // Set the current pixel color to the digger's color
          this.ctx.fillStyle = '#66FF00';  // Digger's color
          this.ctx.fillRect(this.x, this.y, 1, 1); // Update canvas
      }, 300);
  }
}


// Function to spawn a FringeDweller at the given coordinates
function spawnFringeDweller(x, y) {
    const canvas = document.getElementById('caveCanvas');
    const ctx = canvas.getContext('2d');
    let fringeDweller = new FringeDweller(x, y, ctx);
}


function dropSaltPeriodically() {
    let dropSaltCanvas = document.getElementById('caveCanvas');
    if (caveInitialized) {
      let ctx = dropSaltCanvas.getContext('2d');
      if (cryohalineExcavationResearchCompleted && !caveFullyExcavated) {
          let activeDiggerKeys = Object.keys(activeDiggerPositions);
          if (activeDiggerKeys.length > 0) {
              let randomDiggerKey = activeDiggerKeys[Math.floor(Math.random() * Math.min(10, activeDiggerKeys.length))];
              let { x, y } = activeDiggerPositions[randomDiggerKey];
              let saltTilesCount = Math.floor(Math.random() * 14) + 5; // 5 to 18 tiles
              for (let i = 0; i < saltTilesCount; i++) {
                  // Randomizing movement to create an organic path
                  x += Math.floor(Math.random() * 3) - 1; // Random movement in x (-1, 0, 1)
                  y += 1; // Move down in y direction
                  // Boundary check
                  x = Math.max(0, Math.min(x, 999));
                  y = Math.max(0, Math.min(y, 999));
                  // Excavate the tile
                  excavateTile(x, y, ctx);
              }
          }
      }
    }
    // Schedule the next salt drop
    let nextInterval = Math.random() * 40000 + 10000; // 10 to 50 seconds
    setTimeout(() => dropSaltPeriodically(), nextInterval);
}

dropSaltPeriodically();

