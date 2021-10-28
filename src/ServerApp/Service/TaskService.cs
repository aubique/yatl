using System;
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

        public Task ReplaceTask(int id, Task taskItem)
        {
            for (var index = _taskItems.Count - 1; index >= 0; index--)
                if (_taskItems[index].Core.Id == id)
                    _taskItems[index] = taskItem;

            return taskItem;
        }

        public int DeleteTask(int id)
        {
            for (var index = _taskItems.Count - 1; index >= 0; index--)
                if (_taskItems[index].Core.Id == id)
                    _taskItems.RemoveAt(index);

            return id;
        }

        public CompleteDto UpdateComplete(int id, CompleteDto completeDto)
        {
            var task = _taskItems.Find(task => task.Core.Id.Equals(id));

            task.IsComplete = completeDto.IsComplete;
            return completeDto;
        }

        public Core[] UpdateCoreList(Core[] coreList)
        {
            for (var index = _taskItems.Count - 1; index >= 0; index--)
            {
                var coreId = _taskItems[index].Core.Id;
                var newCore = Array.Find(coreList, c => c.Id == coreId);

                if (newCore != null)
                {
                    _taskItems[index].Core = newCore;
                }
            }

            return coreList;
        }
    }
}
