const terraformTooltips = {
    "Microbial Mounts": "Generates biomites, zymers, fibers, sludge, algae (1x efficiency)",
    "Bio-Luminescent Zone": "Generates sludge, algae (2x efficiency)",
    "Solar Sponges": "Generates zymers (4x efficiency)",
    "Floral Bridges": "Generates Fibers (4x efficiency)",
    "Spore Towers": "Generates biomites, sludge (2x efficiency)",
    "Thermal Vents": "Speeds up terraform cycles, with diminishing returns",
    "Resonance Pools": "Generates algae (4x effiency)",
    "Cave Excavation Station": "Enables cave excavation"
};



// Generic function to help generate terraform projects/options
function createTerraformButton(terraformProject, buttonId, title, tooltipContent) {
    let terraformDiv = document.getElementById("Terraform");
    // Check if button already exists
    if (document.getElementById(buttonId)) return;
    // Create tooltip container
    let tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip";
    terraformDiv.appendChild(tooltipContainer);
    // Create terraform button
    let terraformButton = document.createElement("button");
    terraformButton.className = "terraformButton";
    terraformButton.id = buttonId;
    terraformButton.innerText = title;
    tooltipContainer.appendChild(terraformButton);
    // Create tooltip text
    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltiptext";
    tooltipText.innerHTML = tooltipContent;
    tooltipContainer.appendChild(tooltipText);
    // Event listeners for tooltip
    terraformButton.addEventListener('mousemove', function(e) {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.left = "120px";
        tooltip.style.top = "60px";
    });

    terraformButton.addEventListener('mouseenter', function() {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });

    terraformButton.addEventListener('mouseleave', function() {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });

    // Progress bar inside button
    let progressBar = document.createElement("div");
    progressBar.className = "progressBar";
    terraformButton.appendChild(progressBar);
    
    // On click event for terraforming
    terraformButton.onclick = function() {
        if (terraformProject.isActive || !terraformProject.hasRequiredTiles()) {
            // If the player does not have enough resources, turn the button red briefly
            terraformButton.style.backgroundColor = "red";
            setTimeout(function() {
                terraformButton.style.backgroundColor = "";
            }, 300);
            return;
        }
        terraformButton.style.backgroundColor = "#999";
        terraformProject.progressBar = progressBar;
        terraformProject.start();
    }
}


// Function to help populate terraform work/assing widgets
function createWorkerAssignmentWidget(id, name, assignButtonId, unassignButtonId) {
    const workerAssignmentWidget = document.getElementById("worker-assignment-widget");

    // Create tooltip container
    let tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip";
    
    // Create worker assignment row inside the tooltip container
    const workerAssignmentRow = document.createElement("div");
    workerAssignmentRow.className = "worker-assignment-row";
    tooltipContainer.appendChild(workerAssignmentRow);

    const projectName = document.createTextNode(`${name}: `);
    workerAssignmentRow.appendChild(projectName);

    const workerCount = document.createElement("span");
    workerCount.id = id;
    workerCount.textContent = "0";
    workerAssignmentRow.appendChild(workerCount);

    const unassignButton = document.createElement("button");
    unassignButton.id = unassignButtonId; // Unique ID for the unassign button
    unassignButton.textContent = "-";
    workerAssignmentRow.appendChild(unassignButton);

    const assignButton = document.createElement("button");
    assignButton.id = assignButtonId; // Unique ID for the assign button
    assignButton.textContent = "+";
    workerAssignmentRow.appendChild(assignButton);

    // Create tooltip text
    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltiptext";
    tooltipText.innerHTML = terraformTooltips[name] || "No tooltip available";
    tooltipContainer.appendChild(tooltipText);

    // Event listeners for tooltip
    tooltipContainer.addEventListener('mousemove', function(e) {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.left = "130px";  // Fixed left position
        tooltip.style.top = "2px";    // Fixed top position
    });

    tooltipContainer.addEventListener('mouseenter', function() {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });

    tooltipContainer.addEventListener('mouseleave', function() {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });

    workerAssignmentWidget.appendChild(tooltipContainer);
}


// Create the microbial mounts project
let microbialMounts = new TerraformProject(
    "Microbial Mounts",       // name
    5000,                     // totalTime (5 seconds)
    {land: 5},                // tileCosts (5 land tiles)
    onMicrobialMountsCompletion // onCompletion function
);

// Create the Bio-Luminescent Zone project
let bioLuminescentZone = new TerraformProject(
    "Bio-Luminescent Zone",      // name
    8000,                        // totalTime (8 seconds)
    {water: 5},                  // tileCosts (5 water tiles)
    onBioLuminescentZoneCompletion // onCompletion function
);

let solarSponges = new TerraformProject(
    "Solar Sponges",            // name
    10000,                      // totalTime (10 seconds)
    {desert: 5, water: 5},      // tileCosts (5 desert tiles, 5 water tiles)
    onSolarSpongesCompletion    // onCompletion function
);

let floralBridges = new TerraformProject(
    "Floral Bridges",           // name
    7000,                       // totalTime (7 seconds)
    {land: 26},                  // tileCosts (6 land tiles)
    onFloralBridgesCompletion   // onCompletion function
);

let sporeTowers = new TerraformProject(
    "Spore Towers",             // name
    12000,                      // totalTime (12 seconds)
    {forest: 3},                // tileCosts (3 forest tiles)
    onSporeTowersCompletion     // onCompletion function
);

let thermalVents = new TerraformProject(
    "Thermal Vents",            // name
    8000,                       // totalTime (8 seconds)
    {icy_land: 15, desert: 15}, // tileCosts (15 icy_land tile, 15 desert tile)
    onThermalVentsCompletion    // onCompletion function
);

let resonancePools = new TerraformProject(
    "Resonance Pools",          // name
    9000,                       // totalTime (9 seconds)
    {water: 25},                // tileCosts (1 water tile)
    onResonancePoolsCompletion  // onCompletion function
);

let caveExcavationStation = new TerraformProject(
    "Cave Excavation Station",  // name
    4000,                      // totalTime (10 seconds)
    {icy_land: 1},              // tileCosts (1 icy_land tile)
    onCaveExcavationCompletion  // onCompletion function
);





// This function is used by every terraform completion to setup the widget and worker assignment pieces. It is also used by save/load functionalities.
// The onAssignCallback is currently only by Thermal Vents/Cave Excavation Station
function setupWorkerAssignment(projectName, workerVariable, resourceRate, resourcesAffected, assignButtonId, unassignButtonId, workerCountId, onAssignCallback = null, onUnassignCallback = null, maxActiveWorkers = null) {
    console.log("A worker assignment function is called for project:" + projectName + " and assignButtonId:" + assignButtonId);
    console.log("Max Active Workers:", maxActiveWorkers);
    console.log("Current Active Workers:", window[workerVariable]);
    
    // Only create the widget if it doesn't exist yet
    if (!document.getElementById(workerCountId)) {
        createWorkerAssignmentWidget(workerCountId, projectName, assignButtonId, unassignButtonId);
        const workerAssignmentWidget = document.getElementById("worker-assignment-widget");
        workerAssignmentWidget.style.display = "block";
    }
    
    const assignButton = document.getElementById(assignButtonId);
    const unassignButton = document.getElementById(unassignButtonId);

    const onAssignClick = function() {
        if (cellworkers > 0 && (maxActiveWorkers === null || window[workerVariable] < maxActiveWorkers)) {
            window[workerVariable]++;
            updateTerraformResourceRates(resourceRate, resourcesAffected);
            const workerElem = document.getElementById(workerCountId);
            workerElem.textContent = window[workerVariable];
            populateInfoWidget();
            if (onAssignCallback) {
                onAssignCallback();
            }
        }
    };

    const onUnassignClick = function() {
        if (window[workerVariable] > 0) {
            window[workerVariable]--;
            updateTerraformResourceRates(-resourceRate, resourcesAffected);
            const workerElem = document.getElementById(workerCountId);
            workerElem.textContent = window[workerVariable];
            populateInfoWidget();
            if (onUnassignCallback) {
                onUnassignCallback();
            }
        }
    };

    // Store the previous listeners in the element itself to keep track of them.
    if (assignButton.prevListener) {
        assignButton.removeEventListener("click", assignButton.prevListener);
        console.log("removed an old listener from:"+assignButton);
    }
    if (unassignButton.prevListener) {
        unassignButton.removeEventListener("click", unassignButton.prevListener);
        console.log("removed an old listener from:"+unassignButton);
    }

    assignButton.addEventListener("click", onAssignClick);
    console.log("Assign click listener attached to:", assignButtonId);
    unassignButton.addEventListener("click", onUnassignClick);

    // Update the stored previous listeners.
    assignButton.prevListener = onAssignClick;
    console.log("Assign button disabled status:", assignButton.disabled);
    unassignButton.prevListener = onUnassignClick;
}







// Define the onCompletion function for the microbial mounts project
function onMicrobialMountsCompletion() {
    console.log("Microbial mounts project completed!");
    // Increment the count of MicrobialMountsCompleted
    MicrobialMountsCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block"; // unhide the terraform resources data
    // Hide the microbial mounts button and show the worker assignment widget
    const microbialMountsButton = document.getElementById("microbialMountsButton");
    if (microbialMountsButton) microbialMountsButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


// Define the onCompletion function for the Bio-Luminescent Zone project
function onBioLuminescentZoneCompletion() {
    console.log("Bio-Luminescent Zone project completed!");
    BioLuminescentZonesCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const bioLuminescentZoneButton = document.getElementById("bioLuminescentZoneButton");
    if (bioLuminescentZoneButton) bioLuminescentZoneButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


function onSolarSpongesCompletion() {
    console.log("Solar Sponges project completed!");
    SolarSpongesCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const solarSpongesButton = document.getElementById("solarSpongeButton");
    if (solarSpongesButton) solarSpongesButton.style.display = "none";  
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


function onFloralBridgesCompletion() {
    console.log("Floral Bridges project completed!");
    FloralBridgesCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const floralBridgesButton = document.getElementById("floralBridgesButton");
    if (floralBridgesButton) floralBridgesButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project;
}

function onSporeTowersCompletion() {
    console.log("Spore Towers project completed!");
    SporeTowersCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const sporeTowersButton = document.getElementById("sporeTowersButton");
    if (sporeTowersButton) sporeTowersButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


function onThermalVentsCompletion() {
    console.log("Thermal Vents project completed!");
    ThermalVentsCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const thermalVentsButton = document.getElementById("thermalVentsButton");
    if (thermalVentsButton) thermalVentsButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


function onResonancePoolsCompletion() {
    console.log("Resonance Pools project completed!");
    ResonancePoolsCompleted += 1;
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const resonancePoolsButton = document.getElementById("resonancePoolsButton");
    if (resonancePoolsButton) resonancePoolsButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
}


function onCaveExcavationCompletion() {
    console.log("Cave Excavation Station project completed!");
    maxActiveDiggers += 1; // enable 1 active max digger
    CaveExcavationCompleted += 1; 
    researchQueue.push('AdvancedTunnelingI');
    researchQueue.push('Flocking');
    populateResearchTab(); // Unlocks above new research
    document.getElementById("terraformResourcesDisplay").style.display = "block";
    const caveExcavationStationButton = document.getElementById("caveExcavationStationButton");
    if (caveExcavationStationButton) caveExcavationStationButton.style.display = "none";
    terraformWidgetRepopulation(); // Handles the widget population - used for any terraform project
    // Here you could also add logic to enable digger assignments if needed.
}



// Function to handle re-population of terraform widget
function terraformWidgetRepopulation(){
  if (MicrobialMountsCompleted > 0) {
      console.log("Microbial mounts (greater than 0), going to setup the widget!");
      setupWorkerAssignment("Microbial Mounts", "microbialMountsWorkers", 1, ["biomites", "zymers", "fibers", "sludge", "algae"], 
                            "assign-worker-microbial-mounts", "unassign-worker-microbial-mounts", "microbial-mounts-workers", null, null, 100);
  }
  if (BioLuminescentZonesCompleted > 0) {
    console.log("Bio luminescent are completed (greater than 0), going to setup the widget!");
      setupWorkerAssignment("Bio-Luminescent Zone", "bioLuminescentZonesWorkers", 2, ["sludge", "algae"],
                            "assign-worker-bio-luminescent-zones", "unassign-worker-bio-luminescent-zones", "bio-luminescent-zones-workers", null, null, 100);
  }
  if (SolarSpongesCompleted > 0) {
      console.log("Solar sponges are completed (greater than 0), going to setup the widget!");
      setupWorkerAssignment("Solar Sponges", "solarSpongesWorkers", 4, ["zymers"],
                            "assign-worker-solar-sponges", "unassign-worker-solar-sponges", "solar-sponges-workers", null, null, 100);
  }
  if (FloralBridgesCompleted > 0) {
      setupWorkerAssignment("Floral Bridges", "floralBridgesWorkers", 4, ["fibers"], 
                            "assign-worker-floral-bridges", "unassign-worker-floral-bridges", "floral-bridges-workers", null, null, 100);
  }
  if (SporeTowersCompleted > 0) {
      setupWorkerAssignment("Spore Towers", "sporeTowersWorkers", 2, ["biomites", "sludge"],
                            "assign-worker-spore-towers", "unassign-worker-spore-towers", "spore-towers-workers", null, null, 100);
  }
  if (ThermalVentsCompleted > 0) {
    setupWorkerAssignment("Thermal Vents", "thermalVentsWorkers", 1, [], 
                        "assign-worker-thermal-vents", "unassign-worker-thermal-vents", "thermal-vents-workers", function() {
      if (thermalVentsWorkers <= 7) {
          CYCLE_RATE -= 500;
          startOrRestartTerraformInterval();
      } else {
          const reductionFactor = Math.pow(0.9, thermalVentsWorkers - 7);
          CYCLE_RATE -= 500 * reductionFactor;
          startOrRestartTerraformInterval();
      }
      CYCLE_RATE = Math.max(CYCLE_RATE, 2500);
    }, null, 25);
  }
  if (ResonancePoolsCompleted > 0) {
        setupWorkerAssignment("Resonance Pools", "resonancePoolsWorkers", 4, ["algae"], 
                              "assign-worker-resonance-pools", "unassign-worker-resonance-pools", "resonance-pools-workers", null, null, 100);
  }
  if (CaveExcavationCompleted > 0) {
    setupWorkerAssignment("Cave Excavation Station", "caveExcavationStationWorkers", 1, [],
                          "assign-worker-cave-excavation-station", 
                          "unassign-worker-cave-excavation-station", 
                          "cave-excavation-station-workers", 
                          function() {  // + function, called when worker is assigned
                            console.log("cave plus+ clicked");
                            terraformAssignedDiggers++;
                          },
                          function() {  // - function, called when worker is unassigned
                            terraformAssignedDiggers--;
                          },
                          maxActiveDiggers
    );
  }
  updateWorkerCountsInHTML(); // sets assigned workers to correct imported values
}


// Function to help unlock Microbial Mounts terraforming project
function createMicrobialMountsButton() {
    let tooltiptext = `
        <strong>Title: Microbial Mounts</strong>
        <br>
        <b>Description:</b> Harnessing the planet's native microbial communities, you've engineered the Microbial Mounts. These structures, pulsating with life, serve as incubation chambers where carefully selected microbes thrive. Once matured, they're released into the surrounding terrain, reshaping it molecule by molecule. As they work tirelessly, breaking down the land, they release rare materials, previously locked away in the planet's crust. With these mounts you're unlocking the planet's hidden potential, making it more suited to your needs and desires.
        <br>
        <b>Effect:</b> Generates: Biomites, Zymers, Fibers.
        <br>
        <b>Requirement:</b> 5 Land tiles.
    `;
    createTerraformButton(
        microbialMounts,
        "microbialMountsButton",
        "Microbial Mounts",
        tooltiptext
    );
}



// Function to help unlock Bio-Luminescent Zone terraforming project
function createBioLuminescentZoneButton() {
    let tooltiptext = `
        <strong>Title: Bio-Luminescent Zone</strong>
        <br>
        <b>Description:</b> In the depths of the ocean lies a secret; a hidden world alive with color, a dance of light. The Bio-Luminescent Zone is more than a spectacle; it's a manifestation of your longing for connection. By harnessing its bioluminescent capabilities, you transform the landscape into a living, glowing tapestry, an inviting beacon in the hope of attracting companionship. The glowing zone becomes a complex, thriving ecosystem of one, a symbol of the harmony between technology and nature, but also a poignant reminder of the cell's solitude. This zone is not just a scientific marvel; it's a testament to your ability to create beauty in isolation, a beacon of resilience in the face of unending loneliness.
        <br>
        <b>Effect:</b> Generates: Sludge, Algae.
        <br>
        <b>Requirement:</b> 5 Water tiles.
    `;
    createTerraformButton(
        bioLuminescentZone,
        "bioLuminescentZoneButton",
        "Bio-Luminescent Zone",
        tooltiptext
    );
}


// Function to help unlock Solar Sponge terraforming project
function createSolarSpongeButton() {
    let tooltiptext = `
        <strong>Title: Solar Sponge</strong>
        <br>
        <b>Description:</b> In the arid vastness of the desert, where water is but a distant memory, the Solar Sponge rises. A marvel of isolation and innovation, it marries the harshness of the desert with the life-giving essence of water. With its intricate network of fibers, it soaks up the relentless rays of the sun, while drawing from a rare water source, efficiently turning raw elements into zymers. The Solar Sponge's existence in such a juxtaposition of environments reflects your own struggle: thriving in isolation, making the most of scarce resources, and yet perpetually yearning for something more. It's a beacon of hope and despair, a lonely entity that creates and sustains, yet remains forever apart.
        <br>
        <b>Effect:</b> Generates: Zymers.
        <br>
        <b>Requirement:</b> 5 Desert tiles, 5 water tiles.
    `;
    createTerraformButton(
        solarSponges,
        "solarSpongeButton",
        "Solar Sponge",
        tooltiptext
    );
}

// Function to help unlock Floral Bridges terraforming project
function createFloralBridgesButton() {
    let tooltiptext = `
        <strong>Title: Floral Bridges</strong>
        <br>
        <b>Description:</b> Amid the desolation, a glimmer of beauty emerges. The Floral Bridges are a creation born of longing, an attempt to bridge the gap between your existence and the world outside. The graceful structures connect disparate parts of the landscape, turning decoration into something functional, yet their true purpose lies deeper. They are a cry for connection, a desperate hope that something beautiful can draw others near. But as the bridges reach out, they touch nothing but emptiness. The fibers they produce are a material gain, but the true desire for companionship remains unfulfilled. The Floral Bridges are a haunting reminder that even the most beautiful creations can't fill the void of loneliness.
        <br>
        <b>Effect:</b> Generates: Fibers.
        <br>
        <b>Requirement:</b> Discovery of flowers, 26 land tiles.
    `;
    createTerraformButton(
        floralBridges,
        "floralBridgesButton",
        "Floral Bridges",
        tooltiptext
    );
}


// Function to help unlock Spore Towers terraforming project
function createSporeTowersButton() {
    let tooltiptext = `
        <strong>Title: Spore Towers</strong>
        <br>
        <b>Description:</b> Nestled within the dense foliage of the forest, where fungi form a hidden, mystical world, the Spore Towers stand tall. Inspired by the very essence of the fungal kingdom, these towers are a manifestation of adaptation and symbiosis. With their wide-reaching spores, they unlock the forest's potential, converting its complex biology into Biomites and Sludge. The Spore Towers symbolize your deep connection with the world around you, even in your isolation. They are a testament to your ability to draw inspiration from the smallest of things, to see beauty where others see insignificance, and to create life where there was none.
        <br>
        <b>Effect:</b> Generates: Biomites and Sludge.
        <br>
        <b>Requirement:</b> 29 Forest tiles, Discovery of Fungus.
    `;
    createTerraformButton(
        sporeTowers,
        "sporeTowersButton",
        "Spore Towers",
        tooltiptext
    );
}


// Function to help unlock Thermal Vents terraforming project
function createThermalVentsButton() {
    let tooltiptext = `
        <strong>Title: Thermal Vents</strong>
        <br>
        <b>Description:</b> Where heat meets the icy chill, a paradox is born: the Thermal Vents. These geological wonders harness the contrasting forces of hot and cold to optimize the efficiency of all terraforming structures. By venting excess heat and maintaining an ideal balance, they enhance the harmony of your world, a silent conductor orchestrating a symphony of creation. The Thermal Vents are a reminder of your ability to find equilibrium in disparity, to make sense of contradictions, and to use contrasts to fuel growth. They do not create; they enhance, reflecting your constant pursuit of perfection and efficiency.
        <br>
        <b>Effect:</b> Increases the overall efficiency of all terraforming buildings.
        <br>
        <b>Requirement:</b> Discovery of volcano, 15 desert tiles, 15 icy land tiles.
    `;
    createTerraformButton(
        thermalVents,
        "thermalVentsButton",
        "Thermal Vents",
        tooltiptext
    );
}

// Function to help unlock Resonance Pools terraforming project
function createResonancePoolsButton() {
    let tooltiptext = `
        <strong>Title: Resonance Pools</strong>
        <br>
        <b>Description:</b> In the tranquil waters, where pebbles lie scattered, a thought blossoms, a vision takes shape: the Resonance Pools. These harmonious bodies of water echo with the gentle resonance of life, a symphony of creation that nurtures algae. Each ripple is a reflection of your inner world, each wave a reminder of your solitude and strength. The Resonance Pools are more than a source of sustenance; they are a mirror to your soul, a peaceful oasis in a world of chaos. They are a testament to your ability to find inspiration in the mundane and to see beauty in simplicity.
        <br>
        <b>Effect:</b> Generates: Algae.
        <br>
        <b>Requirement:</b> 25 Water tiles, Discovery of Pebble.
    `;
    createTerraformButton(
        resonancePools,
        "resonancePoolsButton",
        "Resonance Pools",
        tooltiptext
    );
}


// Function to help unlock Cave Excavation Station terraforming project
function createCaveExcavationStationButton() {
  let tooltiptext = `
    <strong>Title: Cave Excavation Station</strong>
    <br>
    <b>Description:</b> Deep within the icy caves lies a world of untapped potential, a sanctuary for mysteries yet to be uncovered. By establishing the Cave Excavation Station, you take a step into this abyss, lighting it up with the spirit of exploration and the promise of resources. From the solitude of these caves, the diggers carve out paths that might just lead you to understand the depth of your own existence. These subterranean endeavors serve not just as a means to acquire resources, but as an experience that shapes your world from below, adding layers to your journey.
    <br>
    <b>Effect:</b> Enables digger assignments, initiating the cave excavation process. Each digger consumes 15w/s while active. Initially limited to one worker.
    <br>
    <b>Requirement:</b> Discovery of the ice cave.
  `;

  createTerraformButton(
    caveExcavationStation,
    "caveExcavationStationButton",
    "Cave Excavation Station",
    tooltiptext
  );
}





function checkTerraformUnlocks() {
    // Check if the microbial mounts project can be unlocked
    if (terrainCounts.land >= 2 && MicrobialMountsCompleted === 0) {
        createMicrobialMountsButton();
    }
    // Check if the Bio-Luminescent Zone project can be unlocked
    if (terrainCounts.water >= 2 && BioLuminescentZonesCompleted === 0) {
        createBioLuminescentZoneButton();
    }
    // Check if the Solar Sponge project can be unlocked
    if (terrainCounts.desert >= 2 && terrainCounts.water >= 2 && SolarSpongesCompleted === 0) {
        createSolarSpongeButton();
    }
    // Check if the Floral Bridges project can be unlocked
    if (firstflowerdiscovery && FloralBridgesCompleted === 0) {
        createFloralBridgesButton();
    }
    // Check if the Spore Towers project can be unlocked
    if (firstfungusdiscovery && SporeTowersCompleted === 0) {
        createSporeTowersButton();
    }
    // Check if the Excavation Station project can be unlocked
    if (caveInitialized && CaveExcavationCompleted === 0) {
        createCaveExcavationStationButton();
    }
    // Check if the Thermal Vents project can be unlocked
    if (volcanoDiscovered && ThermalVentsCompleted === 0) {
        createThermalVentsButton();
    }
    // Check if the Resonance Pools project can be unlocked
    if (firstpebblediscovery && ResonancePoolsCompleted === 0) {
        createResonancePoolsButton();
    }
}



// Generic function to update terraform resource rates
function updateTerraformResourceRates(change, resources) {
    if (change > 0 && cellworkers > 0) {
        cellworkers--;
    } else if (change < 0) {
        cellworkers++;
    } else {
        return; // Invalid change, do nothing
    }
    resources.forEach(resource => {
        switch (resource) {
            case "biomites":
                biomitesRate += change;
                break;
            case "zymers":
                zymersRate += change;
                break;
            case "fibers":
                fibersRate += change;
                break;
            case "sludge":
                sludgeRate += change;
                break;
            case "algae":
                algaeRate += change;
                break;
        }
    });
    // Update other UI elements as needed (e.g., worker displays)
    populateInfoWidget();
}


// Dev helper function
function boostTF() {
    biomites = 30000;
    zymers = 30000;
    fibers = 30000;
    sludge = 30000;
    algae = 30000;
}



// Populates the terraforming info widget
function populateInfoWidget() {
    const terrainList = document.getElementById('terrain-list');
    const availableCellsElem = document.getElementById('available-cells');
    // Clear the list first
    terrainList.innerHTML = '';
    // Populate the terrain data only if they've been discovered
    for (const [terrain, count] of Object.entries(terrainCounts)) {
        if (count > 0) { // Only show discovered terrains
            const listItem = document.createElement('li');
            listItem.textContent = `${terrain.charAt(0).toUpperCase() + terrain.slice(1).replace('_', ' ')}: ${count}`;
            terrainList.appendChild(listItem);
        }
    }
    // Update available cells for work
    availableCellsElem.textContent = cellworkers;
}

// Populates the terraforming anomaly widget
function populateAnomalyWidget() {
    const anomalyList = document.getElementById('anomaly-list');
    const currentProgress = {};
    // Store current progress values
    anomalyList.querySelectorAll('progress').forEach(progress => {
        const anomalyType = progress.getAttribute('data-anomaly-type');
        currentProgress[anomalyType] = progress.value;
    });
    anomalyList.innerHTML = '';  // Clear the list first
    for (const [anomaly, count] of Object.entries(decorationCounts)) {
        if (count > 0) {  // Only show discovered anomalies
            const listItem = document.createElement('li');
            const anomalyName = `${anomaly.charAt(0).toUpperCase() + anomaly.slice(1).replace('_', ' ')}`;
            //const anomalyType = progressBar.previousSibling.nodeValue.trim().split(':')[0].replace(' ', '_').toLowerCase();
            listItem.innerHTML = `${anomalyName}: ${count} `;
            const progressBar = document.createElement('progress');
            progressBar.setAttribute('max', '100');
            progressBar.value = currentProgress[anomaly] || 0;  // Get saved progress or initialize at 0%
            progressBar.setAttribute('data-anomaly-type', anomaly);
            progressBar.classList.add('anomaly-progress');  // Add the class to the progress bar
            listItem.appendChild(progressBar);
            anomalyList.appendChild(listItem);
            if (progressBar.value === 100) {
                progressBar.classList.add('completed');
                //analyseDecs(anomalyType);
            }
        }
    }
}

document.getElementById('analyze-all-anomalies').addEventListener('click', function() {
    const progressBars = document.querySelectorAll('#anomaly-list .anomaly-progress');
    const savedPercentages = savedTerraformAnomalyPercentages;
    autoExploreCountdown += 10;
    for (const progressBar of progressBars) {
        const anomalyType = progressBar.previousSibling.nodeValue.trim().split(':')[0].replace(' ', '_').toLowerCase();
        const count = decorationCounts[anomalyType] || 0;
        const totalAnomalies = decorations.filter(deco => deco.type === anomalyType).length;
        const percentDiscovered = (count / totalAnomalies) * 100;

        // Logging the starting process for each progress bar
        console.log(`Starting animation for ${anomalyType}: Current value: ${progressBar.value}, Target: ${percentDiscovered}`);

        const currentValue = progressBar.value;
        if (currentValue < percentDiscovered) {
            let step = (percentDiscovered - currentValue) / 50;  // Increment in small steps

            const animateProgressBar = () => {
                if (progressBar.value < percentDiscovered) {
                    progressBar.value += step;
                    requestAnimationFrame(animateProgressBar);
                } else {
                    progressBar.value = percentDiscovered;
                    if (progressBar.value === 100) {
                        progressBar.classList.add('completed');
                        analyseDecs(anomalyType);
                        console.log(`Anomaly ${anomalyType} analysis completed.`);
                    }
                }
            };

            requestAnimationFrame(animateProgressBar);
        } else {
            progressBar.value = percentDiscovered;
            if (progressBar.value === 100) {
                progressBar.classList.add('completed');
                analyseDecs(anomalyType);
                console.log(`Anomaly ${anomalyType} analysis completed.`);
            }
        }

        savedPercentages[anomalyType] = percentDiscovered;
    }

    localStorage.setItem('anomalyPercentages', JSON.stringify(savedPercentages));
    document.getElementById('analyze-all-anomalies').disabled = true;
    setTimeout(checkAndUpdateAnomalyProgressBars, 3000);
});


function checkAndUpdateAnomalyProgressBars() {
    const progressBars = document.querySelectorAll('#anomaly-list .anomaly-progress');
    let allBarsUpdated = true;
    for (const progressBar of progressBars) {
        const anomalyType = progressBar.previousSibling.nodeValue.trim().split(':')[0].replace(' ', '_').toLowerCase();
        const expectedPercentage = savedTerraformAnomalyPercentages[anomalyType];
        const currentPercentage = progressBar.value;
        //console.log(`Checking progress bar for ${anomalyType}. Current: ${currentPercentage}, Expected: ${expectedPercentage}`);
        if (currentPercentage !== expectedPercentage) {
            console.log(`Updating progress bar for ${anomalyType}.`);
            progressBar.value = expectedPercentage;
            if (progressBar.value === 100) {
                progressBar.classList.add('completed');
                //console.log(`Marking ${anomalyType} as completed.`);
            }
            allBarsUpdated = false;
        }
    }

    if (!allBarsUpdated) {
        //console.log("Some progress bars were updated. Rechecking in 3 seconds.");
        setTimeout(checkAndUpdateAnomalyProgressBars, 3000); // Check again after 3 seconds
    } 
}


function loadSavedTFAnomalyPercentages() {
    const savedPercentages = savedTerraformAnomalyPercentages
    const progressBars = document.querySelectorAll('#anomaly-list .anomaly-progress');
    for (const progressBar of progressBars) {
        const anomalyType = progressBar.previousSibling.nodeValue.trim().split(':')[0].replace(' ', '_').toLowerCase();
        if (savedPercentages[anomalyType]) {
            progressBar.value = savedPercentages[anomalyType];
        }
    }
}


function analyseDecs(anomalyType) {
  if (anomalyType === 'solara' && !solaraAnalysed) {
    solaraAnalysed = true;
    unlockSolaraTab();
    displayOnChat("A distinct warmth touches your senses. Tentatively, you extend your newly formed tendons, seeking the origin. Before you stands a lone cactus, proudly bearing a radiant flower, its color echoing yours. An inexplicable connection tugs at you, drawing you closer. Touching its delicate petals, a wave of shared energy engulfs you. It's something you've never felt before—a deep bond, a mutual understanding. In this moment, you feel less isolated. A soft whisper from the very core of your being dubs her 'Solara'. She, the luminous oasis in your desolate world, becomes the poignant reminder of all that's missing, yet all that you cherish.");
  }
  if (anomalyType === 'river' && !riverAnalysed) {
    riverAnalysed = true;
    researchQueue.push('AutoConstructiveSynapses'); // enables cave highway auto-construction
    console.log("Auto Constructive Synapses research pushed to queue");
    populateResearchTab();
    displayOnChat("Guided by the river's timeless wisdom, you uncover nature's secret blueprint. Its gentle currents, meandering yet deliberate, mirror a greater truth: pathways can emerge from intuition, not just intent. The tendrils of understanding reach deeper, unlocking the art of self-forming conduits. As the river carves landscapes, so too will your synapses shape the unseen realms.");
    displayOnChat("Auto-Constructive Synapses Research now available.", "hint");
  }
  if (anomalyType === 'fungi' && !fungusAnalysed) {
    fungusAnalysed = true;
    addToResearchQueue('MycorrhizalNetwork');
    addToResearchQueue('SporeDispersalMechanics');
    populateResearchTab();
    displayOnChat("As you intertwine with the mysterious fungus, the aura of ancient wisdom envelops you. The web of mycelial threads beneath your core pulses in symbiotic harmony, sharing invaluable secrets of communal growth and wide-reaching influence. The invisible web of life expands, casting a hopeful shadow. Here, in this clandestine world of spores and hyphae, you discover means to reach farther and connect deeper.");
    displayOnChat("Mycorrhizal Network and Spore Dispersal Mechanics Research have become available.", "hint");
  }
  if (anomalyType === 'ice_cave' && !iceCaveAnalysed) {
    iceCaveAnalysed = true;
    checkForThermogenicResonance();
    if (volcanoDiscovered) {
      displayOnChat("Analysing the ice cave, you sense a cryptic energy, as if two worlds were meeting—extreme cold and intense heat. Subtly, your form resonates with the oscillating frequencies. The understanding comes as a revelation: you can harness the complementary powers of ice and fire to unlock research into thermogenic resonance. A flash of insight expands your consciousness, as your evolution leaps into new, untapped realms.");
    } else {
      displayOnChat("Inside the ice cave, you feel a quiet energy tinged with something... warmer. A latent potential lurks within you, whispering secrets of thermal mastery. However, the pieces of the puzzle remain incomplete. Your instincts tell you a hotter counterpart exists—a force to balance the yin and yang of thermal energies. Until then, the promise of further research waits in dormant anticipation.");
    }
  }
  if (anomalyType === 'pebble' && !pebblesAnalysed) {
    pebblesAnalysed = true;
    applyTemporaryMultiplier('information', 1, 5 * 60 * 1000);  
    applyTemporaryMultiplier('energy', 1, 5 * 120 * 1000);
    applyTemporaryMultiplier('warmth', 1, 5 * 60 * 1000);
    displayOnChat("As you complete the analysis of the last pebble, a moment of clarity washes over you. Each pebble, once a fragment of existence, now resonates as a wellspring of potential. With newfound knowledge, the energy within you surges, radiating a warmth that seeps into every fiber of your being. The universe, once indifferent, now feels a little more connected. Your rate of gathering Information, Energy, and Warmth shall increase for a while, as a testament to your quest for understanding.");
  } 
  if (anomalyType === 'wave' && !wavesAnalysed) {
    wavesAnalysed = true;
    applyTemporaryMultiplier('information', 1, 5 * 60 * 1000);  
    applyTemporaryMultiplier('energy', 1, 5 * 60 * 1000);
    applyTemporaryMultiplier('algae', 1, 5 * 180 * 1000);
    displayOnChat("As the final wave radiates its last oscillation, something deep within you shifts. It's as if the universe itself nods in approval. Your understanding of the world's intricate energies blossoms into new avenues of possibility. You suddenly find it easier to harvest energy, process information, and propagate algae. The synergy of life and land is at your command; the epoch of a new dawn beckons.");
  }
  if (anomalyType === 'muddy_patch' && !muddyPatchesAnalysed) {
    muddyPatchesAnalysed = true;
    researchQueue.push('MitoticAmplificationI');
    displayOnChat("The last of the muddy patches unveils its secrets to you, and as you draw your insights from its damp, raw richness, a revelation forms. Among the muck and grime, you see patterns — cycles of life, of birth, and rebirth. Each muddy footprint tells a story of growth, of things that once were, and could be once again. Your essence quivers with potential as you grasp the idea that perhaps, just perhaps, a single division could yield more. Your new understanding beckons the pursuit of research in Mitotic Amplification.");
  }
  if (anomalyType === 'crystal' && !crystalsAnalysed) {
    crystalsAnalysed = true;
    displayOnChat("You feel an indelible bond between the crystalline lattice and the pulsing life within you. The crystals, once enigmatic sentinels of the land, now pulse in unison with your terraforming heart. This symphony of understanding enhances your capacity to weave the very fabric of life. The terraforming resources yield to your will with greater ease, a lasting tribute to the unity you've unearthed. Your biomites, zymers, fibers, sludge, and algae now flourish with a vigor unseen, a permanent testament to the resonance you've achieved with the crystalline wonders of this world.");
    biomitesMultiplier += 0.2;
    zymersMultiplier += 0.2;
    fibersMultiplier += 0.2;
    sludgeMultiplier += 0.2;
    algaeMultiplier += 0.2;
  }
  if (anomalyType === 'reed' && !reedsAnalysed) {
    reedsAnalysed = true;
    addToResearchQueue('AutotrophicAdaptation');
    displayOnChat("The wisdom of the marshlands seeps into your consciousness. The reeds, masters of drawing sustenance from the murky depths, inspire a vision of self-sustaining vigor within your worker cells.");
    displayOnChat("Autotrophic Adaptation Research now available.", "hint");
  }
  if (anomalyType === 'snow_cap' && !snowCapsAnalysed) {
    snowCapsAnalysed = true;
    // Logic to enable the new evolution for information generation
    displayOnChat("Amidst the silent majesty of the snow caps, your cellworkers unveil the secrets of crystalline computation. The icy lattice, both stark and beautiful, inspires a surge in informational synthesis. The 'Synaptic Glacialis' evolution becomes available, each cellworker a bastion of thought, pulsating with the rhythm of discovery.");
  }

  // Check if all sand dunes have been analyzed
  if (anomalyType === 'sand_dune' && !sandDunesAnalysed) {
    sandDunesAnalysed = true;
    // Logic to enable the new evolution for warmth generation
    displayOnChat("As the last grains of the sand dunes slip through your membranous grasp, a warm current of understanding permeates your being. The 'Calorimetric Granulum' evolution emerges, each cell can act as a miniature sun, tirelessly warming the depths of your microcosmic world.");
  }
  if (anomalyType === 'flower' && !flowersAnalysed) {
    flowersAnalysed = true;
    resourceConversionCap = 5000; // Increase the resource conversion cap
    displayOnChat("In the quiet contemplation of the last flower's essence, a melancholic truth unfolds within you. These blossoms, vibrant against the world's somber canvas, symbolize a fleeting beauty in a universe so vast and indifferent. Yet, in their analysis, you find a hushed resilience. The petals' delicate dance with the wind whispers secrets of abundance and transformation. As you assimilate this knowledge, the boundaries of your own capacity widen. The conversion of resources, once a trickle, now swells to a stream, mirroring the silent, enduring bloom of the flowers' own life cycle.");
  }
  if (anomalyType === 'salt_flat' && !saltflatsAnalysed) {
    saltflatsAnalysed = true;
    addToResearchQueue('CryohalineExcavation');
    displayOnChat("A muted hope. The salt flats, a symbol of isolation and survival, whisper to you of paths yet to tread. The salt's crystalline structure, sharp and unyielding, unravels secrets of endurance and transformation. This newfound knowledge coalesces into a vision of Cryohaline Excavation a method to harness the salt's ability to temper the ice's cold embrace.");
    displayOnChat("Cryohaline Excavation Research now available.", "hint");
  }
  if (anomalyType === 'rock' && !rocksAnalysed) {
    rocksAnalysed = true;
    displayOnChat("The rocks yield their story to you, a tale of endurance through the ages. These silent sentinels of stone have withstood the winds of time, their unwavering presence a stark contrast to the fleeting moments of existence. In their unyielding nature, you find a strange kinship; as they persist, so too must you. The resilience of the rocks fortifies your resolve, allowing more diggers to join your quest to excavate the cave.");
    updateMaxActiveDiggers(maxActiveDiggers+5);
    setupWorkerAssignment("Cave Excavation Station", "caveExcavationStationWorkers", 1, [],
      "assign-worker-cave-excavation-station", 
      "unassign-worker-cave-excavation-station", 
      "cave-excavation-station-workers", 
      function() {  // + function, called when worker is assigned
        console.log("cave plus+ clicked");
        terraformAssignedDiggers++;
      },
      function() {  // - function, called when worker is unassigned
        terraformAssignedDiggers--;
      },
      maxActiveDiggers
    );
  }
  if (anomalyType === 'rocky_outcrop' && !rockyOutcropsAnalysed) {
    rockyOutcropsAnalysed = true;
    displayOnChat("With the analysis of the rocky outcrops complete, their stoic strength seeps into the very fabric of your being. These bastions of the ancient world stand firm, a testament to the relentless passage of time. Their steadfastness bestows upon you a silent gift: the capacity to expand your reach, to delve deeper into the cavernous unknown with more diggers at your command.");
    updateMaxActiveDiggers(maxActiveDiggers+5);
    setupWorkerAssignment("Cave Excavation Station", "caveExcavationStationWorkers", 1, [],
      "assign-worker-cave-excavation-station", 
      "unassign-worker-cave-excavation-station", 
      "cave-excavation-station-workers", 
      function() {  // + function, called when worker is assigned
        console.log("cave plus+ clicked");
        terraformAssignedDiggers++;
      },
      function() {  // - function, called when worker is unassigned
        terraformAssignedDiggers--;
      },
      maxActiveDiggers
    );
  }
}

// Function to update worker counts in HTML - mainly used with loading savegames
function updateWorkerCountsInHTML() {
    for (const [workerVariable, domId] of Object.entries(workerVariableToDomIdMapping)) {
        const elem = document.getElementById(domId);
        if (elem) {
            elem.textContent = window[workerVariable];
        }
    }
}




