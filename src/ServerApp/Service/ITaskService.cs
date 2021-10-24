using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Service
{
    public interface ITaskService
    {
        public List<Task> GetTask();

        public Task AddTask(Task taskItem);

        public Task UpdateTask(int id, Task taskItem);

        public int DeleteTask(int id);
    }
}
