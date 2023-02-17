
// Create Connection

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect To Methods That Hub Invoke And Recieve Notifications From hub.

connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})

// invoke hub methods And Send Notifications  TO Hub.
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded"); // Hub Method Name .
}

// Start Connection.
function fulfilled() {
    console.log("Succed");
    newWindowLoadedOnClient();

}

function rejected() {
    console.log("Failed");

}

connectionUserCount.start().then(fulfilled, rejected);