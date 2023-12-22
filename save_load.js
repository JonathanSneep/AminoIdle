var saveGameVersion = "0.16";

function saveGame() {
  isSaving = true;
  let tendonSvgString, containerTransform; // Declare these variables outside the if-else block
  if (!endosymbiosisPerformed) {
    const tendonSvgCanvas = document.getElementById("tendon");
    tendonSvgString = new XMLSerializer().serializeToString(tendonSvgCanvas); // Assign value here
    containerTransform = document.getElementById('container').style.transform; // Assign value here
  } else { tendonSvgString = null, containerTransform = null };
  // let savedcaveVisitedPixels = Array.from(caveVisitedPixels.entries()); // Currently manually re-built by reconstructPixelDataFromCaveCanvas();
  // let savedfullyExcavatedPixels = Array.from(fullyExcavatedPixels); // Currently manually re-built by reconstructPixelDataFromCaveCanvas();
  let savedHighwayOutlineCoordinates = Array.from(highwayOutlineCoordinates);
  const gameState = {
    saveGameVersion,
    TICK_RATE,
    CYCLE_RATE, 
    nourishment,
    firstWiggle,
    firstTendonGrown,
    mapInitialized,
    cellsegments,
    tendons,
    information,
    energy,
    warmth,
    navigationcost,
    sensorCounter,
    lastConversionTime,
    activeMultipliers,
    resourceConversionCap,
    thankyoucreditsDisplayed,
    currentRunPrestigeGained,
    lastCheckTime,
    storyQueue,
    currentSpan,
    lastStoryMessage,
    tendonStoryIndex,
    senseStoryIndex,
    glowStoryIndex,
    grabStoryIndex,
    nourishmentStoryIndex,
    tutorialsDisplayed,
    nourishmentMultiplier,
    energyMultiplier,
    informationMultiplier,
    warmthMultiplier,
    nourishmentRate,
    energyRate,
    informationRate,
    warmthRate,
    nourishmentPerTendon,
    energyPerTendon,
    informationPerTendon,
    warmthPerTendon,
    nourishmentPerSegment,
    energyPerSegment,
    informationPerSegment,
    warmthPerSegment,
    nourishmentPerWorker,
    informationPerWorker,
    warmthPerWorker,
    energyPerWorker,
    biomitesRate,
    zymersRate,
    fibersRate,
    sludgeRate,
    algaeRate,
    biomitesMultiplier,
    zymersMultiplier,
    fibersMultiplier,
    sludgeMultiplier,
    algaeMultiplier,
    biomites,
    zymers,
    fibers,
    sludge,
    algae,
    divisionCooldown,
    cooldownTimer,
    cooldownTime,
    remainingDivisionTime,
    cellworkers,
    totalcellworkers,
    WorkerCellPositions,
    loneliness,
    empathy,
    resilience,
    curiosity,
    optimism,
    anger,
    shownSoulModals,
    setBacksSurvived,
    terrainSetBackFirst,
    iceCaveSetBackFirst,
    currentView,
    echoUses,
    baseEchoCost,
    growthExponent,
    decorations,
    decorationCounts,
    savedTerraformAnomalyPercentages,
    postRenderedObjects,
    terrainGrid,
    visitedGrid,
    tilesExplored,
    percentageExplored,
    percentagePerTile,
    playerPosition,
    exploredAreas,
    initialSpawnTerrain,
    solaraDiscovered,
    icecaveDiscovered,
    volcanoDiscovered,
    oasisDiscovered,
    ancientRuinDiscovered,
    firstflowerdiscovery,
    firstpebblediscovery,
    firstsanddunediscovery,
    firstfungusdiscovery,
    terrainCounts,
    compassListenersAdded,
    tendonCosts,
    senseCosts,
    glowCosts,
    grabCosts,
    informationIncrement,
    nourishIncrement,
    warmthIncrement,
    energyIncrement,
    glowColor,
    nucleusColor,
    baseTendonColor,
    contrastTendonColor,
    tertiaryColor,
    quaternaryColor,
    startNewParagraph,
    sensorUpgradePurchased,
    radiatorUpgradePurchased,
    mitochondriaUpgradePurchased,
    membraneUpgradePurchased,
    nucleusUpgradePurchased,
    endoplasmicUpgradePurchased,
    nucleusUpgradePurchased,
    spikesUpgradePurchased,
    suctionCupsUpgradePurchased,
    featheredAntennaUpgradePurchased,
    echoChamberUpgradePurchased,
    resonanceTendrilsUpgradePurchased,
    sensoryPulsarsUpgradePurchased,
    monotrichousFlagellaUpgradePurchased,
    lophotrichousFlagellaUpgradePurchased,
    synapticGlacialisEvolutionPurchased,
    calorimetricGranulumEvolutionPurchased,
    exoterrainAcclimatizationUpgradePurchased,
    evolvedToProtoWorm,
    evolvedToProtoPod,
    evolvedToProtoCyst,
    evolvedToProtoGrade,
    endosymbiosisPerformed,
    endosymbiosisType,
    tendonEndpoints,
    resonanceTendrilEndpoints,
    resonanceTendrilSwayDurations,
    sensorPositions,
    sensorData,
    protoPodLimbsInfo,
    researchQueue,
    completedResearch,
    cellmembraneStudyCompleted,
    osmoregulationStudyCompleted,
    mitoticStudyCompleted,
    mitoticAmplificationICompleted,
    mitoticAmplificationIICompleted,
    harmonicSymbiosisIResearchCompleted,
    harmonicSymbiosisIIResearchCompleted,
    harmonicSymbiosisIIIResearchCompleted,
    autotrophicAdaptationResearchCompleted,
    eclipticSynthesisResearchCompleted,
    primordialSightResearchCompleted,
    ionchannelStudylvl1,
    ionchannelStudylvl2,
    ionchannelStudyCompleted,
    terraformStudyCompleted,
    chemicalSensingCompleted,
    geomagneticSensingCompleted,
    chemotacticExplorationCompleted,
    tendogenesisStudyCompleted,
    neuralNetworkResearchCompleted,
    cellularEncapsulationResearchCompleted,
    biomechanicalLocomotionCompleted,
    mycorrhizalNetworkResearchCompleted,
    sporeDispersalMechanicsResearchCompleted,
    advancedTunnelingIResearchCompleted,
    advancedTunnelingIIResearchCompleted,
    advancedTunnelingIIIResearchCompleted,
    advancedTunnelingIVResearchCompleted,
    memoryImprintsIresearchCompleted,
    memoryImprintsIIresearchCompleted,
    memoryImprintsIIIresearchCompleted,
    cryohalineExcavationResearchCompleted,
    pheromoneTrailsResearchCompleted,
    hydrologicCycleResearchCompleted,
    circadianRhythmResearchCompleted,
    cellularConduitsResearchCompleted,
    flockingResearchCompleted,
    fringeDwellerResearchCompleted,
    trailRecognitionResearchCompleted,
    echolocationResearchCompleted,
    autoConstructiveSynapsesResearchCompleted,
    thermalSynapticHighwaysResearchCompleted,
    infernoSynapseIntegrationResearchCompleted,
    thermogenicResonanceResearchCompleted,
    enhancedThermogenicResonanceResearchCompleted,
    echoesOfTheForgottenResearchCompleted,
    theCoreResearchCompleted,
    MicrobialMountsCompleted,
    microbialMountsWorkers,
    BioLuminescentZonesCompleted,
    bioLuminescentZonesWorkers,
    SolarSpongesCompleted,
    solarSpongesWorkers,
    FloralBridgesCompleted,
    floralBridgesWorkers,
    SporeTowersCompleted,
    sporeTowersWorkers,
    ThermalVentsCompleted,
    thermalVentsWorkers,
    ResonancePoolsCompleted,
    resonancePoolsWorkers,
    // Map Dec. Analysis
    solaraAnalysed,
    riverAnalysed,
    fungusAnalysed,
    iceCaveAnalysed,
    pebblesAnalysed,
    wavesAnalysed,
    flowersAnalysed,
    saltflatsAnalysed,
    crystalsAnalysed,
    sandDunesAnalysed,
    snowCapsAnalysed,
    rocksAnalysed,
    rockyOutcropsAnalysed,
    muddyPatchesAnalysed,
    reedsAnalysed,
    // CAVE STUFF GOES HERE
    CaveExcavationCompleted,
    caveExcavationStationWorkers,
    caveInitialized,
    caveFullyExcavated,
    //savedcaveVisitedPixels // These are now manually re-calculated upon load, based on image data
    //savedfullyExcavatedPixels, // These are now manually re-calculated upon load, based on image data
    //caveExcavationProgress, // These are now manually re-calculated upon load, based on image data
    savedHighwayOutlineCoordinates,
    // activeDiggers, // Intentionally commented out, we will start with 0 active diggers on a game load, and slowly get back up to speed
    maxActiveDiggers,
    caveDiggerLifespan,
    terraformAssignedDiggers,
    canSpawn,
    lowWarmthNotified,
    activeDiggerPositions,
    // Solara related pieces
    solaraCompleted,
    visionUnlocked,
    sacrificesMade,
    solaraPoints,
    currentRow,
    sacrificeDuration,
    ritualsPerformed,
    currentSolaraGlyphFill,
    solaraGlyphActivated,
    sacrificeStates,
    currentRotationCell,
    /*currentZoomMap,
    currentZoomCell,
    isFirstDrag,
    isDragging,
    dragstartX,
    dragstartY,
    dx,
    dy,
    isDraggingCell,
    startXCell,
    startYCell,
    offsetXCell,
    offsetYCell,*/
    tendonSvgState: tendonSvgString,
    containerTransform: containerTransform
  };
  localStorage.setItem('myGameSave', JSON.stringify(gameState));
  saveResearchProjects(); // save active research 
  // Save the PNG data URL
  const mapImage = document.querySelector('#map img'); 
  if (mapImage) {
    const pngDataURL = mapImage.src;
    localStorage.setItem('savedMapImage', pngDataURL);
  }
  // Save the fog-of-war 
  const fog = document.getElementById('fog-of-war');
  if (fog && fog.style.clipPath) {
    localStorage.setItem('savedClipPath', fog.style.clipPath);
  }

  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += key.length + localStorage[key].length;
    }
  }
  totalSize *= 2;  // Convert to bytes (UTF-16 encoding)
  // Save the cave canvas:
  const savedCaveCanvas = document.getElementById('caveCanvas');
  const savedCanvasDataURL = savedCaveCanvas.toDataURL();
  localStorage.setItem('savedCaveCanvasState', savedCanvasDataURL);
  // Save the solara Sacrifice Pool canvas:
  if (sacrificePoolInitialized) {
    const sacrificePoolCanvas = document.getElementById('sacrificePool');
    const savedSacrificePoolDataURL = sacrificePoolCanvas.toDataURL();
    localStorage.setItem('sacrificePoolState', savedSacrificePoolDataURL);
    localStorage.setItem('lastOccupiedPixelInRow', JSON.stringify(lastOccupiedPixelInRow));
  }
  /////////
  console.log(`Total LocalStorage size: ${totalSize} bytes`);
  console.log("Game saved!");
  isSaving = false;
}


function resetGame() {
  // Clear the Local Storage
  localStorage.removeItem('myGameSave');
  localStorage.removeItem('sacrificePoolState');
  localStorage.removeItem('lastOccupiedPixelInRow');
  localStorage.removeItem('savedClipPath');
  localStorage.removeItem('savedMapImage');
  localStorage.removeItem('savedCaveCanvasState');
  localStorage.removeItem('researchProjects');
  // Clear saved multipliers
  let resourceTypes = ['nourishment', 'information', 'warmth', 'energy', 'biomites', 'zymers', 'fibers', 'sludge', 'algae'];
  resourceTypes.forEach((resourceType) => {
    localStorage.removeItem(`${resourceType}Multiplier`);
    localStorage.removeItem(`${resourceType}MultiplierDuration`);
  });
  // Log the reset action
  console.log("Game has been reset.");
  // Optionally, reload the page to apply the reset
  location.reload();
}

function resetGameAndPrestige() {
  localStorage.removeItem('aminoPrestigeData');
  resetGame();
}



// Locate the "Save Game" button by its ID
const saveButton = document.getElementById("save");

// Attach the saveGame function to the button's click event
saveButton.addEventListener("click", function() {
  saveGame();
  showToast();
});


document.getElementById("reset").addEventListener("click", function() {
  if (confirm("Are you sure you want to reset the game? This will erase all progress.")) {
    resetGame();
  }
});


function loadGame() {
  const savedGameState = JSON.parse(localStorage.getItem('myGameSave'));
  if (savedGameState) {
    saveGameVersion = savedGameState.saveGameVersion;
    CYCLE_RATE = savedGameState.CYCLE_RATE;
    TICK_RATE = savedGameState.TICK_RATE;
    nourishment = savedGameState.nourishment;
    firstWiggle = savedGameState.firstWiggle;
    firstTendonGrown = savedGameState.firstTendonGrown;
    mapInitialized = savedGameState.mapInitialized;
    cellsegments = savedGameState.cellsegments;
    tendons = savedGameState.tendons;
    information = savedGameState.information;
    energy = savedGameState.energy;
    warmth = savedGameState.warmth;
    navigationcost = savedGameState.navigationcost;
    sensorCounter = savedGameState.sensorCounter;
    lastConversionTime = savedGameState.lastConversionTime;
    activeMultipliers = savedGameState.activeMultipliers;
    resourceConversionCap = savedGameState.resourceConversionCap;
    thankyoucreditsDisplayed = savedGameState.thankyoucreditsDisplayed;
    currentRunPrestigeGained = savedGameState.currentRunPrestigeGained;
    lastCheckTime = savedGameState.lastCheckTime;
    storyQueue = savedGameState.storyQueue;
    currentSpan = savedGameState.currentSpan;
    lastStoryMessage = savedGameState.lastStoryMessage;
    tendonStoryIndex = savedGameState.tendonStoryIndex;
    senseStoryIndex = savedGameState.senseStoryIndex;
    glowStoryIndex = savedGameState.glowStoryIndex;
    grabStoryIndex = savedGameState.grabStoryIndex;
    nourishmentStoryIndex = savedGameState.nourishmentStoryIndex;
    tutorialsDisplayed = savedGameState.tutorialsDisplayed;
    nourishmentMultiplier = savedGameState.nourishmentMultiplier;
    energyMultiplier = savedGameState.energyMultiplier;
    informationMultiplier = savedGameState.informationMultiplier;
    warmthMultiplier = savedGameState.warmthMultiplier;
    nourishmentRate = savedGameState.nourishmentRate;
    energyRate = savedGameState.energyRate;
    informationRate = savedGameState.informationRate;
    warmthRate = savedGameState.warmthRate;
    nourishmentPerTendon = savedGameState.nourishmentPerTendon;
    energyPerTendon = savedGameState.energyPerTendon;
    informationPerTendon = savedGameState.informationPerTendon;
    warmthPerTendon = savedGameState.warmthPerTendon;
    nourishmentPerSegment = savedGameState.nourishmentPerSegment;
    energyPerSegment = savedGameState.energyPerSegment;
    informationPerSegment = savedGameState.informationPerSegment;
    warmthPerSegment = savedGameState.warmthPerSegment;
    nourishmentPerWorker = savedGameState.nourishmentPerWorker;
    informationPerWorker = savedGameState.informationPerWorker;
    warmthPerWorker = savedGameState.warmthPerWorker;
    energyPerWorker = savedGameState.energyPerWorker;
    biomitesRate = savedGameState.biomitesRate;
    zymersRate = savedGameState.zymersRate;
    fibersRate = savedGameState.fibersRate;
    sludgeRate = savedGameState.sludgeRate;
    algaeRate = savedGameState.algaeRate;
    biomitesMultiplier = savedGameState.biomitesMultiplier;
    zymersMultiplier = savedGameState.zymersMultiplier;
    fibersMultiplier = savedGameState.fibersMultiplier;
    sludgeMultiplier = savedGameState.sludgeMultiplier;
    algaeMultiplier = savedGameState.algaeMultiplier;
    biomites = savedGameState.biomites;
    zymers = savedGameState.zymers;
    fibers = savedGameState.fibers;
    sludge = savedGameState.sludge;
    algae = savedGameState.algae;
    divisionCooldown = savedGameState.divisionCooldown;
    cooldownTimer = savedGameState.cooldownTimer;
    remainingDivisionTime = savedGameState.remainingDivisionTime;
    cellworkers = savedGameState.cellworkers;
    totalcellworkers = savedGameState.totalcellworkers;
    WorkerCellPositions = savedGameState.WorkerCellPositions;
    loneliness = savedGameState.loneliness;
    empathy = savedGameState.empathy;
    resilience = savedGameState.resilience;
    curiosity = savedGameState.curiosity;
    optimism = savedGameState.optimism;
    anger = savedGameState.anger;
    shownSoulModals = savedGameState.shownSoulModals;
    setBacksSurvived = savedGameState.setBacksSurvived;
    terrainSetBackFirst = savedGameState.terrainSetBackFirst;
    iceCaveSetBackFirst = savedGameState.iceCaveSetBackFirst;
    // currentView = savedGameState.currentView; // intentionally left out, not working properly if used
    echoUses = savedGameState.echoUses;
    baseEchoCost = savedGameState.baseEchoCost;
    growthExponent = savedGameState.growthExponent;
    decorations = savedGameState.decorations;
    decorationCounts = savedGameState.decorationCounts;
    savedTerraformAnomalyPercentages = savedGameState.savedTerraformAnomalyPercentages;
    postRenderedObjects = savedGameState.postRenderedObjects;
    terrainGrid = savedGameState.terrainGrid;
    visitedGrid = savedGameState.visitedGrid;
    tilesExplored = savedGameState.tilesExplored;
    percentageExplored = savedGameState.percentageExplored;
    percentagePerTile = savedGameState.percentagePerTile;
    playerPosition = savedGameState.playerPosition;
    exploredAreas = savedGameState.exploredAreas;
    initialSpawnTerrain = savedGameState.initialSpawnTerrain;
    solaraDiscovered = savedGameState.solaraDiscovered;
    icecaveDiscovered = savedGameState.icecaveDiscovered;
    volcanoDiscovered = savedGameState.volcanoDiscovered;
    oasisDiscovered = savedGameState.oasisDiscovered;
    ancientRuinDiscovered = savedGameState.ancientRuinDiscovered;
    firstflowerdiscovery = savedGameState.firstflowerdiscovery;
    firstpebblediscovery = savedGameState.firstpebblediscovery;
    firstsanddunediscovery = savedGameState.firstsanddunediscovery;
    firstfungusdiscovery = savedGameState.firstfungusdiscovery;
    terrainCounts = savedGameState.terrainCounts;
    compassListenersAdded = false; // compass listeners should be re-added upon game load
    tendonCosts = savedGameState.tendonCosts;
    senseCosts = savedGameState.senseCosts;
    glowCosts = savedGameState.glowCosts;
    grabCosts = savedGameState.grabCosts;
    informationIncrement = savedGameState.informationIncrement;
    nourishIncrement = savedGameState.nourishIncrement;
    warmthIncrement = savedGameState.warmthIncrement;
    energyIncrement = savedGameState.energyIncrement;
    glowColor = savedGameState.glowColor;
    nucleusColor = savedGameState.nucleusColor;
    baseTendonColor = savedGameState.baseTendonColor;
    contrastTendonColor = savedGameState.contrastTendonColor;
    tertiaryColor = savedGameState.tertiaryColor;
    quaternaryColor = savedGameState.quaternaryColor;
    startNewParagraph = savedGameState.startNewParagraph;
    sensorUpgradePurchased = savedGameState.sensorUpgradePurchased;
    radiatorUpgradePurchased = savedGameState.radiatorUpgradePurchased;
    mitochondriaUpgradePurchased = savedGameState.mitochondriaUpgradePurchased;
    membraneUpgradePurchased = savedGameState.membraneUpgradePurchased;
    nucleusUpgradePurchased = savedGameState.nucleusUpgradePurchased;
    endoplasmicUpgradePurchased = savedGameState.endoplasmicUpgradePurchased;
    nucleusUpgradePurchased = savedGameState.nucleusUpgradePurchased;
    spikesUpgradePurchased = savedGameState.spikesUpgradePurchased;
    suctionCupsUpgradePurchased = savedGameState.suctionCupsUpgradePurchased;
    featheredAntennaUpgradePurchased = savedGameState.featheredAntennaUpgradePurchased;
    echoChamberUpgradePurchased = savedGameState.echoChamberUpgradePurchased;
    resonanceTendrilsUpgradePurchased = savedGameState.resonanceTendrilsUpgradePurchased;
    sensoryPulsarsUpgradePurchased = savedGameState.sensoryPulsarsUpgradePurchased;
    monotrichousFlagellaUpgradePurchased = savedGameState.monotrichousFlagellaUpgradePurchased;
    lophotrichousFlagellaUpgradePurchased = savedGameState.lophotrichousFlagellaUpgradePurchased;
    synapticGlacialisEvolutionPurchased = savedGameState.synapticGlacialisEvolutionPurchased;
    calorimetricGranulumEvolutionPurchased = savedGameState.calorimetricGranulumEvolutionPurchased;
    exoterrainAcclimatizationUpgradePurchased = savedGameState.exoterrainAcclimatizationUpgradePurchased;
    evolvedToProtoWorm = savedGameState.evolvedToProtoWorm;
    evolvedToProtoPod = savedGameState.evolvedToProtoPod;
    evolvedToProtoCyst = savedGameState.evolvedToProtoCyst;
    evolvedToProtoGrade = savedGameState.evolvedToProtoGrade;
    endosymbiosisPerformed = savedGameState.endosymbiosisPerformed;
    endosymbiosisType = savedGameState.endosymbiosisType;
    tendonEndpoints = savedGameState.tendonEndpoints;
    resonanceTendrilEndpoints = savedGameState.resonanceTendrilEndpoints;
    resonanceTendrilSwayDurations = savedGameState.resonanceTendrilSwayDurations;
    sensorPositions = savedGameState.sensorPositions;
    sensorData = savedGameState.sensorData;
    protoPodLimbsInfo = savedGameState.protoPodLimbsInfo;
    researchQueue = savedGameState.researchQueue;
    completedResearch = savedGameState.completedResearch;
    cellmembraneStudyCompleted = savedGameState.cellmembraneStudyCompleted;
    osmoregulationStudyCompleted = savedGameState.osmoregulationStudyCompleted;
    mitoticStudyCompleted = savedGameState.mitoticStudyCompleted;
    mitoticAmplificationICompleted = savedGameState.mitoticAmplificationICompleted;
    mitoticAmplificationIICompleted = savedGameState.mitoticAmplificationIICompleted; 
    harmonicSymbiosisIResearchCompleted = savedGameState.harmonicSymbiosisIResearchCompleted;
    harmonicSymbiosisIIResearchCompleted = savedGameState.harmonicSymbiosisIIResearchCompleted;
    harmonicSymbiosisIIIResearchCompleted = savedGameState.harmonicSymbiosisIIIResearchCompleted;
    autotrophicAdaptationResearchCompleted = savedGameState.autotrophicAdaptationResearchCompleted;
    eclipticSynthesisResearchCompleted = savedGameState.eclipticSynthesisResearchCompleted;
    primordialSightResearchCompleted = savedGameState.primordialSightResearchCompleted;
    ionchannelStudylvl1 = savedGameState.ionchannelStudylvl1;
    ionchannelStudylvl2 = savedGameState.ionchannelStudylvl2;
    ionchannelStudyCompleted = savedGameState.ionchannelStudyCompleted;
    terraformStudyCompleted = savedGameState.terraformStudyCompleted;
    chemicalSensingCompleted = savedGameState.chemicalSensingCompleted;
    geomagneticSensingCompleted = savedGameState.geomagneticSensingCompleted;
    chemotacticExplorationCompleted = savedGameState.chemotacticExplorationCompleted;
    tendogenesisStudyCompleted = savedGameState.tendogenesisStudyCompleted;
    neuralNetworkResearchCompleted = savedGameState.neuralNetworkResearchCompleted;
    cellularEncapsulationResearchCompleted = savedGameState.cellularEncapsulationResearchCompleted;
    mycorrhizalNetworkResearchCompleted = savedGameState.mycorrhizalNetworkResearchCompleted;
    sporeDispersalMechanicsResearchCompleted = savedGameState.sporeDispersalMechanicsResearchCompleted;
    advancedTunnelingIResearchCompleted = savedGameState.advancedTunnelingIResearchCompleted;
    advancedTunnelingIIResearchCompleted = savedGameState.advancedTunnelingIIResearchCompleted;
    advancedTunnelingIIIResearchCompleted = savedGameState.advancedTunnelingIIIResearchCompleted;
    advancedTunnelingIVResearchCompleted = savedGameState.advancedTunnelingIVResearchCompleted;
    memoryImprintsIresearchCompleted = savedGameState.memoryImprintsIresearchCompleted;
    memoryImprintsIIresearchCompleted = savedGameState.memoryImprintsIIresearchCompleted;
    memoryImprintsIIIresearchCompleted = savedGameState.memoryImprintsIIIresearchCompleted;
    cryohalineExcavationResearchCompleted = savedGameState.cryohalineExcavationResearchCompleted;
    biomechanicalLocomotionCompleted = savedGameState.biomechanicalLocomotionCompleted;
    pheromoneTrailsResearchCompleted = savedGameState.pheromoneTrailsResearchCompleted;
    hydrologicCycleResearchCompleted = savedGameState.hydrologicCycleResearchCompleted;
    circadianRhythmResearchCompleted = savedGameState.circadianRhythmResearchCompleted;
    cellularConduitsResearchCompleted = savedGameState.cellularConduitsResearchCompleted;
    flockingResearchCompleted = savedGameState.flockingResearchCompleted;
    fringeDwellerResearchCompleted = savedGameState.fringeDwellerResearchCompleted;
    trailRecognitionResearchCompleted = savedGameState.trailRecognitionResearchCompleted;
    echolocationResearchCompleted = savedGameState.echolocationResearchCompleted;
    autoConstructiveSynapsesResearchCompleted = savedGameState.autoConstructiveSynapsesResearchCompleted;
    thermalSynapticHighwaysResearchCompleted = savedGameState.thermalSynapticHighwaysResearchCompleted;
    infernoSynapseIntegrationResearchCompleted = savedGameState.infernoSynapseIntegrationResearchCompleted;
    thermogenicResonanceResearchCompleted = savedGameState.thermogenicResonanceResearchCompleted;
    enhancedThermogenicResonanceResearchCompleted = savedGameState.enhancedThermogenicResonanceResearchCompleted;
    echoesOfTheForgottenResearchCompleted = savedGameState.echoesOfTheForgottenResearchCompleted;
    theCoreResearchCompleted = savedGameState.theCoreResearchCompleted;
    MicrobialMountsCompleted = savedGameState.MicrobialMountsCompleted;
    microbialMountsWorkers = savedGameState.microbialMountsWorkers;
    BioLuminescentZonesCompleted = savedGameState.BioLuminescentZonesCompleted;
    bioLuminescentZonesWorkers = savedGameState.bioLuminescentZonesWorkers;
    SolarSpongesCompleted = savedGameState.SolarSpongesCompleted;
    solarSpongesWorkers = savedGameState.solarSpongesWorkers;
    FloralBridgesCompleted = savedGameState.FloralBridgesCompleted;
    floralBridgesWorkers = savedGameState.floralBridgesWorkers;
    SporeTowersCompleted = savedGameState.SporeTowersCompleted;
    sporeTowersWorkers = savedGameState.sporeTowersWorkers;
    ThermalVentsCompleted = savedGameState.ThermalVentsCompleted;
    thermalVentsWorkers = savedGameState.thermalVentsWorkers;
    ResonancePoolsCompleted = savedGameState.ResonancePoolsCompleted;
    resonancePoolsWorkers = savedGameState.resonancePoolsWorkers;
    // Map Dec. Analysis
    solaraAnalysed = savedGameState.solaraAnalysed;
    riverAnalysed = savedGameState.riverAnalysed;
    fungusAnalysed = savedGameState.fungusAnalysed;
    iceCaveAnalysed = savedGameState.iceCaveAnalysed;
    pebblesAnalysed = savedGameState.pebblesAnalysed;
    wavesAnalysed = savedGameState.wavesAnalysed;
    flowersAnalysed = savedGameState.flowersAnalysed;
    saltflatsAnalysed = savedGameState.saltflatsAnalysed;
    crystalsAnalysed = savedGameState.crystalsAnalysed;
    sandDunesAnalysed = savedGameState.sandDunesAnalysed;
    snowCapsAnalysed = savedGameState.snowCapsAnalysed;
    rocksAnalysed = savedGameState.rocksAnalysed;
    rockyOutcropsAnalysed = savedGameState.rockyOutcropsAnalysed;
    muddyPatchesAnalysed = savedGameState.muddyPatchesAnalysed;
    reedsAnalysed = savedGameState.reedsAnalysed;
    // Cave Stuff goes here
    CaveExcavationCompleted = savedGameState.CaveExcavationCompleted;
    caveExcavationStationWorkers = savedGameState.caveExcavationStationWorkers;
    caveInitialized = savedGameState.caveInitialized;
    caveFullyExcavated = savedGameState.caveFullyExcavated;
    // caveVisitedPixels = new Map(savedGameState.savedcaveVisitedPixels);
    // fullyExcavatedPixels = new Set(savedGameState.savedfullyExcavatedPixels);
    highwayOutlineCoordinates = new Set(savedGameState.savedHighwayOutlineCoordinates);
    // caveExcavationProgress = savedGameState.caveExcavationProgress; 
    // activeDiggers = savedGameState.activeDiggers; // Intentionally commented out, start with 0 active diggers on game load
    maxActiveDiggers = savedGameState.maxActiveDiggers;
    caveDiggerLifespan = savedGameState.caveDiggerLifespan;
    terraformAssignedDiggers = savedGameState.terraformAssignedDiggers;
    //canSpawn = savedGameState.canSpawn; // Should always be true in loaded games. 
    lowWarmthNotified = savedGameState.lowWarmthNotified;
    activeDiggerPositions = savedGameState.activeDiggerPositions;
    // Solara related pieces
    solaraCompleted = savedGameState.solaraCompleted;
    visionUnlocked = savedGameState.visionUnlocked;
    sacrificesMade = savedGameState.sacrificesMade;
    solaraPoints = savedGameState.solaraPoints;
    currentRow = savedGameState.currentRow;
    sacrificeDuration = savedGameState.sacrificeDuration;
    ritualsPerformed = savedGameState.ritualsPerformed;
    currentSolaraGlyphFill = savedGameState.currentSolaraGlyphFill;
    solaraGlyphActivated = savedGameState.solaraGlyphActivated;
    sacrificeStates = savedGameState.sacrificeStates;
    currentRotationCell = savedGameState.currentRotationCell;
    /*currentZoomMap = savedGameState.currentZoomMap;
    currentZoomCell = savedGameState.currentZoomCell;
    isFirstDrag = savedGameState.isFirstDrag;
    isDragging = savedGameState.isDragging;
    dragstartX = savedGameState.dragstartX;
    dragstartY = savedGameState.dragstartY;
    dx = savedGameState.dx;
    dy = savedGameState.dy;
    isDraggingCell = savedGameState.isDraggingCell;
    startXCell = savedGameState.startXCell;
    startYCell = savedGameState.startYCell;
    offsetXCell = savedGameState.offsetXCell;
    offsetYCell = savedGameState.offsetYCell;*/
    if (!endosymbiosisPerformed) {
      const tendonSvgString = savedGameState.tendonSvgState;
      const parser = new DOMParser();
      const tendonSvgElement = parser.parseFromString(tendonSvgString, "image/svg+xml").documentElement;
      const existingTendonSvgElement = document.getElementById("tendon");
      existingTendonSvgElement.parentNode.replaceChild(tendonSvgElement, existingTendonSvgElement);
      const containerTransform = savedGameState.containerTransform;
      document.getElementById('container').style.transform = containerTransform;
      // Re-Add wiggleOnClick to the cell
      document.getElementById('cell').addEventListener('click', wiggleOnClick);
      attachCellDragListeners(); // re-attach cell drag listeners
      for (let i = 0; i < Math.min(9, totalcellworkers); i++) {
          startWiggle('workercell-' + i); // restart workercell wiggles
      }
    } else {
      if (endosymbiosisType === 'TrilacticCactolith') {
        loadTrilacticCactolith();
      } else if (endosymbiosisType === 'CactolithSerpent') {
        loadCactolithSerpent();
      }
    }
    updateTendonUI(); // Updates the tendon/sense/glow/grab buttons appropriately
    enableEchoButton(); // Enables echo, if appropriate
    resetLimbPositions(); // Resets limb positions, where required
    updateActionButtonsBasedOnEvolution(); // Replaces wiggle, if appropriate
    checkResearchTabUnlock(); // Unlock research, if appropriate
    // Create buttons for completed research
    for (const research of completedResearch) {
      createCompletedResearchButton(research);
    }
    updateCompletedResearchButtons(); // Populate completed research buttons
    loadResearchProjects(); // Loads any active research projects, if applicable
    unlockResourceConverter(); // Unlock resource conversion, if appropriate
    checkTerraformTabUnlock(); // Unlock terraform, if appropriate
    checkTerraformUnlocks(); // Unlock terraform building projects, if appropriate
    if (terraformStudyCompleted) { // Unlock the terraform resources display if appropriate
      document.getElementById("terraformResourcesDisplay").style.display = "block"; // unhide the terraform resources data
      terraformCycle(); // brings back the terraform resources to the bar
      populateAnomalyWidget(); // update anomalies data
      loadSavedTFAnomalyPercentages(); // loads up % of analyzed anomalies
      populateAnomalyWidget(); // This needs to be called twice, unfortunately. Too lazy to dig into the specifics; it works.
      enableCircadianClock(); // enables the circadian clock, if appropriate
      loadGameUpdateTerraformResourcesDisplay(); // updates resource bar with fresh figures
    }
    terraformWidgetRepopulation(); // Repopulates the terraform widget, if appropriate
    // Check if sporeDispersalMechanicsResearch is completed
    if (sporeDispersalMechanicsResearchCompleted === true) {
        setInterval(sporeDispersal, 20000); // Start the interval for sporeDispersal function
    }
    removeEchoCircles(); // Cleanup leftover echowaves
    queueEnhancedThermogenicResonance(); // Brings in (delayed) enhanced thermogenic resonance research, if applicable 
    checkSoulModalsAndUnlock(); // Unlock soul, if appropriate
    unlockSolaraTab(); // Unlock solara tab, if appropriate
    enableProtozoidEvolutions(); // Unlock protozoid evolutions, if appropriate
    unlockDivisionButtonAndAddListener()  // Unlock division, if appropriate
    startAutonomousMitogenesis(); // Starts autonomous mitogenesis, if appropriate
    loadAchievements(); // Load in unlocked achievements
    revealProtozoidEvolutions(); // Reveal the first major evolution options, if appropriate
    restoreActiveMultipliers(); // Restore multipliers, if appropriate 
    enableViewSwitchIfAppropriate(); // Enables the ability to switch between cell and map, if appropriate
    initializeFogOfWar(document.getElementById('map')); // re-start fog-of-war
    const savedClipPath = localStorage.getItem('savedClipPath');
    if (savedClipPath) {
      const fog = document.getElementById('fog-of-war');
      if (fog) {
        fog.style.clipPath = savedClipPath;
      }
    }
    const savedMapImage = localStorage.getItem('savedMapImage'); 
    if (savedMapImage) { // load up the map image, if required
      const mapDiv = document.getElementById('map');
      const pngImage = new Image();
      pngImage.src = savedMapImage;
      pngImage.draggable = false;
      pngImage.style.imageRendering = 'pixelated';
      pngImage.style.zIndex = '1';
      mapDiv.appendChild(pngImage);
    }
    var minicell = document.getElementById('cell-icon');
    if (!minicell) {
        minicell = document.createElement('div');
        minicell.id = 'cell-icon';
        map.appendChild(minicell);
      }
      minicell.style.left = playerPosition.x + "px";
      minicell.style.top = playerPosition.y + "px";

    restorePostRenderedObjects(); // Load post-render SVG elements to the map
    enableAutomatedExploration(); // Enables auto-exploration, if appropriate
    // restore the cave Canvas
    const caveCanvasLoad = document.getElementById('caveCanvas');
    const caveCanvasLoadedctx = caveCanvasLoad.getContext('2d');
    const savedCanvasDataURL = localStorage.getItem('savedCaveCanvasState');
    if (savedCanvasDataURL) {
        const caveimg = new Image();
        caveimg.src = savedCanvasDataURL;
        caveimg.onload = function() {
            caveCanvasLoadedctx.drawImage(caveimg, 0, 0);
        };
    }
    const caveimg = new Image();
    caveimg.src = savedCanvasDataURL;
    caveimg.onload = function() {
        caveCanvasLoadedctx.drawImage(caveimg, 0, 0);
        if (caveInitialized) {
        reconstructPixelDataFromCaveCanvas('caveCanvas');
        }
        console.log("Rebuilt the caveVisitedPixels & fullyExcavatedPixels data!");
    };
    setTimeout(function() {
      enableAutoConstructionOfConduits(); // Kicks off auto construction of conduits, if conditions are met
    }, 10000); 
    checkAndSpawnLavaBurrowerOrFringeDwellerOnLoad(); // Re-spawns the lava burrowers / Fringe Dwellers, if conditions are met
    // Second-stage evolution pieces
    renameCellViewButton(); // Renames the cell view button, if appropriate
    setupWorldView(); // switches discovery to world view, if appropriate
    console.log("Loaded a previous savegame state.");
    } else {
    console.log("No saved game found. Starting fresh.");
  }
}


// The function below manually rebuilds caveVisitedPixels and fullyExcavatedPixels, as saving them in text lead to excessive savegame size (>10MB!)
function reconstructPixelDataFromCaveCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const colorMapping = {
        '#333333': 0,
        '#555555': 1,
        '#AAAAAA': 2,
        '#ADD8E6': 3
    };
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const red = data[index];
            const green = data[index + 1];
            const blue = data[index + 2];
            const color = `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;
            if (colorMapping[color] !== undefined) {
                caveExcavationProgress += colorMapping[color]; // Incrementing the excavation progress
                if (colorMapping[color] > 0) {
                    const key = `${x},${y}`;
                    caveVisitedPixels.set(key, colorMapping[color]);
                }
                if (colorMapping[color] === 3) {
                    fullyExcavatedPixels.add(`${x},${y}`);
                }
            } else if (globalHighwayColors.includes(color) || autoConstructionColorScheme.includes(color)) {
                // If the pixel is a highway or is currently being animated (constructed), set as 3x excavated
                caveExcavationProgress += 3; // Incrementing by 3
                const key = `${x},${y}`;
                caveVisitedPixels.set(key, 3);
                fullyExcavatedPixels.add(key);
            } else {
                console.log(`Unexpected color ${color} at ${x},${y}`);
                caveExcavationProgress += 3; // Incrementing by 3
                ctx.fillStyle = '#ADD8E6';
                ctx.fillRect(x, y, 1, 1);
                const key = `${x},${y}`;
                caveVisitedPixels.set(key, 3);
                fullyExcavatedPixels.add(key);
            }
        }
    }
}



// Function to clean up any junk (echo waves)
function removeEchoCircles() {
  if (!endosymbiosisPerformed) {
    const svg = document.getElementById('tendon');
    const echoCircles = svg.querySelectorAll('#echowave');
    echoCircles.forEach(circle => {
        svg.removeChild(circle);
    });
  }
}

function showToast() {
  // Get the toast element
  const toast = document.getElementById('toast');
  
  // Make the toast visible by setting its opacity to 1
  toast.style.opacity = '1';
  
  // Remove the 'hidden' class to display the toast
  toast.classList.remove('hidden');
  
  // Wait 3 seconds and then start the fading process
  setTimeout(() => {
    toast.style.opacity = '0';

    // Wait for the transition to finish and then hide the toast
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 500); // 500ms matches the duration of the transition in the CSS
  }, 800);
}

setInterval(saveGame, 300000); // save the game every 5 minutes
document.addEventListener("DOMContentLoaded", function(event) {
  loadGame();
});



function saveResearchProjects() {
    const projectsSaveState = {};
    console.log("Saving research projects...");
    Object.values(allResearchProjects).forEach(project => {
        projectsSaveState[project.name] = project.getSaveState();
    });
    localStorage.setItem('researchProjects', JSON.stringify(projectsSaveState));
}

function loadResearchProjects() {
    const savedData = localStorage.getItem('researchProjects');
    if (savedData) {
        const projectsData = JSON.parse(savedData);
        console.log("Loading research projects...");
        Object.entries(allResearchProjects).forEach(([key, project]) => {
            const savedProjectData = projectsData[project.name];
            // console.log(`Project '${project.name}' saved data:`, savedProjectData);
            if (savedProjectData) {
                project.timeLeft = savedProjectData.timeLeft;
                // console.log(`Project '${project.name}' active status:`, savedProjectData.isActive);
                if (savedProjectData.isActive) {
                    setTimeout(() => {
                        let buttonId = key + "Button"; // Construct buttonId using the key
                        let researchButton = document.getElementById(buttonId);
                        if (researchButton) {
                            researchButton.click();
                        } else {
                            console.log(`DEBUG: An error! Button '${buttonId}' not found. Show this to the dev if you can, plz :)`);
                        }
                    }, 1000);
                }
            } else {
                console.log(`No saved state found for project '${project.name}'.`);
            }
        });
        console.log("All projects loading process completed.");
    } else {
        console.log("No saved research project data found in localStorage.");
    }
}




