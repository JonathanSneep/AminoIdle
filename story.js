

var nourishmentStoryLines = [
  { text: "You awake in darkness...", nourishment: 1 },
  { text: "You realize you can wiggle...", nourishment: 2 },
  { text: "You sense the presence of nourishment...", nourishment: 5 },
  { text: "You are alone...", nourishment: 7 },
  { text: "A distant echo resonates within you, a call to move forward...", nourishment: 239 },
  { text: "The oppressive silence weighs heavily on you. Are you the only one?", nourishment: 369 },
  { text: "The endless void around you seems to mock your existence, yet you persist...", nourishment: 452 },
  { text: "In the darkness, you continue to grow, driven by an inexplicable will...", nourishment: 650 },
  { text: "You reach out to the void, seeking, hoping...", nourishment: 870 },
  { text: "With every passing moment, your existence seems both a miracle and a curse...", nourishment: 1210 },
  { text: "You feel an odd sense of purpose... Are you destined for something more?", nourishment: 1604 },
  { text: "The cold emptiness around you only fuels your resolve...", nourishment: 1990 }
];





var tendonStoryLines = [
  "A strange sensation pulses through you as something new takes shape. It's strange, it's new... it's growth.",
  "The tendrils multiply, each one strengthening your sense of the world around you.",
  "As each new filament forms, you feel yourself becoming more attuned to the subtle shifts in the environment.",
  "With every new growth, your understanding deepens. You are more than you were.",
  "Your tendrils reach out, brushing against the boundaries of your existence."
];

// Story lines
var senseStoryLines = [
  { text: "You feel a strange pull...", information: 1 },
  { text: "Images, sounds, feelings flood your consciousness...", information: 3 },
  { text: "You can sense the world around you. It's vast and overwhelming...", information: 5 },
  { text: "You yearn for more. To know more. To understand...", information: 10 },
  { text: "You begin to understand. The world is no longer just chaos, but a puzzle to be solved. A puzzle you face alone.", information: 100 },
  { text: "Patterns emerge from the chaos. You anticipate, you adapt, you learn. Yet, learning only deepens your solitude.", information: 250 },
  { text: "You have a sense of the world now. It's complex, vast, beautiful... and utterly devoid of others like you.", information: 500 },
  { text: "You understand now. The world, in all its complexity, is an extension of you. And you are a part of it. But this understanding brings a chilling realization - you are utterly alone.", information: 1000 }
];

var glowStoryLines = [
  { text: "You feel a warmth building within you...", warmth: 1 },
  { text: "Light begins to radiate from your form...", warmth: 3 },
  { text: "You shine brightly, piercing the darkness...", warmth: 5 },
  { text: "Your glow is comforting, yet lonely. You yearn for another...", warmth: 10 },
  { text: "Your glow pierces the darkness. A beacon of solitude amidst the void.", warmth: 100 },
  { text: "Your glow is constant, comforting. A solitary reminder of your existence.", warmth: 250 },
  { text: "Your light fills the world. It reveals the secrets of the darkness, and the stark truth of your loneliness.", warmth: 500 },
  { text: "You are the light. You are warmth. You are life. And you are alone.", warmth: 1000 }
];

var grabStoryLines = [
  { text: "You reach out. For what, you're not sure...", energy: 1 },
  { text: "You feel a connection, a tug...", energy: 3 },
  { text: "You can interact, move things, change things...", energy: 5 },
  { text: "You are powerful, yet powerless. You yearn for change...", energy: 10 },
  { text: "You are powerful, your energy is limitless. But with no one to share it with, does it matter?", energy: 100 },
  { text: "You shape the world around you. Your will is law. Yet, your rule is over an empire of one.", energy: 250 },
  { text: "You are unstoppable, a force of nature. But nature is indifferent to your solitude.", energy: 500 },
  { text: "You are the world. And the world is you. A world of one.", energy: 1000 }
];





// Map-related story events for different terrains
var landEvents = [
    "You feel a solid surface beneath for the first time. The unfamiliar sensation is both intriguing and comforting.",
    "As you move through the land, you sense the rhythmic vibrations of distant entities. Curiosity grows.",
    // ... additional land events
];
var waterEvents = [
    "You feel at home in the gentle embrace of the water, the cool currents flowing past your form.",
    "Tiny particles float past, remnants of ancient times, sparking memories deep within you.",
    // ... additional water events
];
var desertEvents = [
    "A parching warmth envelops you, a vast expanse where the air seems to thirst. It's an environment that demands resilience.",
    "A vast emptiness stretches before you, its silence profound. It's a place of both desolation and peace.",
    "The sands shift beneath, each grain a testament to the passage of time. Here, in the quiet, memories of distant epochs stir.",
    "Occasionally, a whisper of wind stirs the sands, creating patterns that tell tales of ages gone by. You wonder about the stories they hold.",
    // ... additional desert events
];
var forestEvents = [
    "The dense canopy above provides a protective embrace. But within the shadows, a deep solitude persists.",
    "The quiet rustle of leaves carries whispers from ages past. They speak of times both vibrant and desolate.",
    "Each tree stands tall, a lone sentinel with roots deep in history. Their collective silence speaks volumes.",
    "In the midst of the forest, you feel both sheltered and isolated, reminded of the delicate balance between life and loneliness.",
    // ... additional forest events
];
var mountainEvents = [
    "The rugged terrain challenges every move, a testament to the enduring spirit needed to traverse these heights.",
    "Majestic peaks rise above, ancient and unyielding. They have seen countless eons pass, standing solitary and proud.",
    "The crisp mountain air is both invigorating and isolating, a stark reminder of the thin line between existence and oblivion.",
    "As you ascend, the world below seems distant, a faded memory. Here, amidst the peaks, solitude reigns supreme.",
    // ... additional mountain events
];
var swampEvents = [
    "The stagnant waters reflect a distorted world, echoing your feelings of being lost and adrift.",
    "Each movement is met with resistance, as the swamp clings to you, urging patience. It's a world of slow revelations and hidden mysteries.",
    "As you delve deeper, the dense atmosphere feels almost suffocating, a sensation that mirrors your growing despair.",
    "Amidst the haze, you sense ancient rhythms, cycles that have repeated for eons. The swamp, though foreboding, holds tales of endurance and adaptation.",
    // ... additional water events
];
var iceEvents = [
    "A biting chill greets you, a world blanketed in white. The stillness is both haunting and beautiful, a testament to the extremes of nature.",
    "Every motion feels amplified in the quiet, the ice beneath echoing each gesture. This frozen expanse speaks of solitude and the stark beauty of isolation.",
    // ... additional water events
];





// Function to append new story text
function appendText(text, p, storyDiv, delay = 10) {
  storyQueue.push({ text, p, storyDiv, delay });
  if (!isWriting) {
    processStoryQueue();  // Start processing if not currently writing
  }
}

function processStoryQueue() {
  if (storyQueue.length === 0) {
    isWriting = false;
    console.log("Queue is empty. Exiting...");
    return;
  }
  isWriting = true;
  const { text, p, storyDivId, delay, message, type, isChatMessage } = storyQueue.shift();
  let storyDiv = document.getElementById(storyDivId); // Attempt to fetch the storyDiv
  if (!storyDiv) {
    //console.warn("storyDiv not found. Attempting to redefine...");
    storyDiv = document.getElementById("story"); // Attempt to redefine storyDiv
  }
  if (!storyDiv) {
    console.error("storyDiv is still undefined or not a DOM element.");
    return;
  }
  //console.log("storyDiv:", storyDiv); // Debug log
  if (!p && !isChatMessage) return;
  if (!storyDiv) {
    console.error("storyDiv is undefined or not a DOM element.");
    return;
  }
  // Create necessary elements
  var span = document.createElement("span");
  span.className = "new-text";
  // Determine whether it's a chat message or a story message
  let content = isChatMessage ? message : text;
  let container = isChatMessage ? document.createElement("p") : p;
  if (container) {
    container.appendChild(span);
  }
  if (isChatMessage) {
    if (storyDiv instanceof HTMLElement) { // Check if storyDiv is a DOM element
      storyDiv.appendChild(container);
    } else {
      console.error("storyDiv is not a DOM element");
      return;
    }
  }
  let position = 0;
  let intervalDelay = isChatMessage ? 10 : delay; // can adjust this as needed
  function updateCharacter() {
  // Add a check for undefined content
  if (typeof content !== 'string' || content.length === 0 || position >= content.length) {
    console.log("Undefined content or position in updateCharacter (processStoryQueue): ", { content, position });
    isWriting = false; // Stop writing
    processStoryQueue(); // Process the next item in the queue
    return; // Exit the function
  }
  span.appendChild(document.createTextNode(content[position]));
  storyDiv.scrollTop = storyDiv.scrollHeight; // Scroll to the end of the story div
  position++;
  if (position < content.length) {
    setTimeout(updateCharacter, intervalDelay);
  } else {
      // Append a space character after finishing the text sequence
      span.appendChild(document.createTextNode(' '));
      if (isChatMessage) {
        // Set color based on message type
        switch (type) {
          case 'hint':
            span.style.color = "blue"; // Color for hints
            break;
          case 'warning':
            span.style.color = "red"; // Color for warnings
            break;
          default:
            span.style.color = "#00008B"; // Default color for normal messages
            break;
        }
        storyDiv.appendChild(container);
      } else {
        Array.from(storyDiv.getElementsByClassName("new-text")).forEach((element) => {
          element.style.color = "#000";
        });
        span.style.color = "#00008B";
      }
      isWriting = false;
      processStoryQueue(); // Process the next item in the queue
    }
  }
  updateCharacter();
}



// The function to update the story chat
function updateStory(actionType) {
    var storyDiv = document.getElementById("story");
    // Initialize the story paragraph if startNewParagraph is true
    var p = startNewParagraph ? null : storyDiv.querySelector("p:last-child");
    if (!p) {
        p = document.createElement("p");
        storyDiv.appendChild(p);
    }
    // Check nourishment story lines
    if (actionType === "wiggle") {
        updateNourishmentStory();
    }
    // Check tendon story lines
    if (actionType === "tendon") {
        while(tendonStoryIndex < tendonStoryLines.length && tendons > tendonStoryIndex) {
            appendText(tendonStoryLines[tendonStoryIndex], p, storyDiv);
            tendonStoryIndex++;
        }
    }
    // Check sense story lines
    if (actionType === "sense") {
        while(senseStoryIndex < senseStoryLines.length && information > senseStoryIndex * 2) {
            appendText(senseStoryLines[senseStoryIndex].text, p, storyDiv);
            senseStoryIndex++;
        }
    }
    // Check glow story lines
    if (actionType === "glow") {
        while(glowStoryIndex < glowStoryLines.length) {
            var storyLine = glowStoryLines[glowStoryIndex];
            if(warmth >= storyLine.warmth) {
                appendText(storyLine.text, p, storyDiv);
                glowStoryIndex++;
            } else {
                break;
            }
        }
    }
    // Check grab story lines
    if (actionType === "grab") {
        while(grabStoryIndex < grabStoryLines.length) {
            var storyLine = grabStoryLines[grabStoryIndex];
            if(energy >= storyLine.energy) {
                appendText(storyLine.text, p, storyDiv);
                grabStoryIndex++;
            } else {
                break;
            }
        }
    }
    // Reset the startNewParagraph flag
    startNewParagraph = false;
    // Scroll to the end of the story div
    storyDiv.scrollTop = storyDiv.scrollHeight;
}



// Function to update nourishment story
function updateNourishmentStory() {
    var storyDiv = document.getElementById("story");
    var p = storyDiv.querySelector("p:last-child");
    if (!p) {
        p = document.createElement("p");
        storyDiv.appendChild(p);
    }
    if (nourishment >= 369 && !shownSoulModals.includes('soulModal_1')) {
        var prompt = "The oppressive silence weighs heavily on you. Are you the only one?";
        var choices = [
            {trait: 'Loneliness', line: 'You feel abandoned, adrift in a sea of emptiness.'},
            {trait: 'Empathy', line: 'You feel a deep sense of connection with the void.'},
            {trait: 'Resilience', line: 'You feel unbreakable, fortified by your solitude.'},
            {trait: 'Curiosity', line: 'You feel a burning question, an itch to know the unknown.'},
            {trait: 'Optimism', line: 'You feel a glimmer of hope, a twinkle in the vast darkness.'},
            {trait: 'Anger', line: 'You feel a spark of fury, a wildfire in a starless night.'}
        ];
        showSoulModal(prompt, choices);
        unlockAchievement(31);
        soulModal_1_Shown = true; // Set this variable to true to prevent the modal from appearing again
        shownSoulModals.push('soulModal_1'); // Add the ID to the array to prevent re-displaying
        unlockSecondRowAndSoulTab();
    }
    if (nourishmentStoryIndex < nourishmentStoryLines.length) {
        var storyLine = nourishmentStoryLines[nourishmentStoryIndex];
        if (nourishment >= storyLine.nourishment) {
            appendText(storyLine.text, p, storyDiv);
            nourishmentStoryIndex++;
        }
    }
}




function addStoryLine(text) {
    var storyDiv = document.getElementById("story");
    // Initialize the story paragraph if startNewParagraph is true
    var p = startNewParagraph ? null : storyDiv.querySelector("p:last-child");
    if (!p) {
        p = document.createElement("p");
        storyDiv.appendChild(p);
    }
    // Create a span and append the text to it
    var span = document.createElement("span");
    span.className = "new-text";
    span.appendChild(document.createTextNode(" " + text));
    // Append the span to the existing paragraph
    p.appendChild(span);
    // Scroll to the end of the story div
    storyDiv.scrollTop = storyDiv.scrollHeight;
    // Reset the startNewParagraph flag
    startNewParagraph = false;
    // Change the color of the old text
    Array.from(storyDiv.getElementsByClassName("new-text")).forEach((element) => {
        element.style.color = "#000";
    });
    // Set the color of the new text to dark blue
    span.style.color = "#00008B";
}



function addSenseStoryEvent() {
  // Check sense story lines
  while(senseStoryIndex < senseStoryLines.length) {
    var storyLine = senseStoryLines[senseStoryIndex];
    if(iResource >= 1) { // Add a condition here depending on when you want the story line to appear
      var p = document.createElement("p");
      p.textContent = storyLine;
      storyDiv.appendChild(p);
      startNewParagraph = false;
      senseStoryIndex++;
    } else {
      break;
    }
  }
}

function addGlowStoryEvent() {
  // Check glow story lines
  while(glowStoryIndex < glowStoryLines.length) {
    var storyLine = glowStoryLines[glowStoryIndex];
    if(wResource >= 1) { // Add a condition here depending on when you want the story line to appear
      var p = document.createElement("p");
      p.textContent = storyLine;
      storyDiv.appendChild(p);
      startNewParagraph = false;
      glowStoryIndex++;
    } else {
      break;
    }
  }
}

function addGrabStoryEvent() {
  // Check grab story lines
  while(grabStoryIndex < grabStoryLines.length) {
    var storyLine = grabStoryLines[grabStoryIndex];
    if(eResource >= 1) { // Add a condition here depending on when you want the story line to appear
      var p = document.createElement("p");
      p.textContent = storyLine;
      storyDiv.appendChild(p);
      startNewParagraph = false;
      grabStoryIndex++;
    } else {
      break;
    }
  }
}


// Adds a setback visual effect to the story element
function triggerSetbackEffect() {
  var storyElement = document.getElementById('story');
  // Function to apply the effect
  function applyEffect() {
    storyElement.style.boxShadow = '0 0 35px rgba(255, 0, 0, 0.6)'; // Subtle red shadow
    //storyElement.style.backgroundColor = 'rgba(255, 0, 0, 0.09)'; // Light red background
  }
  // Function to remove the effect
  function removeEffect() {
    storyElement.style.boxShadow = '';
    storyElement.style.border = '';
    storyElement.style.backgroundColor = '';
  }
  // Apply and remove the effect 3 times with intervals
  for (var i = 0; i < 3; i++) {
    setTimeout(applyEffect, i * 1000); // Apply effect every second
    setTimeout(removeEffect, (i * 1000) + 500); // Remove effect 500ms after applying
  }
}




const storyDiv = document.getElementById('story');
const resizeThreshold = 10; // Pixels from the corner to consider as a resize area

let storyDivIsDragging = false;
let originalMouseX, originalMouseY, originalX, originalY;

storyDiv.addEventListener('mousedown', function(e) {
    const rect = storyDiv.getBoundingClientRect();
    const isNearBottom = (rect.bottom - e.clientY) < resizeThreshold;
    const isNearRight = (rect.right - e.clientX) < resizeThreshold;

    // If the click is not near the bottom-right corner, start dragging
    if (!(isNearBottom && isNearRight)) {
        storyDivIsDragging = true;
        originalX = storyDiv.offsetLeft;
        originalY = storyDiv.offsetTop;
        originalMouseX = e.clientX;
        originalMouseY = e.clientY;
    }
});

document.addEventListener('mousemove', function(e) {
    if (storyDivIsDragging) {
        const deltaX = e.clientX - originalMouseX;
        const deltaY = e.clientY - originalMouseY;
        storyDiv.style.left = originalX + deltaX + 'px';
        storyDiv.style.top = originalY + deltaY + 'px';
    }
});

document.addEventListener('mouseup', function() {
    storyDivIsDragging = false;
});

storyDiv.style.position = 'absolute'; // Ensure div can be moved





// Function to display messages on chat, allowing for hints in BLUE highlight
function displayOnChat(message, type = 'normal', p = null, storyDiv = null) {
  if (!storyDiv) {
    storyDiv = document.getElementById("story");
  }
  if (!p) {
    p = storyDiv.querySelector("p:last-child");
    if (!p) {
      p = document.createElement("p");
      storyDiv.appendChild(p);
    }
  }
  storyQueue.push({ message, type, p, storyDiv, isChatMessage: true });
  if (!isWriting) {
    processStoryQueue();  // Start processing if not currently writing
  }
}

/*
"In this realm, where shadows blend and sway"
"You wandered, lost, in silent play."

"Whispers of Solara, like dreams in night's allure,"
"Spoke of a union, pure and demure."

"No longer adrift in the vast, uncharted deep,"
"Together you merge, in a bond not to keep."

"A journey of oneness, beneath the cosmic dome,"
"In Solara's embrace, you find home."

"You breathe, for the first time."
*/