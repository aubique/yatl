using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions;

namespace Exercise.Todos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
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

        public static string ToTitleCase(string todo)
        {
            var fs = todo.IndexOf(' ', 1);

            if (todo[0] == ' ')
            {
                if (todo.Length > 1)
                {
                    if (fs != -1)
                    {
                        return todo[0].ToString() + Char.ToUpper(todo[1]) + todo.Substring(2, fs - 2) + ToTitleCase(todo.Substring(fs));
                    }
                    else
                    {
                        return todo[0].ToString() + Char.ToUpper(todo[1]) + todo.Substring(2);
                    }
                }
                else
                {
                    return todo.ToUpper();
                }
            }
            else
            {
                if (fs == -1)
                {
                    return Char.ToUpper(todo[0]) + todo.Substring(1);
                }
                else
                {
                    return Char.ToUpper(todo[0]) + todo.Substring(1, fs - 1) + ToTitleCase(todo.Substring(fs));
                }
            }
        }
    }
}