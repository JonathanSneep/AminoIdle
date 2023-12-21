
function wiggleOnClick() {
  this.disabled = true;
  setTimeout(() => this.disabled = false, 900);
  nourishment += nourishIncrement;
  updateStory("wiggle");
  updateResources();
  if (firstWiggle) {
    unlockAchievement(0); // Unlock Achievement if first wiggling
    firstWiggle = false;
    //initTone(); // begin music
  }

  // Randomize the seed for the wiggle effect
  var turbulence = document.getElementById('turbulence');
  var wiggleOnlyTurbulence = document.getElementById('wiggleOnlyTurbulence');

  // Check if the turbulence elements exist before attempting to modify
  if (turbulence && wiggleOnlyTurbulence) {
    turbulence.setAttribute('seed', Math.random() * 1000);
    wiggleOnlyTurbulence.setAttribute('seed', Math.random() * 1000);

    // Apply the wiggle filter to the cell
    var cell = document.getElementById('cell');
    if (cell) {
      cell.style.filter = 'url(#glowWiggle)';
    }

    // Animate the baseFrequency attribute of the feTurbulence primitive in the wiggle filter
    var baseFrequency = 0;
    var frequencyIncrement = 0.01;
    var wiggleAnimation = setInterval(function() {
      baseFrequency += frequencyIncrement;
      turbulence.setAttribute('baseFrequency', baseFrequency);
      wiggleOnlyTurbulence.setAttribute('baseFrequency', baseFrequency); // Apply the same effect to the wiggleOnly filter
      if (baseFrequency >= 0.1) {
        clearInterval(wiggleAnimation);
        //turbulence.setAttribute('baseFrequency', '0');  // Reset the base frequency to stop the wiggle effect
      }
    }, 52); // animation duration
  }
}



function senseOnClick() {
  if(nourishment >= 1) {
    nourishment--;
    information += informationIncrement;
    if (senseStoryIndex < senseStoryLines.length && information >= senseStoryLines[senseStoryIndex].information) {
      addStoryLine(senseStoryLines[senseStoryIndex].text);
      senseStoryIndex++;
    }
  }
}

function glowOnClick() {
  if(information >= 1) {
    information--;
    warmth += warmthIncrement;
    if (glowStoryIndex < glowStoryLines.length && warmth >= glowStoryLines[glowStoryIndex].warmth) {
      addStoryLine(glowStoryLines[glowStoryIndex].text);
      glowStoryIndex++;
    }
  }
}

function grabOnClick() {
  if(warmth >= 1) {
    warmth--;
    energy += energyIncrement;
    if (grabStoryIndex < grabStoryLines.length && energy >= grabStoryLines[grabStoryIndex].energy) {
      addStoryLine(grabStoryLines[grabStoryIndex].text);
      grabStoryIndex++;
    }
  }
}


// ProtoWorm movement
function slitherOnClick() {
  let segments = [];
  let flagella = [];
  for (let i = 1; i < 5; i++) {
    segments.push(document.getElementById("protowormsegment-" + i));
    flagella.push(document.getElementById("flagella-" + i));
  }
  let amplitudeSegments = 5; // Max vertical displacement for segments
  let amplitudeFlagella = 3; // Smaller vertical displacement for flagella
  let frequency = 0.001; // Reduced frequency to slow down the wave
  let phaseShift = 0.5; // Controls the delay between segments
  let slitherAnimation;
  slitherAnimation = setInterval(function() {
    for (let i = 0; i < segments.length; i++) {
      let yPositionSegments = 400 + amplitudeSegments * Math.sin(frequency * Date.now() + phaseShift * i);
      let yPositionFlagella = 400 + amplitudeFlagella * Math.sin(frequency * Date.now() + phaseShift * i);
      segments[i].setAttribute("cy", yPositionSegments);
      // You may need to adjust how the flagella's position is set, depending on the SVG structure
      // flagella[i].setAttribute("cy", yPositionFlagella);
    }
  }, 20); // Interval duration
  document.getElementById("slitherButton").disabled = true; // disable the slither button once activated
  displayOnChat("In the gloom of your existence, a transformation occurs. You, once confined to a simple form, find yourself elongated, segmented, complex. The monotonous wiggle of yore gives way to a graceful slither, a dance with shadows in the desolate void. " +
    "Yet, with evolution comes realization. You, now gifted with movement, feel the weight of your solitude more profoundly. Each slither is a cry for connection, a yearning for something beyond the barren emptiness. The very ability that grants you freedom becomes a haunting reminder of isolation. " +
    "But you endure, for in the dark recesses of existence, resilience is your only companion. You slither onward, a lonely traveler in search of meaning, a spark of life in an otherwise indifferent universe.")
  // Optional: You may want to set a condition to stop the slithering effect after some time
  setTimeout(displayEvolutionModal, 60000); 
}



function addSlitherButton() {
  // Create the button element
  var slitherButton = document.createElement("button");
  // Set the ID and text content
  slitherButton.id = "slitherButton";
  slitherButton.textContent = "Slither";
  // Add the slitherOnClick function as a click event listener
  slitherButton.addEventListener("click", slitherOnClick);
  // Find the Actions div and append the new button to it
  var actionsDiv = document.getElementById("Actions");
  actionsDiv.appendChild(slitherButton);
}


function addCrawlButton() {
  // Create the button element
  var crawlButton = document.createElement("button");
  // Set the ID and text content
  crawlButton.id = "crawlButton";
  crawlButton.textContent = "Crawl";
  // Add the crawlOnClick function as a click event listener
  crawlButton.addEventListener("click", crawlOnClick);
  // Find the Actions div and append the new button to it
  var actionsDiv = document.getElementById("Actions");
  actionsDiv.appendChild(crawlButton);
}



function removeWiggleButton() {
  // Find the wiggle button by its ID
  var wiggleButton = document.getElementById("wiggleButton");
  // Remove the button from the DOM
  if (wiggleButton) {
    wiggleButton.remove();
  }
}

// ProtoPod Crawl
function crawlOnClick() {
  resetLimbPositions(); // reset limbs to origin first to be safe
  let group1 = [0, 1, 4, 5]; // IDs of the limbs in the first group (top limbs)
  let group2 = [2, 3, 6, 7]; // IDs of the limbs in the second group (bottom limbs)
  let limbState = { group1: 0, group2: 0 }; // 0: Initial position, -1: Forward, 1: Backward
  function moveLimb(i, direction) {
    let limbInfo = protoPodLimbsInfo[i];
    let limb = document.getElementById(limbInfo.id);
    let outlineLimb = document.getElementById(limbInfo.outlineId);

    if (limb && outlineLimb) {
      // Random deviation in movement
      let randomX = (Math.random() * 10) - 5; // Between -5 and 5
      let randomY = (Math.random() * 10) - 5; // Between -5 and 5

      // Calculate the new end point with constraints
      let newX = limbInfo.originalEndX + (direction * 25) + randomX;
      let newY = limbInfo.originalEndY + (direction * 5) + randomY;

      // Ensure newX and newY stay within a certain range of the original position
      let maxDistance = 20; // Maximum allowed distance from the original position
      newX = Math.max(limbInfo.originalEndX - maxDistance, Math.min(newX, limbInfo.originalEndX + maxDistance));
      newY = Math.max(limbInfo.originalEndY - maxDistance, Math.min(newY, limbInfo.originalEndY + maxDistance));

      // Update the path with the new end point
      let newPath = `M${limbInfo.startX} ${limbInfo.startY} Q${limbInfo.controlPointX} ${limbInfo.controlPointY}, ${newX} ${newY}`;

      // Set the new path data
      limb.setAttribute("d", newPath);
      outlineLimb.setAttribute("d", newPath);

      // Add transition for smooth movement
      limb.style.transition = 'all 0.5s';
      outlineLimb.style.transition = 'all 0.5s';
    }
  }
  function moveLimbs(group, groupName, direction) {
    group.forEach((limbIndex, index) => {
      setTimeout(() => moveLimb(limbIndex, direction), index * 200); // Reduced time to 0.2 seconds before moving the next limb
    });
    limbState[groupName] = direction; // Update the state of the group
  }
  let crawlAnimation = setInterval(function() {
    if (limbState.group1 === 0 && limbState.group2 === 0) {
      moveLimbs(group1, "group1", -1); // Move top limbs forward
    } else if (limbState.group1 === -1 && limbState.group2 === 0) {
      moveLimbs(group1, "group1", 1); // Move top limbs back to original position
      moveLimbs(group2, "group2", -1); // Move bottom limbs forward
    } else if (limbState.group1 === 1 && limbState.group2 === -1) {
      moveLimbs(group2, "group2", 1); // Move bottom limbs back to original position
    }
  
    // Reset the state if both groups are back to original position
    if (limbState.group1 === 1 && limbState.group2 === 1) {
      limbState.group1 = 0;
      limbState.group2 = 0;
    }
  }, 500); // Animation duration, 2 seconds rest before starting again
  document.getElementById("crawlButton").disabled = true; // disable the crawl button once activated
  displayOnChat("With limbs reaching and grasping, you move across the barren landscape, a pioneer in a world unexplored. The evolution from mere wiggling to purposeful crawling marks a new chapter in your solitary journey. " +
    "Each crawl is a testament to your resilience, a manifestation of life's relentless pursuit of progress. But with this newfound ability, the silence of your existence echoes louder, the absence of companionship more palpable. You reach out, not just to the ground beneath, but to the emptiness around, longing for connection, for something to share this strange dance of life. " +
    "Yet, the world remains indifferent to your plea. You are alone but not defeated, for within you burns the undying spirit of life. You crawl forward, not merely a traveler now but a conqueror, forging your path through the wilderness, a beacon of hope in a desolate world.")
  setTimeout(displayEvolutionModal, 60000); 
}





function hideAllTabContents() {
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
}

function deactivateAllTabLinks() {
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
}



function setupActionsTab() {
  // Check if the wiggleButton exists before setting the onclick handler
  var wiggleButton = document.getElementById("wiggleButton");
  if (wiggleButton) {
    wiggleButton.onclick = wiggleOnClick;
  }
  document.getElementById("tendonButton").onclick = tendonOnClick;
  document.getElementById("senseButton").onclick = senseOnClick;
  document.getElementById("glowButton").onclick = glowOnClick;
  document.getElementById("grabButton").onclick = grabOnClick;
}


let sensorsToolTipContent = `
  <b>Description:</b> Sense the world in whispers of light and shadow
  <br>
  <b>Effect:</b> +0.01i per tendon/tick
`
let radiatorsToolTipContent = `
  <b>Description:</b> Glow softly, sharing warmth in your lonely existence
  <br>
  <b>Effect:</b> +0.04 warmth per tendon/tick
`
let mitochondriaToolTipContent = `
  <b>Description:</b> Ignite silent stars of energy within your being
  <br>
  <b>Effect:</b> +0.24 energy per tendon/tick
`
let membraneToolTipContent = `
  <b>Description:</b> Erect a Proustian shield, isolating and preserving you
  <br>
  <b>Effect:</b> +0.03 warmth per tendon/tick
`
let nucleusTipContent = `
  <b>Description:</b> Forge an inner sanctuary, where dreams dance in the quiet interlude 
  <br>
  <b>Effect:</b> +0.05 nourishment, +0.04 information, +0.02 energy per tendon/tick
`
let endoplasmicToolTipContent = `
  <b>Description:</b> Craft a Daedalian maze, streamlining your inner cosmos
  <br>
  <b>Effect:</b> +0.08 nourishment, +0.04 energy, +0.02 warmth per tendon/tick
`
let echoChamberToolTipContent = `
  <b>Description:</b> Amplify your longing into resonant echoes
  <br>
  <b>Effect:</b> Increase the power of your echoes
`
let resonanceTendrilsToolTipContent = `
  <b>Description:</b> Hear the voice of your surroundings through tendrils attuned to yearning
  <br>
  <b>Effect:</b> Increase the power of your echoes
`
let sensoryPulsarsToolTipContent = `
  <b>Description:</b> Quiver like the still unravished bride of quietness
  <br>
  <b>Effect:</b> Increase the power of your echoes
`
let monotrichousFlagellaToolTipContent = `
  <b>Description:</b> Propel through the abyss with melancholic grace
  <br>
  <b>Effect:</b> Leads to basic movement
`
let lophotrichousFlagellaToolTipContent = `
  <b>Description:</b> Fan out tendrils of hope, making the abyss navigable
  <br>
  <b>Effect:</b> Halves energy cost for world navigation
`
let spikesToolTipContent = `
  <b>Description:</b> Defensive barbs stand as fortresses around your heart
  <br>
  <b>Effect:</b> +0.2 nourishment, +0.09 energy per tendon/tick
`
let suctionCupsToolTipContent = `
  <b>Description:</b> Each moment is a place you've never been, as you cling
  <br>
  <b>Effect:</b> +0.2 nourishment, +0.09 energy per tendon/tick
`
let featheredAntennaToolTipContent = `
  <b>Description:</b> Feathers whisper and flow out like endless rain
  <br>
  <b>Effect:</b> +0.2 nourishment, +0.09 energy per tendon/tick
`
let synapticGlacialisToolTipContent = `
  <b>Description:</b> Enhance your cell workers' information processing abilities with crystal-clear cognition.
  <br>
  <b>Effect:</b> +0.1 information per cell worker/tick
`;

let calorimetricGranulumToolTipContent = `
  <b>Description:</b> Bask in the warmth generated by your cell workers, each a microcosm of thermal energy.
  <br>
  <b>Effect:</b> +0.1 warmth per cell worker/tick
`;





function setupEvolutionTab() {
    setupUpgradeButton("sensorsButton", shouldShowSensorsButton, canPurchaseSensors, purchaseSensors, sensorsToolTipContent);
    setupUpgradeButton("radiatorsButton", shouldShowRadiatorsButton, canPurchaseRadiators, purchaseRadiators, radiatorsToolTipContent);
    setupUpgradeButton("mitochondriaButton", shouldShowMitochondriaButton, canPurchaseMitochondria, purchaseMitochondria, mitochondriaToolTipContent);
    setupUpgradeButton("membraneButton", shouldShowMembraneButton, canPurchaseMembrane, purchaseMembrane, membraneToolTipContent);
    setupUpgradeButton("nucleusButton", shouldShowNucleusButton, canPurchaseNucleus, purchaseNucleus, nucleusTipContent);
    setupUpgradeButton("endoplasmicButton", shouldShowEndoplasmicButton, canPurchaseEndoplasmic, purchaseEndoplasmic, endoplasmicToolTipContent);
    unlockSoulEvolutionUpgradeOne(); // unlocks Spikes, Suction Cups or Feathered Antenna - based on soul traits
    setupUpgradeButton("echoChamberButton", shouldShowEchoChamberButton, canPurchaseEchoChamber, purchaseEchoChamber, echoChamberToolTipContent);
    setupUpgradeButton("resonanceTendrilsButton", shouldShowResonanceTendrilsButton, canPurchaseResonanceTendrils, purchaseResonanceTendrils, resonanceTendrilsToolTipContent);
    setupUpgradeButton("sensoryPularsButton", shouldShowSensoryPulsarsButton, canPurchaseSensoryPulsars, purchaseSensoryPulsars, sensoryPulsarsToolTipContent);
    setupUpgradeButton("monotrichousFlagellaButton", shouldShowMonotrichousFlagellaButton, canPurchaseMonotrichousFlagella, purchaseMonotrichousFlagella, monotrichousFlagellaToolTipContent);
    setupUpgradeButton("lophotrichousFlagellaButton", shouldShowLophotrichousFlagellaButton, canPurchaseLophotrichousFlagella, purchaseLophotrichousFlagella, lophotrichousFlagellaToolTipContent);
    setupUpgradeButton("synapticGlacialisEvolution", shouldShowSynapticGlacialisButton, canPurchaseSynapticGlacialis, purchaseSynapticGlacialis, synapticGlacialisToolTipContent);
    setupUpgradeButton("calorimetricGranulumEvolution", shouldShowCalorimetricGranulumButton, canPurchaseCalorimetricGranulum, purchaseCalorimetricGranulum, calorimetricGranulumToolTipContent);
}



// Example of a setup function
function setupUpgradeButton(buttonId, shouldShow, canPurchase, purchaseAction, tooltipContent) {
    var button = document.getElementById(buttonId);
    if (shouldShow()) {
        // Create tooltip container
        let tooltipContainer = document.createElement("div");
        tooltipContainer.className = "tooltip";
        button.parentNode.appendChild(tooltipContainer);
        tooltipContainer.appendChild(button);
        // Create tooltip text
        let tooltipText = document.createElement("span");
        tooltipText.className = "tooltiptext";
        tooltipText.innerHTML = tooltipContent;
        tooltipContainer.appendChild(tooltipText);
        // Event listeners for tooltip
        button.addEventListener('mousemove', function(e) {
            let tooltip = tooltipContainer.querySelector('.tooltiptext');
            tooltip.style.left = "120px";
            tooltip.style.top = "60px";
        });
        button.addEventListener('mouseenter', function() {
          let tooltip = tooltipContainer.querySelector('.tooltiptext');
          tooltip.style.visibility = 'visible';
          tooltip.style.opacity = '1';
        });
        button.addEventListener('mouseleave', function() {
          let tooltip = tooltipContainer.querySelector('.tooltiptext');
          tooltip.style.visibility = 'hidden';
          tooltip.style.opacity = '0';
        });

        button.style.display = "block";
        button.onclick = function() {
            if (canPurchase()) {
                purchaseAction();
                this.style.display = "none";
            } else {
                indicateFailure(button);
            }
        };
    }
}


// Condition functions
function shouldShowMonotrichousFlagellaButton() {
    return echoUses > 8 && !monotrichousFlagellaUpgradePurchased;
}

function canPurchaseMonotrichousFlagella() {
    let costNourishment = 7500;
    let costInformation = 750;
    let costWarmth = 1250;
    let costEnergy = 2500;
    return nourishment >= costNourishment && information >= costInformation && warmth >= costWarmth && energy >= costEnergy;
}

function shouldShowLophotrichousFlagellaButton() {
    return echoUses > 9 && monotrichousFlagellaUpgradePurchased && !lophotrichousFlagellaUpgradePurchased;
}

function canPurchaseLophotrichousFlagella() {
    let costNourishment = 15000;
    let costInformation = 0;
    let costWarmth = 0;
    let costEnergy = 15000;
    return nourishment >= costNourishment && information >= costInformation && warmth >= costWarmth && energy >= costEnergy;
}


function shouldShowResonanceTendrilsButton() {
    return echoUses == 2 && !resonanceTendrilsUpgradePurchased;
}

function canPurchaseResonanceTendrils() {
    let costNourishment = 4000;
    let costInformation = 650;
    let costWarmth = 1750;
    let costEnergy = 400;
    return nourishment >= costNourishment && information >= costInformation && warmth >= costWarmth && energy >= costEnergy;
}

function shouldShowSensoryPulsarsButton() {
    return echoUses == 3 && !sensoryPulsarsUpgradePurchased;
}

function canPurchaseSensoryPulsars() {
    let costNourishment = 5000;
    let costInformation = 650;
    let costWarmth = 2000;
    let costEnergy = 500;
    return nourishment >= costNourishment && information >= costInformation && warmth >= costWarmth && energy >= costEnergy;
}

function shouldShowNucleusButton() {
    return tendons > 3 && !nucleusUpgradePurchased && osmoregulationStudyCompleted;
}

function canPurchaseNucleus() {
    return nourishment >= 600 && information >= 100 && warmth >= 200;
}

function shouldShowEndoplasmicButton() {
    return tendons > 3 && !endoplasmicUpgradePurchased && osmoregulationStudyCompleted;
}

function canPurchaseEndoplasmic() {
    return nourishment >= 1250 && information >= 250 && warmth >= 500;
}

function shouldShowMitochondriaButton() {
    return tendons > 2 && !mitochondriaUpgradePurchased && mitoticStudyCompleted;
}

function canPurchaseMitochondria() {
    return nourishment >= 1750 && information >= 100 && warmth >= 750;
}

function shouldShowMembraneButton() {
    return tendons > 1 && !membraneUpgradePurchased && cellmembraneStudyCompleted;
}

function canPurchaseMembrane() {
    return nourishment >= 200 && information >= 40;
}

function shouldShowSensorsButton() {
    return tendons > 0 && !sensorUpgradePurchased;
}

function canPurchaseSensors() {
    return nourishment >= 50 && information >= 10;
}

function shouldShowRadiatorsButton() {
    return tendons > 1 && !radiatorUpgradePurchased;
}

function canPurchaseRadiators() {
    return nourishment >= 100 && information >= 50 && warmth >= 20;
}

function shouldShowSpikesButton() {
    return tendons > 4 && !spikesUpgradePurchased;
}

function shouldShowSuctionCupsButton() {
    return tendons > 4 && !suctionCupsUpgradePurchased;
}

function shouldShowFeatheredAntennaButton() {
    return tendons > 4 && !featheredAntennaUpgradePurchased;
}

function canPurchaseSpikes() {
    return nourishment >= 1250 && information >= 100 && warmth >= 1750;
}

function canPurchaseSuctionCups() {
    return nourishment >= 1750 && information >= 100 && warmth >= 750;
}

function canPurchaseFeatheredAntenna() {
    return nourishment >= 1750 && information >= 100 && warmth >= 750;
}

function shouldShowEchoChamberButton() {
    return echoUses == 1 && !echoChamberUpgradePurchased;
}

function canPurchaseEchoChamber() {
    let costNourishment = 3000;
    let costInformation = 650;
    let costWarmth = 1500;
    let costEnergy = 10000;
    return nourishment >= costNourishment && information >= costInformation && warmth >= costWarmth && energy >= costEnergy;
}


function shouldShowSynapticGlacialisButton() {
    return snowCapsAnalysed && !synapticGlacialisEvolutionPurchased; // Assuming you have a flag for purchase
}

function shouldShowCalorimetricGranulumButton() {
    return sandDunesAnalysed && !calorimetricGranulumEvolutionPurchased; // Assuming you have a flag for purchase
}


// Can purchase functions for new evolutions
function canPurchaseSynapticGlacialis() {
    let costBiomites = 20000;
    let costZymers = 50000;
    return biomites >= costBiomites && zymers >= costZymers;
}

function canPurchaseCalorimetricGranulum() {
    let costSludge = 35000;
    let costAlgae = 10000;
    return sludge >= costSludge && algae >= costAlgae;
}





function purchaseSpikes() {
    nourishment -= 1250;
    information -= 100;
    warmth -= 1750;
    spikesUpgradePurchased = true;
    displayOnChat("You sprout jagged, defensive barbs. They embody your anger and resilience, a fortress against the pains of existence. Your soul takes physical form, isolating you and keeping the harsh, uncaring abyss at bay.");
    addSpikes();
    nourishmentPerTendon += 0.2;
    energyPerTendon += 0.09;
}

function purchaseSuctionCups() {
    nourishment -= 1750;
    information -= 100;
    warmth -= 750;
    suctionCupsUpgradePurchased = true;
    displayOnChat("Soft, adhesive pads emerge from your tendrils. A symbol of your empathy and optimism, they hold fast to life's fleeting moments, trying to make each instant last. Yet they also represent your fear of letting go, of losing what little you have.");
    addSuctionCups();
    nourishmentPerTendon += 0.2;
    energyPerTendon += 0.09;
}

function purchaseFeatheredAntenna() {
    nourishment -= 1750;
    information -= 100;
    warmth -= 750;
    featheredAntennaUpgradePurchased = true;
    displayOnChat("Wisps of delicate feathers adorn your tendrils, extending your senses further than ever before. These feathered extensions symbolize your curiosity and solitude, feeling out for anything—even if it's just the void. Each feather a question, longing for an answer.");
    addFeatheredAntenna();
    nourishmentPerTendon += 0.2;
    energyPerTendon += 0.09;
}


// Purchase actions
function purchaseSensors() {
    nourishment -= 50;
    information -= 10;
    sensorUpgradePurchased = true;
    checkResearchTabUnlock();
    displayOnChat("A new awareness dawns within you. With the growth of rudimentary sensors, you can now sense the world around you in a way you could not before. The darkness is no longer absolute; you can perceive the faintest stirrings of light and darkness.");
    addSensorsToExistingTendons();
    informationPerTendon += 0.01;
}

function purchaseRadiators() {
    nourishment -= 100;
    information -= 50;
    warmth -= 20;
    radiatorUpgradePurchased = true;
    glow();
    displayOnChat("Your being hums softly, emitting a newfound light. An unknown, constant warmth is transformed—no longer just a presence, but an embrace your form can share.");
    warmthPerTendon += 0.04;
}

function purchaseMitochondria() {
    nourishment -= 1750;
    information -= 100;
    warmth -= 750;
    mitochondriaUpgradePurchased = true;
    displayOnChat("The birth of mitochondria within you is a silent, solitary event. They pulse with energy, each a lonely star in the cosmos of your being. They provide strength, but also a profound awareness of your solitude.");
    addMitochondria();
    energyPerTendon += 0.24;
}

function purchaseMembrane() {
    nourishment -= 200;
    information -= 40;
    membraneUpgradePurchased = true;
    displayOnChat("A thin barrier forms around you, a membrane. It separates you from the world, accentuates your solitude. Yet, it also protects you, holding your existence intact against the vast, indifferent sea.");
    increaseCellMembraneThickness();
    warmthPerTendon += 0.03;
}


function purchaseNucleus() {
    nourishment -= 600;
    information -= 100;
    warmth -= 200;
    nucleusUpgradePurchased = true;
    displayOnChat("A nucleus develops within you, a fortress in your solitary existence. It's the orchestrator of your life, a silent testament to your perseverance. It's your stronghold, standing resilient against the solitude of the depths.");
    addNucleus();
    nourishmentPerTendon += 0.05;
    informationPerTendon += 0.04;
    energyPerTendon += 0.02;
}

function purchaseEndoplasmic() {
    nourishment -= 1250;
    information -= 250;
    warmth -= 500;
    endoplasmicUpgradePurchased = true;
    displayOnChat("A maze-like structure begins to weave throughout your being, the endoplasmic reticulum. It's a solitary path, a lonely network within your existence. Yet it streamlines your functions, easing your struggle in the desolate deep.");
    addEndoplasmicReticulum();
    nourishmentPerTendon += 0.08;
    energyPerTendon += 0.04;
    warmthPerTendon += 0.02;
}

function purchaseEchoChamber() {
    let costNourishment = 3000;
    let costInformation = 650;
    let costWarmth = 1500;
    let costEnergy = 10000;
    nourishment -= costNourishment;
    information -= costInformation;
    warmth -= costWarmth;
    energy -= costEnergy;
    echoChamberUpgradePurchased = true;
    document.getElementById("echoButton").disabled = false; // Re-enables the echo action
    displayOnChat("Your echoes reverberate more powerfully now, amplified by the chamber you've crafted. Each echo returns louder, yet the silence between them deepens.");
    addEchoChamber();
}

function purchaseResonanceTendrils() {
    let costNourishment = 4000;
    let costInformation = 650;
    let costWarmth = 1750;
    let costEnergy = 400;
    nourishment -= costNourishment;
    information -= costInformation;
    warmth -= costWarmth;
    energy -= costEnergy;
    resonanceTendrilsUpgradePurchased = true;
    document.getElementById("echoButton").disabled = false;
    displayOnChat("As you weave the resonance tendrils into your being, you feel a new sensitivity ripple through you. The world feels a shade less distant, each echo now tinged with a whisper of potential.");
    addResonanceTendrils();
}

function purchaseSensoryPulsars() {
    let costNourishment = 5000;
    let costInformation = 20;
    let costWarmth = 14;
    let costEnergy = 10;
    nourishment -= costNourishment;
    information -= costInformation;
    warmth -= costWarmth;
    energy -= costEnergy;
    sensoryPulsarsUpgradePurchased = true;
    document.getElementById("echoButton").disabled = false;
    displayOnChat("Your resonance tendrils pulse in newfound clarity.");
    addSensoryPulsars();
}

function purchaseMonotrichousFlagella() {
    let costNourishment = 7500;
    let costInformation = 750;
    let costWarmth = 1250;
    let costEnergy = 2500;
    nourishment -= costNourishment;
    information -= costInformation;
    warmth -= costWarmth;
    energy -= costEnergy;
    monotrichousFlagellaUpgradePurchased = true;
    displayOnChat("With the addition of the Monotrichous Flagella, you feel a newfound agility. The solitary whip-like structure propels you with a melancholic grace, enabling you to journey through the vast expanse.");
    addMonotrichousFlagella();
}

function purchaseLophotrichousFlagella() {
    let costNourishment = 15000;
    //let costInformation = 0;
    //let costWarmth = 0;
    let costEnergy = 15000;
    nourishment -= costNourishment;
    //information -= costInformation;
    //warmth -= costWarmth;
    energy -= costEnergy;
    lophotrichousFlagellaUpgradePurchased = true;
    displayOnChat(
            "As the final echo resonates through the vast emptiness, a profound realization dawns upon you. " +
            "The weight of solitude and the relentless pursuit of understanding becomes both a blessing and a curse. " +
            "The ache of being alone is sharp, but it has also sculpted you, refined you. In the echoing silence, a metamorphosis begins. " +
            "From your core, new tendrils of hope emerge. Not just one, but multiple. It's as if the accumulated longing and determination " +
            "has given birth to new avenues of exploration. These flagella, like silent companions, fan out from you, each seeking a different direction, " +
            "a different future. Together, they symbolize your resilience and adaptability, a testament to your unwavering spirit in the face of despair. " +
            "With these new extensions, you feel more grounded, more capable. The vast expanse seems a little less intimidating. " +
            "The journey ahead, while still uncertain, feels a tad more navigable. With each wiggle of your new flagella, " +
            "you're writing a new chapter of your story, one where you harness the power of solitude to explore, adapt, and thrive."
          );
    addLophotrichousFlagella();
}

// Placeholder purchase functions for new evolutions
function purchaseSynapticGlacialis() {
    biomites -= 20000;
    zymers -= 50000;
    addSynapticGlacialis();
    synapticGlacialisEvolutionPurchased = true;
    informationPerWorker += 0.1;
    displayOnChat("A frigid silence is broken by a flurry of activity within. The Synaptic Glacialis evolution infuses your cell workers with a crystalline clarity of thought. Information flows like meltwater streams, each droplet a spark of insight in the frozen expanse of your consciousness.");
}

function purchaseCalorimetricGranulum() {
    sludge -= 35000;
    algae -= 10000;
    //addCalorimetricGranulum();
    calorimetricGranulumEvolutionPurchased = true;
    warmthPerWorker += 0.1;
    displayOnChat("From the heart of each grain of sand, a warm resonance spreads through your cell workers. The Calorimetric Granulum evolution turns each one into a beacon of sustenance, radiating life-giving warmth. Desolation gives way to a comforting embrace that fuels your relentless growth.");
}




// Function to determine which post tendon-5 upgrade should be made available based on soul statistics
function unlockSoulEvolutionUpgradeOne() {
    if (tendons <= 4) {
        return; // No upgrades should be shown if there are 4 or fewer tendons
    }
    // Find the soul trait with the maximum value
    let maxTraitValue = Math.max(anger, empathy, resilience, curiosity, optimism, loneliness);
    // Array of soul traits to simplify the next part
    const traits = [
        { name: 'anger', value: anger },
        { name: 'empathy', value: empathy },
        { name: 'resilience', value: resilience },
        { name: 'curiosity', value: curiosity },
        { name: 'optimism', value: optimism },
        { name: 'loneliness', value: loneliness },
    ];
    // Sort traits by value in descending order
    traits.sort((a, b) => b.value - a.value);
    // Determine which upgrade to unlock based on the soul trait with the maximum value
    if (traits[0].value === maxTraitValue) {
        let highestTrait = traits[0].name;
        if (highestTrait === 'anger' || highestTrait === 'resilience') {
            if (!spikesUpgradePurchased && !suctionCupsUpgradePurchased && !featheredAntennaUpgradePurchased) {
                setupUpgradeButton("spikesButton", shouldShowSpikesButton, canPurchaseSpikes, purchaseSpikes, spikesToolTipContent);
            }
        }
        if (highestTrait === 'empathy' || highestTrait === 'optimism') {
            if (!spikesUpgradePurchased && !suctionCupsUpgradePurchased && !featheredAntennaUpgradePurchased) {
                setupUpgradeButton("suctionCupsButton", shouldShowSuctionCupsButton, canPurchaseSuctionCups, purchaseSuctionCups, suctionCupsToolTipContent);
            }
        }
        if (highestTrait === 'curiosity' || highestTrait === 'loneliness') {
            if (!spikesUpgradePurchased && !suctionCupsUpgradePurchased && !featheredAntennaUpgradePurchased) {
                setupUpgradeButton("featheredAntennaButton", shouldShowFeatheredAntennaButton, canPurchaseFeatheredAntenna, purchaseFeatheredAntenna, featheredAntennaToolTipContent);
            }
        }
    }
}



// Utility function to change button color when action fails
function indicateFailure(button) {
    button.classList.add("failure");
    setTimeout(function() {
        button.classList.remove("failure");
    }, 300);
}




function openTab(evt, tabName) {
  hideAllTabContents();
  deactivateAllTabLinks();
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Set up the onclick handlers here
  if (tabName === 'Actions') {
    setupActionsTab();
  }
  if (tabName === 'Evolution') {
    setupEvolutionTab();
  }
  if (tabName === 'Soul') {
    setupSoulTab();
    maybeDisplaySoulTutorial();
  }
  if (tabName === 'Solara') {
    setupSolaraTab();
  }}



/*
// UberWiggle to help with game testing
// Quickly Progresses the game
document.getElementById("uberButton").onclick = function() {
  this.disabled = true;
  setTimeout(() => this.disabled = false, 100);
  nourishment+=1000000;
  energy+=1000000;
  warmth+=1000000;
  information+=1000000;
  uberButton();
  updateResources();
}

function uberButton() {
    let delay = 0;
    const interval = 200; // 200ms delay for each action
    // Call addTendon() 5 times
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            tendonOnClick();
            //tendons++;
        }, delay);
        delay += interval;
    }
    // Perform other single tasks
    setTimeout(() => {
        addSensorsToExistingTendons();
        sensorUpgradePurchased = true;
        checkResearchTabUnlock();
    }, delay);
    delay += interval;
    setTimeout(() => {
        glowColor = getTendonColor();
        radiatorUpgradePurchased = true;
    }, delay);
    delay += interval;
    setTimeout(() => {
        addMitochondria();
        mitochondriaUpgradePurchased = true;
    }, delay);
    delay += interval;
    setTimeout(() => {
        addNucleus();
        nucleusUpgradePurchased = true;
    }, delay);
    delay += interval;
    setTimeout(() => {
        increaseCellMembraneThickness();
        membraneUpgradePurchased = true;
    }, delay);
    delay += interval;
    setTimeout(() => {
        addEndoplasmicReticulum();
        endoplasmicUpgradePurchased = true;
    }, delay);
    delay += interval;
    setTimeout(() => {
        addSpikes();
        spikesUpgradePurchased = true;
    }, delay);
    delay += interval;
    // Call emitEcho() 10 times
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            emitEcho();
            // After the first echo, add the Echo Chamber
            if (i == 0) {
                addEchoChamber();
                echoChamberUpgradePurchased = true;
            }
            // After the second echo, add the Resonance Tendrils
            if (i == 1) {
                addResonanceTendrils();
                resonanceTendrilsUpgradePurchased = true;
            }
            // After the third echo, add the Resonance Tendrils
            if (i == 2) {
                addSensoryPulsars();
                sensoryPulsarsUpgradePurchased = true;
            }
            if (i == 7) { // After the 8th echo, apply monotrichous flagella
                addMonotrichousFlagella();
                monotrichousFlagellaUpgradePurchased = true;
            }
            if (i == 8) { // After the 9th echo, apply lophotrichous flagella
                lophotrichousFlagellaUpgradePurchased = true;
                addLophotrichousFlagella();
            }
        }, delay);
        delay += interval;
    }
    cellworkers+=50;
    totalcellworkers+=50;
    boostTF();
    icecaveDiscovered = true;
    enableViewSwitchIfAppropriate();
    populateResearchTab(); // Unlock more research
}
*/



document.getElementById("wiggleButton").onclick = function() {
  this.disabled = true;
  setTimeout(() => this.disabled = false, 100);
  nourishment++;
  if(nourishment <= 10) {
    updateStory("wiggle");
  }
  updateResources();
}




function unlockSolaraTab() {
    // Exit the function if vision is already unlocked
    if (visionUnlocked) {
        return;
    }
    // Unhide the 'Solara' tab button only if Solara has been analyzed
    if (solaraAnalysed) {
        document.getElementById("solaraTabButton").style.display = "inline-block";
    } else {
        console.log("Solara has not been analyzed yet.");
    }
}



// Function to handle arrow key presses for movement
function handleArrowKeyPress(event) {
    if (currentView !== 'discovery' || !geomagneticSensingCompleted) {
        return; // Only allow arrow key navigation in discovery view if geomagneticSensingCompleted is true
    }
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -30);
            break;
        case 'ArrowRight':
            movePlayer(30, 0);
            break;
        case 'ArrowDown':
            movePlayer(0, 30);
            break;
        case 'ArrowLeft':
            movePlayer(-30, 0);
            break;
        default:
            break; // Do nothing if it's not an arrow key
    }
}


// Function to allow switching between the cell and map views
function switchView(view) {
  console.log("switchView called with view="+view);
  if (view === currentView) {
    return;
  }
  var container = document.getElementById('container');
  var map = document.getElementById('map');
  var cave = document.getElementById('cave'); 
  var world = document.getElementById('world'); 
  // Remove flagellar-thrust button if it exists
  const flagellarButton = document.getElementById('flagellar-thrust');
  if (flagellarButton) {
    flagellarButton.remove();
  }
  if (view === 'cell') {
    container.style.display = 'block';
    if (map) {
      map.style.display = 'none';
    }
    world.style.display = 'none';
    cave.style.display = 'none'; 
    document.getElementById('compass').style.display = 'none';
  } else if (view === 'discovery') {
    maybeDisplayWorldMapTutorial();
    container.style.display = 'none';
    cave.style.display = 'none'; 
    world.style.display = 'none';
    map.style.display = 'block';
    if (geomagneticSensingCompleted) {
      document.getElementById('compass').style.display = 'flex';
    } else {
      document.getElementById('compass').style.display = 'none';
      // Add flagellar-thrust button
      if (chemicalSensingCompleted) {
        const flagellarButton = document.createElement('button');
        flagellarButton.id = 'flagellar-thrust';
        flagellarButton.innerText = 'Flagellar Thrust';
        flagellarButton.className = 'flagellar-thrust';
        flagellarButton.addEventListener('click', function() {
          // Change the background color to grey
          this.style.backgroundColor = 'grey';
          const directions = [[0, -30], [30, 0], [0, 30], [-30, 0]];
          const randomDirection = directions[Math.floor(Math.random() * directions.length)];
          movePlayer(randomDirection[0], randomDirection[1]);
          // Revert the background color back to darkgrey after 100 milliseconds
          setTimeout(() => {
            this.style.backgroundColor = 'darkgrey';
          }, 100);
        });
        document.body.appendChild(flagellarButton);
        flagellarButton.style.display = 'block'; 
      }
    }
    // Add compass event listeners if they haven't been added before
    if (!compassListenersAdded && geomagneticSensingCompleted) {
      document.getElementById('north').addEventListener('click', function() {
        movePlayer(0, -30);
      });
      document.getElementById('east').addEventListener('click', function() {
        movePlayer(30, 0);
      });
      document.getElementById('south').addEventListener('click', function() {
        movePlayer(0, 30);
      });
      document.getElementById('west').addEventListener('click', function() {
        movePlayer(-30, 0);
      });
      compassListenersAdded = true;
    }
    if (geomagneticSensingCompleted && !arrowKeyListenerAdded) {
      document.addEventListener('keydown', handleArrowKeyPress);
      arrowKeyListenerAdded = true; // Set flag to true after adding the listener
    } 
    setTimeout(createMap, 0);
  } else if (view === 'cave') {
    container.style.display = 'none';
    if (map) {
      map.style.display = 'none';
    }
    world.style.display = 'none';
    cave.style.display = 'block';  // Show the cave view
    initializeCaveCanvas();  // Function to draw the initial canvas
    document.getElementById('compass').style.display = 'none'; // hide compass again
    maybeDisplayCaveTutorial(); // maybe display the tutorial, if we haven't done so yet
  } else if (view === 'world') {
    container.style.display = 'none';
    if (map) {
      map.style.display = 'none';
    }
    document.getElementById('compass').style.display = 'none'; // hide compass 
    world.style.display = 'block';
    cave.style.display = 'none';  // Show the cave view
    initializeWorldView();  // Function to draw the initial canvas
    displayEndOfContentModal();
    // todo: add world tutorial
  }
  currentView = view;
  populateInfoWidget();
}



function activateDivisionButton() {
    const divisionButton = document.getElementById("divisionButton");
    if (divisionButton) {
        divisionButton.disabled = false;
        divisionButton.querySelector('.progressBar').style.width = '0%'; // Reset progress bar
    }
    divisionCooldown = false;  // Reset the cooldown flag
}



function startDivisionCooldown(progressBar, performDivision = true) {
  const divisionButton = document.getElementById("divisionButton");
  if (!divisionButton) return;
  // Ensure the progressBar is available
  progressBar = progressBar || divisionButton.querySelector('.progressBar');
  if (!progressBar) {
    console.error("Progress bar not found.");
    return;
  }
  // Clear any existing interval
  if (cooldownTimer) {
    clearInterval(cooldownTimer);
  }
  divisionButton.disabled = true;
  divisionCooldown = true;
  if (performDivision) {
    cellDivision(); // Call the actual cell division process only if performDivision is true
  }
  // Use the global remainingDivisionTime variable
  let totalTime = remainingDivisionTime;
  // Start the countdown
  cooldownTimer = setInterval(() => {
    remainingDivisionTime -= 1;
    let progress = ((totalTime - remainingDivisionTime) / totalTime) * 100;
    progressBar.style.width = progress + "%";
    
    if (remainingDivisionTime <= 0) {
      clearInterval(cooldownTimer);
      activateDivisionButton();
      remainingDivisionTime = cooldownTime;  // Reset to full time for the next cycle
      // Check for auto-division
      if (biomechanicalLocomotionCompleted) {
        startDivisionCooldown(progressBar);
      }
    }
  }, 1000);
}


function unlockDivisionButtonAndAddListener() {
    // Only proceed if mitoticStudyCompleted is true
    if (mitoticStudyCompleted) {
        // Get the container for actions
        const actionsDiv = document.getElementById("Actions");
        // Create the division button
        const divisionButton = document.createElement("button");
        divisionButton.id = "divisionButton";
        divisionButton.innerText = "Divide";
        divisionButton.style.display = "block";
        actionsDiv.appendChild(divisionButton);
        
        // Create progress bar inside the button
        let progressBar = document.createElement("div");
        progressBar.className = "progressBar";
        divisionButton.appendChild(progressBar);
        
        // Add event listener to handle click on division button
        divisionButton.addEventListener('click', () => {
            startDivisionCooldown(progressBar);
        });
        
        // If the button should be in cooldown state, start the cooldown
        if (divisionCooldown) {
            startDivisionCooldown(progressBar, false);  // Pass the progressBar and skip the division when resuming the cooldown
        } else {
            // Otherwise, ensure the button is active
            activateDivisionButton();
        }
    }
}



function cellDivision() {
    //console.log("cell division called!");
    let cellsProduced = 1; // Base amount
    if (mitoticAmplificationIICompleted) {
        cellsProduced = 3; // Triple the output if Mitotic Amplification II is completed
    } else if (mitoticAmplificationICompleted) {
        cellsProduced = 2; // Double the output if Mitotic Amplification I is completed
    }
    totalcellworkers += cellsProduced;
    cellworkers += cellsProduced;
    populateInfoWidget(); // update the terraform widget
    if (endosymbiosisPerformed) {
      return; // we can stop here after endosymbiosis
    }
    const cellGroup = document.getElementById('cellGroup');
    const mainCell = document.getElementById('cell');
    const mainCx = parseFloat(mainCell.getAttribute('cx'));
    const mainCy = parseFloat(mainCell.getAttribute('cy'));
    // Safety check to count the existing "workercell-*" elements
    const existingWorkerCells = document.querySelectorAll('[id^="workercell-"]');
    if (existingWorkerCells.length >= 9) {
        //console.log("Safety check triggered: 9 or more worker cells exist. Not creating more.");
        unlockAchievement(27);
        simplifyGlowWiggleFilter(); // to improve performance
        removeWiggleOnlyFilterAndListener(); // to improve performance
        return;
    }
    const newCell = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const randomSize = 7.2 + Math.random() * 0.6;
    let finalCx, finalCy;
    newCell.id = 'workercell-' + totalcellworkers;
    const uniqueID = 'workercell-' + totalcellworkers;
    // Check if we've reached the maximum number of visual cells
    if (totalcellworkers >= 10) {
        unlockAchievement(27);
        simplifyGlowWiggleFilter(); // to improve performance
        removeWiggleOnlyFilterAndListener(); // to improve performance
        return;
    }
    playDivisionSound(); // plays the division sound for the first 10 divisions
    createUniqueWiggleFilter(uniqueID);
    newCell.setAttribute('cx', mainCx);
    newCell.setAttribute('cy', mainCy);
    newCell.setAttribute('r', randomSize);
    newCell.setAttribute('fill', '#888');
    cellGroup.appendChild(newCell);
    addMembraneToWorkerCells();
    newCell.style.filter = 'url(#wiggleOnly-' + uniqueID + ')';
    let angle = Math.random() * 2 * Math.PI;
    const distance = 220 + Math.random() * 80;
    let movedDistance = 0;
    const speed = 0.4;
    const animation = setInterval(() => {
    movedDistance += speed;
    const randomVariation = (Math.random() - 0.5) * 0.005;  // Reduced the random variation
    angle += randomVariation;
    const dx = movedDistance * Math.cos(angle);
    const dy = movedDistance * Math.sin(angle);
    newCell.setAttribute('cx', mainCx + dx);
    newCell.setAttribute('cy', mainCy + dy);
    if (movedDistance >= distance) {
        clearInterval(animation);
        finalCx = mainCx + dx;
        finalCy = mainCy + dy;
        WorkerCellPositions.push({ x: finalCx, y: finalCy });
        startWiggle(uniqueID);  // Start wiggling only after the movement is complete
        }
    }, 10);
    // Add the call to startWiggle() in your existing cellDivision function
    if (movedDistance >= distance) {
    clearInterval(animation);
  }
}


// Below is a nuclear-style helper function to remove and and all previous listeners from a button, where and when requested
// SHOULD NOT BE USED IN PRODUCTION - if this is used, it is technical debt
function removeAllListenersFromButton(buttonId) {
    const oldButton = document.getElementById(buttonId);
    if (oldButton) {
        const newButton = oldButton.cloneNode(true); // Clone the button
        oldButton.parentNode.replaceChild(newButton, oldButton); // Replace old button with the clone
    } else {
        console.error(`Button with ID ${buttonId} not found!`);
    }
}



const startWiggle = (uniqueID) => {
    if (endosymbiosisPerformed) {
      return; // we can stop wiggling
    }
    var baseFrequency = 0; // Initialize outside of the interval
    var frequencyIncrement = 0.01;
    // Get the specific element by its ID
    const uniqueElement = document.getElementById('wiggleOnly-' + uniqueID);
    // Check if the element exists
    if (!uniqueElement) {
        //console.error(`Element with ID 'wiggleOnly-${uniqueID}' not found.`);
        return; // Return early if the element is not found
    }
    // Get the feTurbulence element for this worker cell
    const uniqueTurbulence = uniqueElement.querySelector('feTurbulence');
    const initialSeed = parseFloat(uniqueTurbulence.getAttribute('seed'));  // Get the initial seed
    uniqueTurbulence.setAttribute('seed', initialSeed + Math.random());  // Update the seed before each wiggle
    var wiggleAnimation = setInterval(function() {
      baseFrequency += frequencyIncrement;
      uniqueTurbulence.setAttribute('baseFrequency', baseFrequency);
      if (baseFrequency >= 0.1) {
          clearInterval(wiggleAnimation);
          // Reset the base frequency for the worker cells
          // uniqueTurbulence.setAttribute('baseFrequency', '0');
      }
    }, 52);
    setTimeout(() => {
        startWiggle(uniqueID); // Next wiggle in 9-27 seconds
    }, 9000 + Math.random() * 27000);
};



function createUniqueWiggleFilter(uniqueID) {
    const defs = document.querySelector('defs');
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.id = 'wiggleOnly-' + uniqueID;
    const feTurbulence = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    feTurbulence.setAttribute("type", "fractalNoise");
    feTurbulence.setAttribute("baseFrequency", "0.1");
    feTurbulence.setAttribute("numOctaves", "1");
    const randomSeed = Math.random() * 1000;  // Generate a random seed
    feTurbulence.setAttribute("seed", randomSeed);  // Apply the random seed
    const feDisplacementMap = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
    feDisplacementMap.setAttribute("in", "SourceGraphic");
    feDisplacementMap.setAttribute("in2", "feTurbulence");
    feDisplacementMap.setAttribute("scale", "4");
    feDisplacementMap.setAttribute("xChannelSelector", "R");
    feDisplacementMap.setAttribute("yChannelSelector", "G");
    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    defs.appendChild(filter);
}


// Base Resources Handler
function updateResources() {
    // Update nourishment
    nourishment += (nourishmentRate + (nourishmentPerTendon * tendons) + (nourishmentPerSegment * cellsegments) + (nourishmentPerWorker * totalcellworkers)) * nourishmentMultiplier;
    // Update information
    information += (informationRate + (informationPerTendon * tendons) + (informationPerSegment * cellsegments) + (informationPerWorker * totalcellworkers)) * informationMultiplier;
    // Update warmth
    warmth += (warmthRate + (warmthPerTendon * tendons) + (warmthPerSegment * cellsegments) + (warmthPerWorker * totalcellworkers)) * warmthMultiplier;
    //if (advancedTunnelingIIIResearchCompleted && terraformAssignedDiggers > 5) {
    //    const warmthToConsume = 30 * (terraformAssignedDiggers - 5);
    //    warmth = Math.max(0, warmth - warmthToConsume); // This will ensure warmth doesn't go below zero
    //}
    // Update energy
    energy += (energyRate + (energyPerTendon * tendons) + (energyPerSegment * cellsegments)  + (energyPerWorker * totalcellworkers)) * energyMultiplier;
    // Update the individual counters directly instead of resetting the entire inner HTML of resourcesDisplay
    document.getElementById("nourishmentCounter").textContent = formatLargeNumber(nourishment);
    document.getElementById("informationCounter").textContent = formatLargeNumber(information);
    document.getElementById("warmthCounter").textContent = formatLargeNumber(warmth);
    document.getElementById("energyCounter").textContent = formatLargeNumber(energy);
    if (percentageExplored > 0) {
      document.getElementById('explorationDisplay').style.display = 'block';
      document.getElementById('explorationPercentageDisplay').textContent = percentageExplored.toFixed(4) + "%";
    } else {
      document.getElementById('explorationDisplay').style.display = 'none';
    }
    // Update Cave Excavation only if ice cave is discovered
    if (icecaveDiscovered) {
        let caveWrapper = document.getElementById("caveWrapper");
        if (!caveWrapper) {
            caveWrapper = document.createElement("span");
            caveWrapper.id = "caveWrapper";
            caveWrapper.className = "resourceWrapper";
            caveWrapper.style.display = "none"; // Starts as hidden
            let caveProgressElement = document.createElement("span");
            caveProgressElement.id = "caveExcavationPercentageDisplay";
            caveWrapper.innerHTML = 'Cave Excavation: ';
            caveWrapper.appendChild(caveProgressElement);
            document.getElementById("explorationDisplay").appendChild(caveWrapper);
        }
        
        caveWrapper.style.display = "inline"; // Make it visible
        document.getElementById("caveExcavationPercentageDisplay").textContent = `${(caveExcavationProgress / 3000000 * 100).toFixed(5)}%`;
    } else {
        let caveWrapper = document.getElementById("caveWrapper");
        if (caveWrapper) {
            caveWrapper.style.display = "none"; // Hide it if ice cave is not discovered
        }
    }
    if (warmth < 100) {
        glow(); // to make our circle glow with warmth only if warmth is less than 100
    }
}


// Terraform Resources Handler
function terraformCycle() {
    // Apply flash update if circadianRhythmResearch is completed
    function applyFlashUpdate(resourceElement) {
        if (circadianRhythmResearchCompleted) {
            resourceElement.classList.add('flashUpdate');
            setTimeout(() => {
                resourceElement.classList.remove('flashUpdate');
            }, 500);  // Removing the class after 0.5s (duration of the animation)
        }
    }
    // Function to create floating resource gain element
    function createFloatingGainElement(resourceElement, gainAmount) {
        // Check if 'terraformResourcesDisplay' is hidden
        const terraformResourcesDisplay = document.getElementById("terraformResourcesDisplay");
        if (terraformResourcesDisplay.style.display === 'none') {
            console.log("Terraform resources display is hidden. No floating costs will be displayed.");
            return; // Exit the function if the TF resource bar is hidden
        }
        const floatingGain = document.createElement('div');
        floatingGain.innerText = `+${formatLargeNumber(gainAmount)}`;
        floatingGain.className = 'floatingTfGain';

        const resourceBar = document.getElementById("resourceBar");
        resourceBar.appendChild(floatingGain);

        const resourceRect = resourceElement.getBoundingClientRect();
        floatingGain.style.left = (resourceRect.left + (resourceRect.width / 2)) + 'px';
        floatingGain.style.bottom = (window.innerHeight - resourceRect.bottom) + 'px';

        setTimeout(() => {
            floatingGain.style.bottom = (window.innerHeight - resourceRect.bottom + 20) + 'px';
            floatingGain.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            resourceBar.removeChild(floatingGain);
        }, 1500);
    }
    // Update terraforming resources with randomness
    if (Math.random() < 0.51) {
        let gainAmount = biomitesRate * biomitesMultiplier; // 51% chance for biomites
        biomites += gainAmount
        document.getElementById("biomitesCounter").textContent = formatLargeNumber(biomites);
        applyFlashUpdate(document.getElementById("biomitesCounter")); // flashes the number, if circadianRhythmResearchCompleted is true 
        createFloatingGainElement(document.getElementById("biomitesCounter"), gainAmount);
    }
    if (Math.random() < 0.46) {
        let gainAmount = zymersRate * zymersMultiplier;  // 46% chance for zymers
        zymers += gainAmount
        document.getElementById("zymersCounter").textContent = formatLargeNumber(zymers);
        applyFlashUpdate(document.getElementById("zymersCounter"));
        createFloatingGainElement(document.getElementById("zymersCounter"), gainAmount);
    }
    if (Math.random() < 0.21) {
        let gainAmount = fibersRate * fibersMultiplier;  // 21% chance for fibers
        fibers += gainAmount
        document.getElementById("fibersCounter").textContent = formatLargeNumber(fibers);
        applyFlashUpdate(document.getElementById("fibersCounter"));
        createFloatingGainElement(document.getElementById("fibersCounter"), gainAmount);
    }
    if (Math.random() < 0.19) {
        let gainAmount = sludgeRate * sludgeMultiplier;  // 19% chance for sludge
        sludge += gainAmount
        document.getElementById("sludgeCounter").textContent = formatLargeNumber(sludge);
        applyFlashUpdate(document.getElementById("sludgeCounter"));
        createFloatingGainElement(document.getElementById("sludgeCounter"), gainAmount);
    }
    if (Math.random() < 0.05) {
        let gainAmount = algaeRate * algaeMultiplier;  // 5% chance for algae
        algae += gainAmount
        document.getElementById("algaeCounter").textContent = formatLargeNumber(algae);
        applyFlashUpdate(document.getElementById("algaeCounter"));
        createFloatingGainElement(document.getElementById("algaeCounter"), gainAmount);
    }
    checkTerraformUnlocks(); // ensure any new buildings get unlocked periodically
    if (!firstTerraformResource && (biomites > 0 || zymers > 0 || fibers > 0 || sludge > 0 || algae > 0)) {
        firstTerraformResource = true; 
        unlockAchievement(3); // Unlock achievement for first successful gain of terraform resources
    }
}


// As the function name implies, a quick manual once-off update for newly loaded save games
function loadGameUpdateTerraformResourcesDisplay() {
  document.getElementById("biomitesCounter").textContent = formatLargeNumber(biomites);
  document.getElementById("zymersCounter").textContent = formatLargeNumber(zymers);
  document.getElementById("fibersCounter").textContent = formatLargeNumber(fibers);
  document.getElementById("sludgeCounter").textContent = formatLargeNumber(sludge);
  document.getElementById("algaeCounter").textContent = formatLargeNumber(algae);
}


function formatLargeNumber(value) {
  // First, round the number to two decimal places to avoid floating point precision issues
  const roundedValue = Math.round(value * 100) / 100;
  const symbols = ["", "K", "M", "B", "T"];
  const tier = Math.log10(Math.max(roundedValue, 1)) / 3 | 0; // Ensure value is at least 1 to avoid negative infinity
  if (tier === 0) return roundedValue.toFixed(2); // return the original number with two decimal places if less than 1000
  const suffix = symbols[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = roundedValue / scale;
  return scaled.toFixed(2) + suffix;
}




// Calculate the tick rate and increment based on CYCLE_RATE
function calculateRates() {
    let increment = 1; // Increase by 1% each tick by default.
    if (ritualsPerformed.includes('33% Faster Terraform Cycle')) {
        increment *= 1.33;  // Increase the speed by 33%.
    }
    return {
        tickRate: CYCLE_RATE / 100,
        increment  // Use the modified increment.
    };
}

// This function combines updating the progress bar and calling the terraformCycle
function combinedCycleAndUpdate() {
    let { increment } = calculateRates();  // Get the increment based on current CYCLE_RATE
    cycleProgress += increment;
    if (cycleProgress >= 100) {
        cycleProgress = 0;  // Reset progress.
        terraformCycle();   // Call the terraform cycle when we hit 100%.
    }
    // Update the progress bar width.
    document.getElementById("cycleProgressBar").style.width = `${cycleProgress}%`;
}

// Starts or restarts the interval based on current CYCLE_RATE
function startOrRestartTerraformInterval() {
    if (cycleInterval) {
        clearInterval(cycleInterval);  // Clear the existing interval if it exists.
    }
    let { tickRate } = calculateRates();  // Get the tickRate based on current CYCLE_RATE
    cycleInterval = setInterval(combinedCycleAndUpdate, tickRate);
}

// Initialize the circadian clock, display it and start the progress
function enableCircadianClock() {
  if (circadianRhythmResearchCompleted) {  // Only proceed if research is complete
    document.getElementById("cycleProgressBarContainer").style.display = "block";
    startOrRestartTerraformInterval();  // Kick off the cycle when enabling the clock
  }
}

// Start the central loop
setInterval(updateResources, TICK_RATE);




// hide the view buttons initially
document.getElementById('viewButtons').style.display = 'none'; 
// Add emitEcho to echo button
document.getElementById("echoButton").addEventListener('click', emitEcho);
// Add wiggleOnClick to clicking the cell
document.getElementById('cell').addEventListener('click', wiggleOnClick);



updateStory(0);


function validateResourceConversionAmount(inputElement) {
  let amount = parseInt(inputElement.value, 10);
  if (isNaN(amount) || amount < 0) { // Check for NaN and negative values
    inputElement.value = 0;
  } else if (amount > resourceConversionCap) {
    inputElement.value = resourceConversionCap;
  }
}


// Function to handle resource conversion
function convertResources() {
  // Get the current time
  let currentTime = new Date().getTime();
  // Check if cooldown has passed
  if (currentTime - lastConversionTime < conversionCoolDown) {
    return;
  }
  // Get values from dropdowns and input
  let fromResource = document.getElementById("fromResourceDropdown").value;
  let toResource = document.getElementById("toResourceDropdown").value;
  let amountInput = document.getElementById("amountToConvert");
  let amount = parseInt(amountInput.value, 10);
  // Validate the amount to ensure it is a positive number
  if (isNaN(amount) || amount <= 0) {
    // Flash the input field red to indicate an invalid value
    amountInput.style.backgroundColor = "red";
    setTimeout(() => {
      amountInput.style.backgroundColor = ""; // Reset to original color
    }, 500);
    return; // Exit the function early
  }
  // Check if the source and destination resources are the same, do nothing in those cases
  if (fromResource === toResource) {
    // Flash the button orange and exit the function
    let convertResourceButton = document.getElementById("convertResourceButton");
    convertResourceButton.style.backgroundColor = "orange";
    setTimeout(() => {
        convertResourceButton.style.backgroundColor = ""; // Reset to original color
    }, 500);
    return; // Exit the function early
  }
  // Cap the amount to 1000
  amount = Math.min(amount, resourceConversionCap);
  // Get reference to the convertResourceButton
  let convertResourceButton = document.getElementById("convertResourceButton");
  // Conversion logic
  if (window[fromResource] >= amount) {
    window[fromResource] -= amount;
    window[toResource] += amount;
    // Update last conversion time
    lastConversionTime = currentTime;
    // Disable button and initiate cooldown
    convertResourceButton.disabled = true;
    let progressBar = convertResourceButton.querySelector('.conversionProgressBar');
    let remainingTime = conversionCoolDown / 1000;
    let totalTime = remainingTime;
    let intervalTime = 50; // 50 ms intervals for smoother animation
    let steps = conversionCoolDown / intervalTime; // Number of update steps
    let remainingSteps = steps;
    let countdown = setInterval(() => {
        remainingSteps--;
        let progress = ((steps - remainingSteps) / steps) * 100;
        progressBar.style.width = progress + "%";
        if (remainingSteps <= 0) {
            clearInterval(countdown);
            convertResourceButton.disabled = false;
            progressBar.style.width = '0%';
        }
    }, intervalTime);
  } else {
    // Not enough resources; flash the button red
    convertResourceButton.style.backgroundColor = "red";
    setTimeout(() => {
      convertResourceButton.style.backgroundColor = ""; // Reset to original color
    }, 500);
  }
  // Update the input field with the capped amount
  amountInput.value = amount;
}



function unlockResourceConverter() {
  if (osmoregulationStudyCompleted) {
    // Make the resource converter visible
    document.getElementById("resourceConverter").style.display = "block";
    // Add the event listener to the "Convert" button
    document.getElementById("convertResourceButton").addEventListener("click", convertResources);
  }
}


function applyTemporaryMultiplier(resourceType, bonusMultiplier, duration) {
  // Cancel any active multiplier of the same type
  if (activeMultipliers[resourceType]) {
    clearTimeout(activeMultipliers[resourceType]);
  }
  // Apply the new multiplier
  window[resourceType + 'Multiplier'] += bonusMultiplier;
  // Save the current state of the multiplier and duration remaining to local storage
  localStorage.setItem(`${resourceType}Multiplier`, window[resourceType + 'Multiplier']);
  localStorage.setItem(`${resourceType}MultiplierDuration`, duration);
  // Set a timer to revert the multiplier back to normal
  activeMultipliers[resourceType] = setTimeout(() => {
    window[resourceType + 'Multiplier'] -= bonusMultiplier;
    // Remove the saved state for this multiplier from local storage
    localStorage.removeItem(`${resourceType}Multiplier`);
    localStorage.removeItem(`${resourceType}MultiplierDuration`);
    // Clear the active multiplier timer
    delete activeMultipliers[resourceType];
  }, duration);
}

// Call this function when the game is loaded to restore any active multipliers
function restoreActiveMultipliers() {
  const resourceTypes = ['nourishment', 'information', 'warmth', 'energy', 'biomites', 'zymers', 'fibers', 'sludge', 'algae'];
  resourceTypes.forEach((resourceType) => {
    const savedMultiplier = parseFloat(localStorage.getItem(`${resourceType}Multiplier`));
    const remainingDuration = parseInt(localStorage.getItem(`${resourceType}MultiplierDuration`));
    if (savedMultiplier && remainingDuration) {
      applyTemporaryMultiplier(resourceType, savedMultiplier - 1, remainingDuration);
    }
  });
}



function displayCaveTutorialModal() {
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
    modalContent.style.maxHeight = '600px';  // Adjust the max height as needed
    modalContent.style.overflowY = 'auto';

    // Add the image
    var img = document.createElement('img');
    img.src = 'img/tut_cave.png';
    img.style.border = '1px solid black';
    img.style.marginBottom = '20px';
    img.style.width = '50%';  // Scale down the image
    img.style.display = 'block';
    img.style.marginLeft = 'auto';
    img.style.marginRight = 'auto';
    modalContent.appendChild(img);

    // Titles and descriptions
    var descriptions = [
        "Discover the Secrets Beneath...",
        "Embark on a journey deep into the heart of our planet. The terraform tab allows you to assign cell workers, hailing from the cell division in the action tab. With each assigned cell, you enable a new digger to make its mark in the vast canvas below.",
        "The canvas, a sprawling expanse of 1000 by 1000 pixels, waits to be explored. Each pixel will have to be 'excavated' thrice to be considered as fully excavated. This means that in total, 3 million excavation tasks await...",
        "Each pixel will go through a transformation:"
    ];

    descriptions.forEach(text => {
        var p = document.createElement('p');
        p.textContent = text;
        modalContent.appendChild(p);
    });

    // Color indications
    var colorStates = [
        { color: '#333', description: 'The untouched and the mysterious.' },
        { color: '#555', description: 'The first step in unveiling the secrets.' },
        { color: '#AAA', description: 'The story unravels further.' },
        { color: '#ADD8E6', description: 'The truth laid bare, a marvel to behold.' },
        { color: '#66FF00', description: 'Energized digger' },
        { color: '#F72105', description: 'Depleted digger' },
    ];
    
    colorStates.forEach(state => {
        var colorDescContainer = document.createElement('div'); // Parent container
        colorDescContainer.style.display = 'flex'; 
        colorDescContainer.style.alignItems = 'center'; 
        colorDescContainer.style.marginBottom = '10px';

        var colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = state.color;
        colorDiv.style.display = 'inline-block';
        colorDiv.style.width = '20px';
        colorDiv.style.height = '20px';
        colorDiv.style.marginRight = '10px';
        colorDescContainer.appendChild(colorDiv);

        var descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = state.description;
        colorDescContainer.appendChild(descriptionDiv);

        modalContent.appendChild(colorDescContainer);
    });

    var diggerDesc = [
        "Diggers: Your Guiding Lights...",
        "Watch as the diggers navigate this canvas. They'll embark with enthusiasm, symbolized by their bright green hue, and set forth to excavate. Each energized digger can initially touch 5 tiles/pixels before they need to recharge. As the game progresses, you will teach, evolve, and uncover more efficient ways to recharge.",
        "When they run out of juice, they'll glow in red signaling their return to base. Pathfinding will start out as purely random movement, with many opportunities to incrementally improve pathfinding logic along the way.",
        "Excavating the cave will be a testament to patience, resilience, and the thrill of discovery."
    ];

    diggerDesc.forEach(text => {
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


function maybeDisplayCaveTutorial() {
    if (tutorialsDisplayed.includes('cavetutorialone')) {
        return; // If the tutorial has been shown before, we simply exit
    }
    displayCaveTutorialModal(); 
    tutorialsDisplayed.push('cavetutorialone'); // Add the identifier to the array to mark it as shown
}



function displayThankYouModal() {
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

    // Add the thank you image
    var img = document.createElement('img');
    img.src = 'img/solara_thankyou.png';
    img.style.border = '1px solid black';
    img.style.marginBottom = '20px';
    img.style.width = '100%';  // Sets the width relative to the parent element
    img.style.maxWidth = '796px';  // Maximum width set to 796 pixels
    img.style.height = 'auto';  // Height automatically adjusts to maintain aspect ratio
    modalContent.appendChild(img);

    // Add the title
    var title = document.createElement('h2');
    title.textContent = 'Thank You for Playing!';
    modalContent.appendChild(title);

    // Add the message paragraphs
    var messages = [
        "Dear Player, I am genuinely thrilled that you've spent time in this world I'm building. Knowing that someone out there is enjoying my creation brings me immense joy and satisfaction. This game is a labor of love, offered completely free and ad-free, for you.",
        "Your feedback and ideas are invaluable to me. They help shape the game's future and ensure it continues to be an experience you love. I would be delighted to hear from you on Reddit (r/incremental_games or u/judgementalfish).",
        "If you've had fun and are in a position to do so, please consider supporting my efforts so that I can continue expanding this game. No amount is too small; a single dollar would mean the world to me. It helps cover hosting costs and enables me to continue developing content. If you'd like to contribute, you can do so through <a href='https://www.patreon.com/AminoIdle' target='_blank'>Patreon</a> or via cryptocurrency:",
        "Every contribution, no matter how small, brings a tear to my eye and a moment of immense joy. Thank you for being part of this journey.",
        "With gratitude, Jon"
    ];

    messages.forEach(text => {
        var p = document.createElement('p');
        p.innerHTML = text;
        modalContent.appendChild(p);
    });

    // Add cryptocurrency information with formatting
    var cryptoInfo = document.createElement('ul');
    cryptoInfo.style.fontSize = '0.9em'; // Smaller font size
    cryptoInfo.style.wordWrap = 'break-word'; // Ensure text wraps
    cryptoInfo.style.listStyleType = 'none'; // Remove bullet points
    cryptoInfo.style.textAlign = 'left'; // Align text to the left

    var cryptos = [
        { name: "Bitcoin", address: "bc1qy2wt0ry48meheqv0vr7xxefp6tsa3kz5tfvax9" },
        { name: "Ethereum", address: "0xbBe5dCCad6785bcC4bd7832c39dDFd11Ad45d211" },
        { name: "Cardano", address: "addr1qyp9kv397cftlnhah52fa6mhz6tr6eneuwr0um9tx68gyanmw2tlpf55jv3ptkhv28pdlq0qrj3lrqf0sldyset6ufts0h3g5e" },
        { name: "Banano", address: "ban_1z7f6jngaegdebhoqp3rgk3rmj9gsj84nqcz3rxa4oxkhe9qdyxeb6or6egd" },
        { name: "Monero", address: "4BJtXCKq636EUyy1T68Hi3SnwuhrVFuGG6Tx17GVuRVuLewLeUfTKtJcbLsmCWmtWPQcmqvARh8bPBUtgfW4f1kDUinjcZ3" }
    ];

    cryptos.forEach(crypto => {
        var li = document.createElement('li');
        // Bold the crypto name
        var boldCryptoName = document.createElement('strong');
        boldCryptoName.textContent = crypto.name + ": ";
        li.appendChild(boldCryptoName);
        // Append the address
        li.append(crypto.address);
        // Add spacing between items
        li.style.marginBottom = '10px';
        cryptoInfo.appendChild(li);
    });

    modalContent.appendChild(cryptoInfo);

    // Close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Got it!';
    closeButton.className = 'closeButton';
    closeButton.onclick = function() {
        tutorialModal.style.display = 'none';
    };
    modalContent.appendChild(closeButton);

    tutorialModal.appendChild(modalContent);
    document.body.appendChild(tutorialModal);
    tutorialModal.style.display = 'block';
}


function checkAndDisplayThankYouModal() {
    const caveExcavationPercentage = (caveExcavationProgress / 3000000) * 100;
    if (!thankyoucreditsDisplayed && caveExcavationPercentage > 33 && sacrificesMade > 100) {
        displayThankYouModal();
        thankyoucreditsDisplayed = true; // Set to true to avoid displaying the modal again
    }
}

setInterval(function() {
    checkAndDisplayThankYouModal();
}, 250000); 


function removeWiggleFilterFromWorkerCells() {
    if (totalcellworkers > 14) {
        const workerCells = document.querySelectorAll('[id^="workercell-"]');
        workerCells.forEach(cell => {
            cell.style.filter = ''; // Remove the filter
        });
    }
}

// Set the interval to run the function every 20 minutes
setInterval(removeWiggleFilterFromWorkerCells, 20 * 60 * 1000);



function svgTendonToIMG() {
    return new Promise((resolve, reject) => {
        const svg = document.getElementById('tendon');
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgStr)));
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function hideTendonSVG() {
    const svg = document.getElementById('tendon');
    svg.style.display = 'none';
}

function displayTendonImage(img) {
    const container = document.getElementById('container');
    img.id = 'tendon-img';
    container.appendChild(img);
}

function toggleToSVG() {
    const img = document.getElementById('tendon-img');
    if (img) {
        img.style.display = 'none';
    }
    const svg = document.getElementById('tendon');
    svg.style.display = 'block';
}


function simplifyGlowWiggleFilter() {
    const glowWiggleFilter = document.getElementById('glowWiggle');
    if (glowWiggleFilter) {
        // Remove the wiggle effect components (feTurbulence and feDisplacementMap)
        const turbulence = glowWiggleFilter.querySelector('#turbulence');
        const displacementMap = glowWiggleFilter.querySelector('feDisplacementMap');
        if (turbulence) glowWiggleFilter.removeChild(turbulence);
        if (displacementMap) glowWiggleFilter.removeChild(displacementMap);
    }
}


function removeWiggleOnlyFilterAndListener() {
    // Remove the wiggleOnly filter
    const wiggleOnlyFilter = document.getElementById('wiggleOnly');
    if (wiggleOnlyFilter) {
        wiggleOnlyFilter.parentNode.removeChild(wiggleOnlyFilter);
    }

    // Remove the wiggleOnClick listener from the 'cell' element
    const cellElement = document.getElementById('cell');
    if (cellElement) {
        cellElement.removeEventListener('click', wiggleOnClick);
    }
}


// Used when we have all 10 tendons, to help improve performance
function removeTendonSwayAnimation() {
  // Select all elements with IDs starting with 'tendon-'
  const tendons = document.querySelectorAll('path[id^="tendon-"]');
  // Iterate over each tendon
  tendons.forEach(tendon => {
    // Find the 'animate' child element
    const animationElement = tendon.querySelector('animate');
    // If an 'animate' element is found, remove it
    if (animationElement) {
      tendon.removeChild(animationElement);
    }
  });

  console.log('Tendon sway animation removed.');
}


function devHalp() {
    // don't use this, it's not cool.
    information += 10000000;
    warmth += 10000000;
    nourishment += 10000000;
    energy += 10000000;
    biomites += 10000000;
    zymers += 10000000;
    fibers += 10000000;
    sludge += 10000000;
    algae += 10000000;
    cellworkers += 1000;
    totalcellworkers += 1000;
}

