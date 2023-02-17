using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        // Step 4 : To Add Implemintation To The Hub ( Server Side )
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;


        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers" /* js class name */ , TotalUsers /* props We WIll Send To The Func. */).GetAwaiter();

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers" /* js class name */ , TotalUsers /* props We WIll Send To The Func. */).GetAwaiter();
            return base.OnDisconnectedAsync(exception);
        }



        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("updateTotalViews" /* js class name */ , TotalViews /* props We WIll Send To The Func. */);
        }

    }
}
