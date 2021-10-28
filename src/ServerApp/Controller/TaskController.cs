﻿using System;
using System.Collections.Generic;
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
        private const char WHITESPACE_SEPARATOR = ' ';
        private readonly ILogger _logger;
        private readonly ITaskService _service;

        public TaskController(ILogger<TaskController> logger, ITaskService service)
        {
            _logger = logger;
            _service = service;
        }

        //[HttpGet("/api/todo")]
        //public IActionResult GetList()
        //{
        //    var j = "[";

        //    var l = System.IO.File.ReadAllLines("Todos.txt");
        //    for (var i = 0; i < l.Length; i++)
        //    {
        //        if (i > 0) j = j + ",";

        //        var s = l[i].Split(",");
        //        j = j + "{\"i\": " + s[0] + ", \"text\": \"" + ToTitleCase(s[1]) + "\", \"isDone\": " + s[2] + "}";
        //    }

        //    j = j + "]";

        //    return Ok(j);
        //}

        /// <summary>
        ///     Convert a string to title case
        /// </summary>
        public static string ToTitleCase(string todo)
        {
            if (string.IsNullOrEmpty(todo)) return todo;

            // Split a string to the list of strings based on whitespace character
            var initialWords = todo.Split(WHITESPACE_SEPARATOR);
            var resultWords = new List<string>();

            // Fill the list with the capitalized words
            foreach (var word in initialWords) resultWords.Add(Capitalize(word));

            return string.Join(WHITESPACE_SEPARATOR, resultWords);
        }

        /// <summary>
        ///     Capitalize the first letter of each string
        /// </summary>
        /// <param name="word">A word without spaces</param>
        private static string Capitalize(string word)
        {
            var chars = word.ToLower().ToCharArray();

            chars[0] = char.ToUpper(chars[0]);

            return new string(chars);
        }

        [HttpGet("/api/todo")]
        public ActionResult<List<Task>> GetTasks()
        {
            return _service.GetTask();
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
            _logger.LogInformation("num of tasks: {}", _service.GetTask().Count);
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
