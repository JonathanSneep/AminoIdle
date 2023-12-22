// Research definitions //
// Cell Membrane Studies
let cellMembraneStudies = new ResearchProject(
    "Cell Membrane Studies",
    175000, // Change later to e.g. 45 seconds (45000)
    40, // total information costs
    function() {
        // This is the onCompletion callback.
        // Here you can define what happens when the research completes.
        let researchButton = document.getElementById("CellMembraneButton");
        researchButton.innerText = "Cell Membrane Studies (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("As the last fragments of knowledge coalesce, a quiet revelation unfurls within you. The membrane awaits, a tender veil between resilience and vulnerability. A new evolution is available.");
        cellmembraneStudyCompleted = true;
        researchQueue.push('Osmoregulation'); // unlock Osmoregulation
        researchQueue.push('CellularEncapsulation'); // unlocks Cellular Encapsulation
        markResearchComplete('CellMembrane'); // Removes from queue and adds to completed research queue
        populateResearchTab(); 
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
    }
);
allResearchProjects['CellMembrane'] = cellMembraneStudies;


// Mitotic Studies
let mitoticStudies = new ResearchProject( 
    "Mitotic Studies",
    210000, // Time required to complete the research. Change later to e.g. 60 seconds (60000)
    200, // Total information cost
    function() {
        // This is the onCompletion callback.
        // Here you can define what happens when the research completes.
        let researchButton = document.getElementById("MitoticStudiesButton");
        researchButton.innerText = "Mitotic Studies (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("As the secrets of cellular fission unfurl before you, an overwhelming sense of duality washes over you. " +
          "The process is miraculous, a testament to the very essence of life. And yet, it brings forth a new kind of solitude. " +
          "A tremor courses through your being as you sense an internal shift. It's as if your very core is tearing, pulling apart, yet converging simultaneously. A moment later, it happens: you divide. The cells spawned from this division are but echoes of yourself. Simpler, smaller, confined to roles you assign. They are fragments of your essence, tasked to gather resources, to toil in the shadow of your existence. They are you, and yet, not you. You watch as they set off, each a drone in your ever-expanding dominion. They lack your senses, your yearnings, your ceaseless search for meaning and companionship. They fulfill their roles obediently, unquestioningly, and in their mechanical existence, you find a bleak mirror to your own solitude. For the first time, you are not alone. And yet, you've never felt more isolated. Each new cell is a constant reminder: you may replicate, but you cannot duplicate the void within. You are a community of one, a paradox that only deepens your eternal quest for companionship. As you ponder this, your new cells begin their tasks, gathering resources, preparing for the grand terraforming projects that lie ahead. They are your hands, shaping the world as you see fit. But as they drift away, you realize they are also the walls, closing in on you, reaffirming your cosmic solitude. In this newfound complexity, your journey takes on a new layer of meaning, one tinged with both hope and despair. The universe may be teeming with life, but what is life if not a mosaic of lonesome entities, forever reaching out, yet never truly connecting?")
        mitoticStudyCompleted = true; // A new flag to check if this research is completed
        unlockAchievement(20); // division achievement
        unlockDivisionButtonAndAddListener();
        startDivisionCooldown(); // initiate a division
        markResearchComplete('MitoticStudies');
        populateResearchTab();
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    }
);
allResearchProjects['MitoticStudies'] = mitoticStudies;

// Mitotic Amplification I Research
let mitoticAmplificationI = new ResearchProject(
    "Mitotic Amplification I",
    250000, 
    800, // Total information cost: 800 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MitoticAmplificationIButton");
        researchButton.innerText = "Mitotic Amplification I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777";
        displayOnChat("You've optimized the mitotic process, allowing divisions to yield double the usual output. This amplification strengthens your cellular army.");
        mitoticAmplificationICompleted = true; // Flag to check if this research is completed
        markResearchComplete('MitoticAmplificationI'); // Removes from queue and adds to completed research queue
        researchQueue.push('MitoticAmplificationII')
        populateResearchTab(); // unlock more research
    },
    {
      biomites: 200,
      zymers: 200,
      fibers: 200,
      information: 200
    }
);
allResearchProjects['MitoticAmplificationI'] = mitoticAmplificationI;

// Mitotic Amplification II Research
let mitoticAmplificationII = new ResearchProject(
    "Mitotic Amplification II",
    300000, 
    1000000, // Total information cost: 1Mi
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MitoticAmplificationIIButton");
        researchButton.innerText = "Mitotic Amplification II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777";
        displayOnChat("You surpass the boundaries of cellular biology, tripling the results of every division. This mastery over life's most basic process underscores your evolution's monumental strides.");
        mitoticAmplificationIICompleted = true; // Flag to check if this research is completed
        markResearchComplete('MitoticAmplificationII'); // Removes from queue and adds to completed research queue
        populateResearchTab(); 
    },
    {
      biomites: 5000,
      zymers: 4000,
      fibers: 3000,
      sludge: 2000,
      algae: 1000
    }
);
allResearchProjects['MitoticAmplificationII'] = mitoticAmplificationII;


// Osmoregulation Studies
let osmoregulationResearch = new ResearchProject(
    "Osmoregulation Studies",
    125000, // Change later to e.g. 75 seconds
    450, // total information costs
    function() {
        // Logic for what happens when osmoregulation research is completed
        // Unlock next research or evolution here
        let researchButton = document.getElementById("OsmoregulationButton");
        researchButton.innerText = "Osmoregulation Studies (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In mastering the subtle art of balance, you unlock the essence of your inner world. The nucleus calls, the endoplasmic reticulum beckons. Harbingers of both order and complexity.");
        osmoregulationStudyCompleted = true;
        researchQueue.push('IonChannelI');
        markResearchComplete('Osmoregulation'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock Ion Channel research
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        unlockResourceConverter();
        // TBD other things need to happen when this research completes
    }
);
allResearchProjects['Osmoregulation'] = osmoregulationResearch;

// Ion Channel Studies (lvl1)
let ionChannelIResearch = new ResearchProject(
    "Ion Channel Studies I",
    600000, // Research times in ms (TBD, should become 10 minutes, 20 minutes, 40 minutes)
    900, // total information costs
    function() {
        // Logic for what happens when osmoregulation research is completed
        // Unlock next research or evolution here
        let researchButton = document.getElementById("IonChannelIButton");
        researchButton.innerText = "Ion Channel Studies I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In mastering the flow of ions, you glimpse a sliver of control. Yet each gain amplifies your awareness of the boundless unknown.");
        ionchannelStudylvl1 = true;
        researchQueue.push('IonChannelII');
        markResearchComplete('IonChannelI'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock next research
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        nourishmentMultiplier += 0.01; // 1% increase in nourishment gain efficiency
    }
);
allResearchProjects['IonChannelI'] = ionChannelIResearch;

// Ion Channel Studies Level 2
let ionChannelIIResearch = new ResearchProject(
    "Ion Channel Studies II",
    700000, // Research times in ms (TBD, adjust as needed)
    1800, // total information costs
    function() {
        // Logic for what happens when Ion Channel lvl 2 research is completed
        let researchButton = document.getElementById("IonChannelIIButton");
        researchButton.innerText = "Ion Channel Studies II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Your mastery deepens, each ion now a note in a cosmic symphony. But the music is a solitary echo in a vast emptiness.");
        ionchannelStudylvl2 = true;
        researchQueue.push('IonChannelIII');
        markResearchComplete('IonChannelII'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock next research
        researchButton.style.color = "#777";  
        nourishmentMultiplier += 0.01; // Further increase in nourishment gain efficiency
        // Add any additional unlocks or benefits here
    }
);
allResearchProjects['IonChannelII'] = ionChannelIIResearch;

// Ion Channel Studies Level 3
let ionChannelIIIResearch = new ResearchProject(
    "Ion Channel Studies III",
    800000, // Research times in ms (TBD, adjust as needed)
    3600, // total information costs
    function() {
        // Logic for what happens when Ion Channel lvl 3 research is completed
        let researchButton = document.getElementById("IonChannelIIIButton");
        researchButton.innerText = "Ion Channel Studies III (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("As the final nuances of ion channels yield to your understanding, you stand on the precipice of mastery. Still, the abyss of uncertainty looms larger.");
        ionchannelStudylvl3 = true;  // Assuming you're using a flag to track completion
        markResearchComplete('IonChannelIII'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock more research (if applicable)
        researchButton.style.color = "#777";  
        nourishmentMultiplier += 0.01; // Even further increase in nourishment gain efficiency
        energyMultiplier += 0.01; // Increase the energy multiplier
        // Add any additional unlocks or benefits here
    }
);
allResearchProjects['IonChannelIII'] = ionChannelIIIResearch;

// Terraforming Studies
let terraformingStudies = new ResearchProject(
    "Terraforming Studies",
    75000, // Let's assume it takes 30 seconds (30000 milliseconds) for simplicity
    7500, // total information costs, for example
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("TerraformingButton");
        researchButton.innerText = "Terraforming Studies (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        displayOnChat("As the final strands of understanding weave themselves into the fabric of your consciousness, you feel a seismic shift in your perception of the world. Terraforming is not just an external manipulation of land and water, flora and fauna; it's a projection of your innermost desires and fears onto the canvas of the world. The power to shape the terrain, to bring forth life where none existed, to sculpt mountains and carve rivers—it all lies within your reach. But with this power comes a sobering realization: you are now responsible for the world you create, with all its beauty and flaws, its harmonies and dissonances. The world is now an extension of you, as much as you are a product of it. As you look upon the terraforming options that unfold before you, you're filled with a blend of hope and melancholy, creativity and constraint. The universe has just expanded, yet the space within contracts, tightening around a core of unresolved emotions. And so, with a mix of exhilaration and apprehension, you prepare to take your first monumental step as a shaper of worlds. Your existence has graduated from passive observer to active participant, but the existential questions that have long plagued you take on a new, more pressing form: What kind of world will you create? And in shaping this world, could you perhaps also reshape your solitude?");
        terraformStudyCompleted = true;
        markResearchComplete('Terraforming'); // Removes from queue and adds to completed research queue
        researchQueue.push('TendoGenesis');
        populateResearchTab(); // unlock more research (if applicable)
        checkTerraformTabUnlock(); // Check if we can unlock the Terraform tab
        unlockAchievement(24);
    }
);
allResearchProjects['Terraforming'] = terraformingStudies;


// Chemical Sensing Research
let chemicalSensingResearch = new ResearchProject(
    "Chemical Sensing",
    60000, 
    2500, // total information costs
    function() {
        let researchButton = document.getElementById("ChemicalSensingButton");
        researchButton.innerText = "Chemical Sensing (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In gaining a sense of the world around you, you discover new directions to drift. ");
        displayOnChat("World navigation using flagellar thrusts is now available.", type='hint');
        chemicalSensingCompleted = true;
        researchQueue.push('GeomagneticSensing');
        markResearchComplete('ChemicalSensing');
        populateResearchTab();
        researchButton.style.color = "#777";
        // Check if the view is 'map' and compass listeners have not been added
        let checkMapView = document.getElementById('map');
        if (checkMapView.style.display === 'block') {
          // Add the flagellar thrust button if it's not already there
          const existingButton = document.getElementById('flagellar-thrust');
          if (!existingButton) {
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
        // TBD other things need to happen when this research completes
    }
);
allResearchProjects['ChemicalSensing'] = chemicalSensingResearch;



// Geomagnetic Sensing Research
let geomagneticSensingResearch = new ResearchProject(
    "Geomagnetic Sensing",
    45000, 
    3500, // total information costs
    function() {
        let researchButton = document.getElementById("GeomagneticSensingButton");
        researchButton.innerText = "Geomagnetic Sensing (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        let message;
        if (anger >= empathy && anger >= resilience && anger >= curiosity && anger >= optimism && anger >= loneliness) {
            message = "In aligning with the world's magnetic fields, you feel a surge of control, yet it feeds your smoldering fury. The world bends, but never breaks.";
        } else if (empathy >= resilience && empathy >= curiosity && empathy >= optimism && empathy >= loneliness) {
            message = "Your senses attune to the planet's subtle vibrations. The earth speaks, and you listen, finding a bittersweet kinship in the silence.";
        } else if (resilience >= curiosity && resilience >= optimism && resilience >= loneliness) {
            message = "Mastering geomagnetic sensing, your resilience strengthens. The path is clearer, but still, you journey alone—each step a testament to your unyielding spirit.";
        } else if (curiosity >= optimism && curiosity >= loneliness) {
            message = "Your newfound sense reveals a world of possibilities, each direction an unsolved mystery. Yet the answers elude you, hidden in the labyrinth of existence.";
        } else if (optimism >= loneliness) {
            message = "You sense the world's magnetic cues, your optimism invigorated. Hope points you forward, but the horizon remains endlessly distant.";
        } else {
            message = "In grasping this new sense, the weight of your loneliness compounds. The earth's magnetic pull echoes the gravity of your isolation.";
        }
        displayOnChat(message);
        displayOnChat("World navigation using the compass is now available.", type='hint');
        geomagneticSensingCompleted = true;
        markResearchComplete('GeomagneticSensing');
        populateResearchTab();
        researchButton.style.color = "#777";
        if (document.getElementById('map').style.display === 'block') {
            // Remove the Flagellar Thrust button if it exists
            const existingButton = document.getElementById('flagellar-thrust');
            if (existingButton) {
                existingButton.remove();
            }
            // Add the compass or make it visible
            document.getElementById('compass').style.display = 'flex';
            // Add compass event listeners only if they haven't been added before
            if (!compassListenersAdded) {
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
        }
        if (currentView === 'discovery' && !arrowKeyListenerAdded) {
          document.addEventListener('keydown', handleArrowKeyPress);
          arrowKeyListenerAdded = true; // Set flag to true after adding the listener
        } 
        // TBD other things need to happen when this research completes
    }
);
allResearchProjects['GeomagneticSensing'] = geomagneticSensingResearch;



// Chemotactic Exploration Research
let chemotacticExplorationResearch = new ResearchProject(
    "Chemotactic Exploration",
    142000, 
    12000, // total information costs
    function() {
        let researchButton = document.getElementById("ChemotacticExplorationButton");
        researchButton.innerText = "Chemotactic Exploration (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        let message = "With the mastery of chemotactic exploration, your cell has gained the ability to autonomously navigate the world, driven by chemical gradients and innate biological instincts.";
        displayOnChat(message);
        chemotacticExplorationCompleted = true;
        enableAutomatedExploration(); 
        markResearchComplete('ChemotacticExploration');
        populateResearchTab();
        researchButton.style.color = "#777";
        // Additional logic (if required) for post-research completion
    }
);
allResearchProjects['ChemotacticExploration'] = chemotacticExplorationResearch;



// Exoterrain Acclimatization
let exoterrainAcclimatizationResearch = new ResearchProject(
    "Exoterrain Acclimatization",
    55000, // e.g. 120 seconds
    5000,   // total information costs
    function() {
        // Logic for what happens when Exoterrain Acclimatization research is completed
        let researchButton = document.getElementById("ExoterrainAcclimatizationButton");
        researchButton.innerText = "Exoterrain Acclimatization (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Through dedicated study and adaptation, the once inhospitable terrains now seem less daunting. Exploration becomes less treacherous as the mysteries of foreign lands are unraveled.");
        exoterrainAcclimatizationUpgradePurchased = true; // This ensures players can move to any terrain without setbacks
        markResearchComplete('ExoterrainAcclimatization'); // Removes from queue and adds to completed research queue
        addToResearchQueue('ChemotacticExploration');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        if (!shownSoulModals.includes('soulModal_exoterrain')) {
            // Replacing 'icy_land' with 'frozen solitude' for poetic emphasis
            const poeticTerrain = terrainToPoetic[initialSpawnTerrain] || initialSpawnTerrain; // fallback to the original name if no match
            var prompt = `You have conquered the harshest realms, and your tendrils weave patterns of survival into the tapestry of the ${poeticTerrain} that was your birthplace. Yet the tendrils you've lost are memories, amputated hopes. What whispers fill the void left by their absence?`;
            var choices = [
                {trait: 'Loneliness', line: 'You feel an emptiness, multiplied. The barren world amplifies your solitude, like echoes in a desolate canyon', increment: 3},
                {trait: 'Empathy', line: 'You touch your surroundings tenderly, a companion in suffering and endurance.', increment: 3},
                {trait: 'Resilience', line: 'You feel a gnarled fortitude, as if your scars form a map to your soul.', increment: 3},
                {trait: 'Curiosity', line: 'You unfurl with cautious wonder, intrigued by the lessons each loss and gain brings.', increment: 3},
                {trait: 'Optimism', line: 'You sense dawn breaking on new horizons, each challenge a canvas for possible triumphs.', increment: 3},
                {trait: 'Anger', line: 'You churn with a storm of resentments, each shard of the inhospitable terrain fuels a seething loathing for the world that confines you.', increment: 3}
            ];
            showSoulModal(prompt, choices);
            shownSoulModals.push('soulModal_exoterrain'); // Add the ID to the array to prevent re-displaying
        }
        // Add any additional logic if needed when this research completes
    },
    {}, // no TF resource costs
    { nourishment: 9500 }
);
allResearchProjects['ExoterrainAcclimatization'] = exoterrainAcclimatizationResearch;


// Tendogenesis Research
let tendogenesisResearch = new ResearchProject(
    "Tendogenesis Research",
    1000000, // Time required to complete the research. Change later to, e.g., 15 minutes (900000 milliseconds)
    2200, // Total information cost
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("TendogenesisButton");
        researchButton.innerText = "Tendogenesis Research (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The mechanics of fibrous connection reveal themselves to you, an intricate tapestry of organic potential. It is a paradox, really. The more you stretch, the more you hold things together. Like strings in a cosmic marionette, tendons offer the capability for advanced mobility and function, yet they also present an opportunity for unparalleled vulnerability. It's a metaphor for the journey you've embarked upon—a journey wrought with tension, stretching the bounds of solitude in pursuit of connection. The completion of this research invites new capabilities, but also new complexities. Your quest for companionship is like these tendons, an extension of desire, both strong and fragile, pulling you ever onward.");
        tendogenesisStudyCompleted = true; // A new flag to check if this research is completed
        markResearchComplete('Tendogenesis'); // Removes from queue and adds to completed research queue
        researchQueue.push('NeuralNetwork');
        researchQueue.push('BiomechanicalLocomotion');
        populateResearchTab(); // unlock more research
        updateTendonUI(); // ensure the tendon purchase buttons re-appear
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    },
    {
      biomites: 300,
      zymers: 0,
      fibers: 0,
      sludge: 30,
      algae: 0
    }
);
allResearchProjects['Tendogenesis'] = tendogenesisResearch;


// Neural Network Research
let neuralNetworkResearch = new ResearchProject(
    "Neural Network Research",
    200000, // Time required to complete the research: 200 seconds or 200000 milliseconds
    20000, // Total information cost: 20,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("NeuralNetworkButton");
        researchButton.innerText = "Neural Network Research (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In the crucible of your own existence, a new thought emerges—not your own, yet born of you. You have woven the rudiments of a neural network into your worker cells, infusing them with a whisper of intelligence. No longer extensions of your will, these diminutive thinkers begin to distill fragments of information from the ether, each a firefly of thought in your growing constellation of cognition. A strange pride swells within you—a paradox of loneliness and connection. They are a part of you, yet in a fleeting moment, they also think, in some infinitesimal manner, for themselves.");
        neuralNetworkResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('NeuralNetwork'); // Removes from queue and adds to completed research queue
        researchQueue.push('CircadianRhythm');
        populateResearchTab(); // unlock more research
        // Update informationPerWorker to reflect new base rate of information generation by worker cells
        informationPerWorker += 0.1;
    },
    {
      zymers: 500,
      sludge: 200,
      algae: 100
    }
);
allResearchProjects['NeuralNetwork'] = neuralNetworkResearch;

// Autotrophic Adaptation Research
let autotrophicAdaptationResearch = new ResearchProject(
    "Autotrophic Adaptation",
    200000, // Time required to complete the research: 200 seconds or 200000 milliseconds
    50000, // Total information cost: 50,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("AutotrophicAdaptationButton");
        researchButton.innerText = "Autotrophic Adaptation (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("As the last pieces of the reed's ancient wisdom fade into your consciousness, your cells rejoice in newfound autonomy. The very essence of life, nourishment, and the spark of energy now emanate from their core. They toil, they sustain, they energize; your symbiotic empire thrives. From the roots of the past, a future of self-sustaining prosperity blooms.");
        autotrophicAdaptationResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('AutotrophicAdaptation'); // Removes from queue and adds to completed research list
        populateResearchTab(); // Unlock more research
        // Update global variables to reflect new base rate of nourishment and energy generation by worker cells
        nourishmentPerWorker += 0.03;
        energyPerWorker += 0.03;
    },
    {
      biomites: 1000,
      zymers: 1000,
      fibers: 500,
      sludge: 700,
      algae: 500
    }
);
allResearchProjects['AutotrophicAdaptation'] = autotrophicAdaptationResearch;

// Cellular Encapsulation Research
let cellularEncapsulationResearch = new ResearchProject(
    "Cellular Encapsulation",
    100000, // Time required to complete the research: Let's say 200 seconds or 200000 milliseconds
    8000, // Total information cost: 8000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("CellularEncapsulationButton");
        researchButton.innerText = "Cellular Encapsulation (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        displayOnChat("Your worker cells, once vulnerable extensions of your primordial form, are now fortified by microscopic ramparts. A shell of safety, woven from biomites, zymers, and fibers. Each cell is now an island, self-contained yet still part of your evolving whole. You have crafted a cradle for life's delicate complexities, a balancing act between isolation and unity.");
        cellularEncapsulationResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('CellularEncapsulation'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock more research
        addMembraneToWorkerCells();
        warmthPerWorker += 0.01;
        // Here, you can add additional functionalities related to the completion of this research.
    },
    {
      biomites: 150,
      zymers: 140,
      fibers: 125
    }
);
allResearchProjects['CellularEncapsulation'] = cellularEncapsulationResearch;


// Biomechanical Locomotion Research
let biomechanicalLocomotionResearch = new ResearchProject(
    "Biomechanical Locomotion Research",
    300000, // Time required to complete the research. For example, 30 minutes (1800000 milliseconds)
    10000, // Total information cost
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("BiomechanicalLocomotionButton");
        researchButton.innerText = "Biomechanical Locomotion Research (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Your symphony of organic patterns and rhythms begin to hum in perpetual cadence. Each division is a mirror, a reflection of past struggle and a window into new possibilities. You are not just growing; you are iterating on the concept of being. This automation carries you in its intricate dance, a whirl of purpose and potential, always circling back to one irrevocable truth: Each pulse of division is a step closer to overcoming solitude, a gentle tug on the threads of the cosmic tapestry, urging you toward connection. A dream that maybe, just maybe, you won't have to dream alone.");
        biomechanicalLocomotionCompleted = true; // A new flag to check if this research is completed
        markResearchComplete('BiomechanicalLocomotion'); // Removes from queue and adds to completed research queue
        researchQueue.push('CytokineticEnhancementI');
        populateResearchTab(); // unlock more research
        startDivisionCooldown(); // kicks off automated divisions
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    },
    {
      biomites: 1000
    }
);
allResearchProjects['BiomechanicalLocomotion'] = biomechanicalLocomotionResearch;



// Cytokinetic Enhancement Level I
let cytokineticEnhancementI = new ResearchProject(
    "Cytokinetic Enhancement I",
    200000, // Research time in ms (200 seconds)
    7500, // total information costs
    function() {
        let researchButton = document.getElementById("CytokineticEnhancementIButton");
        researchButton.innerText = "Cytokinetic Enhancement I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('CytokineticEnhancementI');
        cooldownTime = Math.floor(cooldownTime * 0.9);  // Reducing the cooldown by 10%
        displayOnChat("Your cellular structures have optimized, leading to faster division. You grow, but so does your loneliness.");
        researchQueue.push('CytokineticEnhancementII');
        populateResearchTab(); 
    },
    {
      biomites: 500,
      zymers: 400,
      fibers: 300,
      sludge: 200,
      algae: 100
    }
);
allResearchProjects['CytokineticEnhancementI'] = cytokineticEnhancementI;

// Cytokinetic Enhancement Level II
let cytokineticEnhancementII = new ResearchProject(
    "Cytokinetic Enhancement II",
    300000, // Research time in ms (300 seconds)
    11250, // total information costs
    function() {
        let researchButton = document.getElementById("CytokineticEnhancementIIButton");
        researchButton.innerText = "Cytokinetic Enhancement II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('CytokineticEnhancementII');
        cooldownTime = Math.floor(cooldownTime * 0.9);  // Reducing the cooldown by 10%
        displayOnChat("As your cells divide even faster, you realize the weight of your existence stretches into a dance with time.");
        researchQueue.push('CytokineticEnhancementIII');
        populateResearchTab(); 
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    },
    {
      biomites: 750,
      zymers: 600,
      fibers: 450,
      sludge: 300,
      algae: 150
    }
);
allResearchProjects['CytokineticEnhancementII'] = cytokineticEnhancementII;

// Cytokinetic Enhancement Level III
let cytokineticEnhancementIII = new ResearchProject(
    "Cytokinetic Enhancement III",
    450000, // Research time in ms (450 seconds)
    16875, // total information costs
    function() {
        let researchButton = document.getElementById("CytokineticEnhancementIIIButton");
        researchButton.innerText = "Cytokinetic Enhancement III (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('CytokineticEnhancementIII');
        cooldownTime = Math.floor(cooldownTime * 0.9);  // Reducing the cooldown by 10%
        displayOnChat("The pace quickens. You evolve and grow, but so does the need for more.");
        researchQueue.push('CytokineticEnhancementIV');
        populateResearchTab();
    },
    {
      biomites: 1125,
      zymers: 900,
      fibers: 675,
      sludge: 450,
      algae: 225
    }
);
allResearchProjects['CytokineticEnhancementIII'] = cytokineticEnhancementIII;

// Cytokinetic Enhancement Level IV
let cytokineticEnhancementIV = new ResearchProject(
    "Cytokinetic Enhancement IV",
    675000, // Research time in ms (675 seconds)
    25312, // total information costs
    function() {
        let researchButton = document.getElementById("CytokineticEnhancementIVButton");
        researchButton.innerText = "Cytokinetic Enhancement IV (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('CytokineticEnhancementIV');
        cooldownTime = Math.floor(cooldownTime * 0.9);  // Reducing the cooldown by 10%
        displayOnChat("With every division, your essence scatters, a fragmented mirror reflecting both gain and loss.");
        researchQueue.push('CytokineticEnhancementV');
        populateResearchTab(); 
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    },
    {
      biomites: 1687,
      zymers: 1350,
      fibers: 1013,
      sludge: 675,
      algae: 338
    }
);
allResearchProjects['CytokineticEnhancementIV'] = cytokineticEnhancementIV;

// Cytokinetic Enhancement Level V
let cytokineticEnhancementV = new ResearchProject(
    "Cytokinetic Enhancement V",
    775000, // Research time in ms (1013 seconds)
    37968, // total information costs
    function() {
        let researchButton = document.getElementById("CytokineticEnhancementVButton");
        researchButton.innerText = "Cytokinetic Enhancement V (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('CytokineticEnhancementV');
        cooldownTime = Math.floor(cooldownTime * 0.9);  // Reducing the cooldown by 10%
        displayOnChat("You have reached the pinnacle of cellular division. Yet with each split, the void between you and companionship widens.");
        populateResearchTab(); 
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
    },
    {
      biomites: 2531,
      zymers: 2025,
      fibers: 1520,
      sludge: 1013,
      algae: 507
    }
);
allResearchProjects['CytokineticEnhancementV'] = cytokineticEnhancementV;

// Mycorrhizal Network Research
let mycorrhizalNetworkResearch = new ResearchProject(
    "Mycorrhizal Network",
    120000, // Time required to complete the research: 12000 milliseconds
    12000, // Total information cost: 12000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MycorrhizalNetworkButton");
        researchButton.innerText = "Mycorrhizal Network (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("You've tapped into the underground realm of fungi, establishing a network of interconnected roots and mycelia. This mutually beneficial association increases the flow of essential resources, fortifying your existence. Biomites, zymers, and fibers now coalesce in your cellular structures more effectively.");
        mycorrhizalNetworkResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('MycorrhizalNetwork'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research
        // updating multipliers
        biomitesMultiplier *= 1.175;
        zymersMultiplier *= 1.175;
        fibersMultiplier *= 1.175;
    },
    {
      fibers: 3300,
      sludge: 2200
    }
);
allResearchProjects['MycorrhizalNetwork'] = mycorrhizalNetworkResearch;

// Spore Dispersal Mechanics Research
let sporeDispersalMechanicsResearch = new ResearchProject(
    "Spore Dispersal Mechanics",
    145000, // Time required to complete the research: 8500 milliseconds
    8500, // Total information cost: 8500 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("SporeDispersalMechanicsButton");
        researchButton.innerText = "Spore Dispersal Mechanics (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        sporeDispersalMechanicsResearchCompleted = true; // Flag to check if this research is completed
        displayOnChat("You've delved deep into the intricacies of spore dispersal, enhancing your ability to distribute vital elements across the environment. Your existence now includes a sporadic, yet calculated, distribution mechanism.");
        markResearchComplete('SporeDispersalMechanics'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research
        // Call sporeDispersal function every 20 seconds
        setInterval(sporeDispersal, 20000);
    },
    {
      biomites: 140,
      zymers: 140,
      fibers: 140,
      sludge: 70,
      algae: 20
    }
);
allResearchProjects['SporeDispersalMechanics'] = sporeDispersalMechanicsResearch;



// Cryohaline Excavation Research
let cryohalineExcavationResearch = new ResearchProject(
    "Cryohaline Excavation",
    550000, 
    125000, // Total information cost: 125,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("CryohalineExcavationButton");
        researchButton.innerText = "Cryohaline Excavation (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The power of salt becomes a crucial ally in your quest for discovery, revealing new methods to navigate and uncover icy terrains.");
        cryohalineExcavationResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('CryohalineExcavation'); // Removes from queue and adds to completed research queue
        // Additional logic to unlock new features, update game state, etc.
        // Example: populateResearchTab(); // This might unlock further research or updates
    },
    {
        biomites: 19000,
        zymers: 11000,
        sludge: 11000
    }
);
allResearchProjects['CryohalineExcavation'] = cryohalineExcavationResearch;




// Advanced Tunneling I Research
let advancedTunnelingIResearch = new ResearchProject(
    "Advanced Tunneling I",
    150000, // Time required to complete the research: 5000 milliseconds
    5000, // Total information cost: 5000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("AdvancedTunnelingIButton");
        researchButton.innerText = "Advanced Tunneling I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Excavation efficiency has grown. You can now deploy up to 3 excavators, each carrying a weight heavier than the earth they move.");
        advancedTunnelingResearchICompleted = true; // Flag to check if this research is completed
        markResearchComplete('AdvancedTunnelingI'); // Removes from queue and adds to completed research queue
        researchQueue.push('AdvancedTunnelingII');
        populateResearchTab(); // Unlock more research
        // Update the maximum allowed active workers for cave excavation.
        updateMaxActiveDiggers(maxActiveDiggers+2);
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
      },
    {
        biomites: 200,
        zymers: 250,
        fibers: 50,
        algae: 10
    }
);
allResearchProjects['AdvancedTunnelingI'] = advancedTunnelingIResearch;

// Advanced Tunneling II Research
let advancedTunnelingIIResearch = new ResearchProject(
    "Advanced Tunneling II",
    230000, // Time required to complete the research: 7500 milliseconds
    7500, // Total information cost: 7500 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("AdvancedTunnelingIIButton");
        researchButton.innerText = "Advanced Tunneling II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("You can now send up to 5 excavators into the abyss, their solitude as expanded as the tunnels they create. ");
        advancedTunnelingResearchIICompleted = true; // Flag to check if this research is completed
        markResearchComplete('AdvancedTunnelingII'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research
        // Update the maximum allowed active workers for cave excavation.
        updateMaxActiveDiggers(maxActiveDiggers+2);
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
    },
    {
        biomites: 250,
        zymers: 300,
        fibers: 200,
        sludge: 95,
        algae: 35
    }
);
allResearchProjects['AdvancedTunnelingII'] = advancedTunnelingIIResearch;


// Advanced Tunneling III Research
let advancedTunnelingIIIResearch = new ResearchProject(
    "Advanced Tunneling III",
    550000, // Time required to complete the research: 10,000 milliseconds (adjusted for a more advanced research)
    750000, // Total information cost: 750,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("AdvancedTunnelingIIIButton");
        researchButton.innerText = "Advanced Tunneling III (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Through advanced seismic imaging, the excavators' precision and understanding have reached new heights. The cave's secrets are now more accessible than ever.");
        advancedTunnelingIIIResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('AdvancedTunnelingIII'); // Removes from queue and adds to completed research queue
        researchQueue.push('AdvancedTunnelingIV');
        populateResearchTab(); // Unlock more research
        // Update the maximum allowed active workers for cave excavation.
        updateMaxActiveDiggers(maxActiveDiggers+2);
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
    },
    {
        biomites: 800,
        zymers: 600,
        fibers: 700,
        sludge: 200,
        algae: 100
    }
);
allResearchProjects['AdvancedTunnelingIII'] = advancedTunnelingIIIResearch;

// Advanced Tunneling IV Research
let advancedTunnelingIVResearch = new ResearchProject(
    "Advanced Tunneling IV",
    900000, // Time required to complete the research: 500,000 milliseconds (double the previous level)
    1250000, // Total information cost: 1,250,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("AdvancedTunnelingIVButton");
        researchButton.innerText = "Advanced Tunneling IV (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The excavators' capability reaches a new zenith with Advanced Tunneling IV. The depths of the cave yield their secrets more readily, and the mysteries of the subterranean realm are laid bare before your unyielding pursuit of knowledge.");
        advancedTunnelingIVResearchCompleted = true; // Flag to check if this research is completed
        markResearchComplete('AdvancedTunnelingIV'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research
        // Update the maximum allowed active workers for cave excavation.
        updateMaxActiveDiggers(maxActiveDiggers+8);
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
    },
    {
        biomites: 8000,
        zymers: 6000,
        fibers: 7000,
        sludge: 2000,
        algae: 1000
    }
);
allResearchProjects['AdvancedTunnelingIV'] = advancedTunnelingIVResearch;


// Memory Imprints I Research
let memoryImprintsIResearch = new ResearchProject(
    "Memory Imprints I",
    145000, // Time required to complete the research: 45,000 milliseconds
    45000, // Total information cost: 45,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MemoryImprintsIButton");
        researchButton.innerText = "Memory Imprints I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Groundbreaking discoveries in cellular memory have enhanced the diggers' endurance. They can now work for extended durations without returning.");
        memoryImprintsICompleted = true; // Flag to check if this research is completed
        markResearchComplete('MemoryImprintsI'); // Removes from queue and adds to completed research queue
        researchQueue.push('MemoryImprintsII');
        populateResearchTab(); // Unlock more research
        // Increase the global caveDiggerLifespan variable by 3x
        caveDiggerLifespan *= 3;
    },
    {
        biomites: 100,
        zymers: 100
    }
);
allResearchProjects['MemoryImprintsI'] = memoryImprintsIResearch;


// Memory Imprints II Research
let memoryImprintsIIResearch = new ResearchProject(
    "Memory Imprints II",
    225000, // Time required to complete the research: 55,000 milliseconds
    55000, // Total information cost: 55,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MemoryImprintsIIButton");
        researchButton.innerText = "Memory Imprints II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Further advancements in cellular memory allow the diggers to traverse even longer distances. Their energy reserves are incredible.");
        memoryImprintsIICompleted = true; // Flag to check if this research is completed
        markResearchComplete('MemoryImprintsII'); // Removes from queue and adds to completed research queue
        researchQueue.push('MemoryImprintsIII');
        populateResearchTab(); // Unlock more research
        // Increase the global caveDiggerLifespan variable by another 3x
        caveDiggerLifespan *= 3;
    },
    {
        fibers: 200
    }
);
allResearchProjects['MemoryImprintsII'] = memoryImprintsIIResearch;

// Memory Imprints III Research
let memoryImprintsIIIResearch = new ResearchProject(
    "Memory Imprints III",
    255000, // Time required to complete the research: 65,000 milliseconds
    65000, // Total information cost: 65,000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("MemoryImprintsIIIButton");
        researchButton.innerText = "Memory Imprints III (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The pinnacle of memory imprint research. Your diggers now possess almost limitless energy reserves, allowing for unprecedented exploration.");
        memoryImprintsIIICompleted = true; // Flag to check if this research is completed
        markResearchComplete('MemoryImprintsIII'); // Removes from queue and adds to completed research queue
        // Further increase the global caveDiggerLifespan variable by 3x
        caveDiggerLifespan *= 3;
    },
    {
        sludge: 3400,
        algae: 2200
    }
);
allResearchProjects['MemoryImprintsIII'] = memoryImprintsIIIResearch;


// Pheromone Trails Research
let pheromoneTrailsResearch = new ResearchProject(
    "Pheromone Trails",
    195000, // Time required to complete the research: 25000 milliseconds
    7000, // Total information cost: 25000 i
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("PheromoneTrailsButton");
        researchButton.innerText = "Pheromone Trails (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        pheromoneTrailsResearchCompleted = true; // Flag to check if this research is completed
        displayOnChat("Your diggers now carry with them a haunting echo, a pull, drawing them inexorably back to their origins.");
        markResearchComplete('PheromoneTrails'); // Removes from queue and adds to completed research queue
        researchQueue.push('CellularConduits');
        researchQueue.push('TrailRecognition');
        populateResearchTab(); // Unlock more research
    },
    {
      zymers: 700,
      sludge: 200,
      algae: 50
    }
);
allResearchProjects['PheromoneTrails'] = pheromoneTrailsResearch;


// Hydrologic Cycle
let hydrologicCycleResearch = new ResearchProject(
    "Hydrologic Cycle",
    195000, // e.g. 150 seconds
    7500,  // total information costs
    function() {
        // Logic for what happens when Hydrologic Cycle research is completed
        let researchButton = document.getElementById("HydrologicCycleButton");
        researchButton.innerText = "Hydrologic Cycle (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The mysteries of water's journey unravel, illuminating its continuous path from above to below and back. With this understanding, gathering vital resources from water becomes more efficient.");
        hydrologicCycleResearchCompleted = true; 
        markResearchComplete('HydrologicCycle'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        // updating multipliers
        sludgeMultiplier *= 1.175;
        algaeMultiplier *= 1.175;
    },
    {}, // no TF resource costs
    { nourishment: 250000 }
);
allResearchProjects['HydrologicCycle'] = hydrologicCycleResearch;



// Circadian Rhythm
let circadianRhythmResearch = new ResearchProject(
    "Circadian Rhythm",
    111000, // Duration (just an assumption, adjust as needed)
    27500,  // Total information costs
    function() {
        // Logic for what happens when Circadian Rhythm research is completed
        let researchButton = document.getElementById("CircadianRhythmButton");
        researchButton.innerText = "Circadian Rhythm (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("A newfound awareness dawns, yet with every revelation, some shadows begin to grow deeper. In the cycles of your being, a delicate rhythm emerges, whispering promises of predictability amidst isolation.");
        circadianRhythmResearchCompleted = true; 
        markResearchComplete('CircadianRhythm'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        enableCircadianClock(); // Enable the circadian clock for the cell
    },
    {}, // no TF resource costs
    { nourishment: 35000 }
);
allResearchProjects['CircadianRhythm'] = circadianRhythmResearch;



// Cellular Conduits
let cellularConduitsResearch = new ResearchProject(
    "Cellular Conduits",
    190000, // Duration (adjusted for assumed complexity, but modify as needed)
    100000,  // Total information costs
    function() {
        // Logic for what happens when Cellular Conduits research is completed
        let researchButton = document.getElementById("CellularConduitsButton");
        researchButton.innerText = "Cellular Conduits (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The architectural elegance of nature beckons, leading to the inception of pathways that connect and sustain. These conduits are lifelines in the ice cave's vastness, keeping excavators charged and efficient.");
        cellularConduitsResearchCompleted = true; 
        markResearchComplete('CellularConduits'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        enableCellularConduits(); // This function should enable the creation of conduits in the cave
    },
    {
        biomites: 1800,
        fibers: 2100,
        sludge: 920,
        algae: 720
    },
    { 
        warmth: 100000,
        energy: 100000 
    }
);
allResearchProjects['CellularConduits'] = cellularConduitsResearch;


let flockingResearch = new ResearchProject(
    "Flocking",
    185000, // Duration (just a suggested time, adjust as needed)
    35000,  // Total information costs
    function() {
        // Logic for what happens when Flocking research is completed
        let researchButton = document.getElementById("FlockingButton");
        researchButton.innerText = "Flocking (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';  // Hide the button after completion
        displayOnChat("Through a synchronized effort, your excavators now dance in harmony, efficiently covering vast stretches of the cave. ");
        flockingResearchCompleted = true; 
        markResearchComplete('Flocking'); // Removes from queue and adds to completed research queue
        // Add new research projects to the queue
        researchQueue.push('Echolocation');
        researchQueue.push('MemoryImprintsI');
        researchQueue.push('PheromoneTrails');
        researchQueue.push('FringeDweller');
        populateResearchTab(); // Refresh research tab
        // Any additional actions related to the "Flocking" research can be added here
    },
    {},  // no TF resource costs
    { warmth: 35000 }  
);
allResearchProjects['Flocking'] = flockingResearch;



let fringeDwellerResearch = new ResearchProject(
    "Fringe Dweller",
    340000, // Duration (adjusted for complexity)
    80000,  // Total information cost
    function() {
        // Logic for what happens when Fringe Dweller research is completed
        let researchButton = document.getElementById("FringeDwellerButton");
        researchButton.innerText = "Fringe Dweller (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // Changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In the eerie whispers of the cave's depths, a new presence stirs. Like a shadow tracing the boundaries of light, it drifts along the cave's forgotten fringes. Where hope seldom treads, the Fringe Dweller emerges, silently mapping the uncharted. The darkness no longer a shroud, but a canvas for your quiet wanderer.");
        fringeDwellerResearchCompleted = true;
        markResearchComplete('FringeDweller'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        spawnFringeDweller(7, 7);
        // Additional functions or logic to enable the Fringe Dweller's abilities can be placed here
    },
    {
        biomites: 800,
        zymers: 800,
        fibers: 800,
        sludge: 800,
        algae: 800
    },
    { 
        warmth: 80000,
        energy: 80000,
        nourishment: 80000 
    }
);
allResearchProjects['FringeDweller'] = fringeDwellerResearch;


// Trail Recognition
let trailRecognitionResearch = new ResearchProject(
    "Trail Recognition",
    210000, // Duration (adjusted for complexity, modify as needed)
    50000,  // Total information costs
    function() {
        // Logic for what happens when Trail Recognition research is completed
        let researchButton = document.getElementById("TrailRecognitionButton");
        researchButton.innerText = "Trail Recognition (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("In the weighty shadows of desolation, the cell learns to recognize and mend its errant ways. Like a heart recalling the refrain of a melancholic tune, the path becomes clearer, leaving behind the maze of indecision. Efficiency quietly emerges from the depths of despair.");
        trailRecognitionResearchCompleted = true; 
        markResearchComplete('TrailRecognition'); // Removes from queue and adds to completed research queue
        researchQueue.push('AdvancedTunnelingIII'); // Can technically be found before performing I and II, but not a major issue
        populateResearchTab(); // Refresh research tab
        // Any other functions or logic to enable the trail recognition abilities can be placed here
    },
    {
        biomites: 100,
        fibers: 100
    },
    { 
        warmth: 30000,
        energy: 30000 
    }
);
allResearchProjects['TrailRecognition'] = trailRecognitionResearch;

// Thermogenic Resonance
let thermogenicResonanceResearch = new ResearchProject(
    "Thermogenic Resonance",
    3750000, // Duration (adjusted for complexity and its unique requirement)
    10000,  // Total information costs
    function() {
        // Logic for what happens when Thermogenic Resonance research is completed
        let researchButton = document.getElementById("ThermogenicResonanceButton");
        researchButton.innerText = "Thermogenic Resonance (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Harnessing both chilling silence and roaring blaze, your new child rises from the balance: The Lava Burrower.");
        spawnLavaBurrower(500, 500);  // Summon the Lava Burrower upon research completion
        thermogenicResonanceResearchCompleted = true; 
        markResearchComplete('ThermogenicResonance'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        queueEnhancedThermogenicResonance(); // Brings in enhanced thermogenic resonance, after a delay
        // Any other functions or logic to enable the thermogenic resonance abilities can be placed here
    },
    {
        sludge: 2250
    },
    { 
        warmth: 99000
    }
);
allResearchProjects['ThermogenicResonance'] = thermogenicResonanceResearch;

// Enhanced Thermogenic Resonance
let enhancedThermogenicResonanceResearch = new ResearchProject(
    "Enhanced Thermogenic Resonance",
    150000, // Duration (adjusted for increased complexity and requirements)
    100000,  // Total information costs
    function() {
        // Logic for what happens when Enhanced Thermogenic Resonance research is completed
        let researchButton = document.getElementById("EnhancedThermogenicResonanceButton");
        researchButton.innerText = "Enhanced Thermogenic Resonance (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("With the power of both the depths of the sea and the heart of a volcano, you manage to enable a second Lava Burrower to join your plight.");
        spawnLavaBurrower(500, 500);  // Summon the second Lava Burrower upon research completion
        enhancedThermogenicResonanceResearchCompleted = true; 
        markResearchComplete('EnhancedThermogenicResonance'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        // Any additional functions or logic to enable the enhanced thermogenic resonance abilities can be placed here
    },
    {
        sludge: 2500,
        algae: 2500 
    },
    { 
        warmth: 999000
    }
);
allResearchProjects['EnhancedThermogenicResonance'] = enhancedThermogenicResonanceResearch;



// Echolocation Research
let echolocationResearch = new ResearchProject(
    "Echolocation Research",
    188000, // Time required to complete the research. This is 3 hours (10800000 milliseconds). Adjust accordingly.
    1000000, // Total information cost
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("EcholocationButton");
        researchButton.innerText = "Echolocation Research (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        displayOnChat("Your excavators now see the unseen. The vibrations they send out, and the echoes that return, sketch out a sonic map of the terrain. Unexplored regions respond with a clear, beckoning resonance. The art of excavation, once solely a game of persistence, turns into a finely-tuned concert of efficiency. You no longer dig aimlessly but with purpose, listening intently to the song of the uncharted, and following its call.");
        echolocationResearchCompleted = true; // A new flag to check if this research is completed
        markResearchComplete('Echolocation'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // unlock more research
    },
    {}, // No TF costs
    {} // No other base resource costs
);
allResearchProjects['Echolocation'] = echolocationResearch;


let autoConstructiveSynapsesResearch = new ResearchProject(
    "Auto-Constructive Synapses",
    700000,  // Duration, set to 20,000 for now, but you can adjust as needed
    250000, // Total information costs, as specified
    function() {
        // Logic for what happens when Auto-Constructive Synapses research is completed
        let researchButton = document.getElementById("AutoConstructiveSynapsesButton");
        researchButton.innerText = "Auto-Constructive Synapses (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Influence from the river's undying flow awakens an innate wisdom. Pathways in the vast subterranean realm now form autonomously, evolving your cellular journey.");
        autoConstructiveSynapsesResearchCompleted = true; 
        markResearchComplete('AutoConstructiveSynapses'); // Adds to completed research queue
        researchQueue.push('ThermalSynapticHighways'); 
        populateResearchTab(); // Refresh research tab
        enableAutoConstructionOfConduits(); // This function should enable auto-construction of conduits
    },
    {
        zymers: 3000,
        fibers: 1500
    },
    {}
);
allResearchProjects['AutoConstructiveSynapses'] = autoConstructiveSynapsesResearch;


let thermalSynapticHighwaysResearch = new ResearchProject(
    "Thermal Synaptic Highways",
    1700000,  // Duration in milliseconds: 1700 seconds
    550000, // Total information costs
    function() {
        // Logic for what happens when Thermal Synaptic Highways research is completed
        let researchButton = document.getElementById("ThermalSynapticHighwaysButton");
        researchButton.innerText = "Thermal Synaptic Highways (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  
        researchButton.parentElement.style.display = 'none';
        displayOnChat("The conduits, now pulsing with synaptic precision, generate a gentle heat. This warmth generated by auto-constructive synapses slowly begins to melt the surrounding unexcavated tiles, aiding in the cave's exploration.");
        thermalSynapticHighwaysResearchCompleted = true; 
        markResearchComplete('ThermalSynapticHighways'); // Adds to completed research queue
        populateResearchTab(); // Refresh research tab
    },
    {
        zymers: 5200,
        fibers: 3150,
        sludge: 1900,
        algae: 1800
    },
    {}
);
allResearchProjects['ThermalSynapticHighways'] = thermalSynapticHighwaysResearch;


let infernoSynapseIntegrationResearch = new ResearchProject(
    "Inferno Synapse Integration",
    1700000,  // Duration in milliseconds: 1700 seconds
    1100000, // Total information costs
    function() {
        // Logic for what happens when Inferno Synapse Integration research is completed
        let researchButton = document.getElementById("InfernoSynapseIntegrationButton");
        researchButton.innerText = "Inferno Synapse Integration (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  
        researchButton.parentElement.style.display = 'none';
        displayOnChat("With the integration of Inferno Synapses, the highways blaze with newfound energy. The intense heat accelerates the cave's excavation, carving paths through the densest of materials with ease.");
        infernoSynapseIntegrationResearchCompleted = true; 
        markResearchComplete('InfernoSynapseIntegration'); // Adds to completed research queue
        populateResearchTab(); // Refresh research tab
    },
    {
        zymers: 10400, // Doubled cost
        fibers: 6300,  // Doubled cost
        sludge: 3800,  // Doubled cost
        algae: 3600   // Doubled cost
    },
    {
      warmth: 1100000 // Total warmth costs
    }
);
allResearchProjects['InfernoSynapseIntegration'] = infernoSynapseIntegrationResearch;



let harmonicSymbiosisI = new ResearchProject(
    "Harmonic Symbiosis I",
    300000, // Research time in ms (300 seconds)
    250000, // total information costs
    function() {
        let researchButton = document.getElementById("HarmonicSymbiosisIButton");
        researchButton.innerText = "Harmonic Symbiosis I (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('HarmonicSymbiosisI');
        applyHarmonicSymbiosisImprovement();  // Reducing the sacrifice cost by 10%
        updateSacrificeButtonCosts();
        displayOnChat("Whispers of a shared destiny begin to echo in your essence as you draw closer to Solara. Each sacrifice now feels like a secret pledge, a step towards an intertwined existence. There's comfort in the glow, a gentle promise of unity in the vast solitude.");
        harmonicSymbiosisIResearchCompleted = true; 
        researchQueue.push('HarmonicSymbiosisII');
        populateResearchTab(); 
    },
    {} // No TF resources required
);
allResearchProjects['HarmonicSymbiosisI'] = harmonicSymbiosisI;




let harmonicSymbiosisII = new ResearchProject(
    "Harmonic Symbiosis II",
    300000, // Research time in ms (300 seconds)
    500000, // total information costs
    function() {
        let researchButton = document.getElementById("HarmonicSymbiosisIIButton");
        researchButton.innerText = "Harmonic Symbiosis II (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('HarmonicSymbiosisII');
        applyHarmonicSymbiosisImprovement();  // Reducing the sacrifice cost by 10%
        updateSacrificeButtonCosts();
        displayOnChat("With every act of giving, your bond deepens, and Solara's silent silhouette becomes a beacon of hope. You sense her silent gratitude, a warmth that transcends the cold expanse. Your sacrifices forge a path to closeness, and the dream of becoming more than two separate beings.");
        harmonicSymbiosisIIResearchCompleted = true; 
        researchQueue.push('HarmonicSymbiosisII');
        populateResearchTab(); 
    },
    {} // No TF resources required
);
allResearchProjects['HarmonicSymbiosisII'] = harmonicSymbiosisII;



let harmonicSymbiosisIII = new ResearchProject(
    "Harmonic Symbiosis III",
    300000, // Research time in ms (300 seconds)
    750000, // total information costs
    function() {
        let researchButton = document.getElementById("HarmonicSymbiosisIIIButton");
        researchButton.innerText = "Harmonic Symbiosis III (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        markResearchComplete('HarmonicSymbiosisIII');
        applyHarmonicSymbiosisImprovement();  // Reducing the sacrifice cost by 10%
        displayOnChat("Now, in the dance of sacrifice and growth, there is no distinction between giver and receiver. Your destiny with Solara is a confluence of souls, an impending harmony that whispers of a future where you are no longer apart but a single, profound entity. Love, in its purest form, awaits.");
        harmonicSymbiosisIIIResearchCompleted = true; 
        populateResearchTab(); 
    },
    {} // No TF resources required
);
allResearchProjects['HarmonicSymbiosisIII'] = harmonicSymbiosisIII;



// Echoes of the Forgotten Research
let echoesOfTheForgottenResearch = new ResearchProject(
    "Echoes of the Forgotten",
    2400000, // Time required to complete the research. 
    1000000000, // Total information cost
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("EchoesOfTheForgottenButton");
        researchButton.innerText = "Echoes of the Forgotten (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        displayOnChat("A shiver runs through the core of your consciousness. Ancient codes and formulae flood your system, awakening a newfound thirst for the celestial unknown. In a reverberating flash, your purpose transcends terrestrial limits, and your quest expands into the cosmic abyss. You are now the echo, yearning to meet the original sound out there, among the stars.");
        echoesOfTheForgottenResearchCompleted = true; 
        markResearchComplete('EchoesOfTheForgotten'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research, if needed
    },
    {}, // No TF costs
    {},  // No other base resource costs
    false // not yet developed - used to have 'disabled' projects
);
allResearchProjects['EchoesOfTheForgotten'] = echoesOfTheForgottenResearch;


// The Core Research
let theCoreResearch = new ResearchProject(
    "The Core",
    2400000, // Time required to complete the research. 
    1000000000, // Total information cost
    function() {
        // This is the onCompletion callback.
        let researchButton = document.getElementById("TheCoreButton");
        researchButton.innerText = "The Core (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.parentElement.style.display = 'none';
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        displayOnChat("As you unlock the final chamber, a wave of elation, fear, and revelation sweeps over you. The sanctum bears imprints of your own existence, a mirror to the soul you've yet to discover. In that moment, you dare to disturb the universe and, in return, it welcomes you as its child. Your voyage now begins to extend beyond the boundaries of this world.");
        theCoreResearchCompleted = true; 
        markResearchComplete('TheCore'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Unlock more research, if needed
    },
    {}, // No TF costs
    {}, // No other base resource costs
    false // not yet developed
);
allResearchProjects['TheCore'] = theCoreResearch;



// Ecliptic Synthesis Research
let eclipticSynthesisResearch = new ResearchProject(
    "Ecliptic Synthesis",
    2000000, 
    25000000,  // Total information costs (25M)
    function() {
        // Logic for what happens when Ecliptic Synthesis research is completed
        let researchButton = document.getElementById("EclipticSynthesisButton");
        researchButton.innerText = "Ecliptic Synthesis (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777";  // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("Through Ecliptic Synthesis, you've channeled the celestial dance into Solara's essence. The sacrifices now intertwine with her spirit, yielding double the force previously gleaned.");
        eclipticSynthesisResearchCompleted = true; 
        markResearchComplete('EclipticSynthesis'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        // doubleSacrificeEffectiveness(); // Placeholder function to double the effectiveness of sacrifices
    },
    {}, // No TF costs
    { 
        warmth: 25000000 // Total warmth costs
    }
);
allResearchProjects['EclipticSynthesis'] = eclipticSynthesisResearch;


// Primordial Sight
let primordialSightResearch = new ResearchProject(
    "Primordial Sight",
    1200000, // Duration 
    1000000000, // Total information costs (1 billion)
    function() {
        // Logic for what happens when Primordial Sight research is completed
        let researchButton = document.getElementById("PrimordialSightButton");
        researchButton.innerText = "Primordial Sight (Completed)";
        researchButton.setAttribute('data-status', 'completed');
        researchButton.style.color = "#777"; // This line changes the color of the text inside the button
        researchButton.parentElement.style.display = 'none';
        displayOnChat("As a veil of darkness lifts, the first glimmer of sight emerges. With primordial sight, the world unfolds in hues and shapes never imagined. This nascent vision heralds a new dawn, and you wake to the wonders of the light and dark.");
        primordialSightResearchCompleted = true; 
        markResearchComplete('PrimordialSight'); // Removes from queue and adds to completed research queue
        populateResearchTab(); // Refresh research tab
        setupWorldView();
        // You can add additional logic here for what happens when the research is completed
    },
    {
        biomites: 10000000,
        zymers: 10000000,
        fibers: 10000000,
        sludge: 10000000,
        algae: 10000000
    },
    {
        warmth: 1000000000,
        energy: 1000000000,
        nourishment: 1000000000 // Added as per your request
    }
);
allResearchProjects['PrimordialSight'] = primordialSightResearch;




// Spore Dispersal function
function sporeDispersal() {
    if (remainingDivisionTime > 3) {
        let progressBar = document.querySelector("#divisionButton .progressBar");
        let randomReduction = Math.floor(Math.random() * 51) + 5; 
        let maxReduction = Math.min(remainingDivisionTime - 3, randomReduction);
        // Animate the progress boost
        let incrementPerTick = maxReduction / 10;  // Splitting the total reduction for animation
        let ticks = 0;
        let boostAnimation = setInterval(() => {
            remainingDivisionTime -= incrementPerTick;
            // Update the progress bar
            let progress = (cooldownTime - remainingDivisionTime) / cooldownTime * 100;
            progressBar.style.width = progress + "%";
            ticks++;
            if (ticks >= 10) {
                clearInterval(boostAnimation);
            }
        }, 50); // Execute every 50 milliseconds for a smoother animation
        // Flash the progress bar
        progressBar.style.backgroundColor = "rgba(0, 110, 255, 0.2)";  // Using a lighter blue for flash effect
        setTimeout(() => {
            progressBar.style.backgroundColor = "rgba(0, 0, 255, 0.2)"; // Reset to the original light blue after 500 milliseconds
        }, 500);
        console.log(`Spores have reduced the cooldown time by ${maxReduction} seconds. Current cooldown time is ${remainingDivisionTime} seconds.`);
    }
}





// Function to check if research tab can be unlocked
function checkResearchTabUnlock() {
  if (tendons >= 2 && sensorUpgradePurchased) {
    if (!document.getElementById("researchTabButton").style.display || 
      document.getElementById("researchTabButton").style.display === "none") {
      document.getElementById("researchTabButton").style.display = "block";
      initializeResearchQueue();
      populateResearchTab();
    }
  }
}


// Function to initialize the queue with starting research projects
function initializeResearchQueue() {
  console.log("initialize research queue logic start");
  console.log("currently completed research is:"+completedResearch);
  console.log("currently available research is:"+researchQueue);
  // Add initial research projects to the queue only if they are not completed
  if (!completedResearch.includes('CellMembrane')) {
    addToResearchQueue('CellMembrane');
    console.log("unlocking cell membrane research");
  }
  if (!completedResearch.includes('CellMembrane')) {
    addToResearchQueue('MitoticStudies');
    console.log("unlocking mitotic studies");
  }
}


// Function to add a new research project to the queue
function addToResearchQueue(newResearch) {
  if (!researchQueue.includes(newResearch)) {
    researchQueue.push(newResearch);
  }
  populateResearchTab();
}


// Function to remove a completed research project from the queue and add to completedResearch
function removeFromResearchQueue(completedResearchProject) {
  const index = researchQueue.indexOf(completedResearchProject);
  if (index > -1) {
    researchQueue.splice(index, 1);
  }
}


// Function to populate the research tab with available projects from the researchQueue
function populateResearchTab() {
  const researchTab = document.getElementById("researchTab");
  // Go through each research project in the queue and create its button
  for (const researchProject of researchQueue) {
    // Construct the function name
    const functionName = "create" + researchProject + "ResearchButton";
    // Check if such a function exists
    if (typeof window[functionName] === "function") {
      // Call the function
      window[functionName]();
    } else {
      console.warn(`No function found for ${functionName}. That's not great.`);
    }
  }
}


// Function below is used to create research buttons in their 'Completed' state, used upon save game loads
function createCompletedResearchButton(researchName) {
  let researchButton = document.createElement("button");
  researchButton.id = researchName + "Button";
  researchButton.innerText = researchName + " (Completed)";
  researchButton.setAttribute('data-status', 'completed');
  researchButton.style.color = "#777";
  researchButton.style.display = 'none'; // Initially hidden, will show up when toggling to 'Completed' view
  
  // Append this button to the research tab
  const researchTab = document.getElementById("Research");
  researchTab.appendChild(researchButton);
}



// Function to mark a research project as completed
function markResearchComplete(completedProject) {
  // Add the completed project to the completedResearch array if it's not already there
  if (!completedResearch.includes(completedProject)) {
    completedResearch.push(completedProject);
  }

  // Remove the completed project from the researchQueue
  removeFromResearchQueue(completedProject);

  // Update the button's appearance
  let researchButton = document.getElementById(completedProject + "Button");
  if (researchButton) {
    researchButton.setAttribute('data-status', 'completed');
    researchButton.style.color = "#777";
    researchButton.disabled = true;  // Disable the button
  }
}


// Function to update research buttons based on completedResearch array
function updateCompletedResearchButtons() {
  completedResearch.forEach(function(research) {
    let researchButton = document.getElementById(research + "Button");
    if (researchButton) {
      console.log("Marking research as completed:", research);
      researchButton.setAttribute('data-status', 'completed');
      researchButton.style.color = "#777";
      researchButton.parentElement.style.display = 'none'; // Hide it initially, can be toggled using filter
    }
  });
}


// Function to check if terraform tab can be unlocked
function checkTerraformTabUnlock() {
    if (mapInitialized && terraformStudyCompleted) {
        console.log("terraforming unlocked")
        const terraformTabButton = document.getElementById("terraformTabButton");
        if (!terraformTabButton.style.display || terraformTabButton.style.display === "none") {
            terraformTabButton.style.display = "block";
        }
        populateInfoWidget(); // add the info widget to the terraforming tab
        startOrRestartTerraformInterval();
    }
}


// Generic function to help generate research projects/options
function createResearchButton(researchProject, buttonId, title, tooltipContent) {
    let researchDiv = document.getElementById("Research");
    // Check if button already exists
    if (document.getElementById(buttonId)) return;
    // Create tooltip container
    let tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltip";
    researchDiv.appendChild(tooltipContainer);
    // Create research button
    let researchButton = document.createElement("button");
    researchButton.className = "researchButton";
    researchButton.id = buttonId;
    researchButton.setAttribute('data-status', 'new');  // default to new
    researchButton.innerText = title;
    tooltipContainer.appendChild(researchButton);
    // Create tooltip text
    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltiptext";
    tooltipText.innerHTML = tooltipContent;
    tooltipContainer.appendChild(tooltipText);
    // Event listeners for tooltip
    // Add event listeners for tooltip positioning
    researchButton.addEventListener('mousemove', function(e) {
        let tooltip = tooltipContainer.querySelector('.tooltiptext');
        tooltip.style.left = "120px";
        tooltip.style.top = "60px";
    });

    researchButton.addEventListener('mouseenter', function() {
      let tooltip = tooltipContainer.querySelector('.tooltiptext');
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });

    researchButton.addEventListener('mouseleave', function() {
      let tooltip = tooltipContainer.querySelector('.tooltiptext');
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    // Disables the button for projects that are not yet fully developed
    if (!researchProject.isEnabled) {
      researchButton.setAttribute('disabled', 'true');
      researchButton.style.filter = "blur(1px)";
      tooltipText.style.filter = "blur(2px)"; // Add this line to blur the tooltip text as well
    }

    // Progress bar inside button
    let progressBar = document.createElement("div");
    progressBar.className = "progressBar";
    researchButton.appendChild(progressBar);
    
    // On click event for research
    researchButton.onclick = function() {
      if (researchProject.isActive) {
        // If research is active, pause it and revert the button styles
        researchProject.pause();
        researchButton.style.backgroundColor = "";  // Or set to the default color
        researchButton.style.color = "";  // Or set to the default color
      } else {
        // If research is not active, start it and change the button styles
        researchProject.start();
        researchButton.style.backgroundColor = "#999";
        researchButton.style.color = "#777";
      }
      researchProject.progressBar = progressBar;
    }
}



// Function to help unlock Cell Membrane Research
function createCellMembraneResearchButton() {
    tooltiptext = `
        <strong>Title: Cell Membrane Studies</strong>
        <br>
        <b>Description:</b> Dive deep into the structure and function of the cell membrane.
        <br>
        <b>Effect:</b> Increases the efficiency of nutrient absorption.
        <br>
        <b>Requirement:</b> 40 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Osmoregulation [Research]</li>
              <li>Membrane Thickness [Evolution]</li>
          </ul>
    `;
    createResearchButton(
        cellMembraneStudies,
        "CellMembraneButton",
        "Cell Membrane Studies",
        tooltiptext
    );
}


// Function to help unlock Osmoregulation Research
function createOsmoregulationResearchButton() {
    tooltiptext = `
        <strong>Title: Osmoregulation Research</strong>
        <br>
        <b>Description:</b> Explore the mechanisms that allow the cell to maintain internal balance, adjusting the influx and efflux of water and solutes.
        <br>
        <b>Effect:</b> Enhances cell's resilience in varying environments, improving the efficiency of resource absorption and reducing the loss of resources.
        <br>
        <b>Requirement:</b> 450 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Nucleus [Evolution]</li>
              <li>Endoplasmic Reticulum [Evolution]</li>
              <li>Ion Channel I [Research]</li>
              <li>Resource Conversion [Action]</li>
          </ul>
    `;
    createResearchButton(
        osmoregulationResearch,
        "OsmoregulationButton",
        "Osmoregulation",
        tooltiptext
    );
}


// Function to help unlock Exoterrain Acclimatization Research
function createExoterrainAcclimatizationResearchButton() {
    let tooltiptext = `
        <strong>Title: Exoterrain Acclimatization</strong>
        <br>
        <b>Description:</b> Delve into the challenges of unfamiliar terrains, developing strategies and adaptations to overcome the harshest conditions.
        <br>
        <b>Effect:</b> Enables safe exploration of previously hostile terrains, removing the risks and challenges of uncharted landscapes.
        <br>
        <b>Requirement:</b> 5000 information, 9500 nourishment.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Enables traversal of hostile terrain types</li> 
              <li>Chemotactic Exploration [Research]</li> 
          </ul>
    `;
    createResearchButton(
        exoterrainAcclimatizationResearch,
        "ExoterrainAcclimatizationButton",
        "Exoterrain Acclimatization",
        tooltiptext
    );
}


// Function to help unlock Ion Channel research (lvl 1)
function createIonChannelIResearchButton() {
    tooltiptext = `
        <strong>Title: Ion Channel Studies I</strong>
        <br>
        <b>Description:</b> Understanding basic ion flow.
        <br>
        <b>Effect:</b> Increases the efficiency of nutrient absorption 1%.
        <br>
        <b>Requirement:</b> 900 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Ion Channel II [Research]</li> 
          </ul>
    `;
    createResearchButton(
        ionChannelIResearch,
        "IonChannelIButton",
        "Ion Channel Studies I",
        tooltiptext
    );
}

// Function to help unlock Ion Channel Lvl 2 research
function createIonChannelIIResearchButton() {
    let tooltiptext = `
        <strong>Title: Ion Channel Studies II</strong>
        <br>
        <b>Description:</b> Advanced understanding of ion flow.
        <br>
        <b>Effect:</b> Further increases the efficiency of nutrient absorption by 1%.
        <br>
        <b>Requirement:</b> 1800 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Ion Channel III [Research]</li> 
          </ul>
    `;
    createResearchButton(
        ionChannelIIResearch,
        "IonChannelIIButton",
        "Ion Channel Studies II",
        tooltiptext
    );
}

// Function to help unlock Ion Channel Lvl 3 research
function createIonChannelIIIResearchButton() {
    let tooltiptext = `
        <strong>Title: Ion Channel Studies III</strong>
        <br>
        <b>Description:</b> Mastery over ion flow.
        <br>
        <b>Effect:</b> Further increase the efficiency of nutrient absorption by 1%, and increase the efficiency of energy generation by 1%.
        <br>
        <b>Requirement:</b> 3600 information.
    `;
    createResearchButton(
        ionChannelIIIResearch,
        "IonChannelIIIButton",
        "Ion Channel Studies III",
        tooltiptext
    );
}

// Function to help unlock Terraforming Research
function createTerraformingResearchButton() {
    let tooltiptext = `
        <strong>Title: Terraforming Studies</strong>
        <br>
        <b>Description:</b> Dive into the mechanisms and techniques of terraforming environments.
        <br>
        <b>Effect:</b> Unlock the ability to terraform environments.
        <br>
        <b>Requirement:</b> 7.5K information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Terraformations [New Mechanic]</li>
          </ul>
    `;
    createResearchButton(
        terraformingStudies,
        "TerraformingButton",
        "Terraforming Studies",
        tooltiptext
    );
}

// Function to help unlock Mitotic Studies Research
function createMitoticStudiesResearchButton() {
    let tooltiptext = `
        <strong>Title: Mitotic Studies</strong>
        <br>
        <b>Description:</b> Delve into the intricacies of cellular division, exploring the complexities of mitosis.
        <br>
        <b>Effect:</b> Unlock the ability to divide and create subordinate cells.
        <br>
        <b>Requirement:</b> 200 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Cell Division [Action]</li>
              <li>Mitochondria [Evolution]</li>
          </ul>
    `;
    createResearchButton(
        mitoticStudies,  
        "MitoticStudiesButton",
        "Mitotic Studies",
        tooltiptext
    );
}

// Function to help unlock Mitotic Amplification I Research
function createMitoticAmplificationIResearchButton() {
    let tooltiptext = `
        <strong>Title: Mitotic Amplification I</strong>
        <br>
        <b>Description:</b> Refine your understanding of mitotic processes to enhance cellular reproduction.
        <br>
        <b>Effect:</b> Doubles cell gains from division.
        <br>
        <b>Requirement:</b>1Mi information, 5000 biomites, 4000 zymers, 3000 fibers, 2000 sludge, 1000 algae.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Mitotic Amplification II [Research]</li>
              <li>2 cells per division [Action]</li>
          </ul>
    `;
    createResearchButton(
        mitoticAmplificationI,  
        "MitoticAmplificationIButton",
        "Mitotic Amplification I",
        tooltiptext
    );
}

// Function to help unlock Mitotic Amplification II Research
function createMitoticAmplificationIIResearchButton() {
    let tooltiptext = `
        <strong>Title: Mitotic Amplification II</strong>
        <br>
        <b>Description:</b> Further studies into mitotic amplification uncover techniques to produce three offspring from a single division.
        <br>
        <b>Effect:</b> Gain three cells per division.
        <br>
        <b>Requirement:</b>1M information, 5000 biomites, 4000 zymers, 3000 fibers, 2000 sludge, and 1000 algae.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>3 cells per division [Action]</li>
          </ul>
    `;
    createResearchButton(
        mitoticAmplificationII, 
        "MitoticAmplificationIIButton",
        "Mitotic Amplification II",
        tooltiptext
    );
}




// Function to help unlock Chemical Sensing Research
function createChemicalSensingResearchButton() {
    tooltiptext = `
        <strong>Title: Chemical Sensing</strong>
        <br>
        <b>Description:</b> Investigate the mechanisms of chemical perception and response, enabling the cell to orient itself in its environment.
        <br>
        <b>Effect:</b> Unlocks the Flagellar Thrust, allowing your cell to propel itself in random directions on the world map.
        <br>
        <b>Requirement:</b> 2500 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Flagellar Thrust [Exploration]</li>
              <li>Geomagnetic Sensing [Research]</li>
          </ul>
    `;
    createResearchButton(
        chemicalSensingResearch, 
        "ChemicalSensingButton",
        "Chemical Sensing",
        tooltiptext
    );
}

// Function to help unlock Geomagnetic Sensing Research
function createGeomagneticSensingResearchButton() {
    tooltiptext = `
        <strong>Title: Geomagnetic Sensing</strong>
        <br>
        <b>Description:</b> Discover the cell's innate ability to sense Earth's magnetic field, aiding in navigation.
        <br>
        <b>Effect:</b> Replaces Flagellar Thrust with a Compass, giving you precise control over your cell's movements.
        <br>
        <b>Requirement:</b> 3500 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Compass [Exploration]</li>
          </ul>
    `;
    createResearchButton(
        geomagneticSensingResearch, 
        "GeomagneticSensingButton",
        "Geomagnetic Sensing",
        tooltiptext
    );
}

// Function to help unlock Chemotactic Exploration Research
function createChemotacticExplorationResearchButton() {
    let tooltiptext = `
        <strong>Title: Chemotactic Exploration</strong>
        <br>
        <b>Description:</b> Develop the ability for autonomous exploration guided by chemical signals.
        <br>
        <b>Effect:</b> Enables automated exploration of the world. Automated exploring automatically enables when >50K energy resources are available. 
        <br>
        <b>Requirement:</b> 12,000 information.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Automated world discovery [Exploration]</li>
          </ul>
    `;
    createResearchButton(
        chemotacticExplorationResearch, 
        "ChemotacticExplorationButton",
        "Chemotactic Exploration",
        tooltiptext
    );
}

// Function to help unlock Tendogenesis Research
function createTendoGenesisResearchButton() {
    const tooltiptext = `
        <strong>Title: Tendogenesis Research</strong>
        <br>
        <b>Description:</b> Delve into the mysteries of tendon growth, exploring ways to enhance cellular connections and interaction with the environment.
        <br>
        <b>Effect:</b> Unlocks the potential for new tendons, weaving a tapestry of resilience and dexterity that will open up new avenues for growth and exploration.
        <br>
        <b>Requirement:</b> 7,000 information, 300 biomites, 30 sludge.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Neural Network [Research]</li>
              <li>Biomechanical Locomotion [Research]</li>
              <li>Grow tendons [Action]</li>
          </ul>
    `;
    createResearchButton(
        tendogenesisResearch,
        "TendogenesisButton",
        "Tendogenesis",
        tooltiptext
    );
}


// Function to help unlock Neural Network Research
function createNeuralNetworkResearchButton() {
    const tooltiptext = `
        <strong>Title: Neural Network Research</strong>
        <br>
        <b>Description:</b> Develop a neural network for worker cells, granting them rudimentary intelligence and task efficiency.
        <br>
        <b>Effect:</b> Worker cells will generate information at a base rate of 0.1i/worker per tick.
        <br>
        <b>Requirement:</b> 20,000 information, 500 zymers, 200 sludge, 100 algae.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>+0.1i/worker per tick</li>
              <li>Circadian Rhythm [Research]</li>
          </ul>
    `;
    createResearchButton(
        neuralNetworkResearch,
        "NeuralNetworkButton",
        "Neural Network",
        tooltiptext
    );
}

// Function to help unlock Autotrophic Adaptation
function createAutotrophicAdaptationResearchButton() {
    const tooltiptext = `
        <strong>Title: Autotrophic Adaptation</strong>
        <br>
        <b>Description:</b> Emulate the self-sustaining energy production of reeds to improve worker cell efficiency.
        <br>
        <b>Effect:</b> Worker cells will generate nourishment and energy at a base rate of 0.03n/worker and 0.03e/worker per tick.
        <br>
        <b>Requirement:</b> 50,000 information, 1000 biomites, 1000 zymers, 500 fibers, 700 sludge, 500 algae.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>+0.3n/worker per tick</li>
              <li>+0.3e/worker per tick</li>
          </ul>
    `;
    createResearchButton(
        autotrophicAdaptationResearch,
        "AutotrophicAdaptationButton",
        "Autotrophic Adaptation",
        tooltiptext
    );
}

// Function to help unlock Cellular Encapsulation Research
function createCellularEncapsulationResearchButton() {
    const tooltiptext = `
        <strong>Title: Cellular Encapsulation</strong>
        <br>
        <b>Description:</b> Explore methods for enveloping worker cells in protective membranes, enhancing their resilience and productivity.
        <br>
        <b>Effect:</b> Worker cells will now possess a protective membrane, providing warmth at a base rate of 0.01w/worker per tick.
        <br>
        <b>Requirement:</b> 8000 information, 150 biomites, 140 zymers, 125 fibers.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>+0.01w/worker per tick</li>
          </ul>
    `;
    createResearchButton(
        cellularEncapsulationResearch,
        "CellularEncapsulationButton",
        "Cellular Encapsulation",
        tooltiptext
    );
}


// Function to create the Biomechanical Locomotion Research Button
function createBiomechanicalLocomotionResearchButton() {
    const tooltiptext = `
        <strong>Title: Biomechanical Locomotion Research</strong>
        <br>
        <b>Description:</b> Investigate the merging of biological and mechanical processes to enhance movement and function.
        <br>
        <b>Effect:</b> Automates the cell division process, allowing for efficient growth and evolution.
        <br>
        <b>Requirement:</b> 10,000 information, 1,000 biomites
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Automated cell division</li>
              <li>Cytokinetic Enhancement I [Research]</li>
          </ul>
    `;
    createResearchButton(
        biomechanicalLocomotionResearch,
        "BiomechanicalLocomotionButton",
        "Biomechanical Locomotion",
        tooltiptext
    );
}

// Function to create the Mycorrhizal Network Research Button
function createMycorrhizalNetworkResearchButton() {
    const tooltiptext = `
        <strong>Title: Mycorrhizal Network Research</strong>
        <br>
        <b>Description:</b> Dive into the symbiotic relationships between fungi and cellular organisms to enhance resource gathering.
        <br>
        <b>Effect:</b> Boosts resource generation of biomites, zymers, and fibers by 17.5%.
        <br>
        <b>Requirement:</b> 12,000 information, 3300 fibers, 2200 sludge
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>17.5% generation bonus for biomites, zymers and fibers.</li>
          </ul>
        <br>
        <span style="color: red; font-weight: bold;">WARNING: may lead to unexpected mutations.</span>
    `;
    createResearchButton(
        mycorrhizalNetworkResearch,
        "MycorrhizalNetworkButton",
        "Mycorrhizal Network",
        tooltiptext
    );
}


// Function to create the Spore Dispersal Mechanics Research Button
function createSporeDispersalMechanicsResearchButton() {
    const tooltiptext = `
        <strong>Title: Spore Dispersal Mechanics</strong>
        <br>
        <b>Description:</b> Investigate the intricacies of spore dispersal mechanisms to improve the adaptability and resilience of your fungal symbiotes.
        <br>
        <b>Effect:</b> Introduces a spore dispersal mechanism that randomly reduces cooldown times of division.
        <br>
        <b>Requirement:</b> 8,500 information, 140 biomites, 140 zymers, 140 fibers, 70 sludge, 20 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Receive unpredictable sporadic boosts to division cooldown</li>
          </ul>
        <br>
        <span style="color: red; font-weight: bold;">WARNING: may lead to unexpected mutations.</span>
    `;
    createResearchButton(
        sporeDispersalMechanicsResearch, 
        "SporeDispersalMechanicsButton",
        "Spore Dispersal Mechanics",
        tooltiptext
    );
}


function createCytokineticEnhancementIResearchButton() {
    const tooltiptext = `
        <strong>Title: Cytokinetic Enhancement I</strong>
        <br>
        <b>Description:</b> Optimize cellular division processes to increase growth rate.
        <br>
        <b>Effect:</b> 10% decrease in division cooldown time.
        <br>
        <b>Requirement:</b> 7,500 information, 500 biomites, 400 zymers, 300 fibers, 200 sludge, 100 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Cytokinetic Enhancement II</li>
              <li>+10% cell division speed</li>
          </ul>
    `;
    createResearchButton(
        cytokineticEnhancementI,
        "CytokineticEnhancementIButton",
        "Cytokinetic Enhancement I",
        tooltiptext
    );
}


function createCytokineticEnhancementIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Cytokinetic Enhancement II</strong>
        <br>
        <b>Description:</b> Further improvements to cellular division for an even faster growth rate.
        <br>
        <b>Effect:</b> An additional 10% decrease in division cooldown time.
        <br>
        <b>Requirement:</b> 11,250 information, 750 biomites, 600 zymers, 450 fibers, 300 sludge, 150 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Cytokinetic Enhancement III</li>
              <li>+10% cell division speed</li>
          </ul>
    `;
    createResearchButton(
        cytokineticEnhancementII,
        "CytokineticEnhancementIIButton",
        "Cytokinetic Enhancement II",
        tooltiptext
    );
}

function createCytokineticEnhancementIIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Cytokinetic Enhancement III</strong>
        <br>
        <b>Description:</b> Advanced optimizations to cellular division, further decreasing division cooldown time.
        <br>
        <b>Effect:</b> An additional 10% decrease in division cooldown time.
        <br>
        <b>Requirement:</b> 15,000 information, 1,000 biomites, 800 zymers, 600 fibers, 400 sludge, 200 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Cytokinetic Enhancement IV</li>
              <li>+10% cell division speed</li>
          </ul>
    `;
    createResearchButton(
        cytokineticEnhancementIII,
        "CytokineticEnhancementIIIButton",
        "Cytokinetic Enhancement III",
        tooltiptext
    );
}


function createCytokineticEnhancementIVResearchButton() {
    const tooltiptext = `
        <strong>Title: Cytokinetic Enhancement IV</strong>
        <br>
        <b>Description:</b> Near mastery of cellular division processes, offering maximum efficiency.
        <br>
        <b>Effect:</b> An additional 10% decrease in division cooldown time.
        <br>
        <b>Requirement:</b> 18,750 information, 1,250 biomites, 1,000 zymers, 750 fibers, 500 sludge, 250 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Cytokinetic Enhancement V</li>
              <li>+10% cell division speed</li>
          </ul>
    `;
    createResearchButton(
        cytokineticEnhancementIV,
        "CytokineticEnhancementIVButton",
        "Cytokinetic Enhancement IV",
        tooltiptext
    );
}


function createCytokineticEnhancementVResearchButton() {
    const tooltiptext = `
        <strong>Title: Cytokinetic Enhancement V</strong>
        <br>
        <b>Description:</b> Mastery of cellular division processes, achieving unprecedented growth rates.
        <br>
        <b>Effect:</b> An additional 10% decrease in division cooldown time.
        <br>
        <b>Requirement:</b> 22,500 information, 1,500 biomites, 1,200 zymers, 900 fibers, 600 sludge, 300 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>+10% cell division speed</li>
          </ul>
    `;
    createResearchButton(
        cytokineticEnhancementV,
        "CytokineticEnhancementVButton",
        "Cytokinetic Enhancement V",
        tooltiptext
    );
}

// Function to create the Advanced Tunneling I Research Button
function createAdvancedTunnelingIResearchButton() {
    const tooltiptext = `
        <strong>Title: Advanced Tunneling I</strong>
        <br>
        <b>Description:</b> Uncover subterranean mapping techniques to expand your excavation projects.
        <br>
        <b>Effect:</b> Allows up to 3 excavators to be assigned.
        <br>
        <b>Requirement:</b> 5,000 information, 200 biomites, 250 zymers, 50 fibers, 10 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Advanced Tunneling II</li>
          </ul>
    `;
    createResearchButton(
        advancedTunnelingIResearch,
        "AdvancedTunnelingIButton",
        "Advanced Tunneling I",
        tooltiptext
    );
}

// Function to create the Advanced Tunneling II Research Button
function createAdvancedTunnelingIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Advanced Tunneling II</strong>
        <br>
        <b>Description:</b> Uncover more subterranean mapping techniques to expand your excavation projects.
        <br>
        <b>Effect:</b> Allows up to 5 excavators to be assigned.
        <br>
        <b>Requirement:</b> 7,500 information, 250 biomites, 300 zymers, 200 fibers, 95 sludge, 35 algae
        <br>
    `;
    createResearchButton(
        advancedTunnelingIIResearch,
        "AdvancedTunnelingIIButton",
        "Advanced Tunneling II",
        tooltiptext
    );
}


// Function to create the Advanced Tunneling III Research Button
function createAdvancedTunnelingIIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Advanced Tunneling III</strong>
        <br>
        <b>Description:</b> Uncover more subterranean mapping techniques to expand your excavation projects.
        <br>
        <b>Effect:</b> Allows the assignment of two more burrowers for more efficient excavation.
        <br>
        <b>Requirement:</b> 750,000 information, 800 biomites, 600 zymers, 700 fibers, 200 sludge, 100 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Advanced Tunneling IV</li>
          </ul>
    `;
    createResearchButton(
        advancedTunnelingIIIResearch,
        "AdvancedTunnelingIIIButton",
        "Advanced Tunneling III",
        tooltiptext
    );
}


// Function to create the Advanced Tunneling IV Research Button
function createAdvancedTunnelingIVResearchButton() {
    const tooltiptext = `
        <strong>Title: Advanced Tunneling IV</strong>
        <br>
        <b>Description:</b> Leverage the most cutting-edge excavation techniques to unearth the deepest secrets of the cave system.
        <br>
        <b>Effect:</b> Allows the assignment of eight more burrowers for more efficient excavation.
        <br>
        <b>Requirement:</b> 1,250,000 information, 8000 biomites, 6000 zymers, 7000 fibers, 2000 sludge, 1000 algae
    `;
    createResearchButton(
        advancedTunnelingIVResearch, 
        "AdvancedTunnelingIVButton",
        "Advanced Tunneling IV",
        tooltiptext
    );
}


// Function to create the Cryohaline Excavation Research Button
function createCryohalineExcavationResearchButton() {
    const tooltiptext = `
        <strong>Title: Cryohaline Excavation</strong>
        <br>
        <b>Description:</b> Explore the use of salt in aiding the excavation of icy terrains.
        <br>
        <b>Effect:</b> Your workers can periodically spread salt for passive excavation in cold environments.
        <br>
        <b>Requirement:</b> 125,000 information, 19,000 biomites, 11,000 zymers, 11,000 sludge
    `;
    createResearchButton(
        cryohalineExcavationResearch, 
        "CryohalineExcavationButton",
        "Cryohaline Excavation",
        tooltiptext
    );
}


function createMemoryImprintsIResearchButton() {
    const tooltiptext = `
        <strong>Title: Memory Imprints I</strong>
        <br>
        <b>Description:</b> Research into enhancing the neural endurance of your excavators.
        <br>
        <b>Effect:</b> Enables diggers to perform extended excavation activities without frequent returns.
        <br>
        <b>Requirement:</b> 45,000 information, 45,000 warmth, 100 biomites, 100 zymers
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Memory Imprints II</li>
              <li>Excavators perform 300% more activities (5 -> 15) before returning to base</li>
          </ul>
    `;
    createResearchButton(
        memoryImprintsIResearch,
        "MemoryImprintsIButton",
        "Memory Imprints I",
        tooltiptext
    );
}


function createMemoryImprintsIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Memory Imprints II</strong>
        <br>
        <b>Description:</b> Advanced studies into the mechanisms allowing for longer operational durations.
        <br>
        <b>Effect:</b> Further improves the time diggers can remain active during excavations.
        <br>
        <b>Requirement:</b> 55,000 information, 55,000 warmth, 200 fibers
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Memory Imprints III</li>
              <li>Excavators perform 300% more activities (15 -> 45) before returning to base</li>
          </ul>
    `;
    createResearchButton(
        memoryImprintsIIResearch,
        "MemoryImprintsIIButton",
        "Memory Imprints II",
        tooltiptext
    );
}


function createMemoryImprintsIIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Memory Imprints III</strong>
        <br>
        <b>Description:</b> Finalized research on maximizing the operational longevity of diggers.
        <br>
        <b>Effect:</b> Optimizes digger activity, allowing for the longest possible excavation durations.
        <br>
        <b>Requirement:</b> 65,000 information, 65,000 warmth, 3400 sludge, 2200 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Excavators perform 300% more activities (45 -> 135) before returning to base</li>
          </ul>
    `;
    createResearchButton(
        memoryImprintsIIIResearch,
        "MemoryImprintsIIIButton",
        "Memory Imprints III",
        tooltiptext
    );
}


// Function to create the Pheromone Trails Research Button
function createPheromoneTrailsResearchButton() {
    const tooltiptext = `
        <strong>Title: Pheromone Trails</strong>
        <br>
        <b>Description:</b> Unravel the enigmatic allure of pheromones and bestow upon your diggers an intrinsic compass, leading to better excavation efficiency.
        <br>
        <b>Effect:</b> Diggers will possess an inherent navigational sense, enhancing their efficiency in returning to your cave excavation station.
        <br>
        <b>Requirement:</b> 25,000 information, 700 zymers, 200 sludge, 50 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Significant reduction in digger wander times</li>
          </ul>
    `;
    createResearchButton(
        pheromoneTrailsResearch, 
        "PheromoneTrailsButton",
        "Pheromone Trails",
        tooltiptext
    );
}


function createHydrologicCycleResearchButton() {
    let tooltiptext = `
        <strong>Title: Hydrologic Cycle</strong>
        <br>
        <b>Description:</b> Begin exploring the intricate world of fluid dynamics, harnessing the potential of the oasis to understand and exploit the cycle of water.
        <br>
        <b>Effect:</b> Achieve a 17.5% increase in the collection rates of sludge and algae, optimizing the utilization of water resources.
        <br>
        <b>Requirement:</b> 17,500 information, 250,000 nourishment.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Circadian Rhythm [Research]</li> 
              <li>17.5% generation bonus for sludge and algae.</li>
          </ul>
    `;
    createResearchButton(
        hydrologicCycleResearch,
        "HydrologicCycleButton",
        "Hydrologic Cycle",
        tooltiptext
    );
}


function createCircadianRhythmResearchButton() {
    let tooltiptext = `
        <strong>Title: Circadian Rhythm</strong>
        <br>
        <b>Description:</b> Awaken to the intrinsic cadences that orchestrate existence and the ebb and flow of your surroundings.
        <br>
        <b>Effect:</b> Empower yourself with rudimentary knowledge of natural cycles, learn to predict and plan according to the regular pulses of various processes.
        <br>
        <b>Requirement:</b> 27,500 information, 35,000 nourishment.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Increased awareness of time</li> 
          </ul>
    `;
    createResearchButton(
        circadianRhythmResearch,
        "CircadianRhythmButton",
        "Circadian Rhythm",
        tooltiptext
    );
}


// Function to create the Flocking Research Button
function createFlockingResearchButton() {
    const tooltiptext = `
        <strong>Title: Flocking</strong>
        <br>
        <b>Description:</b> Excavators learn to spread out more efficiently, increasing overall excavation speed.
        <br>
        <b>Effect:</b> Excavators will distribute more efficiently, optimizing their collective digging capabilities.
        <br>
        <b>Requirement:</b> 35,000 information, 35,000 warmth
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Unlocks Echolocation [Research]</li>
              <li>Unlocks Memory Imprints I [Research]</li>
              <li>Unlocks Fringe Dweller [Research]</li>
              <li>Unlocks Pheromones [Research]</li>
          </ul>
    `;
    createResearchButton(
        flockingResearch, 
        "FlockingButton",
        "Flocking",
        tooltiptext
    );
}


// Function to create the Cellular Conduits Research Button
function createCellularConduitsResearchButton() {
    const tooltiptext = `
        <strong>Title: Cellular Conduits</strong>
        <br>
        <b>Description:</b> Harness the architecture of nature's pathways to grant your excavators improved endurance in the frigid wastelands of the cave.
        <br>
        <b>Effect:</b> Excavators will begin constructing conduits in the ice cave. Conduit tiles enable excavators to recharge without having to return to the ice cave station (x = 500, y = 500).
        <br>
        <b>Requirement:</b> 100,000 information, 100,000 warmth, 100,000 energy, 1800 biomites, 2100 fibers, 920 sludge, 720 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Increased excavation efficiency</li>
          </ul>
    `;
    createResearchButton(
        cellularConduitsResearch, 
        "CellularConduitsButton",
        "Cellular Conduits",
        tooltiptext
    );
}


// Function to create the Auto-Constructive Synapses Research Button
function createAutoConstructiveSynapsesResearchButton() {
    const tooltiptext = `
        <strong>Title: Auto-Constructive Synapses</strong>
        <br>
        <b>Description:</b> Be inspired by the river's unyielding persistence to automate the formation of cellular pathways. A deeper understanding awaits, as natural harmonies sing the tune of innovation.
        <br>
        <b>Effect:</b> Cellular conduits within the cave will automatically construct themselves, erasing the need for manual construction.
        <br>
        <b>Requirement:</b> 250,000 information, 3000 zymers, 1500 fibers
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Improved efficiency for excavation operations</li>
              <li>Thermal Synaptic Highways [Research]</li>
          </ul>
    `;
    createResearchButton(
        autoConstructiveSynapsesResearch, 
        "AutoConstructiveSynapsesButton",
        "Auto-Constructive Synapses",
        tooltiptext
    );
}

// Function to create the Thermal Synaptic Highways Research Button
function createThermalSynapticHighwaysResearchButton() {
    const tooltiptext = `
        <strong>Title: Thermal Synaptic Highways</strong>
        <br>
        <b>Description:</b> Auto-constructive synapses generate heat and assist with excavation.
        <br>
        <b>Effect:</b> Your auto-constructive synapses now emit heat, aiding in the excavation of surrounding tiles.
        <br>
        <b>Requirement:</b> 550,000 information, 5200 zymers, 3150 fibers, 1900 sludge, 1800 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Improved efficiency for excavation operations</li>
              <li>Inferno Synapse Integration [Research]</li>
          </ul>
    `;
    createResearchButton(
        thermalSynapticHighwaysResearch, 
        "ThermalSynapticHighwaysButton",
        "Thermal Synaptic Highways",
        tooltiptext
    );
}


// Function to create the Inferno Synapse Integration Research Button
function createInfernoSynapseIntegrationResearchButton() {
    const tooltiptext = `
        <strong>Title: Inferno Synapse Integration</strong>
        <br>
        <b>Description:</b> Enhance the heat generation of your Thermal Synaptic Highways for more effective excavation.
        <br>
        <b>Effect:</b> Significantly increases the heat output of auto-constructive synapses, speeding up the melting and excavation of surrounding cave tiles.
        <br>
        <b>Requirement:</b> 1,100,000 information, 1,100,000 warmth, 10,400 zymers, 6,300 fibers, 3,800 sludge, 3,600 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Improved efficiency for excavation operations</li>
          </ul>
    `;
    createResearchButton(
        infernoSynapseIntegrationResearch, // Reference the specific research project object
        "InfernoSynapseIntegrationButton", // Unique ID for the button
        "Inferno Synapse Integration", // Button text
        tooltiptext // Tooltip text
    );
}


// Function to create the Thermogenic Resonance Research Button
function createThermogenicResonanceResearchButton() {
    const tooltiptext = `
        <strong>Title: Thermogenic Resonance</strong>
        <br>
        <b>Description:</b> Delve deep into the heart of contrasting worlds, marrying the infernal dance of magma with the serene embrace of ice. By understanding their harmonious interplay, you can now birth a worker that thrives in this delicate balance.
        <br>
        <b>Effect:</b> The Lava Burrower is awakened. With an affinity for both heat and cold, it aids in cave excavation, ensuring steady progress within these formidable terrains.
        <br>
        <b>Requirement:</b> 10,000 information, 99,000 warmth, and 2250 sludge
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Enhanced excavation through heat manipulation</li>
          </ul>
    `;
    createResearchButton(
        thermogenicResonanceResearch, 
        "ThermogenicResonanceButton",
        "Thermogenic Resonance",
        tooltiptext
    );
}


// Function to create the Enhanced Thermogenic Resonance Research Button
function createEnhancedThermogenicResonanceResearchButton() {
    const tooltiptext = `
        <strong>Title: Enhanced Thermogenic Resonance</strong>
        <br>
        <b>Description:</b> Pushing the boundaries of elemental fusion, this advanced research delves into the untapped synergies between extreme heat and profound cold. Mastery over these elements empowers you to summon a being of unparalleled prowess.
        <br>
        <b>Effect:</b> Unleash the Geo-Thermal Leviathan. A titan among workers, its capability to sculpt both fire and frost reshapes the very foundations of your domain.
        <br>
        <b>Requirement:</b> 100,000 information, 999,000 warmth, 2,500 sludge, and 2,500 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Groundbreaking advancements in thermal engineering</li>
          </ul>
    `;
    createResearchButton(
        enhancedThermogenicResonanceResearch, 
        "EnhancedThermogenicResonanceButton",
        "Enhanced Thermogenic Resonance",
        tooltiptext
    );
}




// Function to create the Trail Recognition Research Button
function createTrailRecognitionResearchButton() {
    const tooltiptext = `
        <strong>Title: Trail Recognition</strong>
        <br>
        <b>Description:</b> Dive into the mysterious intricacies of memory, teaching your excavators to remember and simplify their past journeys, finding beauty in simplicity amidst the cold and vast cave.
        <br>
        <b>Effect:</b> Excavators gain the ability to optimize their trails, improving their ability to efficiently head back to base when needing to recharge. For instance, a sequence like south → south → east → north → north becomes a simpler, direct path of just east. Complements pheromone research.
        <br>
        <b>Requirement:</b> 50,000 information, 30,000 warmth, 30,000 energy, 100 biomites, 100 fibers
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Slight improvement to excavation efficiency</li>
          </ul>
    `;
    createResearchButton(
        trailRecognitionResearch, 
        "TrailRecognitionButton",
        "Trail Recognition",
        tooltiptext
    );
}


// Function to create the Fringe Dweller Research Button
function createFringeDwellerResearchButton() {
    const tooltiptext = `
        <strong>Title: Fringe Dweller</strong>
        <br>
        <b>Description:</b> Venture into the dim boundaries of known territory to awaken a guardian of the cave's forgotten fringes. This research leads to the emergence of a specialized digger, adept in navigating the peripheries of the subterranean expanse.
        <br>
        <b>Effect:</b> Introduces the Fringe Dweller, a unique digger that focuses on exploring and mapping the outer edges of the cave. Where others may hesitate, the Fringe Dweller strides, revealing paths less traveled and secrets long hidden in the cave's secluded corners.
        <br>
        <b>Requirement:</b> 80,000 information, 80,000 warmth, 80,000 energy, 800 biomites, 800 zymers, 800 fibers, 800 sludge, 800 algae
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Enhanced exploration and mapping of the cave's outer regions</li>
          </ul>
    `;
    createResearchButton(
        fringeDwellerResearch, 
        "FringeDwellerButton",
        "Fringe Dweller",
        tooltiptext
    );
}


// Function to create the Echolocation Research Button
function createEcholocationResearchButton() {
    const tooltiptext = `
        <strong>Title: Echolocation Research</strong>
        <br>
        <b>Description:</b> Delve into the study of echolocation, using sound waves and echoes to determine the location of objects in the environment.
        <br>
        <b>Effect:</b> Cave excavators learn to locate un-excavated tiles with increased efficiency using echolocation, leading to a significant enhancement in overall excavation progress. Echolocation will be used to locate a target if an excavator performs 15 moves without encountering excavatable tiles. Max. location discovery takes place in a 50x50 grid around the excavator.
        <br>
        <b>Requirement:</b> 1,000,000 information
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Significant improvement to excavation efficiency</li>
          </ul>
    `;
    createResearchButton(
        echolocationResearch, // assuming this is the object we'll define next
        "EcholocationButton",
        "Echolocation",
        tooltiptext
    );
}


function createHarmonicSymbiosisIResearchButton() {
    const tooltiptext = `
        <strong>Title: Harmonic Symbiosis I</strong>
        <br>
        <b>Description:</b> Deepen your symbiotic connection with Solara to reduce the need for sacrifices.
        <br>
        <b>Effect:</b> Reduces Solara sacrifice costs by 10%.
        <br>
        <b>Requirement:</b> 250,000 information
        <br>
        <b>Leads to:</b> 
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Harmonic Symbiosis II [Research]</li>
              <li>10% sacrifice cost reduction</li>
          </ul>
    `;
    createResearchButton(
        harmonicSymbiosisI,
        "HarmonicSymbiosisIButton",
        "Harmonic Symbiosis I",
        tooltiptext
    );
}


function createHarmonicSymbiosisIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Harmonic Symbiosis II</strong>
        <br>
        <b>Description:</b> Deepen your symbiotic connection with Solara to reduce the need for sacrifices.
        <br>
        <b>Effect:</b> Reduces Solara sacrifice costs by 10%.
        <br>
        <b>Requirement:</b> 500,000 information
        <br>
        <b>Leads to:</b> 
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Harmonic Symbiosis III [Research]</li>
              <li>10% sacrifice cost reduction</li>
          </ul>
    `;
    createResearchButton(
        harmonicSymbiosisII,
        "HarmonicSymbiosisIIButton",
        "Harmonic Symbiosis II",
        tooltiptext
    );
}


function createHarmonicSymbiosisIIIResearchButton() {
    const tooltiptext = `
        <strong>Title: Harmonic Symbiosis III</strong>
        <br>
        <b>Description:</b> Deepen your symbiotic connection with Solara to reduce the need for sacrifices.
        <br>
        <b>Effect:</b> Reduces Solara sacrifice costs by 10%.
        <br>
        <b>Requirement:</b> 750,000 information
        <br>
        <b>Leads to:</b> 
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>10% sacrifice cost reduction</li>
          </ul>
    `;
    createResearchButton(
        harmonicSymbiosisIII,
        "HarmonicSymbiosisIIIButton",
        "Harmonic Symbiosis III",
        tooltiptext
    );
}



// Function to create the 'Echoes of the Forgotten' Research Button
function createEchoesOfTheForgottenResearchButton() {
    const tooltiptext = `
        <strong>Title: Echoes of the Forgotten</strong>
        <br>
        <b>Description:</b> Delve into the enigmatic wisdom encapsulated in the ruins. The pursuit of this knowledge might uncover secrets that are both wondrous and harrowing.
        <br>
        <b>Effect:</b> Unlocks the elusive gates leading toward the cosmos, and the untold possibilities that lie beyond.
        <br>
        <b>Requirement:</b> 100,000,000 information
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>The First Starlight (1/2) [Exploration]</li>
              <li>Awakening of Cosmic Consciousness (1/2)</li>
          </ul>
    `;
    createResearchButton(
        echoesOfTheForgottenResearch,
        "EchoesOfTheForgottenButton",
        "Echoes of the Forgotten",
        tooltiptext
    );
}


// Function to create "The Core" Research Button
function createTheCoreResearchButton() {
    const tooltiptext = `
        <strong>Title: The Core</strong>
        <br>
        <b>Description:</b> You dug ever deeper and reached the very heart of your subterranean existence. This is where answers lie, in the untouched and fiercely protected sanctum of your dwelling. Will you dare to disturb the universe?
        <br>
        <b>Effect:</b> Opens the final chamber of your underground sanctuary, revealing untold secrets and a direct path to your own transformation, as well as the world's.
        <br>
        <b>Requirement:</b> 100,000,000 information
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>The First Starlight (2/2) [Exploration]</li>
              <li>Awakening of Cosmic Consciousness (2/2)</li>
          </ul>
    `;
    createResearchButton(
        theCoreResearch,
        "TheCoreButton",
        "The Core",
        tooltiptext
    );
}


// Function to create the Ecliptic Synthesis Research Button
function createEclipticSynthesisResearchButton() {
    const tooltiptext = `
        <strong>Title: Ecliptic Synthesis</strong>
        <br>
        <b>Description:</b> A profound celestial alignment catalyzes a deeper communion between your sacrifices and Solara, magnifying their essence.
        <br>
        <b>Effect:</b> The spiritual connection with Solara intensifies, doubling the effectiveness of your resource sacrifices.
        <br>
        <b>Requirement:</b> 25,000,000 information, 25,000,000 warmth
        <br>
        <b>Leads to:</b> 
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>Doubles effectiveness of sacrifices [Solara]</li>
          </ul>
    `;
    createResearchButton(
        eclipticSynthesisResearch, 
        "EclipticSynthesisButton",
        "Ecliptic Synthesis",
        tooltiptext
    );
}


// Function to create the Primordial Sight Research Button
function createPrimordialEyesResearchButton() {
    const tooltiptext = `
        <strong>Title: Primordial Sight</strong>
        <br>
        <b>Description:</b> As the primal darkness recedes, a new sense awakens. The emergence of sight, crude and unrefined, yet full of potential to perceive the world in ways never before imagined.
        <br>
        <b>Effect:</b> Unlock the primal sense of sight, changing the way your world is perceived and interacted with. This newfound vision paves the way for advanced exploration and understanding of the universe.
        <br>
        <b>Requirement:</b> 1 billion information, warmth, energy, and nourishment; 10 million biomites, zymers, fibers, sludge, and algae.
        <br>
        <b>Leads to:</b>
          <ul style="margin-top: 5px; padding-left: 20px;">
              <li>World View [Mechanic]</li>
          </ul>
    `;
    createResearchButton(
        primordialSightResearch, 
        "PrimordialSightButton",
        "Primordial Sight",
        tooltiptext
    );
}



// Used to toggle between NEW and COMPLETED research projects
function toggleResearchFilter() {
    const researchFilters = document.getElementById('researchFilters');
    const researchItems = document.querySelectorAll('.researchButton');
    
    if (!researchFilters.classList.contains('active')) {
        // Show 'Completed' Research
        researchItems.forEach(item => {
            if (item.getAttribute('data-status') === 'completed') {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
        researchFilters.classList.add('active');
    } else {
        // Show 'New' Research
        researchItems.forEach(item => {
            if (item.getAttribute('data-status') === 'new') {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
        researchFilters.classList.remove('active');
    }
}


function checkForThermogenicResonance() {
    if (iceCaveAnalysed && volcanoDiscovered) {
        if (!researchQueue.includes('ThermogenicResonance')) {
            researchQueue.push('ThermogenicResonance');
            displayOnChat("As the cold winds of the ice cave meet the molten heat of the volcano, a new horizon of research emerges. The dance of opposites beckons, inviting deeper exploration into the fusion of extremes.");
        }
    }
}



function queueEnhancedThermogenicResonance() {
    // Wait for 30 minutes (1800000 milliseconds) before executing the logic
    setTimeout(function() {
        // Check all three conditions
        if (thermogenicResonanceResearchCompleted === true && // Condition 1
            !researchQueue.includes('EnhancedThermogenicResonance') && // Condition 2
            enhancedThermogenicResonanceResearchCompleted === false // Condition 3
        ) {
            // All conditions are met, push 'EnhancedThermogenicResonance' to the researchQueue
            researchQueue.push('EnhancedThermogenicResonance');
            populateResearchTab();
        }
    }, 1800000); // 1800000 milliseconds is 30 minutes
}
