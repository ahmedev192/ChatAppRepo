namespace SignalRSample.Models.ViewModel
{
    public class AdvancedChatVM
    {
        public AdvancedChatVM()
        {
            Rooms = new List<ChatRoom>();   
        }
        public int MaxRoomAllowed { get; set; }
        public IList<ChatRoom> Rooms { get; set; }

        public string? UserId { get; set; }

        public bool AllowAddRoom => Rooms == null || Rooms.Count < MaxRoomAllowed;
    }
}
