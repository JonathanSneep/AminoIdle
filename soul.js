

function unlockSecondRowAndSoulTab() {
  // Unhide the second tab row
  document.getElementById("secondTabRow").style.display = "block";
  // Unhide the 'Soul' tab button
  document.getElementById("soulTabButton").style.display = "inline-block";
}


function updateSoulTrait(trait, soulincrement = 5) {
    // Update the soul trait counter
    switch(trait) {
        case 'Loneliness':
            loneliness+=soulincrement;
            break;
        case 'Empathy':
            empathy+=soulincrement;
            break;
        case 'Resilience':
            resilience+=soulincrement;
            break;
        case 'Curiosity':
            curiosity+=soulincrement;
            break;
        case 'Optimism':
            optimism+=soulincrement;
            break;
        case 'Anger':
            anger+=soulincrement;
            break;
    }
    // Close the modal
    var soulModal = document.getElementById('soulModal');
    document.body.removeChild(soulModal);
}


function showSoulModal(prompt, choices) {
    var existingModal = document.getElementById('soulModal');
    // If a modal is currently open, add this modal's details to the queue
    if (existingModal) {
        soulModalQueue.push({ prompt: prompt, choices: choices });
        console.log("pushed something to the queue as another modal was open");
        return;
    }
    displaySoulModal(prompt, choices);
}


function displaySoulModal(prompt, choices) {
    // Remove any existing modal
    var existingModal = document.getElementById('soulModal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    // Create the modal container
    var soulModal = document.createElement('div');
    soulModal.id = 'soulModal';
    soulModal.className = 'modal';
    // Create the modal content container
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    // Create the header with the prompt
    var h3 = document.createElement('h3');
    h3.textContent = prompt;
    modalContent.appendChild(h3);  // Add this line to append the h3 element
    // Create the choices
    for (var i = 0; i < choices.length; i++) {
        (function() {
            var button = document.createElement('button');
            button.textContent = choices[i].line; 
            button.disabled = true; // Initially disable the button

            button.onclick = function(trait, increment) {
                return function() {
                    updateSoulTrait(trait, increment);
                    // Remove current modal
                    soulModal.style.display = "none";
                    // Check if there are any modals in the queue and display the next one
                    if (soulModalQueue.length > 0) {
                        let nextModal = soulModalQueue.shift();
                        displaySoulModal(nextModal.prompt, nextModal.choices);
                    }
                };
            }(choices[i].trait, choices[i].increment || 5);  // Use specified increment, or default to 5
            modalContent.appendChild(button);
            // Enable the button after a 1-second delay
            setTimeout(function() {
                button.disabled = false;
            }, 1200);
        })(); // IIFE end
    }
    // Add the modal content to the modal
    soulModal.appendChild(modalContent);
    // Add the modal to the body
    document.body.appendChild(soulModal);
    // Show the modal
    soulModal.style.display = 'block';
} 



function setupSoulTab() {
  // Remove existing SVG if any
  var existingSvg = document.getElementById("soulSvg");
  if (existingSvg) {
    existingSvg.remove();
  }
  
  var attributes = {
    "anger": anger,
    "empathy": empathy,
    "resilience": resilience,
    "curiosity": curiosity,
    "optimism": optimism,
    "loneliness": loneliness
    };
  
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "soulSvg"); 
  svg.setAttribute("width", 300);
  svg.setAttribute("height", 300);
  
  var centerX = 150;
  var centerY = 150;
  var hexagonRadius = 100;

  // Function to draw hexagon
  function drawHexagon(radius, color, opacity) {
    var points = [];
    var angleIncrement = 2 * Math.PI / 6;
    var currentAngle = 0;
    for (var i = 0; i < 6; i++) {
      var x = centerX + radius * Math.cos(currentAngle);
      var y = centerY + radius * Math.sin(currentAngle);
      points.push([x, y]);
      currentAngle += angleIncrement;
    }
    var hexagon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    hexagon.setAttribute("points", points.map(p => p.join(",")).join(" "));
    hexagon.setAttribute("stroke", "black");
    hexagon.setAttribute("fill", color);
    hexagon.setAttribute("opacity", opacity);
    svg.appendChild(hexagon);
  }
  
  // Draw the main hexagon
  drawHexagon(hexagonRadius, "white", 0.8);
  
  // Draw smaller hexagons for radar effect
  drawHexagon(hexagonRadius * 0.6, "black", 0.1);
  drawHexagon(hexagonRadius * 0.3, "black", 0.1);
  
  var attributePolygonPoints = [];
  var angleIncrement = 2 * Math.PI / 6;
  var currentAngle = 0;
  for (var attribute in attributes) {
    var x = centerX + (hexagonRadius * (attributes[attribute] / 100)) * Math.cos(currentAngle);
    var y = centerY + (hexagonRadius * (attributes[attribute] / 100)) * Math.sin(currentAngle);
    attributePolygonPoints.push([x, y]);
    currentAngle += angleIncrement;
  }

  var attributePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  attributePolygon.setAttribute("points", attributePolygonPoints.map(p => p.join(",")).join(" "));
  attributePolygon.setAttribute("fill", "blue");
  attributePolygon.setAttribute("opacity", "0.6");
  svg.appendChild(attributePolygon);

  currentAngle = 0;
  for (var attribute in attributes) {
    var x = centerX + (hexagonRadius + 20) * Math.cos(currentAngle);
    var y = centerY + (hexagonRadius + 20) * Math.sin(currentAngle);
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "12px");
  
    // Rotations
    if (attribute === "curiosity") {
      text.setAttribute("transform", `rotate(-90, ${x}, ${y})`);
    } else if (attribute === "loneliness") {
      text.setAttribute("transform", `rotate(25, ${x}, ${y})`);
    } else if (attribute === "empathy") {
      text.setAttribute("transform", `rotate(-25, ${x}, ${y})`);
    } else if (attribute === "resilience") {
      text.setAttribute("transform", `rotate(25, ${x}, ${y})`);
    } else if (attribute === "optimism") {
      text.setAttribute("transform", `rotate(-25, ${x}, ${y})`);
    } else if (attribute === "anger") {
      text.setAttribute("transform", `rotate(90, ${x}, ${y})`);
    }

    text.textContent = attribute;
    svg.appendChild(text);
  
    // Draw radar lines
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-opacity", 0.1);
    svg.appendChild(line);

    currentAngle += angleIncrement;
  }

  document.getElementById("Soul").appendChild(svg);
}


function checkSoulModalsAndUnlock() { // used upon game load to see if soul is to be displayed
    if (shownSoulModals.length >= 1) {
        unlockSecondRowAndSoulTab();
    }
}



function displayUniverseCallModal() {
    if (!shownSoulModals.includes('soulModal_universeCall')) {
        const prompt = "Every corner unveiled, every stone turned. The reality is a blow to your core: you are alone on this plane of existence. But as the weight of your realization crushes inward, a fierce resolve flames outwards. If this planet won't yield companionship, then the vast cosmos must. As you cast your senses to the stars, what burning desire consumes you?";
        const choices = [
            {trait: 'Loneliness', line: 'It\'s a void, a relentless black hole within, threatening to consume your very essence. The universe owes you a kindred spirit.', increment: 5},
            {trait: 'Empathy', line: 'You ache not just for yourself, but for the world. In the embrace of the cosmos, you hope to find solace for both.', increment: 5},
            {trait: 'Resilience', line: 'Like a meteor refusing to burn out, you\'re determined to carve your legacy across the universe, proving your unyielding spirit.', increment: 5},
            {trait: 'Curiosity', line: 'A symphony of questions fills your being, each note more tantalizing than the last. The universe is a riddle, and you yearn to unravel it.', increment: 5},
            {trait: 'Optimism', line: 'Within the boundless canvas of the skies above you, you see a shimmering tapestry of opportunities and wonders waiting to be embraced.', increment: 5},
            {trait: 'Anger', line: 'A tempest of rage engulfs you. You vow to be the deafening roar of reckoning that echoes across galaxies.', increment: 5}
        ];
        showSoulModal(prompt, choices);
        shownSoulModals.push('soulModal_universeCall'); // Add the ID to the array to prevent re-displaying
    }
}


function displayEvolutionModal() {
    const basePrompt = "The pulse of evolution beckons, and you heed its call. From the very fibers of your being, a transformation unfolds.";

    if (evolvedToProtoWorm && !shownSoulModals.includes('soulModal_protoWormEvolution')) {
        const wormPrompt = `${basePrompt} You've embraced the elegance of the slither. The world feels different as you navigate its intricacies. What reflections stir within you as you slither forth?`;

        const wormChoices = [
            {trait: 'Loneliness', line: 'Even as you trace sinuous patterns on the earth, the echo of solitude resonates within.', increment: 5},
            {trait: 'Empathy', line: 'You feel a newfound kinship with the terrain, each slither a dance of understanding.', increment: 5},
            {trait: 'Resilience', line: 'Your graceful undulations are a testament to your unwavering will, adapting seamlessly to the world’s challenges.', increment: 5},
            {trait: 'Curiosity', line: 'The world reveals novel secrets to you with each sinuous motion, inviting exploration.', increment: 5},
            {trait: 'Optimism', line: 'With every graceful slither, a budding hope grows, painting the world in brighter hues.', increment: 5},
            {trait: 'Anger', line: 'The world may have been a cage, but your slithers are acts of defiance, breaking free from past constraints.', increment: 5}
        ];

        showSoulModal(wormPrompt, wormChoices);
        shownSoulModals.push('soulModal_protoWormEvolution');
    } 
    else if (evolvedToProtoPod && !shownSoulModals.includes('soulModal_protoPodEvolution')) {
        const podPrompt = `${basePrompt} You've adopted the tenacity of the crawl. With newfound limbs, the world sprawls open before you. How does this metamorphosis into a crawler resonate with your essence?`;

        const podChoices = [
            {trait: 'Loneliness', line: 'With each crawl, the expansive world magnifies your solitude, making you yearn for connection.', increment: 5},
            {trait: 'Empathy', line: 'Your limbs touch the world gently, creating a bond of shared experiences and stories.', increment: 5},
            {trait: 'Resilience', line: 'Every crawl is a mark of your indomitable spirit, asserting your presence in an ever-changing world.', increment: 5},
            {trait: 'Curiosity', line: 'Each step unfolds a myriad of wonders, and the world beckons with mysteries to be uncovered.', increment: 5},
            {trait: 'Optimism', line: 'The horizon is not a distant dream but a tangible reality, reachable with each determined crawl.', increment: 5},
            {trait: 'Anger', line: 'The terrain, once a challenge, now succumbs to your determined crawl, feeling the weight of your resolve.', increment: 5}
        ];

        showSoulModal(podPrompt, podChoices);
        shownSoulModals.push('soulModal_protoPodEvolution');
    }
}




// Initialize Tone.js
// We begin playing melancholic music when the player first begins to wiggle
// This music later evolves to match the players soul statistics
function initTone(chordsToPlay = 10) {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine",
    },
  }).toDestination();
  let chordCount = 0;
  let startVolume = 0; // Start at 0 dB
  let endVolume = -30; // End at -30 dB
  let decreaseBy = (endVolume - startVolume) / chordsToPlay; // Decrease volume by this amount with each chord
  function playSadChord() {
    const chords = [
      ["A2", "C3", "E3"],  // Am
      ["F2", "A2", "C3"],  // F
      ["C2", "E2", "G2"],  // C
      ["G2", "B2", "D3"],  // G
    ];
    const randomChord = chords[Math.floor(Math.random() * chords.length)];
    synth.volume.value = startVolume + decreaseBy * chordCount;
    synth.triggerAttackRelease(randomChord, "1m");
    chordCount++;
  }
  let id = Tone.Transport.scheduleRepeat(time => {
    playSadChord();
    if (chordCount >= chordsToPlay) {
      Tone.Transport.clear(id);
      synth.dispose(); // Optional: remove the synth to free up resources
    }
  }, "2m");
  Tone.Transport.start();
}



function playEchoSound(echoStrength = 1, responseStrength = 0) {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  // Initialize the synth
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine",
    },
  }).toDestination();
  // Initialize the delay
  const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  // Create an echo sound (You can adjust this to make it more complex based on echoStrength)
  const echoChord = ["C3", "D3", "G3"];

  // Adjust volume based on echoStrength
  synth.volume.value = -30 + echoStrength * 10; // Adjust as necessary

  // Play the echo
  synth.triggerAttackRelease(echoChord, "4n");
  // Connect the synth to the delay to create an echo effect
  synth.connect(delay);
  // Simulate the echo response
  setTimeout(() => {
    if (responseStrength > 0) {
      // Add some subtle variations to simulate an echo response
      const responseChord = echoChord.map(note => {
        // Shift each note up by one semitone
        return Tone.Frequency(note).transpose(1).toNote();
      });

      // Adjust volume based on responseStrength
      synth.volume.value = -30 + responseStrength * 10; // Adjust as necessary

      // Play the echo response
      synth.triggerAttackRelease(responseChord, "4n");
    }
  }, 5000);  // 5 second delay for the response
  // Clean up
  setTimeout(() => {
    synth.dispose();
    delay.dispose();
  }, 9000);  // Clean up 9 seconds later
}




function playDivisionSound() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }

  // Initialize the basic Synth with a Sine oscillator
  const synth = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.1,  // Slow attack to soften the start
      decay: 0.1,   // Quick decay to mimic a 'plop' sound
      sustain: 0.1, // Low sustain to prevent the note from extending
      release: 0.3  // Moderate release for a rounded end
    }
  }).toDestination();
  
  // Adjust volume
  synth.volume.value = -20;

  // Trigger the Synth
  synth.triggerAttackRelease("C4", "8n"); // Short note duration to mimic a 'plop'
}




function playDiggerSound() {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    // Notes adjusted for slightly higher pitch clarity
    const notes = ["C3", "D3", "E3", "F3"];
    const chosenNote = notes[Math.floor(Math.random() * notes.length)];

    const synth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        oscillator: {
            type: "triangle"  // Switched to triangle for a chirpier sound
        },
        envelope: {
            attack: 0.01,     // Faster attack for a sharper beginning
            decay: 0.4,       // Shortened decay
            sustain: 0.01,    // Shortened sustain
            release: 0.8,     // Slightly shorter release
            attackCurve: "exponential"
        }
    }).toDestination();

    // Adjust volume
    synth.volume.value = -20;

    // Trigger the Synth with a random note
    synth.triggerAttackRelease(chosenNote, "8n");
}




/**
 * Play a test sound based on the provided parameters.
 * @param {string} synthType - The type of synth to use. Options: 'Synth', 'MembraneSynth', 'AMSynth', 'FMSynth', etc.
 * @param {string} oscillatorType - The type of oscillator. Options: 'sine', 'square', 'triangle', 'sawtooth'.
 * @param {string} note - The musical note to play, e.g., 'C2', 'D3', etc.
 * @param {Object} envelope - The envelope configuration for the synth.
 * @param {number} volume - The volume level for the sound.
 */
function testSound(synthType = 'Synth', oscillatorType = 'sine', note = 'C4', envelope = {}, volume = -20) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    let defaultEnvelope = {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.1,
        release: 0.3
    };

    // Merge the provided envelope with the default one
    envelope = { ...defaultEnvelope, ...envelope };

    let synth;
    switch (synthType) {
        case 'MembraneSynth':
            synth = new Tone.MembraneSynth({ oscillator: { type: oscillatorType }, envelope }).toDestination();
            break;
        case 'AMSynth':
            synth = new Tone.AMSynth({ oscillator: { type: oscillatorType }, envelope }).toDestination();
            break;
        case 'FMSynth':
            synth = new Tone.FMSynth({ oscillator: { type: oscillatorType }, envelope }).toDestination();
            break;
        // Extend with more synths as needed...
        default:
            synth = new Tone.Synth({ oscillator: { type: oscillatorType }, envelope }).toDestination();
            break;
    }

    // Adjust volume
    synth.volume.value = volume;

    // Trigger the Synth with the provided note
    synth.triggerAttackRelease(note, "8n");
}

// Example usage:
// testSound('MembraneSynth', 'triangle', 'D3', { attack: 0.05, decay: 0.4, sustain: 0.01, release: 0.8 });


function enableCellularConduits() {
    // Define the content for your modal
    let prompt = "Guide your excavators with a cellular conduit blueprint drawn from your soul's essence.";

    // Assuming stats are defined globally or are accessible here
    let conduits = [
        { name: 'Resilience', stat: resilience, drawFunction: drawPreviewResilienceHighway, executeFunction: drawResilienceHighway },
        { name: 'Loneliness', stat: loneliness, drawFunction: drawPreviewLonelinessHighway, executeFunction: drawLonelinessHighway },
        { name: 'Curiosity', stat: curiosity, drawFunction: drawPreviewCuriosityHighway, executeFunction: drawCuriosityHighway },
        { name: 'Optimism', stat: optimism, drawFunction: drawPreviewOptimismHighway, executeFunction: drawOptimismHighway },
        { name: 'Anger', stat: anger, drawFunction: drawPreviewAngerHighway, executeFunction: drawAngerHighway },
        { name: 'Empathy', stat: empathy, drawFunction: drawPreviewEmpathyHighway, executeFunction: drawEmpathyHighway }
    ];

    // Filter conduits based on their stat values
    let availableConduits = conduits.filter(conduit => conduit.stat > 15);

    // Sort them by their stat values
    availableConduits.sort((a, b) => b.stat - a.stat);

    // If there's only one >15, randomly pick a second from the remaining options
    if (availableConduits.length === 1) {
        let otherConduits = conduits.filter(conduit => conduit.name !== availableConduits[0].name);
        let randomIndex = Math.floor(Math.random() * otherConduits.length);
        availableConduits.push(otherConduits[randomIndex]);
    } else if (availableConduits.length > 2) {
        // If there's a tie for second place, choose one at random
        if (availableConduits[1].stat === availableConduits[2].stat) {
            let randomIndex = Math.random() < 0.5 ? 1 : 2;
            availableConduits[1] = availableConduits[randomIndex];
        }
    }

    // Take the top two (or less)
    let topConduits = availableConduits.slice(0, 2);

    let choices = topConduits.map(conduit => {
        return {
            action: function() {
                console.log(`${conduit.name} design selected`);
                conduit.executeFunction(); // Calls the main drawing function for the selected conduit
                closeSoulModal();
            },
            canvasDrawFunction: conduit.drawFunction
        };
    });

    showSoulModalWithCanvas(prompt, choices);
}



function showSoulModalWithCanvas(prompt, choices) {
    var existingModal = document.getElementById('soulModal');
    if (existingModal) {
        soulModalQueue.push({ prompt: prompt, choices: choices });
        return;
    }

    // Create the modal container
    var soulModal = document.createElement('div');
    soulModal.id = 'soulModal';
    soulModal.className = 'modal';

    // Create the modal content container
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create the header with the prompt
    var h3 = document.createElement('h3');
    h3.textContent = prompt;
    h3.style.fontSize = '16px'; 
    modalContent.appendChild(h3);

    // Add choices along with canvas previews
    let choicesContainer = document.createElement('div');
    choicesContainer.style.display = 'flex'; // Display designs side-by-side
    choicesContainer.style.justifyContent = 'space-evenly'; // Evenly distribute space between and around the items
    modalContent.appendChild(choicesContainer);

    for (var i = 0; i < choices.length; i++) {
        let canvasContainer = document.createElement('div');
        canvasContainer.style.margin = '0 15px'; // Some spacing between the designs

        let canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.border = "1px solid black";
        
        choices[i].canvasDrawFunction(canvas); // Draws the preview on the canvas

        canvasContainer.appendChild(canvas);
        choicesContainer.appendChild(canvasContainer);

        canvas.onclick = choices[i].action; // Makes the entire canvas clickable
    }

    // Add the modal content to the modal
    soulModal.appendChild(modalContent);

    // Add the modal to the body
    document.body.appendChild(soulModal);

    // Show the modal
    soulModal.style.display = 'block';
}


// Function to close the modal
function closeSoulModal() {
    let modal = document.getElementById('soulModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Optional: this will remove the modal from the DOM entirely.
    }
}


function drawPreviewResilienceHighway(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    let hexHeight = 29; // reduced size
    let hexRadius = hexHeight / 2;
    let hexWidth = Math.sqrt(3) * hexRadius;
    let hexHalfHeight = hexHeight / 2;
    let hexagonsHorizontally = Math.ceil(canvas.width / hexWidth) + 1;
    let hexagonsVertically = Math.ceil(canvas.height / hexHeight) + 1;

    ctx.strokeStyle = "black";  // Set the line color

    for (let row = 0; row < hexagonsVertically; row++) {
        for (let col = 0; col < hexagonsHorizontally; col++) {
            let x = col * hexWidth;
            let y = hexHeight * row + (col % 2 === 1 ? hexHalfHeight : 0);
            drawSmallHexagon(ctx, x, y, hexRadius);
        }
    }
}

function drawSmallHexagon(ctx, x, y, radius) {
    ctx.beginPath();
    for (let side = 0; side < 7; side++) { // Draw 7 points to complete the hexagon
        let coordX = x + radius * Math.cos(side * 2 * Math.PI / 6);
        let coordY = y + radius * Math.sin(side * 2 * Math.PI / 6);
        if (side === 0) {
            ctx.moveTo(coordX, coordY);
        } else {
            ctx.lineTo(coordX, coordY);
        }
    }
    ctx.stroke();
}


function drawPreviewLonelinessHighway(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // Drawing a central vertical line with minor irregularities
    let currentX = canvas.width / 2;
    ctx.beginPath();
    for (let y = 0; y <= canvas.height; y++) {
        if (Math.random() < 0.2) {
            currentX += (Math.random() < 0.5) ? 1 : -1;
        } else {
            currentX = canvas.width / 2; // Return to center
        }
        ctx.lineTo(currentX, y);
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Drawing horizontal segments to simulate the branching parts of the highway
    // Updated positions for 4 splits on either side
    let segmentPositions = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];
    let segmentLength = canvas.width / 2; // Dividing canvas width by two, we'll reach the edges with each horizontal line. Can be adjusted as required.

    segmentPositions.forEach((position, index) => {
        let posY = canvas.height * position + (Math.random() * 10 - 5); // Slight randomization for drama
        let direction = (index % 2 === 0) ? -segmentLength : segmentLength; // Alternate directions
        drawPreviewLonelinessSegment(ctx, canvas.width, posY, direction);
    });
}


function drawPreviewLonelinessSegment(ctx, canvasWidth, startingY, length) {
    let currentY = startingY;
    let endX = (canvasWidth / 2) + length;
    ctx.beginPath();
    if (length > 0) {
        for (let x = canvasWidth / 2; x <= endX; x++) {
            if (Math.random() < 0.2) {
                currentY += (Math.random() < 0.5) ? 1 : -1;
            }
            ctx.lineTo(x, currentY);
        }
    } else {
        for (let x = canvasWidth / 2; x >= endX; x--) {
            if (Math.random() < 0.2) {
                currentY += (Math.random() < 0.5) ? 1 : -1;
            }
            ctx.lineTo(x, currentY);
        }
    }
    ctx.stroke();
}


function drawPreviewCuriosityHighway(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    const gridSpacing = 11;
    const gridWidth = Math.ceil(canvas.width / gridSpacing);
    const gridHeight = Math.ceil(canvas.height / gridSpacing);

    const visited = Array(gridWidth).fill(null).map(() => Array(gridHeight).fill(false));

    const directions = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
    ];

    function drawDeviatedLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function getVisitedNeighborsWithUnvisited(x, y) {
        return directions
            .map(d => ({
                dx: d.dx,
                dy: d.dy,
                x: x + d.dx,
                y: y + d.dy,
            }))
            .filter(
                d =>
                    d.x >= 0 &&
                    d.x < gridWidth &&
                    d.y >= 0 &&
                    d.y < gridHeight &&
                    visited[x][y] && // Ensure starting cell is visited
                    !visited[d.x][d.y] // and neighbor is not visited
            );
    }

    let unvisitedCount = gridWidth * gridHeight;
    // Start with a random cell
    let startX = Math.floor(Math.random() * gridWidth);
    let startY = Math.floor(Math.random() * gridHeight);
    visited[startX][startY] = true;
    unvisitedCount--;

    while (unvisitedCount > 0) {
        // Randomly select a visited cell
        let currentX, currentY;
        do {
            currentX = Math.floor(Math.random() * gridWidth);
            currentY = Math.floor(Math.random() * gridHeight);
        } while (!visited[currentX][currentY]);

        // Get the unvisited neighbors of the selected cell
        const neighbors = getVisitedNeighborsWithUnvisited(currentX, currentY);
        if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            drawDeviatedLine(
                currentX * gridSpacing,
                currentY * gridSpacing,
                randomNeighbor.x * gridSpacing,
                randomNeighbor.y * gridSpacing
            );
            visited[randomNeighbor.x][randomNeighbor.y] = true;
            unvisitedCount--;
        }
    }
}









function drawPreviewOptimismHighway(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let numberOfRays = 8;  // Reduced number for preview size

    function calculateMaxRayLength(x, y, angle) {
        let targetX = x + Math.cos(angle) * canvas.width;
        let targetY = y + Math.sin(angle) * canvas.height;
        let distanceX = (targetX < centerX) ? x / Math.abs(Math.cos(angle)) : (canvas.width - x) / Math.abs(Math.cos(angle));
        let distanceY = (targetY < centerY) ? y / Math.abs(Math.sin(angle)) : (canvas.height - y) / Math.abs(Math.sin(angle));
        return Math.min(distanceX, distanceY) - 5; // Subtracting 5 pixels for margin in preview size
    }

    function drawRadiantRay(startX, startY, angle) {
        let maxLength = calculateMaxRayLength(startX, startY, angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        let splitX, splitY;
        
        let splitAt = 1/2 * maxLength;  // Split rays earlier at 1/2 mark
        
        while (Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2) < maxLength) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : -1) : 0;

            let nextX = currentX + directionX * 2 + deviation;  // Reduced step size for preview
            let nextY = currentY + directionY * 2 + deviation;
            
            currentX = nextX;
            currentY = nextY;

            ctx.lineTo(currentX, currentY);
            
            if (Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2) >= splitAt) {
                splitX = splitX || currentX;
                splitY = splitY || currentY;
            }
        }
        
        ctx.stroke();
        return { x: splitX, y: splitY };
    }

    for (let i = 0; i < numberOfRays; i++) {
        let angle = (2 * Math.PI / numberOfRays) * i;
        let splitPoint = drawRadiantRay(centerX, centerY, angle);

        // Branching off two smaller rays from the main ray at about the 1/2 mark and with wider angles
        drawRadiantRay(splitPoint.x, splitPoint.y, angle + (Math.PI / 12));  // Increased the angle for wider split
        drawRadiantRay(splitPoint.x, splitPoint.y, angle - (Math.PI / 12));  // Increased the angle for wider split
    }
}



function drawPreviewAngerHighway(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = 1;

    let center = {x: canvas.width / 2, y: canvas.height / 2};
    let angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];

    angles.forEach(angle => {
        drawLightningBolt(center.x, center.y, angle, canvas.width * 0.3);
    });

    function drawLightningBolt(x, y, angle, distance) {
        if (distance <= 10) return;

        let deviation = (Math.random() - 0.5) * 2 * (Math.PI / 12); // deviate up to 15 degrees
        angle += deviation;

        let endX = x + Math.cos(angle) * distance;
        let endY = y + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.moveTo(x, y);
        
        let currentPositionX = x;
        let currentPositionY = y;
        
        while (Math.sqrt((currentPositionX - x) ** 2 + (currentPositionY - y) ** 2) < distance) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let organicDeviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 0.5 : -0.5) : 0; // Slight organic deviation for preview size

            currentPositionX += directionX + organicDeviation;
            currentPositionY += directionY + organicDeviation;

            ctx.lineTo(currentPositionX, currentPositionY);
        }

        ctx.stroke();

        let newDistance = distance * (0.5 + Math.random() * 0.5); // Random factor to reduce uniformity
        
        // Adjusting branching angles for the preview size
        let branchAngle1 = angle - (Math.PI / 9); // 20 degrees to the left
        let branchAngle2 = angle + (Math.PI / 9); // 20 degrees to the right

        // Slightly increasing the probability of branch spawning for the preview
        if (Math.random() < 0.96) {
            drawLightningBolt(currentPositionX, currentPositionY, branchAngle1, newDistance);
        }
        if (Math.random() < 0.96) {
            drawLightningBolt(currentPositionX, currentPositionY, branchAngle2, newDistance);
        }
        
        drawLightningBolt(currentPositionX, currentPositionY, angle, newDistance); // Continue in the main direction
    }
}


function drawPreviewEmpathyHighway(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = 1;

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Draw fewer radial lines for the preview with subtle natural variations
    let numberOfRadials = 6; 
    for (let i = 0; i < numberOfRadials; i++) {
        let angle = (2 * Math.PI / numberOfRadials) * i;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        
        let currentPositionX = centerX;
        let currentPositionY = centerY;
        
        while(Math.sqrt((currentPositionX - centerX) ** 2 + (currentPositionY - centerY) ** 2) < canvas.width * 0.45) {
            let directionX = Math.cos(angle);
            let directionY = Math.sin(angle);
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 0.5 : -0.5) : 0; // Reduced deviation for preview

            currentPositionX += directionX + deviation;
            currentPositionY += directionY + deviation;

            ctx.lineTo(currentPositionX, currentPositionY);
        }
        ctx.stroke();
    }

    // Draw fewer concentric curved lines for the preview with subtle irregularities
    let numberOfCircles = 3;
    for (let i = 1; i <= numberOfCircles; i++) {
        let radius = (canvas.width * 0.45 / numberOfCircles) * i;
        
        ctx.beginPath();
        ctx.moveTo(centerX + radius, centerY);

        for (let angle = 0; angle <= 2 * Math.PI; angle += 0.02) { // Reduced iterations for preview
            let perfectX = centerX + radius * Math.cos(angle);
            let perfectY = centerY + radius * Math.sin(angle);
            
            let deviation = Math.random() < 0.2 ? (Math.random() < 0.5 ? 0.5 : -0.5) : 0;

            let deviatedX = perfectX + deviation;
            let deviatedY = perfectY + deviation;

            ctx.lineTo(deviatedX, deviatedY);
        }

        ctx.closePath(); // Close the circle
        ctx.stroke();
    }
}



function displaySoulTutorialModal() {
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

    // Add the image
    var img = document.createElement('img');
    img.src = 'img/tut_soul.png'; // Image source for the soul tutorial
    img.style.border = '1px solid black';
    img.style.marginBottom = '20px';
    img.style.width = '50%';
    img.style.maxWidth = '300px';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.marginLeft = 'auto';
    img.style.marginRight = 'auto';
    modalContent.appendChild(img);

    // Introduction text
    var introText = "The soul radar graph is a visual representation of the soul and personality you are forging through your choices. Each decision subtly impacts gameplay, affecting evolutionary paths, narrative elements, and game mechanics. This dynamic system reflects the uniqueness of your journey, creating a personalized experience shaped by your interactions and choices.";

    var p = document.createElement('p');
    p.textContent = introText;
    modalContent.appendChild(p);

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

function maybeDisplaySoulTutorial() {
    console.log("DEBUG: calling Soul tutorial modal");
    if (tutorialsDisplayed.includes('soultutorial')) {
        return; // If the tutorial has been shown before, we simply exit
    }
    displaySoulTutorialModal(); 
    tutorialsDisplayed.push('soultutorial'); // Add the identifier to the array to mark it as shown
}

