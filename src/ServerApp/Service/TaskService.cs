using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Todos.ServerApp.Model;
using Todos.ServerApp.Repository;

namespace Todos.ServerApp.Service
{
    public class TaskService : ITaskService
    {
        private const char WHITESPACE_SEPARATOR = ' ';
        private readonly ILogger _logger;
        private readonly ITaskRepository _repository;

        public TaskService(
            ILogger<TaskService> logger, ITaskRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        public List<Task> GetTaskList()
        {
            return _repository.GetAll();
        }

        public Task AddTask(Task task)
        {
            task.Title = ToTitleCase(task.Title);
            _repository.SaveNew(task);

            return task;
        }

        public Task ReplaceTask(int id, Task task)
        {
            task.Title = ToTitleCase(task.Title);
            _repository.SaveEdit(task, id);

            return task;
        }

        public int DeleteTask(int id)
        {
            _repository.RemoveById(id);
            return id;
        }

        public CompleteDto UpdateComplete(int id, CompleteDto completeDto)
        {
            var task = _repository.findById(id);

            task.IsComplete = completeDto.IsComplete;
            return completeDto;
        }

        public List<Core> UpdateCoreList(Core[] coreList)
        {
            var tasks = _repository.GetAll();

            for (var index = tasks.Count - 1; index >= 0; index--)
            {
                var coreId = tasks[index].Core.Id;
                var newCore = Array.Find(coreList, c => c.Id == coreId);

                if (newCore != null) tasks[index].Core = newCore;
            }

            _repository.SaveAll(tasks);

            return coreList.ToList();
        }

        public List<Task> loadFromFile()
        {
            List<Task> items;
            using (StreamReader file = File.OpenText(@"Todos.json"))
            {
                var jsonSerializer = new JsonSerializer();

                items = (List<Task>) jsonSerializer.Deserialize(file, typeof(List<Task>));
            }

            var formattedItems = items.Select(t =>
            {
                t.Title = ToTitleCase(t.Title);
                return t;
            }).ToList();

            return _repository.SaveAll(formattedItems);
        }

        /// <summary>
        ///     Convert a string to title case
        /// </summary>
        public static string ToTitleCase(string title)
        {
            if (string.IsNullOrEmpty(title)) return title;

            // Split a string to the list of strings based on whitespace character
            var initialWords = title.Split(WHITESPACE_SEPARATOR);
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
    }
}
