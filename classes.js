// Re-usable class to support research projects
class ResearchProject {
  constructor(name, totalTime, totalCost, onCompletion, terraformCosts = null, additionalCosts = {}, isEnabled = true) {
    this.name = name;
    this.totalTime = totalTime;
    this.timeLeft = totalTime;
    this.totalCost = totalCost;
    this.costPerTick = this.totalCost / (this.totalTime / 100);
    this.terraformCosts = terraformCosts; // optional biomites, zymers, fibers, sludge, algae costs
    this.additionalCosts = additionalCosts; // optional warmth, nourishment, energy costs
    this.onCompletion = onCompletion;
    this.isActive = false;
    this.isEnabled = isEnabled; // Create an object with isEnabled=false for projects that are still under development
    this.progressBar = null;
    this.interval = null;
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.interval = setInterval(() => {
      this.tick();
    }, 100);
  }

  pause() {
    clearInterval(this.interval);
    this.isActive = false;
  }

  tick() {
    let canProceed = true;
    
    // Calculate the minimal information to deduct this tick
    const infoToDeduct = Math.min(information, this.costPerTick);
    const infoFactor = infoToDeduct / this.costPerTick;

    // Check terraform resources
    const actualTerraformDeductions = {};
    if (this.terraformCosts) {
      for (const [resource, totalCost] of Object.entries(this.terraformCosts)) {
        const costPerTick = totalCost / (this.totalTime / 100);
        const actualDeduct = Math.min(window[resource], costPerTick);
        
        if (actualDeduct < costPerTick) {
          canProceed = false;
          break;
        } else {
          actualTerraformDeductions[resource] = actualDeduct;
        }
      }
    }

    // Check for the new resources before deducting
    for (const [resource, totalCost] of Object.entries(this.additionalCosts)) {
      const costPerTick = totalCost / (this.totalTime / 100);
      if (window[resource] < costPerTick) {
        canProceed = false;
        break;
      }
    }

    // If not enough terraform resources, simply return
    if (!canProceed) {
      return;
    }

    // Deduct the resources
    // Deduct information
    information -= infoToDeduct;

    // Deduct terraform costs
    for (const [resource, actualDeduct] of Object.entries(actualTerraformDeductions)) {
      window[resource] -= actualDeduct;
      document.getElementById(resource + "Counter").textContent = formatLargeNumber(window[resource]);
    }

    // Deduct the optional base resources WARMTH/NOURISHMENT/ENERGY
    for (const [resource, totalCost] of Object.entries(this.additionalCosts)) {
      const costPerTick = totalCost / (this.totalTime / 100);
      window[resource] -= costPerTick;
    }

    // Calculate time decrement based on how much information was actually deducted
    const timeDecrement = 100 * infoFactor;

    // Decrement the time left
    this.timeLeft -= timeDecrement;

    // Calculate the progress
    let progress = (this.totalTime - this.timeLeft) / this.totalTime * 100;

    // Update the progress bar
    this.updateProgressBar(progress);

    // Check if the research is completed
    if (this.timeLeft <= 0) {
      clearInterval(this.interval);
      this.onCompletion();
    }
  }
  updateProgressBar(progress) {
    if (this.progressBar) {
      this.progressBar.style.width = progress + "%";
    }
  }

  getSaveState() {
    return {
      name: this.name,
      timeLeft: this.timeLeft,
      isActive: this.isActive
    };
  }
}



// Terraformation class
class TerraformProject {
    constructor(name, totalTime, tileCosts, onCompletion) {
        this.name = name;
        this.totalTime = totalTime;
        this.timeLeft = totalTime;
        this.tileCosts = tileCosts;
        this.onCompletion = onCompletion;
        this.isActive = false;
        this.progressBar = null; // The progress bar element
        this.interval = null;
    }
    hasRequiredTiles() {
        for (let tileType in this.tileCosts) {
            if (terrainCounts[tileType] < this.tileCosts[tileType]) {
                return false; // Player does not have the required number of tiles
            }
        }
        return true;
    }
    start() {
        if (this.isActive || !this.hasRequiredTiles()) return;
        // Deduct the required tiles from the player's terrainCounts
        // !!! Commented out, we will not reduce tilecounts for now on terraform projects
        // for (let tileType in this.tileCosts) {
        //    terrainCounts[tileType] -= this.tileCosts[tileType];
        //}
        this.isActive = true;
        this.interval = setInterval(() => {
            this.tick();
        }, 100);
    }
    tick() {
        this.timeLeft -= 100; 
        let progress = (this.totalTime - this.timeLeft) / this.totalTime * 100;
        this.updateProgressBar(progress);
        if (this.timeLeft <= 0) {
            clearInterval(this.interval);
            this.onCompletion();
        }
    }
    updateProgressBar(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = progress + "%";
        }
    }
}


// Achievement class
class Achievement {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = 'locked';  // By default, achievements are locked
        this.image = null;  // Placeholder for a future image
    }
    unlock() {
        if (this.state === 'locked') {
            this.state = 'unlocked';
            // Any other logic associated with unlocking an achievement can be added here
        }
    }
}