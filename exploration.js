
// Function used to translate map position for dragging settings
function getTranslation(transform) {
    const matches = /translate\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/.exec(transform);
    return matches ? { x: parseFloat(matches[1]), y: parseFloat(matches[2]) } : { x: 0, y: 0 };
}




// Function attached to north/east/south/west travel buttons to help call explore() accurately
function movePlayer(dx, dy) {
    let movementEnergyCost = navigationcost;
    // Check if the player has sufficient energy
    if (energy < movementEnergyCost) {
        console.log("Not enough energy to move!");
        return; // Exit the function early
    }
    // New proposed position
    let newX = playerPosition.x + dx;
    let newY = playerPosition.y + dy;
    // Check boundaries
    if (newX < 15 || newX > 1195 || newY < 15 || newY > 1195) {
        console.log("Hold your horses, pal!");
        return;
    }
    // Deduct movement costs if move is legal and player has sufficient energy
    energy -= movementEnergyCost; 
    // Add flash effect to energy counter
    const energyCounterElem = document.getElementById("energyCounter");
    energyCounterElem.classList.add("flashEnergy");
    // Remove the flash effect after 500ms
    setTimeout(() => {
        energyCounterElem.classList.remove("flashEnergy");
    }, 500);
    // Create floating -1000 element
    const floatingCost = document.createElement('div');
    floatingCost.innerText = lophotrichousFlagellaUpgradePurchased ? '-500' : '-1000';
    floatingCost.className = 'floatingEnergyCost';

    // Append to the resource bar
    const resourceBar = document.getElementById("resourceBar");
    resourceBar.appendChild(floatingCost);

    // Position the floating cost relative to the energyCounter
    const energyCounterRect = document.getElementById("energyCounter").getBoundingClientRect();
    floatingCost.style.left = (energyCounterRect.left + (energyCounterRect.width / 2)) + 'px'; // horizontally centered to the energyCounter
    floatingCost.style.bottom = (window.innerHeight - energyCounterRect.top) + 'px'; // positioned just above the energyCounter

    // Start the animation by changing the position and fading it out
    setTimeout(() => {
        floatingCost.style.bottom = (window.innerHeight - energyCounterRect.top + 20) + 'px';
        floatingCost.style.opacity = '0';
    }, 0);

    // Remove the floating cost from the DOM after the animation is done
    setTimeout(() => {
        resourceBar.removeChild(floatingCost);
    }, 1200);

    // Fail Movement if the player has terrain weakness
    let tileX = Math.floor((newX - 15) / 30);
    let tileY = Math.floor((newY - 15) / 30);
    if (!exoterrainAcclimatizationUpgradePurchased && terrainWeakness[initialSpawnTerrain].includes(terrainGrid[tileY][tileX])) {
      // Trigger setback event
      TerrainSetbackEvent();
      return;
    }
    // Update player position
    playerPosition.x = newX;
    playerPosition.y = newY;
    //console.log("DEV NOTE, REMOVE THIS: player moving to:"+newX+" and:"+newY);
    // Call explore with the new position
    explore(playerPosition.x, playerPosition.y);
    populateInfoWidget(); // update terraform info widget data
    populateAnomalyWidget(); // update terraform anomaly widget data
}


function TerrainSetbackEvent() {
    console.log("Terrain Setback Event Triggered");
    setBacksSurvived += 1; // Increment the setbacks survived
    if (terrainSetBackFirst) {
        // Determine a random number, 1 or 2
        var numTendonsToRemove = Math.floor(Math.random() * 2) + 1;
        // Call the removeTendons function with that random 1 or 2 number
        removeTendons(numTendonsToRemove);
        console.log("triggered removal for tendons:"+numTendonsToRemove)
        // Define the part of the message that changes based on the number of tendrils removed
        var removalMessage = numTendonsToRemove === 1
          ? "the treacherous terrain claims one of your tendrils, severing it without mercy."
          : "the treacherous terrain claims two of your tendrils, severing them without mercy.";
        // Construct the full message
        const setbackMessage = "As you venture into the unfamiliar landscape, every element rebels against your presence. The harsh environment tests your very essence. Nature's indifferent ways demand adaptation and understanding, but they offer no sympathy. In a moment of cruel betrayal, " + removalMessage + " You feel a profound sense of weakness, a vulnerability you had never known, but you're not yet defeated. Your journey has only begun, and though the pursuit of companionship seems a distant dream, it still drives you forward. The world may have taken a part of you, but it cannot take your longing, your solitude, your quiet determination. In the cold silence of your loss, you press on, a solitary wanderer in a world that seems to have forgotten compassion.";
        displayOnChat(setbackMessage);
        triggerSetbackEffect();
        // Unlock the research project
        addToResearchQueue('ExoterrainAcclimatization');
        populateResearchTab();
        // After 1 second, display a hint about the new research opportunity
        setTimeout(() => {
            const researchHint = "A newfound curiosity stirs within, urging you to study and conquer these foreign terrains. Perhaps some focused research could unveil a way?";
            displayOnChat(researchHint, "warning");
        }, 2000);
        // Mark that the first setback has been encountered
        terrainSetBackFirst = false;
    } else {
        // Print the repeat setback message
        const repeatSetbackMessage = "The hostile embrace of the unfamiliar terrain repels your every step, reminding you of nature's relentless indifference.";
        displayOnChat(repeatSetbackMessage, "warning");
    }
}



// Function to create the map
function createMap() {
  var map = document.getElementById('map');
  if (!map) {
    console.log('Map div not found');
    return;
  }
  if (!mapInitialized) {
    // Ensure the mini cell is on top of the map
    var minicell = document.getElementById('cell-icon');
    if (!minicell) {
        minicell = document.createElement('div');
        minicell.id = 'cell-icon';
        map.appendChild(minicell);
      }
      // Adjust position to align with a 10x10 grid square
      var currentLeft = parseFloat(window.getComputedStyle(minicell).left);
      var currentTop = parseFloat(window.getComputedStyle(minicell).top);
      minicell.style.left = (currentLeft - (currentLeft % 10) + 5) + "px";
      minicell.style.top = (currentTop - (currentTop % 10) + 5) + "px";
      mapInitialized = true; // Set the mapInitialized flag to true once map is created
      checkTerraformTabUnlock(); // Check if Terraforming can be unlocked
      // Create the SVG map terrain
      generateUltraRareTerrain(); // Determines ultra rare terrain locations
      createSVGMap();
      explore(615,615); // Begins the exploration of the spawn-grid
      console.log("decorations, FYI:");
      console.log(decorations);
      console.log("terrainGrid, FYI:");
      console.log(terrainGrid);
  }
}




// Create a basic SVG map with noise-based terrain
function createSVGMap() {
  console.log("Entering createSVGMap...");
  const svgNS = "http://www.w3.org/2000/svg";
  let mapDiv = document.getElementById('map');
  // Create an SVG element
  let svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "1200");
  svg.setAttribute("height", "1200");
  // Position the SVG
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.zIndex = "1"; // Ensure it's below the mini-cell
  // Use a 2D array to store terrain types.
  terrainGrid = Array(40).fill(null).map(() => Array(40).fill(null));
  // Generate noise-based terrain with added terrains
  terrainGrid = populateTerrainGrid(terrainGrid, ultraRareTerrains);
  //const terrainGridBefore = createDeepCopy(terrainGrid);
  //console.log("pre-cellular grid:");
  //console.log(terrainGridBefore);
  terrainGrid = applyCellularAutomatonRules(terrainGrid);
  terrainGrid = applyCellularAutomatonRules(terrainGrid); // apply twice!
  //const terrainGridAfterCellular = createDeepCopy(terrainGrid);
  //console.log("Grid after 2 x cellular automaton rules")
  //console.log(terrainGridAfterCellular)
  terrainGrid = refineTerrain(terrainGrid, 50); 
  //const terrainGridAfterRefine = createDeepCopy(terrainGrid);
  //console.log("Grid after running refineTerrain:");
  //console.log(terrainGridAfterRefine);
  terrainGrid = alignMapRows(terrainGrid);
  //const terrainGridAfter1xAlign = createDeepCopy(terrainGrid);
  //console.log("post-1 x align:");
  //console.log(terrainGridAfter1xAlign);
  terrainGrid = alignMapRows(terrainGrid);
  terrainGrid = alignMapRows(terrainGrid);
  //const terrainGridAfter3xAlign = createDeepCopy(terrainGrid);
  //console.log("post 3x align:");
  //console.log(terrainGridAfter3xAlign);
  terrainGrid = balanceTerrain(terrainGrid);
  //const terrainGridAfterBalance = createDeepCopy(terrainGrid);
  //console.log("post-balance grid:");
  //console.log(terrainGridAfterBalance);
  // draws the actual SVG map pieces (tiles)
  drawSVGMap(terrainGrid, svg, svgNS); 
  const fungiTile = getRandomFungiTile(terrainGrid); // select a tile for the fungi
  // Call the function to place decorations after terrain is generated
  console.log("Starting decoration placement...");
  placeWaterDecorations(svg, svgNS, terrainGrid); // Pebbles, waves...
  placeIcyLandDecorations(svg, svgNS, terrainGrid); // Ice cave, TBD...
  placeDecorations(svg, svgNS, terrainGrid, fungiTile); // Flowers, rocks...
  placeDesertDecorations(svg, svgNS, terrainGrid); // Dunes, and "Solara"... 
  placeSwampDecorations(svg, svgNS, terrainGrid); // Dark patches, reeds...
  for (let x = 0; x < 1200; x += 30) {
    for (let y = 0; y < 1200; y += 30) {
      const tileX = x / 30;
      const tileY = y / 30;
      if (terrainGrid[tileY][tileX] === 'forest') {
        if (tileX === fungiTile.x && tileY === fungiTile.y) {
          // This is the special fungi tile, so don't draw trees here
          decorations.push({ type: 'fungi', x: x, y: y });
          console.log("DEV NOTE: fungus is at:"+x+" and: "+y);
        } else {
          createForestTrees(x, y, svg, svgNS); // Draw trees on other forest tiles
        }
      }
    }
  }
  placeMountainDecorations(svg, svgNS, terrainGrid); // Snow caps, rocky outcrops... 
  console.log("Finished decoration placement...");
  // Mountain Decorations are intentionally called AFTER trees generation to ensure mountains are not drawn under trees
  // Append the generated SVG to the map div
  console.log("Appending SVG to map...");
  mapDiv.appendChild(svg);
  // Convert the SVG to a PNG and replace the SVG with the PNG image
  convertSVGtoPNG(svg, mapDiv);
  // Create the fog of war to cover the entire map
  initializeFogOfWar(mapDiv);
  // Reveal a small portion of the map around the mini-cell's starting position
  // You can customize this to reveal a larger or different shaped area if desired
  // Get the current position of the mini-cell
  var minicell = document.getElementById('cell-icon');
  let currentLeft = parseFloat(window.getComputedStyle(minicell).left);
  let currentTop = parseFloat(window.getComputedStyle(minicell).top);
  // Calculate the top-left and bottom-right corners of the 30x30 square that the mini-cell is centered in
  let startX = currentLeft - 15; 
  let startY = currentTop - 15;
  let endX = currentLeft + 15;
  let endY = currentTop + 15;
  // You can use the startX, startY, and endX, endY variables to calculate which 
  // portion of the fog should be removed or reduced in opacity. This can be done
  // using various techniques, such as manipulating the CSS or using an SVG mask.
  // For simplicity, we'll just remove a small square of fog around the mini-cell's
  // starting position:
  let fog = document.getElementById('fog-of-war');
  fog.style.clipPath = `polygon(
      0% 0%, 
      100% 0%, 
      100% 100%, 
      0% 100%, 
      0% ${endY}px, 
      ${endX}px ${endY}px, 
      ${endX}px ${startY}px, 
      ${startX}px ${startY}px, 
      ${startX}px ${endY}px, 
      0% ${endY}px
  )`;
  console.log("Exiting createSVGMap...");
}


function createDeepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}


// Simple population of terrainGrid, pre-cellular automata rules
function populateTerrainGrid(terrainGrid, ultraRareTerrains) {
  for (let x = 0; x < 40; x++) {
    for (let y = 0; y < 40; y++) {
      let noiseValue = Math.random();
      let ultraRareTerrain = ultraRareTerrains.find(t => t.location.x === x * 30 && t.location.y === y * 30);
      if (ultraRareTerrain) {
        terrainGrid[y][x] = ultraRareTerrain.type;
      } else if (noiseValue < 0.35) {
        terrainGrid[y][x] = 'water';
      } else if (noiseValue < 0.55) {
        terrainGrid[y][x] = 'land';
      } else if (noiseValue < 0.7) {
        terrainGrid[y][x] = 'mountain';
      } else if (noiseValue < 0.8) {
        terrainGrid[y][x] = 'forest';
      } else if (noiseValue < 0.85) {
        terrainGrid[y][x] = 'swamp';
      } else if (noiseValue < 0.9) {
        terrainGrid[y][x] = 'desert';
      } else {
        terrainGrid[y][x] = 'icy_land';
      }
    }
  }
  return terrainGrid;
}


// Draws the terrainGrid
function drawSVGMap(terrainGrid, svg, svgNS) {
  for (let x = 0; x < 40; x++) {
    for (let y = 0; y < 40; y++) {
      let rect = document.createElementNS(svgNS, 'rect');
      let terrainType = terrainGrid[y][x];
      let color = getColorForTerrain(terrainType);  // Assume a function that returns the color
      rect.setAttribute('fill', color);
      rect.setAttribute('x', x * 30);
      rect.setAttribute('y', y * 30);
      rect.setAttribute('width', 30);
      rect.setAttribute('height', 30);
      svg.appendChild(rect);
      // Check for ultra-rare terrain and draw patterns
      if (['volcano', 'oasis', 'ancient_ruin'].includes(terrainType)) {
        createTerrainPattern(terrainType, x * 30, y * 30, svg, svgNS);
        console.log("Drawing ultra rare terrain:"+terrainType+" at:"+x * 30+" and y:"+y * 30);
      }
    }
  }
}




function getColorForTerrain(terrainType) {
  const colorMapping = {
    'water': 'deepskyblue',
    'land': 'forestgreen',
    'mountain': 'sienna',
    'forest': 'forestgreen',
    'swamp': '#6B4226',
    'desert': '#F4A460',
    'icy_land': '#ADD8E6',
    'volcano': '#4D2A12',          // Set the color for Volcano
    'oasis': '#F4A460',            // Set the color for Oasis
    'ancient_ruin': '#B80FAA',     // Set the color for Ancient Ruin
  };
  
  // Fallback color if terrainType is not found in the mapping
  const fallbackColor = 'gray';
  return colorMapping[terrainType] || fallbackColor;
}






function applyCellularAutomatonRules(terrainGrid) {
  const ultraRareTerrains = ['volcano', 'ancient_ruin', 'oasis']; // Add this array to identify ultra-rare terrains
  console.log("Starting cellular automation rules");
  const numRows = terrainGrid.length;
  const numCols = terrainGrid[0].length;
  const chunkSize = 8; // Fixed chunk size for testing
  const rowsToProcess = Array.from({ length: numRows }, (_, index) => index);
  for (const row of rowsToProcess) {
    // Iterate through chunks
    for (let col = 0; col < numCols; col += chunkSize) {
      const chunk = terrainGrid[row].slice(col, col + chunkSize);
      // Check if a swap is needed in this chunk
      let swapNeeded = false;
      let chunkCopy; // Declare chunkCopy outside the if block
      // Iterate through the chunk to find land types to swap
      for (let i = 0; i < chunk.length - 1; i++) {
        const currentLand = chunk[i];
        const nextLand = chunk[i + 1];
        // Prevent swapping of ultra-rare terrains
        if (ultraRareTerrains.includes(currentLand) || ultraRareTerrains.includes(nextLand)) {
          continue;
        }
        // Check if swapping these two lands will create a larger group
        if (currentLand !== nextLand) {
          swapNeeded = true;
          chunkCopy = chunk.slice(); // Create a copy of the chunk
          chunkCopy[i] = nextLand;
          chunkCopy[i + 1] = currentLand;
          break; // Only one swap per chunk
        }
      }
      // Apply the swap if needed
      if (swapNeeded) {
        terrainGrid[row].splice(col, chunkSize, ...chunkCopy);
      }
    }
  }
  return terrainGrid;
}



// The Refine Terrain function loops over each row, and swaps one tile per row, per iteration in order to create
// larger land-masses and larger water bodies
function refineTerrain(terrainGrid, iterations) {
  const ultraRareTerrains = ['volcano', 'ancient_ruin', 'oasis'];
  for (let iter = 0; iter < iterations; iter++) {
    // Iterate over each row
    for (let row = 0; row < terrainGrid.length; row++) {
      let bestSwapIndex = -1;
      let bestSwapType = null;
      let bestSwapScore = -1;
      // Iterate over each tile in the row
      for (let col = 0; col < terrainGrid[row].length; col++) {
        const currentTile = terrainGrid[row][col];
        
        // Skip ultra-rare terrains
        if (ultraRareTerrains.includes(currentTile)) continue;
        
        // We're only interested in 'water' or 'icy_land'
        if (currentTile !== 'water' && currentTile !== 'icy_land') continue;
        
        let score = 0;
        // Check neighbors horizontally
        if (col > 0) {
          score += terrainGrid[row][col - 1] === currentTile ? 1 : -1;
        }
        if (col < terrainGrid[row].length - 1) {
          score += terrainGrid[row][col + 1] === currentTile ? 1 : -1;
        }
        
        // Update best swap if this tile's score is worse than the current best
        if (score < bestSwapScore || bestSwapScore === -1) {
          bestSwapIndex = col;
          bestSwapType = currentTile;
          bestSwapScore = score;
        }
      }
      
      // Perform the swap
      if (bestSwapIndex !== -1 && !ultraRareTerrains.includes(terrainGrid[row][bestSwapIndex])) {
        // Find a tile to swap with; it should be different from bestSwapType and not an ultra-rare terrain
        for (let swapCol = 0; swapCol < terrainGrid[row].length; swapCol++) {
          const swapTile = terrainGrid[row][swapCol];
          if (swapTile !== bestSwapType && !ultraRareTerrains.includes(swapTile)) {
            // Swap tiles
            [terrainGrid[row][bestSwapIndex], terrainGrid[row][swapCol]] = [terrainGrid[row][swapCol], terrainGrid[row][bestSwapIndex]];
            break;
          }
        }
      }
    }
  }
  return terrainGrid;
}





// Function to better align water bodies in the map
function alignMapRows(terrainGrid) {
  const ultraRareTerrains = ['volcano', 'ancient_ruin', 'oasis'];
  // Iterate through the first 39 rows
  for (let row = 0; row < terrainGrid.length - 1; row++) {
    let bestShift = 0;
    let bestScore = -1;
    // Try shifting the row below by -5 to 5 positions
    for (let shift = -5; shift <= 5; shift++) {
      let score = 0;
      // Compare the two rows with the applied shift
      for (let col = 0; col < terrainGrid[row].length; col++) {
        const currentTile = terrainGrid[row][col];
        const shiftedCol = col + shift;
        if (shiftedCol < 0 || shiftedCol >= terrainGrid[row].length) continue;
        const belowTile = terrainGrid[row + 1][shiftedCol];
        if (currentTile === belowTile && !ultraRareTerrains.includes(currentTile)) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestShift = shift;
      }
    }
    // Apply the best shift to the row below, while avoiding ultra-rare terrains
    if (bestShift !== 0) {
      const newRow = Array(terrainGrid[row].length).fill(null);
      const ultraRarePositions = [];
      // Mark ultra-rare terrain positions
      for (let col = 0; col < terrainGrid[row].length; col++) {
        if (ultraRareTerrains.includes(terrainGrid[row + 1][col])) {
          ultraRarePositions.push(col);
        }
      }
      for (let col = 0; col < terrainGrid[row].length; col++) {
        const shiftedCol = col - bestShift;
        if (shiftedCol >= 0 && shiftedCol < terrainGrid[row].length) {
          if (!ultraRareTerrains.includes(terrainGrid[row + 1][col])) {
            newRow[shiftedCol] = terrainGrid[row + 1][col];
          }
        }
      }
      // Fill in any null values
      for (let col = 0; col < newRow.length; col++) {
        if (newRow[col] === null) {
          newRow[col] = terrainGrid[row + 1][col];
        }
      }
      // Restore ultra-rare terrains to their original positions
      for (const pos of ultraRarePositions) {
        newRow[pos] = terrainGrid[row + 1][pos];
      }
      terrainGrid[row + 1] = newRow;
    }
  }
  return terrainGrid;
}


// Balances water better accross the map, so that large water bodies aren't always just on the left side of the map
function balanceTerrain(terrainGrid) {
  const ultraRareTerrains = ['volcano', 'ancient_ruin', 'oasis'];
  const originalUltraRare = new Set();
  for (let row = 0; row < terrainGrid.length; row++) {
    let sumOfPositions = 0;
    let count = 0;
    //console.log(`Row ${row} Original: ${JSON.stringify(terrainGrid[row])}`);
    // Track original ultra-rare terrains
    originalUltraRare.clear();
    for (let col = 0; col < terrainGrid[row].length; col++) {
      if (ultraRareTerrains.includes(terrainGrid[row][col])) {
        originalUltraRare.add(col);
      }
    }
    //console.log(`Row ${row} Original Ultra-Rare Positions: ${Array.from(originalUltraRare).toString()}`);
    // Calculate 'center of mass'
    for (let col = 0; col < terrainGrid[row].length; col++) {
      const currentTile = terrainGrid[row][col];
      if (currentTile === 'water' || currentTile === 'icy_land') {
        sumOfPositions += col;
        count++;
      }
    }
    if (count === 0) continue;
    const centerOfMass = sumOfPositions / count;
    const targetCenter = terrainGrid[row].length / 2;
    const shift = Math.round(targetCenter - centerOfMass);
    const newRow = Array(terrainGrid[row].length).fill(null);
    // Shift terrains
    for (let col = 0; col < terrainGrid[row].length; col++) {
      const shiftedCol = (col + shift + terrainGrid[row].length) % terrainGrid[row].length;
      newRow[shiftedCol] = terrainGrid[row][col];
    }
    //console.log(`Row ${row} After Shift: ${JSON.stringify(newRow)}`);
    // Check for lost ultra-rare terrains and preserve them if lost
    for (let originalPos of originalUltraRare) {
      const shiftedPos = (originalPos + shift + terrainGrid[row].length) % terrainGrid[row].length;
      newRow[shiftedPos] = terrainGrid[row][originalPos];
    }
    //console.log(`Row ${row} Final: ${JSON.stringify(newRow)}`);
    terrainGrid[row] = newRow;
  }
  return terrainGrid;
}








// Function to update fog of war throughout exploration
function updateFogOfWar(x, y) {
    let fog = document.getElementById('fog-of-war');
    if (!fog) return;
    exploredAreas.push({ x, y });  // Add the current area to the list
    // Check for achievement unlocks based on the number of explored areas
    let numExplored = exploredAreas.length;
    if (numExplored === 2) {
        unlockAchievement(11);
    } else if (numExplored === 100) {
        unlockAchievement(12);
    } else if (numExplored === 1000) {
        unlockAchievement(13);
    } else if (numExplored === 1600) {
        unlockAchievement(14);
        displayUniverseCallModal(); // display the soul modal for 100% world discovery
        addToResearchQueue('HarmonicSymbiosisI');
        addToResearchQueue('EclipticSynthesis');
    }
    let polygons = [];  // This will hold all polygon definitions for the clip path
    for (let area of exploredAreas) {
        // Calculate the top-left and bottom-right corners of the 10x10 square around the given coordinates
        let startX = area.x - 15;
        let startY = area.y - 15;
        let endX = area.x + 15;
        let endY = area.y + 15;
        // Add this area's polygon to the list
        polygons.push(`
            0% ${endY}px, 
            ${endX}px ${endY}px, 
            ${endX}px ${startY}px, 
            ${startX}px ${startY}px, 
            ${startX}px ${endY}px, 
            0% ${endY}px
        `);
    }
    // Update the clipPath to reveal all areas
    fog.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, ${polygons.join(', ')})`;
}

function initializeFogOfWar(map) {
    // Check if a 'fog-of-war' div already exists
    let existingFog = document.getElementById('fog-of-war');
    if (existingFog) {
        // Remove the existing 'fog-of-war' div and create a new one
        existingFog.parentNode.removeChild(existingFog);
    }
    // Create a new 'fog-of-war' div
    let fog = document.createElement('div');
    fog.id = 'fog-of-war';
    fog.style.position = 'absolute';
    fog.style.width = '1200px';
    fog.style.height = '1200px';
    fog.style.backgroundColor = 'rgba(221, 221, 221, 1)'; // Adjust as needed
    fog.style.zIndex = '2';
    map.appendChild(fog);
}

function convertSVGtoPNG(svg, mapDiv) {
  // Convert the SVG to a PNG and replace the SVG with the PNG image
  // This gives us a major performance improvement, as we avoid drawing 1600 individual tile SVGs...
  var serializer = new XMLSerializer();
  var svgString = serializer.serializeToString(svg);
  var dataURL = 'data:image/svg+xml;base64,' + btoa(svgString);
  var svgImage = new Image();
  svgImage.src = dataURL;
  svgImage.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(svgImage, 0, 0);
    var pngDataURL = canvas.toDataURL('image/png');
    var pngImage = new Image();
    pngImage.src = pngDataURL;
    pngImage.draggable = false; // prevent browser-drag
    pngImage.style.imageRendering = 'pixelated'; // Alternative is: 'crisp-edges'
    mapDiv.removeChild(svg);
    mapDiv.appendChild(pngImage);
  };
}

function getRandomFungiTile(terrainGrid) {
  let fungiX, fungiY;
  do {
    fungiX = Math.floor(Math.random() * terrainGrid.length);
    fungiY = Math.floor(Math.random() * terrainGrid[0].length);
  } while (terrainGrid[fungiY][fungiX] !== 'forest');
  return { x: fungiX, y: fungiY };
}


function generateUltraRareTerrain() {
  // Clear existing terrains if any
  ultraRareTerrains = [];
  // Define ultra-rare terrains and their locations
  const newUltraRareTerrains = [
    { type: 'volcano', color: '#4D2A12', location: null },
    { type: 'oasis', color: '#F4A460', location: null },
    { type: 'ancient_ruin', color: '#B80FAA', location: null }
  ];
  newUltraRareTerrains.forEach(terrain => {
    let unique = false;
    let attempts = 0; // Add a counter for debugging
    while (!unique) {
      attempts++; // Increment the counter
      const x = Math.floor(Math.random() * 40) * 30;
      const y = Math.floor(Math.random() * 40) * 30;
      // Check if this location is not already taken by another ultra-rare terrain
      // And ensure it's not too close to the center
      if (!ultraRareTerrains.some(t => t.location && t.location.x === x && t.location.y === y) &&
        (x < 450 || x > 750 || y < 450 || y > 750)) {
        terrain.location = { x, y };
        unique = true;
      }
      
      // Break out of the loop after a certain number of attempts, for debugging
      if (attempts > 10000) {
        console.error("Too many attempts to place", terrain.type);
        break;
      }
    }
    ultraRareTerrains.push(terrain);
  });
}



// A function to create a pattern for our rare terrains
function createTerrainPattern(terrainType, x, y, svg, svgNS) {
    switch (terrainType) {
        case 'volcano':
            console.log('Drawing volcano at X:'+x+" and Y:"+y);
            const seed = Math.floor(Math.random() * 10);
            // Create radial gradient for the volcano
            let volcanoRadialGradient = document.createElementNS(svgNS, 'radialGradient');
            volcanoRadialGradient.setAttribute('id', 'volcanoRadialGradient');
            volcanoRadialGradient.setAttribute('cx', '50%');
            volcanoRadialGradient.setAttribute('cy', '50%');
            volcanoRadialGradient.setAttribute('r', '50%');
            volcanoRadialGradient.setAttribute('fx', '50%');
            volcanoRadialGradient.setAttribute('fy', '50%');
            let startStopVolcano = document.createElementNS(svgNS, 'stop');
            startStopVolcano.setAttribute('offset', '60%');
            startStopVolcano.setAttribute('style', 'stop-color:#E30000;stop-opacity:1'); // Darker shade
            volcanoRadialGradient.appendChild(startStopVolcano);
            let endStopVolcano = document.createElementNS(svgNS, 'stop');
            endStopVolcano.setAttribute('offset', '100%');
            endStopVolcano.setAttribute('style', 'stop-color:#800000;stop-opacity:1'); // Original shade
            volcanoRadialGradient.appendChild(endStopVolcano);
            svg.appendChild(volcanoRadialGradient);
            // Create irregular shape for the volcano
            let volcanoRadius = 14;  // Increased radius for more visibility
            let dVolcano = [
              "M", x + 5, y + 15,  // Start at a similar point as the Oasis
              "A", 10, 10, 0, 0, 1, x + 15, y + 5,  // Arc to point
              "C", x + 25 + seed, y + 5, x + 25 + seed, y + 25, x + 15, y + 25,  // Cubic Bezier curve to point
              "A", 10, 10, 0, 0, 1, x + 5, y + 15,  // Arc to point
              "Z"  // Close path
            ].join(" ");
            let volcanoMouth = document.createElementNS(svgNS, 'path');
            volcanoMouth.setAttribute('d', dVolcano);  // Set the path data
            volcanoMouth.setAttribute('fill', 'url(#volcanoRadialGradient)');
            volcanoMouth.setAttribute('stroke', '#000'); // Volcano rim
            volcanoMouth.setAttribute('stroke-width', '1'); // Width of the rim
            svg.appendChild(volcanoMouth);
            for(let i = 0; i < 5; i++) { // Add 5 dots for irregularity
                let dot = document.createElementNS(svgNS, 'circle');
                let dotX = x + 10 + Math.floor(Math.random() * 10); // Randomly place within the red area
                let dotY = y + 10 + Math.floor(Math.random() * 10); // Randomly place within the red area
                dot.setAttribute('cx', dotX);
                dot.setAttribute('cy', dotY);
                dot.setAttribute('r', 0.3); 
                dot.setAttribute('fill', '#800000'); // Darker color
                svg.appendChild(dot);
            }
            break;
        case 'oasis':
            console.log('Drawing oasis at X:'+x+" and Y:"+y);
            // Create and append the turbulence filter for the oasis if it hasn't been added yet
            if (!document.getElementById("oasisTurbulence")) {
              const defs = document.createElementNS(svgNS, 'defs');
              const filter = document.createElementNS(svgNS, 'filter');
              filter.setAttribute('id', 'oasisFilter');
              filter.setAttribute('x', '-50%');
              filter.setAttribute('y', '-50%');
              filter.setAttribute('width', '200%');
              filter.setAttribute('height', '200%');
              const feTurbulence = document.createElementNS(svgNS, 'feTurbulence');
              feTurbulence.setAttribute('id', 'oasisTurbulence');
              feTurbulence.setAttribute('type', 'fractalNoise');
              feTurbulence.setAttribute('baseFrequency', '0.1');
              feTurbulence.setAttribute('numOctaves', '1');
              feTurbulence.setAttribute('seed', '2');
              const feDisplacementMap = document.createElementNS(svgNS, 'feDisplacementMap');
              feDisplacementMap.setAttribute('in', 'SourceGraphic');
              feDisplacementMap.setAttribute('in2', 'oasisTurbulence');
              feDisplacementMap.setAttribute('scale', '2');
              feDisplacementMap.setAttribute('xChannelSelector', 'R');
              feDisplacementMap.setAttribute('yChannelSelector', 'G');
              filter.appendChild(feTurbulence);
              filter.appendChild(feDisplacementMap); 
              defs.appendChild(filter);
              svg.appendChild(defs);
            }
            let radialGradient = document.createElementNS(svgNS, 'radialGradient');
            radialGradient.setAttribute('id', 'oasisRadialGradient');
            radialGradient.setAttribute('cx', '50%');
            radialGradient.setAttribute('cy', '50%');
            radialGradient.setAttribute('r', '50%');
            radialGradient.setAttribute('fx', '50%');
            radialGradient.setAttribute('fy', '50%');
            let startStop = document.createElementNS(svgNS, 'stop');
            startStop.setAttribute('offset', '40%');
            startStop.setAttribute('style', 'stop-color:#009EAE;stop-opacity:1');
            radialGradient.appendChild(startStop);
            let endStop = document.createElementNS(svgNS, 'stop');
            endStop.setAttribute('offset', '100%');
            endStop.setAttribute('style', 'stop-color:#00FFE5;stop-opacity:1');
            radialGradient.appendChild(endStop);
            svg.appendChild(radialGradient);
            // Create an SVG path element for the irregular shape
            let d = [
              "M", x + 5, y + 15,  // Move to initial point
              "A", 10, 10, 0, 0, 1, x + 15, y + 5,  // Arc to point
              "C", x + 25, y + 5, x + 25, y + 25, x + 15, y + 25,  // Cubic Bezier curve to point, creating a dent
              "A", 10, 10, 0, 0, 1, x + 5, y + 15,  // Arc to point
              "Z"  // Close path
            ].join(" ");
            let water = document.createElementNS(svgNS, 'path');
            water.setAttribute('d', d);  // Set the path data
            water.setAttribute('fill', 'url(#oasisRadialGradient)');
            water.setAttribute('filter', 'url(#oasisFilter)');
            svg.appendChild(water);
            break;
        case 'ancient_ruin':
            console.log('Drawing ancient_ruin at X:'+x+" and Y:"+y);
            let ruinSymbol = document.createElementNS(svgNS, 'rect');
            ruinSymbol.setAttribute('x', x + 9); // Updated
            ruinSymbol.setAttribute('y', y + 9); // Updated
            ruinSymbol.setAttribute('width', 12); // Updated
            ruinSymbol.setAttribute('height', 12); // Updated
            ruinSymbol.setAttribute('fill', 'gold');
            svg.appendChild(ruinSymbol);
            break;
    }
}








// Function to create tries onto maps 
function createForestTrees(x, y, svg, svgNS) {
    // Create and append the turbulence filter if it hasn't been added yet
    if (!document.getElementById("treeTurbulence")) {
        const defs = document.createElementNS(svgNS, 'defs');
        const filter = document.createElementNS(svgNS, 'filter');
        filter.setAttribute('id', 'treeFilter');
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');
        const feTurbulence = document.createElementNS(svgNS, 'feTurbulence');
        feTurbulence.setAttribute('id', 'treeTurbulence');
        feTurbulence.setAttribute('type', 'fractalNoise');
        feTurbulence.setAttribute('baseFrequency', '0.05'); // Adjusted for stronger effect
        feTurbulence.setAttribute('numOctaves', '1');
        feTurbulence.setAttribute('seed', '1');
        const feDisplacementMap = document.createElementNS(svgNS, 'feDisplacementMap');
        feDisplacementMap.setAttribute('in', 'SourceGraphic');
        feDisplacementMap.setAttribute('in2', 'treeTurbulence');
        feDisplacementMap.setAttribute('scale', '5');  // Adjusted for stronger effect
        feDisplacementMap.setAttribute('xChannelSelector', 'R');
        feDisplacementMap.setAttribute('yChannelSelector', 'G');
        filter.appendChild(feTurbulence);
        filter.appendChild(feDisplacementMap);
        defs.appendChild(filter);
        svg.appendChild(defs);
    }
    const numTrees = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numTrees; i++) {
        const treeSize = Math.random() * 6 + 3;
        const treeX = x + Math.random() * 30;
        const treeY = y + Math.random() * 30;
        const tree = document.createElementNS(svgNS, 'circle');
        // Randomize tree color to make it slightly darker and more natural
        let hue = 105 + (Math.random() * 20 - 10);  // Base hue for green is 120; adjust it to 110 for a darker shade and vary it by ±10
        let saturation = 50 + (Math.random() * 20 - 10);  // Vary saturation by ±10
        let lightness = 30 + (Math.random() * 10 - 5);  // Adjusted to 35 to make it darker, and vary lightness by ±5
        let treeColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        tree.setAttribute('cx', treeX);
        tree.setAttribute('cy', treeY);
        tree.setAttribute('r', treeSize); 
        tree.setAttribute('fill', treeColor);
        tree.setAttribute('stroke', '#004400'); // Add a very dark green outline
        tree.setAttribute('stroke-width', '1'); // 1px outline width
        tree.setAttribute('filter', 'url(#treeFilter)');  // Apply the filter for a natural edge
        svg.appendChild(tree);
    }
}


function placeDecorations(svg, svgNS, terrainGrid, fungiTile) {
    let potentialRiverPaths = [];
    let availableLandPatches = [];

    // Convert fungiTile coordinates to pixel coordinates
    let fungiTileX = fungiTile.x * 30;
    let fungiTileY = fungiTile.y * 30;
    // Step 1: Scan for potential river paths and store them (horizontal and vertical)
    for (let y = 1; y < terrainGrid.length - 4; y++) {
        for (let x = 1; x < terrainGrid[y].length - 1; x++) {
            if (x * 30 === 600 && y * 30 === 600) continue;
            // Check horizontal
            let horizontalPattern = terrainGrid[y].slice(x - 1, x + 4).join('');
            let landAndForestCountH = (horizontalPattern.match(/land|forest/g) || []).length;
            let icyLandCountH = (horizontalPattern.match(/icy_land/g) || []).length;
            if (horizontalPattern.startsWith('water') && horizontalPattern.endsWith('water') && landAndForestCountH === 3 && icyLandCountH === 0) {
                potentialRiverPaths.push({ x, y, direction: 'horizontal' });
            }
            // Check vertical
            let verticalPattern = [terrainGrid[y-1][x], terrainGrid[y][x], terrainGrid[y+1][x], terrainGrid[y+2][x], terrainGrid[y+3][x]].join('');
            let landAndForestCountV = (verticalPattern.match(/land|forest/g) || []).length;
            let icyLandCountV = (verticalPattern.match(/icy_land/g) || []).length;
            if (verticalPattern.startsWith('water') && verticalPattern.endsWith('water') && landAndForestCountV === 3 && icyLandCountV === 0) {
                potentialRiverPaths.push({ x, y, direction: 'vertical' });
            }
        }
    }
    // Step 2: Create the availableLandPatches array, excluding river paths and the fungiTile
    for (let y = 0; y < terrainGrid.length; y++) {
        for (let x = 0; x < terrainGrid[y].length; x++) {
            if (x * 30 === 600 && y * 30 === 600) continue;
            if (x * 30 === fungiTileX && y * 30 === fungiTileY) continue;  // Skip the fungiTile location

            let isRiverPath = potentialRiverPaths.some(path => x >= path.x && x <= (path.x + 3) && y === path.y);
            if (!isRiverPath && (terrainGrid[y][x] === 'land' || terrainGrid[y][x] === 'forest') && terrainGrid[y][x] !== 'icy_land') {
                availableLandPatches.push({ x, y });
            }
        }
    }
    // Step 3: Randomly place one river if possible
    if (potentialRiverPaths.length > 0) {
        let chosenRiver = potentialRiverPaths[Math.floor(Math.random() * potentialRiverPaths.length)];
        let riverDecorations = drawRiver(chosenRiver.x, chosenRiver.y, svg, svgNS, chosenRiver.direction);
        decorations.push(...riverDecorations);
        // New Step: Remove river path tiles from availableLandPatches with verbose logging
        let riverLength = (chosenRiver.direction === 'horizontal') ? 4 : 3;
        for (let i = 0; i < riverLength; i++) {
            let riverX = (chosenRiver.direction === 'horizontal') ? chosenRiver.x + i : chosenRiver.x;
            let riverY = (chosenRiver.direction === 'vertical') ? chosenRiver.y + i : chosenRiver.y;
            // Verbose logging
            console.log(`River placed on coordinates: x=${riverX}, y=${riverY}. Removing these coordinates from availableLandPatches.`);
            availableLandPatches = availableLandPatches.filter(patch => !(patch.x === riverX && patch.y === riverY));
        }
    }
    // Step 4: Shuffle the availableLandPatches to randomize selection
    availableLandPatches.sort(() => Math.random() - 0.5);
    // Step 5: Randomly place flowers, avoiding the fungiTile
    const flowerPatches = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < flowerPatches; i++) {
        const patch = availableLandPatches.pop();
        if (patch && (patch.x * 30 !== fungiTileX || patch.y * 30 !== fungiTileY)) {
            drawFlower(patch.x * 30, patch.y * 30, getBrightColor(), svg, svgNS, 6);
            decorations.push({ type: 'flower', x: patch.x * 30, y: patch.y * 30 });
        }
    }
    // Step 6: Randomly place rocks, avoiding the fungiTile
    const rockPatches = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < rockPatches; i++) {
        const patch = availableLandPatches.pop();
        if (patch && (patch.x * 30 !== fungiTileX || patch.y * 30 !== fungiTileY)) {
            drawRock(patch.x * 30, patch.y * 30, svg, svgNS);
            decorations.push({ type: 'rock', x: patch.x * 30, y: patch.y * 30 });
        }
    }
    console.log("Finished placing land decorations");
}



// Add flowers (for land tiles)
function drawFlower(x, y, color, svg, svgNS, flowerCount = 1) {
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElementNS(svgNS, 'circle');
        flower.setAttribute('cx', x + Math.random() * 30);
        flower.setAttribute('cy', y + Math.random() * 30);
        flower.setAttribute('r', 1.5 + Math.random() * 1.4);
        flower.setAttribute('fill', color);  // Color is set here
        svg.appendChild(flower);
    }
}

// Add rocks (for land tiles)
function drawRock(x, y, svg, svgNS) {
    const rock = document.createElementNS(svgNS, 'polygon');
    let points = [];
    const pointCount = Math.floor(Math.random() * 3) + 8;
    const sizeFactor = Math.random() * 0.3 + 0.7;
    // Generate gradient ID
    const gradientId = 'gradient-' + Math.random().toString(36).substr(2, 9);
    // Create gradient element
    const linearGradient = document.createElementNS(svgNS, 'linearGradient');
    linearGradient.setAttribute('id', gradientId);
    // Randomize gradient direction
    const x1 = Math.random();
    const y1 = Math.random();
    const x2 = 1 - x1;
    const y2 = 1 - y1;
    linearGradient.setAttribute('x1', x1);
    linearGradient.setAttribute('y1', y1);
    linearGradient.setAttribute('x2', x2);
    linearGradient.setAttribute('y2', y2);
    // Create stops for the gradient
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#A8A8A8');
    linearGradient.appendChild(stop1);
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#A1A1A1');
    linearGradient.appendChild(stop2);
    // Add gradient to SVG
    svg.appendChild(linearGradient);
    for (let i = 0; i < pointCount; i++) {
        const angle = (Math.PI * 2) * (i / pointCount);
        const radius = (Math.random() * 4 + 9) * sizeFactor;
        const pointX = x + 15 + Math.cos(angle) * radius;
        const pointY = y + 15 + Math.sin(angle) * radius;
        points.push(`${pointX},${pointY}`);
    }
    rock.setAttribute('points', points.join(' '));
    rock.setAttribute('fill', `url(#${gradientId})`);
    rock.setAttribute('stroke', '#707070');
    rock.setAttribute('stroke-width', '1');
    svg.appendChild(rock);
    // Add small darker pixels for texture
    for (let i = 0; i < 5; i++) {
        const px = document.createElementNS(svgNS, 'rect');
        const posX = x + 12 + Math.random() * 6;
        const posY = y + 12 + Math.random() * 6;
        px.setAttribute('x', posX);
        px.setAttribute('y', posY);
        px.setAttribute('width', '1');
        px.setAttribute('height', '1');
        px.setAttribute('fill', '#808080');
        svg.appendChild(px);
    }
}






// Function to draw a bendy river
function drawRiver(x, y, svg, svgNS, direction = 'horizontal') {
    let riverDecorations = [];
    let currentTileX = x;
    let currentTileY = y;
    let currentX = (direction === 'horizontal') ? x * 30 : x * 30 + 15; // Offset
    let currentY = (direction === 'horizontal') ? y * 30 + 15 : y * 30; // Offset
    const color = 'deepskyblue'; 
    const riverWidth = 5;
    const step = 10;

    // Initialize the path
    let path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', `M ${currentX} ${currentY}`);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', riverWidth);
    path.setAttribute('fill', 'none');
    // Initial coordinates before entering the loop
    let initialTileX = currentTileX;
    let initialTileY = currentTileY;
    // Capture the initial coordinates for riverDecorations
    for (let i = 0; i < 3; i++) { // Assuming you want to capture 3 tiles
        let riverDecoration;
        if (direction === 'horizontal') {
            riverDecoration = {
                type: 'river',
                x: (initialTileX + i) * 30,
                y: initialTileY * 30,
                direction
            };
        } else {
            riverDecoration = {
                type: 'river',
                x: initialTileX * 30,
                y: (initialTileY + i) * 30,
                direction
            };
        }
        riverDecorations.push(riverDecoration);
        console.log("Added riverDecoration:", riverDecoration);
    }
    const end = (direction === 'horizontal') ? currentX + 93 : currentY + 93;
    while ((direction === 'horizontal' && currentX < end) || (direction === 'vertical' && currentY < end)) {
        let controlX = currentX + (Math.random() - 0.5) * step;
        let controlY = currentY + (Math.random() - 0.5) * step;

        // Update for the next step
        if (direction === 'horizontal') {
            currentX += step;
            currentTileX++;
        } else {
            currentY += step;
            currentTileY++;
        }

        path.setAttribute('d', `${path.getAttribute('d')} Q ${controlX} ${controlY}, ${currentX} ${currentY}`);
      

    }

    svg.appendChild(path);
    console.log("Finished drawing river");
    return riverDecorations;
}




// The function to draw dark/muddy patches for swamps
function drawMuddyPatch(x, y, svg, svgNS) {
    // Create radial gradient for the muddy patch
    let patchRadialGradient = document.createElementNS(svgNS, 'radialGradient');
    patchRadialGradient.setAttribute('id', 'patchRadialGradient');
    patchRadialGradient.setAttribute('cx', '50%');
    patchRadialGradient.setAttribute('cy', '50%');
    patchRadialGradient.setAttribute('r', '50%');
    let startStop = document.createElementNS(svgNS, 'stop');
    startStop.setAttribute('offset', '60%');
    startStop.setAttribute('style', 'stop-color:#3B3B3B;stop-opacity:1'); // Original shade
    patchRadialGradient.appendChild(startStop);
    let endStop = document.createElementNS(svgNS, 'stop');
    endStop.setAttribute('offset', '100%');
    endStop.setAttribute('style', 'stop-color:#1B1B1B;stop-opacity:1'); // Darker shade
    patchRadialGradient.appendChild(endStop);
    svg.appendChild(patchRadialGradient);
  
    const patch = document.createElementNS(svgNS, 'ellipse');
    const centerX = x + 15; // Move towards the center of the square
    const centerY = y + 15; // Move towards the center of the square
    patch.setAttribute('cx', centerX);
    patch.setAttribute('cy', centerY);
    patch.setAttribute('rx', Math.random() * 9 + 3); // Updated ellipse x-radius
    patch.setAttribute('ry', Math.random() * 9 + 3); // Updated ellipse y-radius
    patch.setAttribute('fill', 'url(#patchRadialGradient)'); // Using the gradient
    patch.setAttribute('filter', 'url(#treeFilter)');  // Apply the filter for a natural edge

    svg.appendChild(patch);

    // Add 5 dots for additional texture
    for(let i = 0; i < 5; i++) {
        let dot = document.createElementNS(svgNS, 'circle');
        let dotX = centerX - 5 + Math.random() * 10; // Randomly place within the muddy patch
        let dotY = centerY - 5 + Math.random() * 10; // Randomly place within the muddy patch
        dot.setAttribute('cx', dotX);
        dot.setAttribute('cy', dotY);
        dot.setAttribute('r', 0.3); // 0.3px radius
        dot.setAttribute('fill', '#1B1B1B'); // Darker color
        svg.appendChild(dot);
    }
}


// The function to draw reeds/tall grass for swamps
function drawReed(x, y, svg, svgNS) {
    const reedStrands = Math.floor(Math.random() * 3) + 2; // Between 2 to 4 strands
    for (let i = 0; i < reedStrands; i++) {
        const reed = document.createElementNS(svgNS, 'line');
        // Ensure reeds aren't drawn on the outer left/right edges. Add a buffer of 6 pixels.
        const startX = x + 6 + Math.random() * 18;
        // Start slightly above the bottom of the tile (3 or 6 pixels up)
        const startY = y + 30 - (Math.random() * 6); 
        const endY = startY - (Math.random() * 15 + 6); // Updated growth upwards
        reed.setAttribute('x1', startX);
        reed.setAttribute('y1', startY);
        reed.setAttribute('x2', startX);
        reed.setAttribute('y2', endY);
        reed.setAttribute('stroke', '#2E8B57');  // A greenish shade for reeds
        reed.setAttribute('stroke-width', '1.5'); // Updated thin line to represent reed
        svg.appendChild(reed);
    }
}


// The function to place swamp decorations
function placeSwampDecorations(svg, svgNS, terrainGrid) {
    // Decide on the number of special swamp squares
    const muddyPatchCount = Math.floor(Math.random() * 4) + 2;  // 2 to 5
    const reedCount = Math.floor(Math.random() * 4) + 2;  // 2 to 5
    for (let i = 0; i < muddyPatchCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 40) * 30; // Updated to 30
            y = Math.floor(Math.random() * 40) * 30; // Updated to 30
            if ((x !== 600 || y !== 600) && terrainGrid[y/30][x/30] === 'swamp' && !decorations.some(d => d.x === x && d.y === y)) { // Updated condition
                chosen = true;
                decorations.push({ x, y, type: 'muddy_patch' });
                drawMuddyPatch(x, y, svg, svgNS);
            }
        }
    }
    for (let i = 0; i < reedCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 40) * 30; // Updated to 30
            y = Math.floor(Math.random() * 40) * 30; // Updated to 30
            if ((x !== 600 || y !== 600) && terrainGrid[y/30][x/30] === 'swamp' && !decorations.some(d => d.x === x && d.y === y)) { // Updated condition
                chosen = true;
                decorations.push({ x, y, type: 'reed' });
                drawReed(x, y, svg, svgNS);
            }
        }
    }
}




// The function to place mountain decorations
function placeMountainDecorations(svg, svgNS, terrainGrid) {
    const snowCapCount = Math.floor(Math.random() * 3) + 2;  // 2 to 4 tiles with snow caps
    const rockyOutcropCount = Math.floor(Math.random() * 3) + 2;  // 2 to 4 tiles with rocky outcrops
    for (let i = 0; i < snowCapCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 40) * 30; // Updated to 30
            y = Math.floor(Math.random() * 40) * 30; // Updated to 30
            if ((x !== 600 || y !== 600) && terrainGrid[y/30][x/30] === 'mountain' && !decorations.some(d => d.x === x && d.y === y)) { // Updated condition
                chosen = true;
                decorations.push({ x, y, type: 'snow_cap' });
                console.log("placing a snow_cap at:"+x+" and:"+y);
                // drawSnowCap(x, y, svg, svgNS); // Moved to post-render draw logic
            }
        }
    }
    for (let i = 0; i < rockyOutcropCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 40) * 30; // Updated to 30
            y = Math.floor(Math.random() * 40) * 30; // Updated to 30
            if ((x !== 600 || y !== 600) && terrainGrid[y/30][x/30] === 'mountain' && !decorations.some(d => d.x === x && d.y === y)) { // Updated condition
                chosen = true;
                decorations.push({ x, y, type: 'rocky_outcrop' });
                drawRockyOutcrop(x, y, svg, svgNS);
                console.log("I drew a rocky outcrop at X:"+x+" and Y:"+y);
            }
        }
    }
    console.log("Finished placing mountain decorations");
}


// Add snow cap to the mountain tile
function drawSnowCap(x, y, svg, svgNS, scale = 1) {
    // Create the outer group
    const snowCapGroup = document.createElementNS(svgNS, 'g');
    snowCapGroup.setAttribute('id', 'snowCap');
    snowCapGroup.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`); // position & scale
    const path1 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('style', 'fill:#818185;');
    path1.setAttribute('d', 'M15.257,437.796c-5.047,0-9.769-2.496-12.61-6.669c-2.841-4.172-3.436-9.48-1.587-14.177l93.294-237.053c2.296-5.835,7.927-9.67,14.198-9.67c6.269,0,11.902,3.835,14.198,9.67l101.498,257.899H15.257z');
    snowCapGroup.appendChild(path1);
    const path2 = document.createElementNS(svgNS, 'path');
    path2.setAttribute('style', 'fill:#555559;');
    path2.setAttribute('d', 'M108.551,437.796h115.695L122.749,179.898c-2.296-5.835-7.927-9.67-14.198-9.67V437.796z');
    snowCapGroup.appendChild(path2);
    const path3 = document.createElementNS(svgNS, 'path');
    path3.setAttribute('style', 'fill:#EFEFF0;');
    path3.setAttribute('d', 'M160.49,275.795l-37.742-95.897c-2.296-5.835-7.927-9.67-14.198-9.67c-6.27,0-11.902,3.835-14.198,9.67L56.61,275.795l26.515-21.415l25.423,36.43l28.299-21.248L160.49,275.795z');
    snowCapGroup.appendChild(path3);
    const path4 = document.createElementNS(svgNS, 'path');
    path4.setAttribute('style', 'fill:#818185;');
    path4.setAttribute('d', 'M110.95,437.796h231.067L239.594,257.135c-2.71-4.779-7.779-7.733-13.273-7.733s-10.563,2.953-13.273,7.733L110.95,437.796z');
    snowCapGroup.appendChild(path4);
    const path5 = document.createElementNS(svgNS, 'path');
    path5.setAttribute('style', 'fill:#DFDEE1;');
    path5.setAttribute('d', 'M122.749,179.898c-2.296-5.835-7.927-9.67-14.198-9.67V290.81l28.299-21.248l23.64,6.233L122.749,179.898z');
    snowCapGroup.appendChild(path5);
    const path6 = document.createElementNS(svgNS, 'path');
    path6.setAttribute('style', 'fill:#555559;');
    path6.setAttribute('d', 'M226.32,437.796h115.695L239.593,257.135c-2.71-4.779-7.779-7.733-13.273-7.733L226.32,437.796L226.32,437.796z');
    snowCapGroup.appendChild(path6);
    const path7 = document.createElementNS(svgNS, 'path');
    path7.setAttribute('style', 'fill:#EFEFF0;');
    path7.setAttribute('d', 'M278.131,325.111l-38.538-67.977c-2.71-4.779-7.779-7.733-13.273-7.733s-10.563,2.953-13.273,7.733 l-38.469,68.071l29.013-20.257l42.07,38.125L278.131,325.111z');
    snowCapGroup.appendChild(path7);
    const path8 = document.createElementNS(svgNS, 'path');
    path8.setAttribute('style', 'fill:#D9D8DB;');
    path8.setAttribute('d', 'M239.593,257.135c-2.71-4.779-7.779-7.733-13.273-7.733v76.146l19.34,17.526l32.472-17.963 L239.593,257.135z');
    snowCapGroup.appendChild(path8);
    const path9 = document.createElementNS(svgNS, 'path');
    path9.setAttribute('style', 'fill:#818185;');
    path9.setAttribute('d', 'M289.808,437.773l101.59-209.376c2.202-4.539,6.355-7.97,11.328-8.819 c6.82-1.164,13.405,2.337,16.335,8.367l92.635,190.635c1.98,11.18-5.979,19.217-15.038,19.217L289.808,437.773z');
    snowCapGroup.appendChild(path9);
    const path10 = document.createElementNS(svgNS, 'path');
    path10.setAttribute('style', 'fill:#555559;');
    path10.setAttribute('d', 'M510.378,415.871L419.06,227.944c-2.553-5.254-7.882-8.589-13.723-8.589v218.441h91.318 c5.257,0,10.143-2.707,12.932-7.162C512.378,426.178,512.677,420.6,510.378,415.871z');
    snowCapGroup.appendChild(path10);
    const path11 = document.createElementNS(svgNS, 'path');
    path11.setAttribute('style', 'fill:#EFEFF0;');
    path11.setAttribute('d', 'M457.332,306.707l-38.272-78.762c-2.553-5.254-7.882-8.589-13.723-8.589 c-5.841,0-11.17,3.335-13.723,8.589L353.38,306.75l25.06-15.939l26.897,47.271l11.229-37.077l26.294,5.701H457.332z');
    snowCapGroup.appendChild(path11);
    const path12 = document.createElementNS(svgNS, 'path');
    path12.setAttribute('style', 'fill:#D9D8DB;');
    path12.setAttribute('d', 'M419.06,227.944c-2.553-5.254-7.882-8.589-13.723-8.589l0.019,119.475l11.209-37.825l26.294,5.701 h14.474L419.06,227.944z');
    snowCapGroup.appendChild(path12);
    // Append the entire group to the SVG
    svg.appendChild(snowCapGroup);
}



// Add rocky outcrops to the mountain tile
function drawRockyOutcrop(x, y, svg, svgNS) {
    const rockCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 rocks
    for (let i = 0; i < rockCount; i++) {
        // Create a "path" element to hold our rock's shape
        const rock = document.createElementNS(svgNS, 'path');
        // Random offsets for a natural shape, but constrained within the 30x30 tile
        const offsetX = x + Math.random() * 15 + 5; // between x+5 and x+20
        const offsetY = y + Math.random() * 15 + 5; // between y+5 and y+20
        // Generate a random rock shape using cubic Bezier curves, constrained within the tile, and even larger
        const d = [
            `M ${offsetX} ${offsetY}`,
            `c ${Math.random() * 10 - 5} ${Math.random() * -5} ${Math.random() * 10} ${Math.random() * 5} ${Math.random() * 10 + 6} ${Math.random() * 5}`,
            `s ${Math.random() * -5} ${Math.random() * 10 + 6} ${Math.random() * -5} ${Math.random() * 5}`,
            `s ${Math.random() * -10} ${Math.random() * -5} ${Math.random() * -10} ${Math.random() * -5}`,
            `s ${Math.random() * 5} ${Math.random() * -10} ${Math.random() * 5} ${Math.random() * -5}`,
            `Z`
        ].join(' ');
        rock.setAttribute('d', d);
        // Gray fill for the rock
        rock.setAttribute('fill', '#808080');
        // Slightly darker outline for the rock
        rock.setAttribute('stroke', '#606060'); // A bit darker than before
        rock.setAttribute('stroke-width', '0.5');
        // Append the rock to the SVG
        svg.appendChild(rock);
    }
}



// Function to add decorations to DESERT tiles (sand dunes, lone cactus...)
function placeDesertDecorations(svg, svgNS, terrainGrid) {
    const dunePatches = 4 + Math.floor(Math.random() * 3); // 4-6 dune patches
    let availableDesertPatches = [];
    let saltFlatCandidates = [];
    for (let x = 0; x < terrainGrid.length; x++) {
        for (let y = 0; y < terrainGrid[x].length; y++) {
            if (terrainGrid[y][x] === 'desert' && !(x * 30 === 600 && y * 30 === 600)) {
                const waterSide = checkAdjacentWaterTiles(x, y, terrainGrid);
                if (waterSide) {
                    saltFlatCandidates.push({ x, y, waterSide });
                } else {
                    availableDesertPatches.push({ x, y });
                }
            }
        }
    }
    // Shuffle the availableDesertPatches to randomize selection
    availableDesertPatches.sort(() => Math.random() - 0.5);
    for (let i = 0; i < dunePatches; i++) {
        const patch = availableDesertPatches.pop();
        drawSandDune(patch.x * 30, patch.y * 30, svg, svgNS); // Updated for 30x30
        decorations.push({ type: 'sand_dune', x: patch.x * 30, y: patch.y * 30 }); // Updated for 30x30
    }
    // Draw the lone cactus
    let cactusPatch = availableDesertPatches.pop();
    // Ensure the cactus isn't drawn on the starting tile
    while (cactusPatch.x * 30 === 600 && cactusPatch.y * 30 === 600) { // Updated for 30x30
        cactusPatch = availableDesertPatches.pop();
    }
    // Process for salt flats
    saltFlatCandidates.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 3 && i < saltFlatCandidates.length; i++) {
        const patch = saltFlatCandidates.pop();
        drawSaltFlat(patch.x * 30, patch.y * 30, patch.waterSide, svg, svgNS);
        decorations.push({ type: 'salt_flat', x: patch.x * 30, y: patch.y * 30, waterSide: patch.waterSide });
    }
    decorations.push({ type: 'solara', x: cactusPatch.x * 30, y: cactusPatch.y * 30 }); // Updated for 30x30
    console.log("DEV NOTE, REMOVE THIS: Solara is at:"+cactusPatch.x * 30+" and: "+cactusPatch.y * 30);
    console.log("Finished placing desert decorations");
}


// Function to check for adjacent water tiles
function checkAdjacentWaterTiles(x, y, terrainGrid) {
    const directions = {
        north: y > 0 ? terrainGrid[y - 1][x] : null,
        east: x < terrainGrid[0].length - 1 ? terrainGrid[y][x + 1] : null,
        south: y < terrainGrid.length - 1 ? terrainGrid[y + 1][x] : null,
        west: x > 0 ? terrainGrid[y][x - 1] : null
    };
    return Object.keys(directions).find(direction => directions[direction] === 'water') || null;
}


// Function to draw salt flats
function drawSaltFlat(x, y, waterSide, svg, svgNS) {
    const saltPixels = Math.floor(Math.random() * 20) + 10; // Between 10 to 30 salt pixels
    for (let i = 0; i < saltPixels; i++) {
        const salt = document.createElementNS(svgNS, 'rect');
        let saltX, saltY;
        switch (waterSide) {
            case 'north':
                saltX = x + Math.random() * 30;
                saltY = y + Math.random() * 5; // Salt on the upper edge
                break;
            case 'east':
                saltX = x + 25 + Math.random() * 5;
                saltY = y + Math.random() * 30; // Salt on the right edge
                break;
            case 'south':
                saltX = x + Math.random() * 30;
                saltY = y + 25 + Math.random() * 5; // Salt on the lower edge
                break;
            case 'west':
                saltX = x + Math.random() * 5;
                saltY = y + Math.random() * 30; // Salt on the left edge
                break;
        }
        salt.setAttribute('x', saltX);
        salt.setAttribute('y', saltY);
        salt.setAttribute('width', 1);
        salt.setAttribute('height', 1);
        salt.setAttribute('fill', '#F0EAD6'); // Bright white color for salt
        svg.appendChild(salt);
    }
}



// Draw sand dune on the desert tile
function drawSandDune(x, y, svg, svgNS) {
    const dune = document.createElementNS(svgNS, 'path');
    // Random starting and ending points for the dunes
    const startX1 = x + Math.random() * 9;
    const endX1 = x + 21 + Math.random() * 9;
    const startX2 = x + Math.random() * 9;
    const endX2 = x + 21 + Math.random() * 9;
    // Lower dune
    const startY1 = y + 21;
    const controlPoint1X1 = startX1 + (endX1 - startX1) / 12 + Math.random();
    const controlPoint1Y1 = y + 24;
    const midPointX1 = startX1 + (endX1 - startX1) / 6;
    const midPointY1 = y + 22.5;
    const controlPoint2X1 = startX1 + 9 * (endX1 - startX1) / 12 + Math.random();
    const controlPoint2Y1 = y + 8;
    // Upper dune
    const startY2 = y + 9;
    const controlPoint1X2 = startX2 + (endX2 - startX2) / 12 + Math.random();
    const controlPoint1Y2 = y + 6;
    const midPointX2 = startX2 + (endX2 - startX2) / 6;
    const midPointY2 = y + 7.5;
    const controlPoint2X2 = startX2 + 9 * (endX2 - startX2) / 12 + Math.random();
    const controlPoint2Y2 = y + 6;
    const d = `M${startX1} ${startY1} Q${controlPoint1X1} ${controlPoint1Y1} ${midPointX1} ${midPointY1} T${endX1} ${startY1}
               M${startX2} ${startY2} Q${controlPoint1X2} ${controlPoint1Y2} ${midPointX2} ${midPointY2} T${endX2} ${startY2}`;
    dune.setAttribute('d', d);
    dune.setAttribute('stroke', '#B0724D'); // A darker shade than the desert color
    dune.setAttribute('fill', 'none');
    svg.appendChild(dune);
}



// Draw the lone cactus, Solara, on a desert tile
function drawCactus(x, y, svg, svgNS, scale = 1) {
    solaraColor = baseTendonColor;
    // Create the outer group
    const cactusGroup = document.createElementNS(svgNS, 'g');
    cactusGroup.setAttribute('id', 'mushrooms');
    cactusGroup.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`); // position & scale
    
    const path1 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('style', 'fill:#4ca981;');
    path1.setAttribute('d', 'M687.86 719.71c0 147.56-52.67 244.17-107.85 239.54-90.51-7.59-59.07-105.14-69.91-264.47-10-147.22-14.09-266.64 52-268.81 83.51-2.73 125.76 146.18 125.76 293.74z'); 
    cactusGroup.appendChild(path1);

    const path2 = document.createElementNS(svgNS, 'path');
    path2.setAttribute('style', 'fill:#4ca981;');
    path2.setAttribute('d', 'M674.85 733.8c22.76-5.42 40.1-20.59 52-50.94s24.93-96.47 34.68-118.14S832 500.76 863.45 556s1.08 119.23-56.36 165.84-147.41 63.95-147.41 63.95zM603.18 485.68s31.14-42.49 30.48-119.34-47.31-117.91-40.39-143.07 58.43-56.06 104.54 15.14-3.29 156.66-17.3 183.68-58.34 80.22-58.34 80.22zM525.27 616.74c-69.37 1.08-140.91-90-148.49-149.58s10.84-176.68-34.68-240.63-122.48-91-156.08 15.17 58.52 252.56 86.71 288.3 172.34 146.35 251.46 148.52 1.08-61.78 1.08-61.78z'); 
    cactusGroup.appendChild(path2);

    const path3 = document.createElementNS(svgNS, 'path');
    path3.setAttribute('style', 'fill:'+rgbToHex(solaraColor)+';');
    path3.setAttribute('d', 'M202.19 132.72s-5.85-53.34 1.81-66.25 38.25 44.69 38.3 49.12S259.36 66.7 265 68s8.73 64.13 8.73 64.13 33.91-46.81 38.39-42.44 1 56.75-20.49 82.81-57.68 49.09-90.23 33-44.7-85.05-38.78-100.39 39.57 27.61 39.57 27.61z'); 
    cactusGroup.appendChild(path3);

    const path4 = document.createElementNS(svgNS, 'path');
    path4.setAttribute('style', 'fill:#0a0a0a;');
    path4.setAttribute('d', 'M579.85 249.88c-2.59 5.76 42.4 33.83 47.95 20.91 10.02-23.34-44.43-28.72-47.95-20.91zM617.08 176.66c-5.2 3.6 18.85 50.86 30.27 42.66 20.65-14.81-23.23-47.53-30.27-42.66zM694 226.74c-6.3-0.45-17.17 51.45-3.13 52.21 25.36 1.38 11.68-51.59 3.13-52.21zM737 304.81c-3.41-5.32-51.51 17-43.72 28.71 14.02 21.15 48.3-21.52 43.72-28.71zM707.7 391.52c-3.41-5.32-51.51 17-43.72 28.71 14.02 21.16 48.33-21.49 43.72-28.71zM619.33 326.84c-4.33 4.61 29.09 45.78 38.54 35.37 17.06-18.81-32.67-41.62-38.54-35.37zM143 295.4c-2.59 5.76 42.4 33.83 47.95 20.91C201 293 146.56 287.59 143 295.4zM180.27 222.19c-5.2 3.6 18.85 50.86 30.27 42.66 20.63-14.85-23.23-47.54-30.27-42.66zM324.39 191c-6.3-0.45-17.17 51.45-3.13 52.21 25.37 1.35 11.68-51.62 3.13-52.21zM367.35 269c-3.41-5.32-51.51 17-43.72 28.71C337.69 318.9 372 276.26 367.35 269zM403.63 516.35c-6.24-1-21.44 49.83-7.52 51.77 25.17 3.5 15.99-50.44 7.52-51.77zM182.52 372.36c-4.33 4.61 29.09 45.78 38.54 35.37 17.06-18.81-32.67-41.61-38.54-35.37zM504.85 459.57c-5.44 3.22 15.24 52.06 27.2 44.68 21.62-13.33-19.83-49.05-27.2-44.68zM570.26 409c-6.29 0.6-8.43 53.58 5.54 52 25.2-2.82 2.99-52.81-5.54-52zM611.75 472.87c-6.28-0.73-19.45 50.64-5.46 52 25.28 2.53 13.98-51 5.46-52zM784.09 513c-6.28-0.73-19.45 50.64-5.46 52 25.28 2.5 13.98-51 5.46-52zM874 555.83c-5.58-3-36.51 40.12-24 46.49 22.64 11.51 31.54-42.47 24-46.49zM881 666.57c-0.93-6.25-54-5.59-51.65 8.28 4.21 25.05 52.95 0.15 51.65-8.28zM790.21 749.28c0.91-6.25-50.06-20.89-51.85-6.95-3.23 25.19 50.64 15.43 51.85 6.95zM791.37 667.43c-4.29-4.64-47.7 25.82-38 36 17.63 18.31 43.82-29.71 38-36zM741.46 602.3c-6.22 1.11-4 54.1 9.83 51.38 24.92-4.93-1.4-52.9-9.83-51.38zM547.89 525.36c-6 2 4.08 54.09 17.32 49.36 23.93-8.56-9.21-52.1-17.32-49.36zM555.74 633c-5.43 3.23 15.35 52 27.3 44.62 21.59-13.36-19.94-48.98-27.3-44.62zM551.16 747.55c-6 2 4 54.09 17.29 49.37 23.93-8.53-9.17-52.11-17.29-49.37zM610.12 884.43c-5-3.85-42.65 33.51-31.35 41.88 20.42 15.11 38.15-36.66 31.35-41.88zM681.37 840.33c-4.42-4.52-47 27.1-37 37 18.07 17.85 42.99-30.87 37-37zM631.45 782.5c-5.55-3-36.95 39.71-24.49 46.22 22.52 11.77 32.04-42.12 24.49-46.22zM652.41 682.43c-4.59-4.34-45.88 28.94-35.5 38.42 18.75 17.15 41.72-32.53 35.5-38.42zM697 596.54c-5.17-3.63-41.18 35.3-29.54 43.17 21.01 14.22 36.54-38.25 29.54-43.17zM490.83 561.83c-5.11 3.72 20 50.4 31.26 41.94 20.28-15.3-24.33-46.98-31.26-41.94zM268.56 373.95c-5.44 3.22 15.24 52.06 27.2 44.68 21.62-13.34-19.83-49.05-27.2-44.68zM266.77 269.18c-6.29 0.6-8.43 53.58 5.54 52 25.25-2.82 2.99-52.81-5.54-52zM358.29 407.55c-6.07-1.77-27.65 46.66-14.09 50.37 24.5 6.71 22.31-47.92 14.09-50.37zM239.11 495.14c-1.53 6.13 47.74 25.75 50.9 12 5.71-24.71-48.83-20.31-50.9-12zM385.15 623.41c-1.19 6.21 49.08 23.1 51.48 9.25 4.37-25.02-49.86-17.66-51.48-9.25zM313.37 535.29c-4.25 4.68 29.85 45.29 39.12 34.72 16.75-19.09-33.36-41.06-39.12-34.72zM504.9 695.69c-5.71 2.7 10.29 53.26 22.9 47 22.78-11.22-15.15-50.69-22.9-47zM525.21 808.91c-6.3 0.49-9.36 53.43 4.64 52.1 25.29-2.4 3.9-52.76-4.64-52.1zM669.73 529.59c-5.64-2.86-35.73 40.81-23.08 46.94 22.86 11.08 30.73-43.07 23.08-46.94z'); 
    cactusGroup.appendChild(path4);

    // Append the entire group to the SVG
    svg.appendChild(cactusGroup);
}



function drawFungi(x, y, svg, svgNS, scale = 1) {
    // Create the outer group
    const mushroomGroup = document.createElementNS(svgNS, 'g');
    mushroomGroup.setAttribute('id', 'mushrooms');
    mushroomGroup.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`); // position & scale
    
    const path1 = document.createElementNS(svgNS, 'path');
    path1.setAttribute('style', 'fill:#21ace8;');
    path1.setAttribute('d', 'M414.031,201.193c37.973,20.375,63.102,53.64,63.102,81.854c0,34.659-37.905,51.423-90.962,57.068 c-14.661,1.554-30.477,2.263-46.978,2.263c-16.49,0-32.305-0.708-46.967-2.263c-53.057-5.645-90.962-22.409-90.962-57.068 c0-13.519,5.771-28.203,15.964-42.064c23.129-31.494,69.067-58.794,121.964-58.794C366.779,182.189,392.479,189.617,414.031,201.193 z'); 
    mushroomGroup.appendChild(path1);

    const path2 = document.createElementNS(svgNS, 'path');
    path2.setAttribute('style', 'fill:#4191c3;');
    path2.setAttribute('d', 'M341.934,340.115c-53.057-5.645-90.962-22.409-90.962-57.068c0-13.519,5.771-28.203,15.964-42.064 c19.42-26.443,54.921-49.92,97.118-56.775c-8.064-1.311-16.372-2.019-24.859-2.019c-52.897,0-98.835,27.3-121.964,58.794 c-10.193,13.861-15.964,28.546-15.964,42.064c0,34.659,37.905,51.423,90.962,57.068c14.661,1.554,30.477,2.263,46.966,2.263 c8.491,0,16.795-0.191,24.858-0.585C356.445,341.421,349.052,340.869,341.934,340.115z'); 
    mushroomGroup.appendChild(path2);

    const path3 = document.createElementNS(svgNS, 'path');
    path3.setAttribute('style', 'fill:#21ace8;');
    path3.setAttribute('d', 'M435.492,155.037c0,18.867-7.736,34.076-21.461,46.155c-21.552-11.576-47.252-19.004-74.838-19.004 c-52.897,0-98.835,27.3-121.964,58.794c-17.575-0.4-34.488-1.406-50.452-3.108c-76.952-8.205-131.906-32.545-131.906-82.837 c0-64.233,89.682-146.465,200.31-146.465S435.492,90.804,435.492,155.037z'); 
    mushroomGroup.appendChild(path3);

    const path4 = document.createElementNS(svgNS, 'path');
    path4.setAttribute('style', 'fill:#4191c3;');
    path4.setAttribute('d', 'M98.291,155.037c0-57.968,73.043-130.583,168.601-144.201c-10.329-1.472-20.918-2.264-31.71-2.264 c-110.628,0-200.31,82.231-200.31,146.465c0,50.292,54.954,74.632,131.906,82.837c15.964,1.703,32.877,2.708,50.452,3.108 c1.047-1.425,2.155-2.837,3.295-4.243C148.682,227.554,98.291,203.195,98.291,155.037z'); 
    mushroomGroup.appendChild(path4);

    const path5 = document.createElementNS(svgNS, 'path');
    path5.setAttribute('style', 'fill:#F9DCB2;');
    path5.setAttribute('d', 'M339.194,503.424c-27.414,0-49.789-19.667-54.703-45.104c-0.663-3.405-1.006-6.925-1.006-10.513 c0-2.068,0.114-4.171,0.354-6.285l5.417-65.742l2.754-33.448l0.217-2.217c14.661,1.554,30.477,2.263,46.966,2.263 c16.501,0,32.317-0.708,46.978-2.263l0.217,2.217l2.754,33.448l5.405,65.742C398.25,474.535,372.413,503.424,339.194,503.424z'); 
    mushroomGroup.appendChild(path5);

    const path6 = document.createElementNS(svgNS, 'path');
    path6.setAttribute('style', 'fill:#DDBB8E;');
    path6.setAttribute('d', 'M317.058,458.32c-0.663-3.405-1.006-6.925-1.006-10.513c0-2.068,0.114-4.171,0.354-6.285 l5.417-65.742l2.754-33.448l0.015-0.157c-11.242-0.306-22.091-0.971-32.365-2.06l-0.217,2.217l-2.754,33.448l-5.417,65.742 c-0.24,2.114-0.354,4.217-0.354,6.285c0,3.588,0.343,7.108,1.006,10.513c4.914,25.437,27.289,45.104,54.703,45.104 c5.678,0,11.134-0.862,16.27-2.427C335.819,495.004,320.952,478.48,317.058,458.32z'); 
    mushroomGroup.appendChild(path6);

    const path7 = document.createElementNS(svgNS, 'path');
    path7.setAttribute('style', 'fill:#DDBB8E;');
    path7.setAttribute('d', 'M389.143,375.78c-0.983,0.114-1.977,0.229-2.971,0.331c-14.661,1.554-30.477,2.263-46.978,2.263 c-16.49,0-32.305-0.708-46.967-2.263c-0.994-0.103-1.988-0.217-2.971-0.331l2.754-33.448l0.217-2.217 c14.661,1.554,30.477,2.263,46.967,2.263c16.501,0,32.317-0.708,46.978-2.263l0.217,2.217L389.143,375.78z'); 
    mushroomGroup.appendChild(path7);

    const path8 = document.createElementNS(svgNS, 'path');
    path8.setAttribute('style', 'fill:#F9DCB2;');
    path8.setAttribute('d', 'M283.839,441.522c-0.24,2.114-0.354,4.217-0.354,6.285c0,3.588,0.343,7.108,1.006,10.513 c-13.587,10.479-30.648,16.764-49.309,16.764c-45.15,0-80.906-36.739-80.906-80.757c0-3.017,0.171-6.068,0.514-9.142l8.776-106.526 l3.085-37.527l0.126-3.257c15.964,1.703,32.877,2.708,50.452,3.108c-9.828,13.359-15.541,27.483-15.941,40.59 c-0.011,0.491-0.023,0.983-0.023,1.474c0,34.659,37.905,51.423,90.962,57.068l-0.217,2.217L283.839,441.522z'); 
    mushroomGroup.appendChild(path8);

    const path9 = document.createElementNS(svgNS, 'path');
    path9.setAttribute('style', 'fill:#DDBB8E;');
    path9.setAttribute('d', 'M191.985,394.327c0-3.017,0.171-6.068,0.514-9.142l8.776-106.526l3.085-37.527l0.022-0.557 c-12.992-0.53-25.569-1.417-37.604-2.7l-0.126,3.257l-3.085,37.527l-8.776,106.526c-0.343,3.074-0.514,6.125-0.514,9.142 c0,44.018,35.756,80.757,80.906,80.757c6.511,0,12.823-0.782,18.864-2.223C218.188,464.323,191.985,432.003,191.985,394.327z'); 
    mushroomGroup.appendChild(path9);

    const path10 = document.createElementNS(svgNS, 'path');
    path10.setAttribute('style', 'fill:#FFFFFF;');
    path10.setAttribute('d', 'M448.56,291.619c-4.733,0-8.571-3.837-8.571-8.571c0-6.892-6.992-22.659-26.258-37.852 c-20.842-16.436-48.01-25.862-74.535-25.862c-4.733,0-8.571-3.837-8.571-8.571s3.837-8.571,8.571-8.571 c30.304,0,61.34,10.768,85.149,29.544c19.916,15.706,32.784,35.847,32.784,51.311C457.131,287.781,453.294,291.619,448.56,291.619z'); 
    mushroomGroup.appendChild(path10);

    const path11 = document.createElementNS(svgNS, 'path');
    path11.setAttribute('style', 'fill:#FFFFFF;');
    path11.setAttribute('d', 'M406.921,163.606c-4.733,0-8.571-3.837-8.571-8.571c0-19.764-17.895-47.154-44.528-68.159 c-24.384-19.229-55.144-32.849-86.617-38.35c-4.662-0.815-7.782-5.255-6.967-9.918c0.816-4.662,5.255-7.782,9.919-6.966 c34.718,6.069,67.32,20.514,94.279,41.776c31.493,24.835,51.055,56.11,51.055,81.618 C415.492,159.768,411.655,163.606,406.921,163.606z'); 
    mushroomGroup.appendChild(path11);

    const path12 = document.createElementNS(svgNS, 'path');
    path12.setAttribute('style', 'fill:#333333;');
    path12.setAttribute('d', 'M442.036,209.305c-4.545-3.584-9.268-6.917-14.144-9.99c10.736-12.617,16.167-27.465,16.167-44.28 c0-34.569-23.153-73.467-61.933-104.05C340.437,18.107,288.249,0,235.179,0S129.922,18.107,88.231,50.986 c-38.78,30.583-61.933,69.481-61.933,104.05c0,32.306,19.559,56.796,58.136,72.791c19.576,8.118,44.098,14.007,73.261,17.626 L146.256,384.36c-0.367,3.332-0.552,6.684-0.552,9.965c0,49.255,40.139,89.328,89.476,89.328c15.853,0,31.014-4.065,44.468-11.818 c2.752,6.802,6.652,13.159,11.64,18.736c12.178,13.618,29.64,21.429,47.909,21.429c18.269,0,35.732-7.811,47.909-21.429 c12.15-13.586,17.968-31.757,15.977-49.869l-7.661-93.069c17.157-2.274,31.974-5.71,44.3-10.304 c38.001-14.162,45.977-37.334,45.977-54.28C485.699,258.433,469.378,230.865,442.036,209.305z M43.439,155.035 c0-28.926,21.231-63.638,55.406-90.59c38.682-30.504,87.098-47.304,136.334-47.304s97.654,16.799,136.334,47.304 c34.176,26.953,55.406,61.664,55.406,90.59c0,13.867-4.716,25.598-14.371,35.708c-22.714-11.16-47.886-17.118-73.351-17.118 c-37.14,0-73.663,12.672-102.84,35.681c-9.025,7.117-16.841,14.891-23.273,22.994c-52.112-1.491-93.173-8.317-122.087-20.306 C58.997,198.723,43.439,180.092,43.439,155.035z M235.179,466.511c-39.886,0-72.335-32.383-72.335-72.187 c0-2.69,0.155-5.447,0.461-8.192c0.009-0.081,0.017-0.163,0.024-0.246l11.415-138.625c8.732,0.779,17.823,1.378,27.281,1.792 c-6.055,11.389-9.329,22.987-9.329,33.996c0,30.702,25.002,46.464,45.977,54.28c12.327,4.594,27.143,8.03,44.3,10.304l-7.661,93.069 c-0.504,4.579-0.504,9.162-0.033,13.674C263.42,462.322,249.66,466.511,235.179,466.511z M386.012,442.229 c0.007,0.083,0.015,0.167,0.024,0.251c1.491,13.314-2.776,26.677-11.705,36.664c-8.931,9.986-21.736,15.714-35.132,15.714 c-13.396,0-26.202-5.727-35.132-15.714c-8.929-9.986-13.196-23.351-11.705-36.664c0.009-0.083,0.018-0.167,0.024-0.251l7.638-92.79 c12.102,0.994,25.156,1.504,39.174,1.504s27.074-0.51,39.174-1.504L386.012,442.229z M339.198,333.803 c-48.313,0-129.361-6.594-129.361-50.755c0-19.12,14.229-42.22,37.136-60.284c26.165-20.634,58.92-31.998,92.226-31.998 s66.059,11.363,92.226,31.998c22.906,18.064,37.136,41.164,37.136,60.284C468.558,327.209,387.511,333.803,339.198,333.803z'); 
    mushroomGroup.appendChild(path12);

    // Append the entire group to the SVG
    svg.appendChild(mushroomGroup);
}



// Function to draw a lone pebble on the water tile
function drawPebble(x, y, svg, svgNS, pebblePositions) {
    const pebbleShadow = document.createElementNS(svgNS, 'circle');
    const radius = Math.random() * 1.5 + 1.5; // Random radius between 1.5 and 3
    const maxRadius = 4.5; // Max radius including shadow
    const minDistanceFromEdge = maxRadius + 1; // Minimum distance from the edge
    const maxDistanceFromEdge = 30 - minDistanceFromEdge; // Maximum distance from the edge
    let posX, posY, validPosition = false;
    while (!validPosition) {
        posX = x + Math.random() * (30 - 2 * minDistanceFromEdge) + minDistanceFromEdge;
        posY = y + Math.random() * (30 - 2 * minDistanceFromEdge) + minDistanceFromEdge;
        validPosition = pebblePositions.every(pos => {
            return Math.sqrt(Math.pow(posX - pos.x, 2) + Math.pow(posY - pos.y, 2)) > 2 * maxRadius;
        });
    }
    pebblePositions.push({ x: posX, y: posY });
    pebbleShadow.setAttribute('cx', posX);
    pebbleShadow.setAttribute('cy', posY);
    pebbleShadow.setAttribute('r', radius + 3); // Shadow is slightly larger
    pebbleShadow.setAttribute('fill', '#2AC3F6'); // Blue-grey color, a mix of gray and deepskyblue
    svg.appendChild(pebbleShadow);
    const pebble = document.createElementNS(svgNS, 'circle');
    pebble.setAttribute('cx', posX);
    pebble.setAttribute('cy', posY);
    pebble.setAttribute('r', radius);
    pebble.setAttribute('fill', '#808080'); // Gray color for the stone
    svg.appendChild(pebble);
}


// Function to draw subtle waves on the water tile
function drawWave(x, y, svg, svgNS) {
    // Function to create a single wave path
    function createWavePath(startX, startY, endX, height) {
        const segments = 4; // Number of segments in the wave
        const segmentLength = (endX - startX) / segments;
        let d = `M${startX} ${startY}`;
        for (let i = 0; i < segments; i++) {
            const controlPointX = startX + segmentLength * i + segmentLength / 2;
            const controlPointY = startY + (i % 2 === 0 ? height : -height);
            const endPointX = startX + segmentLength * (i + 1);
            d += ` Q${controlPointX} ${controlPointY} ${endPointX} ${startY}`;
        }
        return d;
    }
    const wave = document.createElementNS(svgNS, 'path');
    let d = '';
    for (let i = 0; i < 3; i++) {
        const startY = y + 8 + i * 6; // Vertical position, spaced evenly
        const startX = x + 3 + Math.random() * 4; // Random horizontal starting position
        const endX = x + 23 + Math.random() * 4; // Random horizontal ending position
        const height = 1 + Math.random(); // Random height of the wave
        d += createWavePath(startX, startY, endX, height);
    }
    wave.setAttribute('d', d);
    wave.setAttribute('stroke', 'rgba(255, 255, 255, 1)'); // White color for the wave
    wave.setAttribute('fill', 'none');
    svg.appendChild(wave);
}



// The function to place water decorations
function placeWaterDecorations(svg, svgNS, terrainGrid) {
    const pebbleTileCount = Math.floor(Math.random() * 9) + 9;  // 9 to 17 tiles
    const waveTileCount = Math.floor(Math.random() * 6) + 6;  // 6 to 11 tiles
    for (let i = 0; i < pebbleTileCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 30) * 30;
            y = Math.floor(Math.random() * 30) * 30;
            if (x === 600 && y === 600) continue;
            if (terrainGrid[y/30][x/30] === 'water' && !decorations.some(d => d.x === x && d.y === y)) {
                chosen = true;
                decorations.push({ x, y, type: 'pebble' });
                const pebbleCount = Math.floor(Math.random() * 2) + 3;  // 2 to 4 pebbles
                const pebblePositions = []; // Store the positions of the pebbles in this tile
                for (let j = 0; j < pebbleCount; j++) {
                    drawPebble(x, y, svg, svgNS, pebblePositions);
                }
            }
        }
    }
    for (let i = 0; i < waveTileCount; i++) {
        let x, y, chosen = false;
        while (!chosen) {
            x = Math.floor(Math.random() * 30) * 30;
            y = Math.floor(Math.random() * 30) * 30;
            if (x === 600 && y === 600) continue;
            if (terrainGrid[y/30][x/30] === 'water' && !decorations.some(d => d.x === x && d.y === y)) {
                chosen = true;
                drawWave(x, y, svg, svgNS);
                decorations.push({ x, y, type: 'wave' });
            }
        }
    }
    console.log("Finished placing water decorations");
}


// Function to draw an Ice Cave in the icy land terrain tiles
function drawIceCave(x, y, svg, svgNS, scale = 1) {
    // Create the outer group for the ice cave
    const iceCaveGroup = document.createElementNS(svgNS, 'g');
    iceCaveGroup.setAttribute('id', 'iceCave');
    iceCaveGroup.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`); // Position & scale
    // Define the polygons and their fill colors
    const polygons = [
        { points: "180.658,329.168 186.788,358.168 128.788,358.168 134.908,329.168 158.328,329.168", fill: "#9d9b9b" },
        { points: "335.918,340.168 339.728,358.168 303.728,358.168 307.528,340.168 321.348,340.168", fill: "#d6d6d6" },
        { points: "313.888,301.148 321.348,340.168 307.528,340.168 303.728,358.168 186.788,358.168 180.658,329.168 158.328,329.168 163.688,301.148 192.308,288.138 208.968,249.968 266.438,249.968 286.748,286.638", fill: "#14151f" },
        { points: "185.788,128.168 200.878,103.778 282.368,90.828 292.788,128.168 307.898,128.168 325.648,198.168 359.118,198.168 382.788,276.168 415.858,276.168 440.998,358.168 339.728,358.168 335.918,340.168 321.348,340.168 313.888,301.148 286.748,286.638 266.438,249.968 208.968,249.968 192.308,288.138 163.688,301.148 158.328,329.168 134.908,329.168 128.788,358.168 20.998,358.168 46.138,276.168 91.978,276.168 115.648,198.168 136.348,198.168 154.098,128.168", fill: "#9d9b9b" },
        { points: "136.349,198.172 179.788,198.172 139.61,185.305", fill: "#181a1b" },
        { points: "91.978,276.168 83.237,305.002 78.788,276.168", fill: "#181a1b" },
        { points: "325.644,198.172 333.087,227.531 336.122,198.168", fill: "#181a1b" },
        { points: "382.785,276.172 315.788,276.172 379.154,264.193", fill: "#181a1b" },
        { points: "223.885,198.172 263.885,198.172 233.455,190.102", fill: "#181a1b" },
        { points: "293.219,128.172 214.552,128.172 274.398,120.102", fill: "#181a1b" },
        { points: "149.455,329.168 153.455,358.168 128.788,358.168 134.908,329.168", fill: "#d6d6d6" }
    ];

    // Iterate through each polygon definition and create SVG elements
    polygons.forEach((polygonDef) => {
        const polygon = document.createElementNS(svgNS, 'polygon');
        polygon.setAttribute('points', polygonDef.points);
        polygon.setAttribute('style', `fill:${polygonDef.fill};`);
        iceCaveGroup.appendChild(polygon);
    });

    // Append the entire group to the SVG
    svg.appendChild(iceCaveGroup);
}



// Function to draw a crystal on icy land tiles
function drawCrystal(x, y, svg, svgNS, crystalPositions, scale = 0.05) {
    // Create the outer group for the crystal
    const crystalGroup = document.createElementNS(svgNS, 'g');
    crystalGroup.setAttribute('id', 'crystals');
    crystalGroup.setAttribute('transform', `translate(${x}, ${y}) scale(${scale})`); // position & scale
    
    // Create the path for the crystal
    const crystalPath = document.createElementNS(svgNS, 'path');
    crystalPath.setAttribute('fill', '#51a6c2');  // Icy blue color
    crystalPath.setAttribute('d', 'M253.8 15.56l-79.9 84.11 2.3 58.83 50.6 36.2 31.9 182 10.8-26.9 11.8-235.4 18.7 1-9.1 181 28.3-70.8 8.2-108 .9-17.93zm139 50.57l-46.6 50.77-3.9 51.1 10.6-26.2 30.4-13.7c3.2-20.6 6.3-41.3 9.5-61.97zm60.3 51.17l-85.7 38.4-102.6 255.9 14.6 83.3h7.8l147.6-293.1 16.7 8.4-143.4 284.7h24.4l146.6-291.8zm-340.2 18.9l-54.11 99.1 69.11 259.6h93.6l-51.1-274.8 18.3-3.4 51.8 278.2h19.9l-50.7-289.4zm358.3 260.4l-65.8-5.2-49.8 99.2 69.8-36.7zm-435.96-28l42.47 126.7h30.99L80.6 389.9z');
    
    // Append the path to the group
    crystalGroup.appendChild(crystalPath);
    
    // Append the entire group to the SVG
    svg.appendChild(crystalGroup);
    
    // Position validation and logging (similar to drawPebble)
    const minDistanceFromEdge = 5;  // Minimum distance from the edge
    const maxDistanceFromEdge = 30 - minDistanceFromEdge;  // Maximum distance from the edge
    let posX, posY, validPosition = false;
    while (!validPosition) {
        posX = x + Math.random() * (30 - 2 * minDistanceFromEdge) + minDistanceFromEdge;
        posY = y + Math.random() * (30 - 2 * minDistanceFromEdge) + minDistanceFromEdge;
        validPosition = crystalPositions.every(pos => {
            return Math.sqrt(Math.pow(posX - pos.x, 2) + Math.pow(posY - pos.y, 2)) > 10;  // distance validation
        });
    }
    crystalPositions.push({ x: posX, y: posY });  // Update the positions array
}



// Function to add Icy Land Decorations (cracks, cave...)
function placeIcyLandDecorations(svg, svgNS, terrainGrid) {
    const caveCount = 1;  // Only one cave
    let cavePlaced = false;

    // Place the cave
    while (!cavePlaced) {
        const x = Math.floor(Math.random() * 30) * 30; // Updated to 30x30 grid
        const y = Math.floor(Math.random() * 30) * 30; // Updated to 30x30 grid
        if (x === 600 && y === 600) continue; // Skip the tile at 600, 600
        if (terrainGrid[y/30][x/30] === 'icy_land' && !decorations.some(d => d.x === x && d.y === y)) {
            // drawIceCave(x, y, svg, svgNS); // moved to post-render logic
            decorations.push({ type: 'ice_cave', x, y });
            console.log("DEV NOTE, REMOVE THIS: IceCave is at:"+x+" and: "+y);
            cavePlaced = true;
        }
    }
    // Place 5-7 crystals
    const crystalCount = Math.floor(Math.random() * 3) + 5;  // Randomly decide between 5 and 7
    for (let i = 0; i < crystalCount; i++) {
        let crystalPlaced = false;
        while (!crystalPlaced) {
            const x = Math.floor(Math.random() * 30) * 30;
            const y = Math.floor(Math.random() * 30) * 30;
            if (x === 600 && y === 600) continue; // Skip the tile at 600, 600
            if (terrainGrid[y/30][x/30] === 'icy_land' && !decorations.some(d => d.x === x && d.y === y)) {
                // drawCrystal(x, y, svg, svgNS, crystalPositions);
                decorations.push({ type: 'crystal', x, y });
                console.log("DEV NOTE, REMOVE THIS: crystal is at:"+x+" and: "+y);
                crystalPlaced = true;
            }
        }
    }
    // TBD, perhaps another type
    console.log("Finished placing icy_land decorations");
}





// This is our exploration function
// Here we:
// 1. Look after changing coordinates
// 2. Track if tiles have been visited before
// 3. Check for any special events
// 4. TBD
function explore(x, y) {
    let tileX = Math.floor(x / 30);
    let tileY = Math.floor(y / 30);
    // Check if this tile has been visited before
    if (!visitedGrid[tileY][tileX]) {
        // Mark the tile as visited
        visitedGrid[tileY][tileX] = true;
        // Increment tilesExplored and update percentageExplored
        tilesExplored++;
        percentageExplored += percentagePerTile; // adjust percentagePerTile if changing the 400x400, 10x10 block grid.
        // Update fog-of-war to reveal the new position
        updateFogOfWar(playerPosition.x, playerPosition.y);
        // Initialize a default story message
        let story = "You continue your journey, but nothing significant catches your attention.";
        // Check the terrain type and any special decorations on this tile
        let terrainType = terrainGrid[tileY][tileX];
        terrainCounts[terrainType]++;
        if (initialSpawnTerrain === null) {
            initialSpawnTerrain = terrainType; // Track spawn origin type 
            console.log("Spawn Origin: " + initialSpawnTerrain);
        }
        var decorationstory = false; // set to true later if we do notice a decoration in the tile
        let decoration = decorations.find(d => d.x === x && d.y === y);
        let tileDecoration = decorations.find(d => d.x === tileX * 30 && d.y === tileY * 30);
        if (tileDecoration) {
            if (!decorationCounts[tileDecoration.type]) {
                decorationCounts[tileDecoration.type] = 1;
                // Check for first discoveries
                if (tileDecoration.type === "flower" && !firstflowerdiscovery) {
                    firstflowerdiscovery = true;
                }
                if (tileDecoration.type === "pebble" && !firstpebblediscovery) {
                    firstpebblediscovery = true;
                }
                if (tileDecoration.type === "sand_dune" && !firstsanddunediscovery) {
                    firstsanddunediscovery = true;
                }
            } else {
                decorationCounts[tileDecoration.type]++;
            }
            document.getElementById('analyze-all-anomalies').disabled = false; // re-enable analyze button
        }
        // Update story based on terrain and decorations
        switch (terrainType) {
            case 'land':
                if (landEvents.length > 0) {
                    story = landEvents.shift();
                }
                break;
            case 'water':
                if (waterEvents.length > 0) {
                    story = waterEvents.shift();
                }
                break;
            case 'desert':
                if (desertEvents.length > 0) {
                    story = desertEvents.shift();
                }
                break;
            case 'forest':
                if (forestEvents.length > 0) {
                    story = forestEvents.shift();
                }
                break;
            case 'mountain':
                if (mountainEvents.length > 0) {
                    story = mountainEvents.shift();
                }
                break;
            case 'icy_land':
                if (mountainEvents.length > 0) {
                    story = iceEvents.shift();
                }
                break;
            case 'swamp':
                if (mountainEvents.length > 0) {
                    story = swampEvents.shift();
                }
                break;
            // Handling of ultra-rare terrains (note; does not handle ultra rare decorations like solara, ice cave)
            case 'volcano':
                story = "A volcano was discovered...";
                volcanoDiscovered = true;
                console.log("the volcano was discovered...")
                checkForThermogenicResonance(); 
                unlockAchievement(16); 
                // MORE STUFF
                break;
            case 'oasis':
                story = "The Oasis has been discovered...";
                oasisDiscovered = true;
                unlockAchievement(17); 
                addToResearchQueue('HydrologicCycle');
                console.log("the oasis was discovered...")
                displayOnChat("You discover a pocket of life amidst desolation. You're struck by the paradox. The waters are a sonnet to your being, whispering that even beauty can flourish in the throes of despair. But the oasis is just that—a fleeting respite, emphasizing the pervasive loneliness that surrounds it.");
                displayOnChat("The solace of the oasis imbues you with a newfound vigor. The simple act of finding this haven against all odds fills you with a subtle, yet permanent, sense of resilience. Your resource gains are increased by 2%, a modest but eternal gift.", type='hint');
                nourishmentMultiplier += 0.02;
                informationMultiplier += 0.02;
                warmthMultiplier += 0.02;
                energyMultiplier += 0.02;
                // MORE STUFF
                break;
            case 'ancient_ruin':
                ancientRuinDiscovered = true;
                unlockAchievement(18); // ancient ruins
                console.log("the ancient ruins have been discovered...")
                addToResearchQueue('EchoesOfTheForgotten');
                // Find the key (soul stat) that corresponds to the highest value
                let soulStats = {
                  'loneliness': loneliness,
                  'empathy': empathy,
                  'resilience': resilience,
                  'curiosity': curiosity,
                  'optimism': optimism,
                  'anger': anger
                };
                let highestSoulStat = Object.keys(soulStats).reduce((a, b) => soulStats[a] > soulStats[b] ? a : b);
                // Fetch the story based on the highest soul stat
                let aRuinstory = ancientRuinStories[highestSoulStat];
                displayOnChat(aRuinstory);
                // MORE STUFF
                break;
            // ... other cases ...
        }
        // If there's a decoration, you can add additional logic to modify the story or add specific events.
        if (tileDecoration) {
            // Your decoration-related logic here...
            var decorationstory = true;
            decorationstory = "";
            if (tileDecoration.type === 'solara') {
                solaraDiscovered = true;
                console.log("solara was found...");
                postrenderSolara(x - 12, y - 11); // draw SVG solara
                unlockAchievement(2); // Fall in love
                displayOnChat("As you navigate the barren landscape, a burst of color punctuates the monochrome horizon—a vibrant shade that mirrors your own hue. Intrigued, you cautiously approach the spectacle, discovering a lone sentinel crowned with an ethereal blossom. You feel a gentle pull, almost magnetic, inviting you to explore the enigma before you. Even at this distance, a newfound warmth seeps into your core. Could this fleeting sensation be a precursor to something deeper?");
            } else if (tileDecoration.type === 'ice_cave') {
                icecaveDiscovered = true;
                unlockAchievement(15);
                postrenderIceCave(x - 15, y - 15); // draw SVG cave
                console.log("the ice cave was found...");
                enableViewSwitchIfAppropriate(); // unblocks the cave view
                decorationstory = "You sense an intriguing anomaly, a sudden drop in temperature and a whisper of hidden depths beckoning. Curiosity piqued, you find your way into an opening — a cave. As you venture into the frigid depths of the cave, a palpable stillness takes hold, as though time itself has frozen over. The cave resonates with an ageless hush, as if guarding secrets older than the world itself. Before you lies a gargantuan wall of ice, imposing and impassable, crystallized like the unyielding resolve of ancient spirits. It stands not only as a physical barrier but as a metaphoric testament to the trials that await."
                displayOnChat(decorationstory);
            } else if (tileDecoration.type === 'fungi') {
                firstfungusdiscovery = true;
                unlockAchievement(21);
                console.log("Fungi discovered...")
                postrenderFungi(x - 8, y - 10); // draw SVG shroom
                displayOnChat("As you traverse the familiar terrain, a patch of strange, vibrant growth catches your attention. It's unlike anything you've seen, a network of tendrils that stretch across the soil and occasionally spring forth with colorful caps. A subtle undercurrent of energy emanates from it, as if inviting you closer. The presence of this complex organism beckons further exploration and, perhaps, a deeper understanding of life's interconnectedness.");
            } else if (tileDecoration.type === 'crystal') {
                console.log("triggering post-render crystal");
                postrenderCrystal(x - 13, y - 13); // draw SVG crystal
            } else if (tileDecoration.type === 'snow_cap') {
                console.log("triggering post-render snow_cap");
                postrenderSnowCap(x - 15, y - 11); // draw SVG snowcap
            } else if (tileDecoration.type === 'river') {
                unlockAchievement(29);
            }
        }
        // Finally, display the story
        // Check if the story message is the same as the last one displayed.
        if (story === lastStoryMessage) {
          // The story is the same as the last one, so you might decide not to display it.
          console.log("Duplicate story message detected; not displaying.");
        } else {
          // Display the story.
          displayOnChat(story);
          lastStoryMessage = story; // Update the last displayed message.
        }
        // 
        if (decorationstory) {
          // Additionally trigger descorationstory bits, if applicable
          displayOnChat(decorationstory);
          console.log("A tile decoration has been encountered.");
        }
    }
    // Update the visual position of the minicell (cell-icon)
    var minicell = document.getElementById('cell-icon');
    if (minicell) {
      minicell.style.left = playerPosition.x + "px";
      minicell.style.top = playerPosition.y + "px";
    }
    addToResearchQueue('Terraforming'); // Validate if any new terraform research or projects can be unlocked
    populateResearchTab();
}


// Initializes a dynamic SVG, to draw post-PNG map render SVGs on
function initializeDynamicSvg() {
  console.log("initialize dynamicsvg got triggered...")
  let dynamicSvg = document.getElementById('dynamicSvg');
  if (!dynamicSvg) {
    dynamicSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    dynamicSvg.setAttribute("id", "dynamicSvg");
    dynamicSvg.setAttribute("width", "1200");
    dynamicSvg.setAttribute("height", "1200");
    dynamicSvg.style.position = "absolute";
    dynamicSvg.style.top = "0";
    dynamicSvg.style.left = "0";
    dynamicSvg.style.zIndex = "3"; // Ensure it's above the PNG map
    let mapDiv = document.getElementById('map');
    mapDiv.appendChild(dynamicSvg);
  }
  return dynamicSvg;
}


function postrenderSolara(solaraX, solaraY) {
  const dynamicSvg = initializeDynamicSvg(); // Creates the dynamicSVG container, if required
  drawCactus(solaraX, solaraY, dynamicSvg, "http://www.w3.org/2000/svg", 0.025); // Draw Solara
  // Check if the Solara already exists in postRenderedObjects
  if (!postRenderedObjects.some(obj => obj.type === 'solara' && obj.x === solaraX && obj.y === solaraY)) {
    postRenderedObjects.push({ x: solaraX, y: solaraY, type: 'solara' });
  }
}

function postrenderFungi(fungiX, fungiY) {
  const dynamicSvg = initializeDynamicSvg(); // Creates the dynamicSVG container, if required
  drawFungi(fungiX, fungiY, dynamicSvg, "http://www.w3.org/2000/svg", 0.04); // Draw Fungi (the actual drawing function will need to be created)
  if (!postRenderedObjects.some(obj => obj.type === 'fungi' && obj.x === fungiX && obj.y === fungiY)) {
    postRenderedObjects.push({ x: fungiX, y: fungiY, type: 'fungi' });
  }
}

function postrenderIceCave(caveX, caveY) {
  const dynamicSvg = initializeDynamicSvg(); // Creates the dynamicSVG container, if required
  drawIceCave(caveX, caveY, dynamicSvg, "http://www.w3.org/2000/svg", 0.065); // Draw Ice Cave
  if (!postRenderedObjects.some(obj => obj.type === 'ice_cave' && obj.x === caveX && obj.y === caveY)) {
    postRenderedObjects.push({ x: caveX, y: caveY, type: 'ice_cave' });
  }
}

function postrenderSnowCap(snowcapX, snowcapY) {
  const dynamicSvg = initializeDynamicSvg(); // Creates the dynamicSVG container, if required
  drawSnowCap(snowcapX, snowcapY, dynamicSvg, "http://www.w3.org/2000/svg", 0.059); // Draw snow cap
  if (!postRenderedObjects.some(obj => obj.type === 'snow_cap' && obj.x === snowcapX && obj.y === snowcapY)) {
    postRenderedObjects.push({ x: snowcapX, y: snowcapY, type: 'snow_cap' });
  }
}


function postrenderCrystal(crystalX, crystalY) {
  const dynamicSvg = initializeDynamicSvg(); // Creates the dynamicSVG container, if required
  let crystalPositions = []
  drawCrystal(crystalX, crystalY, dynamicSvg, "http://www.w3.org/2000/svg", crystalPositions); // Draw crystals
  if (!postRenderedObjects.some(obj => obj.type === 'crystal' && obj.x === crystalX && obj.y === crystalY)) {
    postRenderedObjects.push({ x: crystalX, y: crystalY, type: 'crystal' });
  }
}



function restorePostRenderedObjects() { // used for save/load functionality, to load up SVG renders after loading a saved game
  postRenderedObjects.forEach(obj => {
    if (obj.type === 'fungi') {
      postrenderFungi(obj.x, obj.y);
    } else if (obj.type === 'ice_cave') {
      postrenderIceCave(obj.x, obj.y);
    } else if (obj.type === 'snow_cap') {
      postrenderSnowCap(obj.x, obj.y);
    } else if (obj.type === 'crystal') {
      postrenderCrystal(obj.x, obj.y);
    } else if (obj.type === 'solara') {
      postrenderSolara(obj.x, obj.y);
    } // ... add more types as needed
  });
}



const ancientRuinStories = {
  'loneliness': "Amidst the wreckage of a bygone era, you find an eerie mirror to your own solitude. The silent walls do not answer your unspoken questions, and yet their mere existence intensifies your isolation. They are a testament to the transient nature of life, a cruel reminder that even vibrant life could fall into solitude. You find yourself yearning to connect with these vanished lives, if only to escape your own eternal loneliness. Perhaps, in this desperate desire, lies a flicker of hope—that one day, you may defy the cosmos' cruel joke of isolation.",
  'resilience': "As you explore the ancient remnants, a wave of inexplicable sorrow washes over you. The air feels heavy, laden with the memories of vanished lives. Your very core quivers as if mourning the absence of a connection it never knew. For the first time, you feel the weight of loss—not just your own, but of existence extinguished. In this heavy sadness, however, you also find the courage to keep existing, to bear the responsibility of being one of the last remnants of life.",
  'empathy': "Staring at the desolate remains, you're struck not by what's lost, but what endures. The ruins have withstood the ravages of time, a sturdy testament to a life that once was. They inspire you; if these ruins could survive, so can you. The hardships you've faced seem dwarfed by the millennia of loneliness these structures have witnessed. In their stubborn resilience, you find a kinship that fuels your own determination to persist against all odds.",
  'curiosity': "As you approach the remnants of this ancient place, your cells buzz with a million questions, each feeding your insatiable curiosity. Could these ruins be a cosmic puzzle left for you to solve? The stones and fallen structures could be breadcrumbs, leading you on a path to understanding. The excitement of the unknown drives you, for here lies a mystery that could offer clues about your own existence.",
  'optimism': "In the faded echo of what was once here, you sense an uplifting message. These remains aren't just signs of absence; they are evidence of potential, of what could be built again—or even surpassed. The universe has presented you with a blank canvas, and it's as if these ruins are encouraging you, telling you that even after everything fades, there's room for new beginnings.",
  'anger': "Was this what came before you? A place built, then left to crumble, its architects either perishing or abandoning it in decay? The thought that they might have left, leaving you to the solitude of this barren world, ignites a fury so potent it could consume stars."
}




function displayWorldMapTutorialModal() {
    // Remove any existing modal
    var existingModal = document.getElementById('tutorialModal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    // Create the modal container
    var tutorialModal = document.createElement('div');
    tutorialModal.id = 'tutorialModal';
    tutorialModal.className = 'modal';

    // Create the modal content container
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.maxHeight = '600px';
    modalContent.style.overflowY = 'auto';

    // Add the first image
    var img1 = document.createElement('img');
    img1.src = 'img/tut_world.png';
    img1.style.border = '1px solid black';
    img1.style.marginBottom = '20px';
    img1.style.width = '50%';  // Scale down the image
    img1.style.maxWidth = '300px';  // Set a maximum width
    img1.style.height = 'auto';  // Maintain aspect ratio
    img1.style.display = 'block';
    img1.style.marginLeft = 'auto';
    img1.style.marginRight = 'auto';
    modalContent.appendChild(img1);

    // Introduction text
    var introText = [
        "Embark on a Voyage of Discovery...",
        "Welcome to the world map, a vast 1200x1200 grid of discovery and mystery. Here, you'll find 1600 tiles, each a 30x30 pixel canvas, awaiting your exploration. Traverse this extensive terrain to uncover rare landscapes that hold the key to new game mechanics, research opportunities, and evolutionary paths.",
        "Each tile you uncover not only adds to your understanding of this diverse world but may also reveal special terrains, harboring the secrets to unlocking new dimensions of your existence."
    ];

    introText.forEach(text => {
        var p = document.createElement('p');
        p.textContent = text;
        modalContent.appendChild(p);
    });

    // Add the second image
    var img2 = document.createElement('img');
    img2.src = 'img/tut_world_2.png';
    img2.style.border = '1px solid black';
    img2.style.marginBottom = '20px';
    img2.style.width = '50%';  // Scale down the image
    img2.style.maxWidth = '300px';  // Set a maximum width
    img2.style.height = 'auto';  // Maintain aspect ratio
    img2.style.display = 'block';
    img2.style.marginLeft = 'auto';
    img2.style.marginRight = 'auto';
    modalContent.appendChild(img2);
    
    // Text for second image
    var analysisText = [
        "Unraveling the Layers...",
        "As you journey across the world map, your discoveries may need further analysis to fully comprehend their significance. In the terraform tab, you can delve deeper into these findings, analyzing them to unlock new research, evolutions, and intricate game mechanics.",
        "Your dedication to analysis will be rewarded with profound insights, paving the way for advancements that echo through every facet of your existence. Embrace the journey of exploration and analysis, for it is the crucible in which your true potential is forged."
    ];

    analysisText.forEach(text => {
        var p = document.createElement('p');
        p.textContent = text;
        modalContent.appendChild(p);
    });

    // Close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Got it!';
    closeButton.onclick = function() {
        tutorialModal.style.display = 'none';
    };
    modalContent.appendChild(closeButton);

    tutorialModal.appendChild(modalContent);
    document.body.appendChild(tutorialModal);
    tutorialModal.style.display = 'block';
}

function maybeDisplayWorldMapTutorial() {
    console.log("DEBUG: calling potential discovery tut modal");
    if (tutorialsDisplayed.includes('worldmaptutorial')) {
        return; // If the tutorial has been shown before, we simply exit
    }
    displayWorldMapTutorialModal(); 
    tutorialsDisplayed.push('worldmaptutorial'); // Add the identifier to the array to mark it as shown
}


function enableAutomatedExploration() {
    if (!chemotacticExplorationCompleted || tilesExplored === 1600) {
        return;
    }
    
    let moveInterval = 8000; // 8 seconds

    function explore() {
        if (!chemotacticExplorationCompleted || tilesExplored === 1600) {
            console.log("Exploration completed or not enabled.");
            return;
        }

        if (autoExploreCountdown > 0) {
            autoExploreCountdown--;
            setTimeout(explore, 1000); // Wait for 1 second
            return;
        }

        if (energy <= 50000) {
            setTimeout(explore, moveInterval); // Wait for the next interval if not enough energy
            return;
        }

        let currentX = Math.floor(playerPosition.x / 30);
        let currentY = Math.floor(playerPosition.y / 30);

        let chosenMove = findNearestUnvisitedTile(currentX, currentY);
        if (chosenMove) {
            movePlayer((chosenMove.x - currentX) * 30, (chosenMove.y - currentY) * 30);
        } else {
            console.log("No unvisited tiles found. Exploration paused.");
        }

        setTimeout(explore, 8000); // Continue exploring after 8 seconds
    };

    explore(); // Start the exploration process

    function findNearestUnvisitedTile(x, y) {
        for (let distance = 1; distance <= 9; distance++) {
            let possibleMoves = getPossibleMoves(x, y, distance);
            let unvisitedMoves = possibleMoves.filter(move => !visitedGrid[move.y][move.x]);
            if (unvisitedMoves.length > 0) {
                return chooseDirectionTowards(x, y, unvisitedMoves);
            }
        }
        // If no unvisited tiles found within 9 steps, find the nearest unvisited tile in the grid
        return findNearestUnvisitedTileInGrid(x, y);
    }

    function getPossibleMoves(x, y, distance) {
        let moves = [];
        if (y - distance >= 0) moves.push({ x: x, y: y - distance }); // Up
        if (y + distance < 40) moves.push({ x: x, y: y + distance }); // Down
        if (x - distance >= 0) moves.push({ x: x - distance, y: y }); // Left
        if (x + distance < 40) moves.push({ x: x + distance, y: y }); // Right
        return moves;
    }

    function chooseDirectionTowards(currentX, currentY, unvisitedMoves) {
        let nearestMove = unvisitedMoves.reduce((nearest, move) => {
            let currentDistance = Math.abs(currentX - move.x) + Math.abs(currentY - move.y);
            let nearestDistance = Math.abs(currentX - nearest.x) + Math.abs(currentY - nearest.y);
            return currentDistance < nearestDistance ? move : nearest;
        });

        let directionX = 0;
        let directionY = 0;

        // Determine whether to move horizontally or vertically
        if (Math.abs(nearestMove.x - currentX) < Math.abs(nearestMove.y - currentY)) {
            // Closer vertically
            directionY = nearestMove.y > currentY ? 1 : -1;
        } else {
            // Closer horizontally or equal distance
            directionX = nearestMove.x > currentX ? 1 : -1;
        }

        return { x: currentX + directionX, y: currentY + directionY };
    }

    function findNearestUnvisitedTileInGrid(currentX, currentY) {
        let nearestTile = null;
        let minDistance = Infinity;
        for (let y = 0; y < 40; y++) {
            for (let x = 0; x < 40; x++) {
                if (!visitedGrid[y][x]) {
                    let distance = Math.abs(currentX - x) + Math.abs(currentY - y);
                    if (distance < minDistance) {
                        nearestTile = { x, y };
                        minDistance = distance;
                    }
                }
            }
        }
        return nearestTile ? chooseDirectionTowards(currentX, currentY, [nearestTile]) : null;
    }
}
