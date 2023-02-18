using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static int NotificationCounter = 0;
        public static List<string> Messages = new();
        public async Task SendMessage(string message)
        {
            if(!string.IsNullOrEmpty(message))
            {
                NotificationCounter++;
                Messages.Add(message);
                await LoadMessages();
            }
        }

        public async Task LoadMessages()
        {
            await Clients.All.SendAsync("LoadNotification", Messages, NotificationCounter);
        }
    }
}
