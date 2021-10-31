using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private List<Task> _taskList;

        public TaskRepository()
        {
            _taskList = new List<Task>();
        }

        public List<Task> GetAll()
        {
            return _getAllCopy();
        }

        private List<Task> _getAllCopy()
        {
            return JsonConvert.DeserializeObject<List<Task>>(JsonConvert.SerializeObject(_taskList));
        }

        public void RemoveById(int id)
        {
            for (var index = _taskList.Count - 1; index >= 0; index--)
                if (_taskList[index].Core.Id == id)
                    _taskList.RemoveAt(index);
        }

        public Task SaveNew(Task task)
        {
            if (_taskList.Count > 0)
            {
                var id = _taskList.Select(t => t.Core.Id).ToArray().Max() + 1;
                var order = _taskList.Select(t => t.Core.Order).ToArray().Max() + 1;
                task.Core = new Core {Id = id, Order = order};
            }

            _taskList.Add(task);

            return task;
        }

        public Task SaveEdit(Task task, int Id)
        {
            for (var index = _taskList.Count - 1; index >= 0; index--)
                if (_taskList[index].Core.Id == Id)
                    _taskList[index] = task;

            return task;
        }

        public Task findById(int id)
        {
            return _taskList.Find(task => task.Core.Id.Equals(id));
        }

        public List<Task> SaveAll(List<Task> tasks)
        {
            _taskList = tasks;

            return _getAllCopy();
        }
    }
}
