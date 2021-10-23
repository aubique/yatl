using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Service
{
    public class TaskService : ITaskService
    {
        private readonly List<Task> _taskItems;

        public TaskService()
        {
            _taskItems = new List<Task>();
        }

        public List<Task> GetTask()
        {
            return _taskItems;
        }

        public Task AddTask(Task taskItem)
        {
            _taskItems.Add(taskItem);
            return taskItem;
        }

        public Task UpdateTask(string id, Task taskItem)
        {
            for (var index = _taskItems.Count - 1; index >= 0; index--)
                if (_taskItems[index].ID == id)
                    _taskItems[index] = taskItem;

            return taskItem;
        }

        public string DeleteTask(string id)
        {
            for (var index = _taskItems.Count - 1; index >= 0; index--)
                if (_taskItems[index].ID == id)
                    _taskItems.RemoveAt(index);

            return id;
        }
    }
}
