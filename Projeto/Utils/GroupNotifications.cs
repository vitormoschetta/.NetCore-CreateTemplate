namespace Projeto.Utils
{
    public static class Agrupar
    {
        public static string GroupNotifications(dynamic result)
        {
            var notifications = result.Message;
            foreach (var item in result.Notifications)
            {
                notifications += $"{item.Message}. ";
            }
            return notifications;
        }
    }
}