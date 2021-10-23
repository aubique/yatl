namespace Todos.ServerApp.Model
{
    public class Task
    {
        public string ID { get; }
        public string Title { get; set; }
        public bool IsComplete { get; set; }
        public string Notes { get; set; }
    }
}
