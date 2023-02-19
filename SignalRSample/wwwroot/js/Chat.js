// Create Connection

var connectionChat = new signalR.HubConnectionBuilder().withUrl("/hubs/Chat").build();

document.getElementById("sendMessage").disabled = true;


// connect To Methods That Hub Invoke And Recieve Notifications From hub.
connectionChat.on("MessageRecieved", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user}  -  ${message} . `;
});



// New Add Listners
document.getElementById("sendMessage").addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    var receiver = document.getElementById("receiverEmail").value;

    if (receiver.length > 0) {
        connectionChat.send("SendMessageToReciever", sender, receiver, message);
    } else {
        connectionChat.send("SendMessageToAllUsers", sender, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    event.preventDefault();
});


// Start Connection.

connectionChat.start().then(function () {

    document.getElementById("sendMessage").disabled = false;
});