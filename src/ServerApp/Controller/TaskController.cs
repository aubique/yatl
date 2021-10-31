using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Todos.ServerApp.Model;
using Todos.ServerApp.Service;

namespace Todos.ServerApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly ITaskService _service;

        public TaskController(ILogger<TaskController> logger, ITaskService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet("/api/todo")]
        public ActionResult<List<Task>> GetTasks()
        {
            return _service.GetTaskList();
        }

        [HttpPost("/api/todo")]
        public ActionResult<Task> AddTask(Task task)
        {
            _service.AddTask(task);
            return task;
        }

        [HttpPut("/api/todo/{id:int}")]
        public ActionResult<Task> ReplaceTask(int id, Task task)
        {
            _service.ReplaceTask(id, task);
            return task;
        }

        [HttpDelete("/api/todo/{id:int}")]
        public ActionResult<int> DeleteTask(int id)
        {
            _service.DeleteTask(id);
            _logger.LogInformation("num of tasks: {}", _service.GetTaskList().Count);
            return id;
        }

        [HttpPatch("/api/todo/{id:int}")]
        public EmptyResult UpdateComplete(int id, CompleteDto completeDto)
        {
            _logger.LogInformation("id: {}, isComplete: {}", id, completeDto.IsComplete);

            _service.UpdateComplete(id, completeDto);

            return new EmptyResult();
        }

        [HttpPatch("/api/todo")]
        public EmptyResult UpdateCoreList(Core[] coreList)
        {
            _logger.LogInformation("========\nnum of core tasks: {}", coreList.Length);
            Array.ForEach(coreList, c =>
                _logger.LogInformation("coreId: {}, coreOrder: {}", c.Id, c.Order));

            _service.UpdateCoreList(coreList);

            return new EmptyResult();
        }
    }
}
