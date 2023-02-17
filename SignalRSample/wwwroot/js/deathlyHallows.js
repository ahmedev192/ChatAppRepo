var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


// Create Connection

var connectionDeathlyHallows = new signalR.HubConnectionBuilder().withUrl("/hubs/DeathlyHallows").build();

// connect To Methods That Hub Invoke And Recieve Notifications From hub.

connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();

})

// invoke hub methods And Send Notifications  TO Hub.

// Start Connection.
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();

    })
    console.log("Succed");
}

function rejected() {
    console.log("Failed");

}

connectionDeathlyHallows.start().then(fulfilled, rejected);