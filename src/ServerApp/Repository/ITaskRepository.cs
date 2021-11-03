using System.Collections.Generic;
using Todos.ServerApp.Model;

namespace Todos.ServerApp.Repository
{
    public interface ITaskRepository
    {
        public List<Task> GetAll();
        void RemoveById(int id);
        Task SaveNew(Task task);
        Task SaveEdit(Task task, int id);
        Task FindById(int id);
        List<Task> SaveAll(List<Task> tasks);
    }
}