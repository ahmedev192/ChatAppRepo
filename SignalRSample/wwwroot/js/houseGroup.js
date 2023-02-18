let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// Create Connection

var connectionGroupHouse = new signalR.HubConnectionBuilder().withUrl("/hubs/HouseGroups").build();

btn_gryffindor.addEventListener("click", function (event) {
    connectionGroupHouse.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionGroupHouse.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionGroupHouse.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionGroupHouse.send("JoinHouse", "Slytherin");
    event.preventDefault();
});








trigger_gryffindor.addEventListener("click", function (event) {
    connectionGroupHouse.send("TriggerHouseNotify", "Gryffindor");
    event.preventDefault();
});

trigger_hufflepuff.addEventListener("click", function (event) {
    connectionGroupHouse.send("TriggerHouseNotify", "Hufflepuff");
    event.preventDefault();
});

trigger_ravenclaw.addEventListener("click", function (event) {
    connectionGroupHouse.send("TriggerHouseNotify", "Ravenclaw");
    event.preventDefault();
});

trigger_slytherin.addEventListener("click", function (event) {
    connectionGroupHouse.send("TriggerHouseNotify", "Slytherin");
    event.preventDefault();
});





btn_un_gryffindor.addEventListener("click", function (event) {
    connectionGroupHouse.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionGroupHouse.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionGroupHouse.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {
    connectionGroupHouse.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});





connectionGroupHouse.on("triggerHouseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched.`);

});




connectionGroupHouse.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Someone Has Subscribed Successfuly  . ${houseName}`);

});
connectionGroupHouse.on("newMemberRemoveFromHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`);

});

connectionGroupHouse.on("subscriptionStatus", (strGroupJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupJoined;
    if (hasSubscribed) {
        // Subscribed
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`You Have Subscribed Successfuly  . ${houseName}`);

        
    } else {
        //unSubscribed
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }

        toastr.success(`You Have unSubscribed Successfuly  . ${houseName}`);

    }
});



// Start Connection.
function fulfilled() {

    console.log("Succed");
}

function rejected() {
    console.log("Failed");

}

connectionGroupHouse.start().then(fulfilled, rejected);