// Function to check for offline time and calculate missed cycles
// This function handles offline progress logic, for all things
// Resources, TF Resources, Research, Cave, Solara, future content etc
function checkForMissedCycles() {
    const currentTime = Date.now();
    let timeElapsed = currentTime - lastCheckTime; // Time elapsed in milliseconds
    // Capping the time elapsed at 30 minutes (1800000 milliseconds)
    // Yeah, I will change the limit if people start to complain :') 
    timeElapsed = Math.min(timeElapsed, 1800000);
    if (timeElapsed > 5000) { // Checking for more than 5 seconds
        const missedCycles = Math.floor(timeElapsed / TICK_RATE);
        console.log(`Offline/Inactive for ${timeElapsed / 1000} seconds. Calculating for up to ${Math.min(timeElapsed / 1000, 1800)} seconds. Missed ${missedCycles} regular resource cycles.`);
        for (let i = 0; i < missedCycles; i++) {
          updateResourcesForOneCycle();
        }
        // Handle Terraform cycles
        const missedTerraformCycles = Math.floor(timeElapsed / CYCLE_RATE);
        console.log(`Offline/Inactive for ${timeElapsed / 1000} seconds. Calculating for up to ${Math.min(timeElapsed / 1000, 1800)} seconds. Missed ${missedTerraformCycles} regular resource cycles.`);
        for (let i = 0; i < missedTerraformCycles; i++) {
            simulateTerraformCycle();
        }
        // Catch up on research
        setTimeout(() => {
            catchUpResearch(timeElapsed);
        }, 1500);  // 1.5 seconds delay, since research might be getting loaded in from a save
        // TODO: Handle the missed cycles (to be implemented)
    }

    // Update the last check time
    lastCheckTime = currentTime;
}

// Used for offline progress of research projects
function catchUpResearch(timeElapsed) {
    console.log(`Catching up research for elapsed time: ${timeElapsed}ms`);
    for (const key in allResearchProjects) {
        let project = allResearchProjects[key];
        //console.log(`DEBUG: Checking project: ${project.name}, Active: ${project.isActive}`);
        if (project.isActive) {
            console.log(`Catching up research project: ${project.name}`);
            catchUpSingleResearchProject(project, timeElapsed);
        }
    }
}



function catchUpSingleResearchProject(project, timeElapsed) {
    console.log(`Catching up for project: ${project.name}, Time Elapsed: ${timeElapsed}`);
    let timeRemaining = timeElapsed;
    while (timeRemaining > 0 && project.isActive) {
        let resourcesAvailable = checkResourcesForProject(project);
        console.log(`Resources available for project '${project.name}': ${resourcesAvailable}`);
        if (!resourcesAvailable) {
            console.log(`Insufficient resources for further progress on project: ${project.name}`);
            break;
        }
        let tickTime = 100; // Assuming each tick is 100 milliseconds
        let ticksToCatchUp = Math.min(timeRemaining / tickTime, project.timeLeft / tickTime);
        console.log(`Catching up ${ticksToCatchUp} ticks for project: ${project.name}`);
        deductResourcesForProject(project, ticksToCatchUp);
        project.timeLeft -= ticksToCatchUp * tickTime;
        project.updateProgressBar((project.totalTime - project.timeLeft) / project.totalTime * 100);
        timeRemaining -= ticksToCatchUp * tickTime;
        if (project.timeLeft <= 0) {
            console.log(`Project completed during catch-up: ${project.name}`);
            clearInterval(project.interval);
            project.onCompletion();
            project.isActive = false;
        }
    }
}



function checkResourcesForProject(project) {
    if (information < project.costPerTick) {
        console.log(`Insufficient information for project: ${project.name}`);
        return false;
    }
    if (project.terraformCosts) {
        for (const [resource, totalCost] of Object.entries(project.terraformCosts)) {
            const costPerTick = totalCost / (project.totalTime / 100);
            if (window[resource] < costPerTick) {
                console.log(`Insufficient ${resource} for project: ${project.name}`);
                return false;
            }
        }
    }
    for (const [resource, totalCost] of Object.entries(project.additionalCosts)) {
        const costPerTick = totalCost / (project.totalTime / 100);
        if (window[resource] < costPerTick) {
            console.log(`Insufficient ${resource} for project: ${project.name}`);
            return false;
        }
    }
    console.log(`Sufficient resources available for project: ${project.name}`);
    return true;
}

function deductResourcesForProject(project, ticksToCatchUp) {
    console.log(`Deducting resources for ${ticksToCatchUp} ticks on project: ${project.name}`);
    information -= project.costPerTick * ticksToCatchUp;
    if (project.terraformCosts) {
        for (const [resource, totalCost] of Object.entries(project.terraformCosts)) {
            const costPerTick = totalCost / (project.totalTime / 100);
            window[resource] -= costPerTick * ticksToCatchUp;
            document.getElementById(resource + "Counter").textContent = formatLargeNumber(window[resource]);
        }
    }
    for (const [resource, totalCost] of Object.entries(project.additionalCosts)) {
        const costPerTick = totalCost / (project.totalTime / 100);
        window[resource] -= costPerTick * ticksToCatchUp;
        document.getElementById(resource + "Counter").textContent = formatLargeNumber(window[resource]);
    }
}


// Start the monitoring function at a regular interval
setInterval(checkForMissedCycles, TICK_RATE);