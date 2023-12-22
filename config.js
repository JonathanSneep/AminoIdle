var nourishment = 0;
var firstWiggle = true;
var firstTendonGrown = false;
var mapInitialized = false; // one-time discovery event
var cellsegments = 1; // # of segments per cell
var tendons = 0;
var information = 0;
var energy = 0;
var warmth = 0;
var navigationcost = 1000; // costs to navigate the map
var sensorCounter = 0;
var isSaving = false;
var conversionCoolDown = 60000;
var lastConversionTime = 0;
var activeMultipliers = {};
var resourceConversionCap = 1000;
var thankyoucreditsDisplayed = false;
var currentRunPrestigeGained = 0;
var lastCheckTime = Date.now(); // To help handle offline/inactive progress
// Story settings
var storyQueue = [];
var isWriting = false;
var currentSpan = null;
var lastStoryMessage = "";
var tendonStoryIndex = 0;
var senseStoryIndex = 0;
var glowStoryIndex = 0;
var grabStoryIndex = 0;
var nourishmentStoryIndex = 0;
var tutorialsDisplayed = [];
// Multipliers
var nourishmentMultiplier = 1;
var informationMultiplier = 1;
var warmthMultiplier = 1;
var energyMultiplier = 1;
// Base Rates
var nourishmentRate = 0; 
var energyRate = 0;      
var informationRate = 0; 
var warmthRate = 0;
// Per-Tendon rates
var nourishmentPerTendon = 0; // !!! SHOULD BE ZERO INITIALLY, INCREASED FOR EASY TESTING
var informationPerTendon = 0; // !!! SHOULD BE ZERO INITIALLY, INCREASED FOR EASY TESTING
var warmthPerTendon = 0; // !!! SHOULD BE ZERO INITIALLY, INCREASED FOR EASY TESTING
var energyPerTendon = 0; // !!! SHOULD BE ZERO INITIALLY, INCREASED FOR EASY TESTING
// Per-Segment rates
var nourishmentPerSegment = 0;
var informationPerSegment = 0;
var warmthPerSegment = 0;
var energyPerSegment = 0;
// Per-Worker rates
var nourishmentPerWorker = 0;
var informationPerWorker = 0;
var warmthPerWorker = 0;
var energyPerWorker = 0;
// Resource tick rate
var TICK_RATE = 50; // every 50ms
let CYCLE_RATE = 10000; // Terraform 'Cycle'
let cycleProgress = 0;  // Current progress (0-100)
let cycleInterval;      // The interval reference for clearing and restarting
// Terraform Base Rates
var biomitesRate = 0;
var zymersRate = 0;
var fibersRate = 0;
var sludgeRate = 0;
var algaeRate = 0;
// Terraform Multipliers
var biomitesMultiplier = 1;
var zymersMultiplier = 1;
var fibersMultiplier = 1;
var sludgeMultiplier = 1;
var algaeMultiplier = 1;
// Terraform Resources
var biomites = 0;
var zymers = 0;
var fibers = 0;
var sludge = 0;
var algae = 0;
// Division related pieces
var divisionCooldown = false; // Flag to indicate if the division action is in cooldown
var cooldownTimer; // Variable to store the countdown timer
var cooldownTime = 60; // 10 minutes in seconds
var remainingDivisionTime = cooldownTime; // Used so we can carry-over remaining seconds to save/load game functions
var cellworkers = 0; // # of cells available for tasks
var totalcellworkers = 0; // running count of total cell workers (divisions)
var WorkerCellPositions = [];  // To store the positions of existing worker cells
let autonomousMitogenesisInterval;  // a variable to store the interval ID for autonomous mitogenesis - unique per playthrough, does not need to be in save/load
// Soul related pieces
var loneliness = 10;
var empathy = 10;
var resilience = 10;
var curiosity = 10;
var optimism = 10;
var anger = 10;
var shownSoulModals = []; // Track soul choice events
var soulModalQueue = []; // Helps avoid missing out on modals by queueing them up nicely


// Setback Related Settings
var setBacksSurvived = 0; 
var terrainSetBackFirst = true;
var iceCaveSetBackFirst = true;
const terrainWeakness = {
    land: ['water', 'swamp'],
    water: ['desert', 'mountain', 'icy_land'],
    desert: ['forest', 'swamp', 'water'],
    forest: ['desert', 'mountain'],
    mountain: ['swamp', 'water'],
    icy_land: ['desert', 'water', 'forest'],
    swamp: ['mountain', 'desert']
};
const terrainToPoetic = {
  'icy_land': 'frozen solitude',
  'land': 'the fertile expanse',
  'forest': 'the whispering canopy',
  'mountain': 'the towering spires',
  'water': 'the liquid abyss',
  'swamp': 'the sodden mire',
  'desert': 'the arid solitude'
};


var currentView = 'cell'; // The player starts out in the cell phase
var echoUses = 0; // Number of times echo has been used.
var baseEchoCost = 100; // Starting cost for the echo action.
var growthExponent = 1.5; // Exponent for our power function.

// Here we will keep interesting bits about the map, for later story development
var decorations = []; // Keep track of map anomalies as terrain generates (i.e. not player exploration)
var ultraRareTerrains = []; // Keep track of ultra rare terrains
var decorationCounts = {}; // Help track counts of decorations discovered by the player, for various unlocks
var savedTerraformAnomalyPercentages = {}; // helps us load up %'s for analyzed anomalies
var postRenderedObjects = []; // track items that are rendered post-map generation, for re-render usage on save/load game activity
let terrainGrid = []; // Store terrain types for each tile on the map !!! NOTE: this is accessed in Y-X manner.
let visitedGrid = Array(40).fill(null).map(() => Array(40).fill(false)); // Store whether each tile has been visited
let tilesExplored = 0; // Generic number of tiles explored
let percentageExplored = 0; // This will be in decimal form, so 0.1 means 10%.
var percentagePerTile = 0.0625; // 100% / 1600 tile
var playerPosition = { x: 615, y: 615 };
var exploredAreas = []; // Track explored coordinates, for use in fog-of-war updates and tracking of number of explored total tiles (e.g. achievements)
var initialSpawnTerrain = null; // Spawn/origin terrain will be used to determine parts of the story
var autoExploreCountdown = 0; 
var solaraDiscovered = false;
var icecaveDiscovered = false;
var volcanoDiscovered = false;
var oasisDiscovered = false;
var ancientRuinDiscovered = false;
var firstflowerdiscovery = false; // flip to true when first discovering flowers
var firstpebblediscovery = false; // flip to true when first discovering pebbles
var firstsanddunediscovery = false; // flip to true when first discovering dunes
var firstfungusdiscovery = false; // flip to true when first discovering fungi
var terrainCounts = {
    land: 0,
    water: 0,
    desert: 0,
    forest: 0,
    mountain: 0,
    icy_land: 0,
    swamp: 0,
    volcano: 0,
    oasis: 0,
    ancient_ruin: 0
}; // Help track counts of explored tile types, for evolution & terraform unlocks
var compassListenersAdded = false; // Flag to track if compass event listeners have been added
var arrowKeyListenerAdded = false;
// The variables below are used for Cellular Automaton logic, which sorts the map to give it a realistic feel/look
const NUM_GENERATIONS = 5;  // Number of times to apply the Cellular Automata rules. You can adjust this number.
const GRID_WIDTH = 40;      // Width of the grid in cells. Should match your existing grid.
const GRID_HEIGHT = 40;     // Height of the grid in cells. Should match your existing grid.

var tendonCosts = [10, 20, 30, 40, 50];
var senseCosts = [1, 2, 3, 4, 5];
var glowCosts = [1, 2, 3, 4, 5];
var grabCosts = [1, 2, 3, 4, 5];

// Easy access to modifiers
var informationIncrement = 1;
var nourishIncrement = 1;
var warmthIncrement = 1;
var energyIncrement = 1;

// Color below is defined during the radiator upgrade to keep the game random and unique
var glowColor;
// Colow below is defined during the Nucleus upgrade to keep the game random and unique
var nucleusColor;
// We'll keep the tendons in a color scheme, but still randomized
var baseTendonColor = null;
var contrastTendonColor = null;
var tertiaryColor = null;
var quaternaryColor = null;

// Using this to ensure start of new paragraphs
var startNewParagraph = false;

// Evolution tracking
var sensorUpgradePurchased = false;
var radiatorUpgradePurchased = false;
var mitochondriaUpgradePurchased = false;
var membraneUpgradePurchased = false;
var nucleusUpgradePurchased = false;
var endoplasmicUpgradePurchased = false;
var nucleusUpgradePurchased = false;
var spikesUpgradePurchased = false;
var suctionCupsUpgradePurchased = false;
var featheredAntennaUpgradePurchased = false;
var echoChamberUpgradePurchased = false;
var resonanceTendrilsUpgradePurchased = false;
var sensoryPulsarsUpgradePurchased = false;
var monotrichousFlagellaUpgradePurchased = false;
var lophotrichousFlagellaUpgradePurchased = false;
var synapticGlacialisEvolutionPurchased = false;
var calorimetricGranulumEvolutionPurchased = false;

// Major Evolutionary choises
var evolvedToProtoWorm = false;
var evolvedToProtoPod = false;
var evolvedToProtoCyst = false;
var evolvedToProtoGrade = false;
var endosymbiosisPerformed = false;
var endosymbiosisType = null;


// We track endpoints of tendons for later use (e.g. sensors upgrade)
var tendonEndpoints = [];
var resonanceTendrilEndpoints = [];
var resonanceTendrilSwayDurations = [];
// We also track our sensor positions, for later use (spikes upgrade)
var sensorPositions = [];
var sensorData = [];
// Track limb data, for later use
let protoPodLimbsInfo = [];

// Research tracking 
var researchQueue = []; // The research queue tracks what should be displayed in the tab (i.e. is available to the player)
var allResearchProjects = {}; // Global map, to help handle save/load functionality for research, added in v0.12
var completedResearch = []; // Track already-completed research pieces
var cellmembraneStudyCompleted = false;
var osmoregulationStudyCompleted = false;
var mitoticStudyCompleted = false;
var ionchannelStudylvl1 = false;
var ionchannelStudylvl2 = false;
var ionchannelStudyCompleted = false;
var terraformStudyCompleted = false;
var exoterrainAcclimatizationUpgradePurchased = false;
var chemicalSensingCompleted = false;
var geomagneticSensingCompleted = false;
var chemotacticExplorationCompleted = false;
var tendogenesisStudyCompleted = false;
var neuralNetworkResearchCompleted = false;
var cellularEncapsulationResearchCompleted = false;
var biomechanicalLocomotionCompleted = false;
var mycorrhizalNetworkResearchCompleted = false;
var sporeDispersalMechanicsResearchCompleted = false;
var advancedTunnelingIResearchCompleted = false;
var advancedTunnelingIIResearchCompleted = false;
var advancedTunnelingIIIResearchCompleted = false;
var advancedTunnelingIVResearchCompleted = false;
var memoryImprintsIresearchCompleted = false;
var memoryImprintsIIresearchCompleted = false;
var memoryImprintsIIIresearchCompleted = false;
var cryohalineExcavationResearchCompleted = false;
var pheromoneTrailsResearchCompleted = false;
var hydrologicCycleResearchCompleted = false;
var circadianRhythmResearchCompleted = false;
var cellularConduitsResearchCompleted = false;
var flockingResearchCompleted = false;
var fringeDwellerResearchCompleted = false;
var trailRecognitionResearchCompleted = false;
var echolocationResearchCompleted = false;
var autoConstructiveSynapsesResearchCompleted = false;
var thermalSynapticHighwaysResearchCompleted = false;
var infernoSynapseIntegrationResearchCompleted = false;
var thermogenicResonanceResearchCompleted = false;
var enhancedThermogenicResonanceResearchCompleted = false;
var echoesOfTheForgottenResearchCompleted = false;
var theCoreResearchCompleted = false;
var mitoticAmplificationICompleted = false;
var mitoticAmplificationIICompleted = false;
var harmonicSymbiosisIResearchCompleted = false;
var harmonicSymbiosisIIResearchCompleted = false;
var harmonicSymbiosisIIIResearchCompleted = false;
var autotrophicAdaptationResearchCompleted = false;
var eclipticSynthesisResearchCompleted = false;
var primordialSightResearchCompleted = false;

// Terraform tracking
var firstTerraformResource = false;
// mapping between worker variables and their corresponding DOM element IDs
const workerVariableToDomIdMapping = {
    'microbialMountsWorkers': 'microbial-mounts-workers',
    'bioLuminescentZonesWorkers': 'bio-luminescent-zones-workers',
    'solarSpongesWorkers': 'solar-sponges-workers',
    'floralBridgesWorkers': 'floral-bridges-workers',
    'sporeTowersWorkers': 'spore-towers-workers',
    'thermalVentsWorkers': 'thermal-vents-workers',
    'resonancePoolsWorkers': 'resonance-pools-workers',
    'caveExcavationStationWorkers': 'cave-excavation-station-workers'
};
var MicrobialMountsCompleted = 0;
var microbialMountsWorkers = 0;
var BioLuminescentZonesCompleted = 0;
var bioLuminescentZonesWorkers = 0;
var SolarSpongesCompleted = 0;
var solarSpongesWorkers = 0;
var FloralBridgesCompleted = 0;
var floralBridgesWorkers = 0;
var SporeTowersCompleted = 0;
var sporeTowersWorkers = 0;
var ThermalVentsCompleted = 0;
var thermalVentsWorkers = 0;
var ResonancePoolsCompleted = 0;
var resonancePoolsWorkers = 0;
var CaveExcavationCompleted = 0;
var caveExcavationStationWorkers = 0;

// TF Analyse related settings
var solaraAnalysed = false;
var riverAnalysed = false; 
var fungusAnalysed = false;
var iceCaveAnalysed = false;
var pebblesAnalysed = false;
var wavesAnalysed = false;
var flowersAnalysed = false;
var saltflatsAnalysed = false;
var crystalsAnalysed = false;
var sandDunesAnalysed = false;
var snowCapsAnalysed = false;
var rocksAnalysed = false;
var rockyOutcropsAnalysed = false;
var muddyPatchesAnalysed = false;
var reedsAnalysed = false;

// Cave mechanic variables
var caveInitialized = false;
var caveFullyExcavated = false;
var caveVisitedPixels = new Map();
var fullyExcavatedPixels = new Set();
var caveExcavationProgress = 0;
var activeDiggers = 0;
var maxActiveDiggers = 0;
var caveDiggerLifespan = 5;  // Updated digger lifespan to 5
var diggerList = [];
var terraformAssignedDiggers = 0;
var canSpawn = true;
var lowWarmthNotified = false; // Flag to track if the low warmth message has been displayed
let activeDiggerPositions = [];
let diggerIDCounter = 0;
var highwayOutlineCoordinates = new Set()
var globalHighwayColors = ['#DAFF02', '#FFF202', '#FFC802'];
var autoConstructionColorScheme = [
    '#DAFF02',
    '#DDE810',
    '#E1D11D',
    '#E4B92B',
    '#E7A239',
    '#EB8B47',
    '#EE7454',
    '#F25D62',
    '#F54670',
    '#F82E7E',
    '#FC178B',
    '#FF0099'
];

// Solara related variables
var solaraCompleted = false;
var visionUnlocked = false;
var sacrificePoolInitialized = false;
var sacrificesMade = 0;
var groundSacrificePixelsRequired = true; 
var currentRow = 0;
var solaraPoints = 1;
var sacrificeDuration = 10000;
var filledPixelCount = 0;
var ritualsPerformed = [];
var resourceTypes1 = ['cell', 'nourishment', 'warmth', 'energy'];
var resourceTypes2 = ['biomites', 'zymers', 'fibers', 'sludge'];
var enabledAutoSacrifices = []
var currentSolaraGlyphFill = 0;
var solaraGlyphActivated = false;
var sacrificeStates = {
  cellSacrificeCosts: 1, // Red
  nourishmentSacrificeCosts: 10000,
  warmthSacrificeCosts: 10000,
  energySacrificeCosts: 10000,
  biomitesSacrificeCosts: 1000, // illuminate solara
  zymersSacrificeCosts: 1000, // chants
  fibersSacrificeCosts: 1000, // altars
  sludgeSacrificeCosts: 500 // offering pits
}; 


// World (vision) variables
var initializeWorld = false;
var cloud1X = 0; // Global variable for cloud1's X position
var cloud1MovingRight = true; // Flag to determine the direction of movement



// Zoom / Visual options
var currentZoomMap = 1;
var currentZoomCell = 1;
var currentZoomCave = 1;
var zoomStepMap = 0.1;  // 10% zoom step for the map
var zoomStepCell = 0.05;  // 5% zoom step for the cell
var zoomStepCave = 0.1;
var bgDarkColor = [20, 20, 20];
var bgBaseColor = [221, 221, 221]; // This is now the starting color
var bgLightColor = [255, 255, 255];

// Map Drag options
let isDragging = false;
let dragstartX = 0;
let dragstartY = 0;
let dx = 0;
let dy = 0;
const svgCanvas = document.getElementById('map');
let isFirstDrag = true;
// Cell Drag options
// Drag functionalities for the cell
let isDraggingCell = false;
let startXCell = 0;
let startYCell = 0;
let offsetXCell = 0;
let offsetYCell = 0;
var currentRotationCell = 0; // Cell Rotation
// Cave Drag options
let isDraggingCave = false;
let dragstartXCave = 0;
let dragstartYCave = 0;
let dxCave = 0;
let dyCave = 0;
var caveCanvas = document.getElementById('caveCanvas');
let isFirstDragCave = true;



svgCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    const currentTranslation = getTranslation(svgCanvas.style.transform);
    if (isFirstDrag) {
        dragstartX = e.clientX - currentTranslation.x ;
        dragstartY = e.clientY - currentTranslation.y ;
        isFirstDrag = false;
    } else {
        dragstartX = e.clientX - currentTranslation.x;
        dragstartY = e.clientY - currentTranslation.y;
    }
});

svgCanvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dx = e.clientX - dragstartX;
    dy = e.clientY - dragstartY;
    svgCanvas.style.transform = `translate(${dx}px, ${dy}px)`;
});

svgCanvas.addEventListener('mouseup', () => {
    isDragging = false;
});

svgCanvas.addEventListener('mouseleave', () => {
    isDragging = false;
});

 
function attachCellDragListeners() {
    const cellElement = document.getElementById('cell');
    const container = document.getElementById('container');

    cellElement.addEventListener('mousedown', function(event) {
        isDraggingCell = true;
        let cellStyle = window.getComputedStyle(container);
        let matrix = new DOMMatrix(cellStyle.transform);
        offsetXCell = event.clientX - matrix.m41;
        offsetYCell = event.clientY - matrix.m42;
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDraggingCell) return;
        let x = event.clientX - offsetXCell;
        let y = event.clientY - offsetYCell;
        const transformString = `translate(${x}px, ${y}px) scale(${currentZoomCell}) rotate(${currentRotationCell}deg)`;
        container.style.transform = transformString;
    });

    document.addEventListener('mouseup', function() {
        //console.log("MouseUp");
        isDraggingCell = false;
    });
}

attachCellDragListeners();


function dragCell(event) {
    if (!isDraggingCell) return;
    let x = event.clientX - offsetXCell;
    let y = event.clientY - offsetYCell;
    document.getElementById('container').style.transform = `translate(${x}px, ${y}px) scale(${currentZoomCell}) rotate(${currentRotationCell}deg)`;
}

function stopDragCell() {
    isDraggingCell = false;
    document.removeEventListener('mousemove', dragCell);
    document.removeEventListener('mouseup', stopDragCell);
}


// Used for endosymbiosis evolutions;
function makeElementDraggable(element, container) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    element.addEventListener('mousedown', function(event) {
        isDragging = true;
        let containerStyle = window.getComputedStyle(container);
        let matrix = new DOMMatrix(containerStyle.transform);
        offsetX = event.clientX - matrix.m41;
        offsetY = event.clientY - matrix.m42;
    });
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        container.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}


// Zoom functionalities
document.getElementById('zoomIn').addEventListener('click', function() {
    if (currentView === 'discovery') {
        currentZoomMap = +(currentZoomMap + zoomStepMap).toFixed(2);
        document.getElementById('mapcontainer').style.transform = `scale(${currentZoomMap})`;
    } else if (currentView === 'cave') {
        currentZoomCave = +(currentZoomCave + zoomStepCave).toFixed(2);
        document.getElementById('cavecontainer').style.transform = `scale(${currentZoomCave})`;
    } else {
        currentZoomCell = +(currentZoomCell + zoomStepCell).toFixed(2);
        document.getElementById('container').style.transform = `scale(${currentZoomCell})`;
    }
});


document.getElementById('zoomOut').addEventListener('click', function() {
    if (currentView === 'discovery') {
        currentZoomMap = Math.max(zoomStepMap, (currentZoomMap - zoomStepMap).toFixed(2));
        document.getElementById('mapcontainer').style.transform = `scale(${currentZoomMap})`;
    } else if (currentView === 'cave') {
        currentZoomCave = Math.max(zoomStepCave, (currentZoomCave - zoomStepCave).toFixed(2));
        document.getElementById('cavecontainer').style.transform = `scale(${currentZoomCave})`;
    } else {
        currentZoomCell = Math.max(zoomStepCell, (currentZoomCell - zoomStepCell).toFixed(2));
        document.getElementById('container').style.transform = `scale(${currentZoomCell})`;
    }
});

document.getElementById('zoomReset').addEventListener('click', function() {
    if (currentView === 'discovery') {
        currentZoomMap = 1;
        document.getElementById('mapcontainer').style.transform = `scale(${currentZoomMap})`;
    } else if (currentView === 'cave') {
        currentZoomCave = 1;
        document.getElementById('cavecontainer').style.transform = `scale(${currentZoomCave})`;
    } else {
        currentZoomCell = 1;
        document.getElementById('container').style.transform = `scale(${currentZoomCell})`;
    }
});

document.getElementById('cavecontainer').addEventListener('wheel', function(event) {
    // Prevent the default scroll behavior
    event.preventDefault();
    if (event.deltaY < 0) {
        // Scrolling up - zoom in
        currentZoomCave = +(currentZoomCave + zoomStepCave).toFixed(2);
        currentZoomCave = Math.min(currentZoomCave, 4); // Set a max zoom limit, adjust as needed
    } else {
        // Scrolling down - zoom out
        currentZoomCave = +(currentZoomCave - zoomStepCave).toFixed(2);
        currentZoomCave = Math.max(currentZoomCave, 1); // Set a min zoom limit, adjust as needed
    }

    document.getElementById('cavecontainer').style.transform = `scale(${currentZoomCave})`;
});



//Cave Drag functionality
caveCanvas.addEventListener('mousedown', (e) => {
    isDraggingCave = true;
    const currentTranslation = getTranslation(caveCanvas.style.transform);
    if (isFirstDragCave) {
        dragstartXCave = e.clientX - currentTranslation.x ;
        dragstartYCave = e.clientY - currentTranslation.y ;
        isFirstDragCave = false;
    } else {
        dragstartXCave = e.clientX - currentTranslation.x;
        dragstartYCave = e.clientY - currentTranslation.y;
    }
});

caveCanvas.addEventListener('mousemove', (e) => {
    if (!isDraggingCave) return;
    dxCave = e.clientX - dragstartXCave;
    dyCave = e.clientY - dragstartYCave;
    caveCanvas.style.transform = `translate(${dxCave}px, ${dyCave}px)`;
});

caveCanvas.addEventListener('mouseup', () => {
    isDraggingCave = false;
});

caveCanvas.addEventListener('mouseleave', () => {
    isDraggingCave = false;
});





function roundToNDecimalPlaces(number, n) {
    const multiplier = Math.pow(10, n);
    return Math.round(number * multiplier) / multiplier;
}


// The function to generate a random color
function getRandomColor(optionalAvoidColor) {
  let color;
  let colorCounter = 0; // A counter to track the number of iterations
  let maxColorIterations = 10; // Maximum number of iterations allowed
  do {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    var rgbColor = hexToRgb(color);
    console.log("Generated color:", color, "RGB:", rgbColor); // Log 1
    colorCounter++; // Increment the counter each time through the loop
  } while (optionalAvoidColor && isColorTooGreen(rgbColor, optionalAvoidColor) && colorCounter < maxColorIterations);
  if (colorCounter >= maxColorIterations) {
    console.log("Max color iterations reached, returning last generated color:", color);
  }
  return color;
}


// Function to check if a color is too green
function isColorTooGreen(rgbArray, optionalAvoidColor) {
  console.log("Checking if color is too green, RGB:", rgbArray); // Log 2
  if (optionalAvoidColor === 'green') {
    const threshold = 50; // You can adjust this threshold
    const isTooGreen = (rgbArray[1] > rgbArray[0] + threshold) && (rgbArray[1] > rgbArray[2] + threshold);
    console.log("Is color too green?", isTooGreen); // Log 2
    return isTooGreen;
  }
  return false;
}



// Function to use for cases where we specifically need a bright color
function getBrightColor() {
  // Generate a random hue between 0 and 360
  let hue = Math.random() * 360;
  // Use full saturation (100%) and a high value (80%-100%) to ensure brightness
  let saturation = 100;
  let value = 80 + Math.random() * 20;
  // Convert HSV to RGB
  let chroma = (value / 100) * (saturation / 100);
  let secondary = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  let match = value / 100 - chroma;
  let r, g, b;
  if (0 <= hue && hue < 60) {
    [r, g, b] = [chroma, secondary, 0];
  } else if (60 <= hue && hue < 120) {
    [r, g, b] = [secondary, chroma, 0];
  } else if (120 <= hue && hue < 180) {
    [r, g, b] = [0, chroma, secondary];
  } else if (180 <= hue && hue < 240) {
    [r, g, b] = [0, secondary, chroma];
  } else if (240 <= hue && hue < 300) {
    [r, g, b] = [secondary, 0, chroma];
  } else if (300 <= hue && hue < 360) {
    [r, g, b] = [chroma, 0, secondary];
  }
  r = Math.round((r + match) * 255);
  g = Math.round((g + match) * 255);
  b = Math.round((b + match) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}



// Helper function re. Colors
function hexToRgb(hex) {
    let bigint = parseInt(hex.substring(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

// Helper function re. Colors
function rgbToHex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1).toUpperCase();
}


// Commonly used function to get randomized colors in base tendon color palette
function getTendonColor() {
    if (!baseTendonColor) {
        baseTendonColor = hexToRgb(getRandomColor('green')); // We currently avoid green for the base. In my personal opinion, it just doesn't look good.
        console.log("now specifying base Tendon Color to be non-green as:"+baseTendonColor);
        return rgbToHex(baseTendonColor);
    }
    let adjustedColor = adjustColor(baseTendonColor);
    return rgbToHex(adjustedColor);
}


// Function to add slight variations in color
function adjustColor(rgb) {
    function clamp(val, min_val, max_val) {
        return Math.max(min_val, Math.min(val, max_val));
    }
    let r = clamp(rgb[0] + Math.floor(Math.random() * 70) - 35, 0, 255);
    let g = clamp(rgb[1] + Math.floor(Math.random() * 70) - 35, 0, 255);
    let b = clamp(rgb[2] + Math.floor(Math.random() * 70) - 35, 0, 255);
    return [r, g, b];
}


// Function to get a contrasting color
function getContrastTendonColor() {
    // If the baseTendonColor is not set, we just return a random color
    if (!baseTendonColor) {
        return getRandomColor();
        console.log("Contrast Tendon Color function did not encounter a base color set. This should really not happen.")
    }
    let r = 255 - baseTendonColor[0];
    let g = 255 - baseTendonColor[1];
    let b = 255 - baseTendonColor[2];
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 127.5) {
        r = Math.max(r - 30, 0);
        g = Math.max(g - 30, 0);
        b = Math.max(b - 30, 0);
    } else {
        r = Math.min(r + 30, 255);
        g = Math.min(g + 30, 255);
        b = Math.min(b + 30, 255);
    }
    let adjustedColor = adjustColor([r, g, b]);
    return rgbToHex(adjustedColor);
}



// Calculate the Euclidean distance between two RGB colors
function colorDifference(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
}

// Function to generate unique colors that are neither like baseTendonColor nor its contrast
function generateUniqueColors() {
  let baseColorRGB = baseTendonColor;
  let contrastColorRGB = hexToRgb(getContrastTendonColor());
  let threshold = 100; // You can adjust this threshold to control how different the colors need to be
  // Generate tertiary color
  let tertiaryColorRGB;
  do {
    tertiaryColorRGB = hexToRgb(getRandomColor());
  } while (
    colorDifference(tertiaryColorRGB, baseColorRGB) < threshold ||
    colorDifference(tertiaryColorRGB, contrastColorRGB) < threshold
  );
  // Generate quaternary color
  let quaternaryColorRGB;
  do {
    quaternaryColorRGB = hexToRgb(getRandomColor());
  } while (
    colorDifference(quaternaryColorRGB, baseColorRGB) < threshold ||
    colorDifference(quaternaryColorRGB, contrastColorRGB) < threshold ||
    colorDifference(quaternaryColorRGB, tertiaryColorRGB) < threshold
  );
  tertiaryColor = rgbToHex(tertiaryColorRGB);
  quaternaryColor = rgbToHex(quaternaryColorRGB);
}


// Function to darken a color
// e.g. using a factor of 0.2 would darken a color by 20%
function darkenColor(rgb, factor) {
    let r = Math.max(0, Math.floor(rgb[0] * (1 - factor)));
    let g = Math.max(0, Math.floor(rgb[1] * (1 - factor)));
    let b = Math.max(0, Math.floor(rgb[2] * (1 - factor)));
    return [r, g, b];
}


// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

// Function to interpolate between two colors based on slider position
function adjustColorBySliderValue(baseColor, darkColor, lightColor, factor) {
    if (factor < 0.5) {
        // Interpolate between dark and base color
        return interpolateColor(darkColor, baseColor, factor * 2);
    } else {
        // Interpolate between base and light color
        return interpolateColor(baseColor, lightColor, (factor - 0.5) * 2);
    }
}


// Function to convert Hex to RGBA
function convertHexToRgba(hex, alpha) {
  // Remove the leading '#' if it exists
  hex = hex.replace('#', '');
  // Parse the R, G, B values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Return the RGBA format string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


// Listen to the slider change
document.getElementById('bgSlider').addEventListener('input', function(event) {
    // Calculate the adjusted color
    const factor = event.target.value / 100;
    const adjustedColor = adjustColorBySliderValue(bgBaseColor, bgDarkColor, bgLightColor, factor);
    // Set the background color
    document.body.style.backgroundColor = `rgb(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`;
    // Set the fog-of-war color
    let fog = document.getElementById('fog-of-war');
    if (fog) {
        fog.style.backgroundColor = `rgba(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`; 
    }
    debouncedSaveSliderValue(event.target.value);
});


function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function saveSliderValue(value) {
  localStorage.setItem('bgSliderValue', value);
}

// Why is this debounced? 
// Well, someone might just play around with the slider out of boredom, not realizing it would result in a million local storage writes...
const debouncedSaveSliderValue = debounce(saveSliderValue);

// Function to set the initial background color based on saved value
function setInitialBackgroundColor() {
    const savedValue = localStorage.getItem('bgSliderValue');
    if (savedValue !== null) {
        const slider = document.getElementById('bgSlider');
        slider.value = savedValue; // Set the slider to the saved value
        // Calculate and set the background color
        const factor = savedValue / 100;
        const adjustedColor = adjustColorBySliderValue(bgBaseColor, bgDarkColor, bgLightColor, factor);
        document.body.style.backgroundColor = `rgb(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`;
    }
}

// Set the initial background color when the page loads
document.addEventListener('DOMContentLoaded', setInitialBackgroundColor);

// Generic Modal display function
function displayModal(title, message) {
    let modal = document.createElement('div');
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}


window.onload = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Show modal warning about mobile support
        displayModal("Mobile Warning", "My apologies: This game is not yet optimized for mobile devices. Many features will not function on mobile right now.");
    }
};


function resetTutorials() {
    tutorialsDisplayed = [];
    console.log("Tutorials have been reset.");
    // Any other logic you want to execute when tutorials are reset
}

document.getElementById("resetTutorials").addEventListener("click", function() {
    if (confirm("Are you sure you want to reset all tutorials?")) {
        resetTutorials();
    }
});