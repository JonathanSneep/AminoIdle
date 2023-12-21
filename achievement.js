
// Achievement settings/functions
function toggleAchievementsPanel() {
    const panel = document.getElementById("achievementsPanel");
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "grid";
        document.getElementById('achievementsIcon').classList.remove('shine');
    } else {
        panel.style.display = "none";
    }
}



// Array of achievements
const achievements = [
    new Achievement(0, "Primal Wiggle", "Unlock the mystery of movement."), // first wiggle 
    new Achievement(1, "Lonely Cartographer", "Use an echo to reveal the map."), // map reveal
    new Achievement(2, "Heart's Anchor", "You found solace, amidst solitude."), // Solara
    new Achievement(3, "Terra's Novice", "Even in isolation, the world bends to will."), // First terraforming
    new Achievement(4, "Atlas Unseen", "As you gather in quiet persistence, the world shifts imperceptibly on invisible shoulders."), // 10K resources
    new Achievement(5, "Whispers in the Wind", "Sent out 500 echoes into the void, seeking, always seeking. Every silent return is a testament to perseverance."),
    new Achievement(6, "Solitary Sage", "Alone with thoughts, the vast expanse of knowledge is both solace and torment."),
    new Achievement(7, "Resilience Manifested", "Overcame 10 major challenges or obstacles. Every setback, a lesson; every triumph, a silent victory in the void."),
    new Achievement(8, "Dawn of Complexity", "From humble beginnings to a being of greater intricacy. The protoworm emerges, a testament to evolution's silent march."), // ProtoWorm
    new Achievement(9, "Tendril's Touch", "You stretched out, seeking connection in a world of solitude."), // First tendon
    new Achievement(10, "Network of Solitude", "Five tendrils, each a silent cry for connection. Alone, yet ever-reaching."), // 5 tendons
    new Achievement(11, "Tentative Explorer", "The first steps into the unknown, a mere glimpse of the vast expanse."),  // 2 tiles explored
    new Achievement(12, "Journey's Momentum", "A hundred tiles unveiled. With each step, the world becomes both larger and smaller."), // 100 tiles explored
    new Achievement(13, "Persistent Pathfinder", "A thousand mysteries uncovered, yet the quest for understanding never wanes."), // 1000 tiles explored
    new Achievement(14, "Master of Realms", "Every corner of the world known, yet the heart's quest remains eternal."), // 1600 tiles explored
    new Achievement(15, "Chilled Secrets", "Unearthed the frozen whispers of the ice cave, a testament to the world's silent past."), // Ice Cave
    new Achievement(16, "Fiery Heart", "Stood before the volcano, feeling the warmth and fury of a world alive yet alone."), // Volcano
    new Achievement(17, "Whispering Waters", "In the vast silence, a murmured promise."), // Oasis
    new Achievement(18, "Shadows of Eons", "The Earth does not need new continents, but new men."), // Ancient Ruins
    new Achievement(19, "Fragile Bonds", "A connection severed. Yet in loss, resilience is born."), // Lose a tendon
    new Achievement(20, "Celestial Division", "None, breathed the light, faint and faery, of the stars, and two."), // Divide
    new Achievement(21, "Silent Symbiosis", "In the quiet dark, a humble luminescence. Sustenance in silence."), // Fungi
    new Achievement(22, "Emergent Complexity", "From one, many. From simplicity, complexity. The ProtoPod heralds a new chapter in solitude."), // Protopod
    new Achievement(23, "Starlight Barbs", "Glistening like constellations in a lonely sky, your spikes serve as both shield and spectacle."), // Spikes
    new Achievement(24, "Genesis Unbound", "With newfound knowledge, the first stroke is cast upon the canvas of the world."), // Discover terraforming
    new Achievement(25, "Petal Pathways", "Hands shape the earth, yet touch no other. The first worker takes their silent post."), // First terraform worker
    new Achievement(26, "Warmth in the Void", "The fires below speak in tongues of flame, an ancient hymn sung to an empty cathedral."), // Thermal vents
    new Achievement(27, "A legion of mirrors", "Tenfold divided, each division a mirror reflecting endless quiet."), // 10 divisions
    new Achievement(28, "Web of Yearning", "You ached for touch and found no comfort."), // 10 Tendons
    new Achievement(29, "Confluence of Fates", "Eventually, all things merge into one, and a river runs through it."), // Find the river
    new Achievement(30, "Theseus's Voyage", "In the labyrinth of change, the string remains yet the maze is new."), // Replaced all parts of yourself
    new Achievement(31, "Awakening of the Soul", "In a universe of echoes, you found your voice."), // First soul choice
    new Achievement(32, "Sorrow's Grip", "Like anchors in a turbulent sea, your suction cups cling to an elusive, quiet stability."), // suction cups
    new Achievement(33, "Feathers of Yearning", "Reach toward a sky forever distant, tuning you into the unheard frequencies of a silent world."), // feathered antenna
    new Achievement(34, "Solara's Devotion", "The falcon cannot hear the falconer; Yet love, spiraling outward, found its center."), // 8 concurrent glyphs
    new Achievement(35, "Eclipsed in Frost", "The moon calls to the water; here, in frozen depths, you too answer."), // 25% excavation
    new Achievement(36, "Crystal Excavator", "The ice murmurs, a frosty sonnet in a world bereft of verse."), // 50% excavation
    new Achievement(37, "Magma Shepherd", "Ten thousand days in the fire is long enough. You're going home."), // Deploy lava burrowers
    new Achievement(38, "Subterranean Maestro", "The cave becomes a labyrinth of connection, yet you remain apart."), // Conduits deployed
    new Achievement(39, "Sagan's Symphony", "Somewhere, something incredible is waiting to be known."), // Sagan quote, for having analyzed all terrain anomalies
    // First discovery of flowers?
    // ... add more achievements here ...
];

// Function to unlock an achievement by ID
function unlockAchievement(id) {
  const panel = document.getElementById("achievementsPanel");
  if (achievements[id] && achievements[id].state === 'locked') {
    console.log("Achievement Unlocked: #" + id);
    achievements[id].unlock();
    const achievementContainer = document.getElementById("achievement-" + id);
    // Check if achievementContainer is null
    if (!achievementContainer) {
      console.warn("DEBUG ERROR: achievementContainer is null. ID:", id);
      return;
    }
    const innerAchievementDiv = achievementContainer.querySelector(".achievement");
    innerAchievementDiv.classList.remove('locked');
    innerAchievementDiv.classList.add('unlocked');
    if (panel.style.display === "none" || panel.style.display === "") {
        document.getElementById('achievementsIcon').classList.add('shine');
    }
  }
  saveAchievements();
}




// On window load, display the achievements
window.onload = function() {
    const achievementsPanel = document.getElementById("achievementsPanel");
    achievements.forEach(achievement => {
        // Create a tooltip container for each achievement
        const achievementContainer = document.createElement("div");
        achievementContainer.className = "tooltip achievementWrapper";
        achievementContainer.id = "achievement-" + achievement.id;
        // Create the achievement div
        const achievementDiv = document.createElement("div");
        achievementDiv.className = achievement.state === 'unlocked' ? "achievement unlocked" : "achievement locked";
        // Add event listeners for tooltip positioning
        achievementDiv.addEventListener('mousemove', function(e) {
            let tooltip = achievementContainer.querySelector('.tooltiptext');
            tooltip.style.left = "-280px";
            tooltip.style.top = "40px";
        });
        achievementDiv.addEventListener('mouseenter', function() {
            let tooltip = achievementContainer.querySelector('.tooltiptext');
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        achievementDiv.addEventListener('mouseleave', function() {
            let tooltip = achievementContainer.querySelector('.tooltiptext');
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
        // Add the achievement div to the tooltip container
        achievementContainer.appendChild(achievementDiv);
        // Create the tooltip text div and set its content
        const tooltipTextDiv = document.createElement("div");
        tooltipTextDiv.className = "tooltiptext achievementTooltip";  
        tooltipTextDiv.innerText = achievement.title + ": " + achievement.description;
        // Add the tooltip text div to the tooltip container
        achievementContainer.appendChild(tooltipTextDiv);
        // Add the tooltip container to the achievements panel
        achievementsPanel.appendChild(achievementContainer);
    });
};


function saveAchievements() {
    const achievementsState = achievements.map(a => a.state);
    localStorage.setItem('achievements', JSON.stringify(achievementsState));
}

function loadAchievements() {
    const savedAchievements = JSON.parse(localStorage.getItem('achievements'));
    console.log("DEBUG: Loading achievements from localStorage:", savedAchievements);
    if (savedAchievements) {
        for (let i = 0; i < savedAchievements.length; i++) {
          // console.log(`DEBUG: Processing achievement with ID: ${i} and state: ${savedAchievements[i]}`);
            if (savedAchievements[i] === 'unlocked') {
                achievements[i].state = 'unlocked';
                const achievementContainer = document.getElementById("achievement-" + i);
                if (!achievementContainer) {
                    // console.warn(`DEBUG ERROR: achievementContainer for ID ${i} is null.`);
                    continue;  // Skip to the next iteration
                }
                if (achievementContainer) { // Check if the element actually exists
                    const innerAchievementDiv = achievementContainer.querySelector(".achievement");
                    innerAchievementDiv.classList.remove('locked');
                    innerAchievementDiv.classList.add('unlocked');
                }
            }
        }
    }
}

