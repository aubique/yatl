using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Service
{
    public interface ITaskService
    {
        public List<Task> GetTaskList();

        public Task AddTask(Task task);

        public Task ReplaceTask(int id, Task task);

        public int DeleteTask(int id);
        public CompleteDto UpdateComplete(int id, CompleteDto completeDto);
        public List<Core> UpdateCoreList(Core[] coreList);

        public List<Task> loadFromFile();
    }
}
