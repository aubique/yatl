using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Service
{
    public interface ITaskService
    {
        public List<Task> GetTask();

        public Task AddTask(Task taskItem);

        public Task ReplaceTask(int id, Task taskItem);

        public int DeleteTask(int id);
        public CompleteDto UpdateComplete(int id, CompleteDto completeDto);
        public Core[] UpdateCoreList(Core[] coreList);
    }
}