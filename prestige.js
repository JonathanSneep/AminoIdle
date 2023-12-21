var miniTendonPrestigeLvl = 0;
var miniNucleusPrestigeLvl = 0;
var miniNucleusAssignedThisRun = 0;
var miniTendonAssignedThisRun = 0;

function checkPrestigeConditions() {
  let prestigePoints = 0;
  // Condition 1: Check tiles explored
  if (tilesExplored >= 1600) {
    prestigePoints += 1;
  }
  // Condition 2: Check cave excavation progress
  if (caveExcavationProgress > 2500000) {
    prestigePoints += 1;
  }
  if (ritualsPerformed.includes('+1 Prestige Point')) {
    prestigePoints += 1;
  }
  // Update the currentRunPrestigeGained
  currentRunPrestigeGained = prestigePoints;
  // Additional logic can be added here if needed
  console.log("Prestige Points Updated: ", currentRunPrestigeGained);
}

// Set the interval to run every 3 minutes
setInterval(checkPrestigeConditions, 180000);


document.getElementById('prestigeOptions').addEventListener('click', function() {
    document.getElementById('prestigeModal').style.display = 'block';
    updatePrestigeModal();
    document.addEventListener('keydown', handlePrestigeEscapeKeyPress);
});

function handlePrestigeEscapeKeyPress(event) {
    if (event.key === 'Escape' || event.key === 'Esc') { // 'Esc' for older browsers
        closePrestigeModal();
        // Remove the event listener after closing the modal
        document.removeEventListener('keydown', handlePrestigeEscapeKeyPress);
    }
}


function closePrestigeModal() {
    var modal = document.getElementById('prestigeModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        // Remove the keydown event listener when the modal closes
        document.removeEventListener('keydown', handlePrestigeEscapeKeyPress);
    }
}


function assignPoint(upgradeType) {
    if (currentRunPrestigeGained > 0) {
        if (upgradeType === 'miniNucleus' && miniNucleusPrestigeLvl < 10) {
            miniNucleusPrestigeLvl++;
            miniNucleusAssignedThisRun++;
        } else if (upgradeType === 'miniTendon' && miniTendonPrestigeLvl < 10) {
            miniTendonPrestigeLvl++;
            miniTendonAssignedThisRun++;
        }
        currentRunPrestigeGained--;
    }
    updatePrestigeModal();
}





function unassignPoint(upgradeType) {
    if (upgradeType === 'miniNucleus' && miniNucleusPrestigeLvl > 0 && miniNucleusAssignedThisRun > 0) {
        miniNucleusPrestigeLvl--;
        miniNucleusAssignedThisRun--;
        currentRunPrestigeGained++;
    } else if (upgradeType === 'miniTendon' && miniTendonPrestigeLvl > 0 && miniTendonAssignedThisRun > 0) {
        miniTendonPrestigeLvl--;
        miniTendonAssignedThisRun--;
        currentRunPrestigeGained++;
    }
    updatePrestigeModal();
}


function updatePrestigeModal() {
    document.getElementById('prestigePointCount').textContent = currentRunPrestigeGained;

    updateProgressBar('miniNucleus', miniNucleusPrestigeLvl);
    updateProgressBar('miniTendon', miniTendonPrestigeLvl);

    // Enable or disable '-' buttons based on assigned points
    document.querySelector('[data-upgrade="miniNucleus-minus"]').disabled = miniNucleusAssignedThisRun <= 0;
    document.querySelector('[data-upgrade="miniTendon-minus"]').disabled = miniTendonAssignedThisRun <= 0;
}


function updateProgressBar(upgradeType, level) {
    var progressBar = document.querySelector('#' + upgradeType + 'Upgrade .prestige-progress-bar');
    progressBar.innerHTML = ''; // Clear existing squares
    for (var i = 0; i < 10; i++) {
        var square = document.createElement('div');
        square.className = i < level ? 'filled-square' : 'empty-square';
        progressBar.appendChild(square);
    }
}




function savePrestigeSettings() {
  var prestigeData = {
    miniTendonPrestigeLvl: miniTendonPrestigeLvl,
    miniNucleusPrestigeLvl: miniNucleusPrestigeLvl
  };
  localStorage.setItem('aminoPrestigeData', JSON.stringify(prestigeData));
}


function loadPrestigeSettings() {
  var savedData = localStorage.getItem('aminoPrestigeData');
  if (savedData) {
    var prestigeData = JSON.parse(savedData);

    // Update miniTendonPrestigeLvl
    miniTendonPrestigeLvl = prestigeData.miniTendonPrestigeLvl;
    console.log('Loaded Mini-Tendon Level:', miniTendonPrestigeLvl);
    nourishmentRate += 0.02 * miniTendonPrestigeLvl;
    energyRate += 0.02 * miniTendonPrestigeLvl;

    // Add Mini-Tendon if level is greater than 0
    if (miniTendonPrestigeLvl > 0) {
      addMiniTendon();
    }

    // Update miniNucleusPrestigeLvl
    miniNucleusPrestigeLvl = prestigeData.miniNucleusPrestigeLvl;
    console.log('Loaded Mini-Nucleus Level:', miniNucleusPrestigeLvl);
    informationRate += 0.02 * miniNucleusPrestigeLvl;
    warmthRate += 0.02 * miniNucleusPrestigeLvl;

    // Add Mini-Nucleus if level is greater than 0
    if (miniNucleusPrestigeLvl > 0) {
      addMiniNucleus();
    }

  } else {
    console.log('No prestige data found in local storage.');
  }
  // Add any additional logic needed after loading settings
}


function addMiniTendon() {
  var svg = document.getElementById('tendon');
  var newTendon = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  newTendon.setAttribute("id", "minitendon-" + tendons);

  var startPointX = 400 + Math.floor(Math.random() * 30) - 15;
  var startPointY = 400 + Math.floor(Math.random() * 30) - 15;

  var endPointX, endPointY;
  let maxIterations = 1000;
  let iterations = 0;
  let distance = 0;

  while ((distance <= 25 || distance > 50) && iterations < maxIterations) { // Reduced max distance to 50
    console.log("Had to recalculate a minitendon endpoint.");
    endPointX = Math.floor(Math.random() * 400);
    endPointY = Math.floor(Math.random() * 650) + 75;
    distance = Math.sqrt(Math.pow(endPointX - 400, 2) + Math.pow(endPointY - 400, 2));
    iterations++;
  }

  var controlPointX = Math.floor((startPointX + endPointX) / 2) + (Math.random() * 20) - 10; // Smaller deviation for control point
  var controlPointY = Math.floor((startPointY + endPointY) / 2) + (Math.random() * 20) - 10;

  if (iterations === maxIterations) {
    console.warn("Max iterations reached, minitendon endpoint might not be ideal.");
  }

  newTendon.setAttribute("d", `M${startPointX} ${startPointY} Q${controlPointX} ${controlPointY} ${endPointX} ${endPointY}`);
  newTendon.setAttribute("stroke", getTendonColor());
  newTendon.setAttribute("stroke-width", "1"); // Thinner tendon
  newTendon.setAttribute("fill", "transparent");
  
  svg.insertBefore(newTendon, svg.firstChild);
}



function addMiniNucleus(color = null) {
    var nucleusColor = color || getRandomColor();
    var svg = document.getElementById("tendon");
    var miniNucleus = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    miniNucleus.setAttribute("id", "miniNucleus");
    miniNucleus.setAttribute("cx", 400);
    miniNucleus.setAttribute("cy", 400);
    miniNucleus.setAttribute("r", 0.5); // Smaller radius for mini nucleus
    miniNucleus.setAttribute("fill", nucleusColor);

    const numPoints = 100;
    const cellRadius = 25;
    const miniNucleusRadius = 0.5;
    let valuesX = "400";
    let valuesY = "400";
    for (let i = 0; i < numPoints; i++) {
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * (cellRadius - miniNucleusRadius);
        let offsetX = 400 + distance * Math.cos(angle);
        let offsetY = 400 + distance * Math.sin(angle);
        valuesX += `;${offsetX}`;
        valuesY += `;${offsetY}`;
    }
    valuesX += ";400"; // Return to the starting point
    valuesY += ";400"; // Return to the starting point

    var animateX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateX.setAttribute("attributeName", "cx");
    animateX.setAttribute("values", valuesX);
    animateX.setAttribute("dur", "190s");
    animateX.setAttribute("repeatCount", "indefinite");
    miniNucleus.appendChild(animateX);

    var animateY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animateY.setAttribute("attributeName", "cy");
    animateY.setAttribute("values", valuesY);
    animateY.setAttribute("dur", "190s");
    animateY.setAttribute("repeatCount", "indefinite");
    miniNucleus.appendChild(animateY);

    svg.appendChild(miniNucleus);
}




loadPrestigeSettings();
checkPrestigeConditions();

document.getElementById('prestigeNow').addEventListener('click', function() {
    var confirmPrestige = confirm("This will restart the game. Make sure you have assigned all your prestige points before proceeding. Are you sure you want to continue?");
    if (confirmPrestige) {
        savePrestigeSettings();
        document.getElementById('prestigeModal').style.display = 'none';
        resetGame(); // Wipe progress, but not prestige progress
    }
});


document.getElementById('abortPrestige').addEventListener('click', function() {
    // Simply close the modal without making changes
    document.getElementById('prestigeModal').style.display = 'none';
});


document.getElementById('wipePrestige').addEventListener('click', function() {
    var confirmWipe = confirm("Are you sure you want to wipe all prestige points and restart the game? This action cannot be undone. All prestige progress WILL be lost.");
    if (confirmWipe) {
        resetGameAndPrestige(); // Function that resets the game and wipes all prestige data
    }
});
