using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Todos.ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private const char WHITESPACE_SEPARATOR = ' ';

        [HttpGet]
        public IActionResult GetList()
        {
            string j = "[";

            string[] l = System.IO.File.ReadAllLines("Todos.txt");
            for (int i = 0; i < l.Length; i++)
            {
                if (i > 0)
                {
                    j = j + ",";
                }

                var s = l[i].Split(",");
                j = j + "{\"i\": " + s[0] + ", \"text\": \"" + ToTitleCase(s[1]) + "\", \"isDone\": " + s[2] + "}";
            }

            j = j + "]";

            return Ok(j);
        }

        /// <summary>
        /// Convert a string to title case
        /// </summary>
        public static string ToTitleCase(string todo)
        {
            if (string.IsNullOrEmpty(todo)) return todo;

            // Split a string to the list of strings based on whitespace character
            var initialWords = todo.Split(WHITESPACE_SEPARATOR);
            var resultWords = new List<string>();

            // Fill the list with the capitalized words
            foreach (var word in initialWords)
            {
                resultWords.Add(Capitalize(word));
            }

            return string.Join(WHITESPACE_SEPARATOR, resultWords);
        }

        /// <summary>
        /// Capitalize the first letter of each string
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
