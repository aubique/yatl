namespace Todos.ServerApp.Model
{
    public class Task
    {
        public Core Core { get; set; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
        public string Notes { get; set; }
    }
}