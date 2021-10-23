using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Service
{
    public interface ITaskService
    {
        public List<Task> GetTask();

        public Task AddTask(Task taskItem);

        public Task UpdateTask(string id, Task taskItem);

        public string DeleteTask(string id);
    }
}
