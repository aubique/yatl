using Shouldly;
using Todos.ServerApp.Controllers;
using Xunit;

namespace TodosTests.ServerApp.Controllers
{
    public class TodosControllerTests
    {
        [Fact]
        public void Should_TitleCase_WhenStringIsSingleCharacter()
        {
            var singleCharacterString = TaskController.ToTitleCase("h");

            singleCharacterString.ShouldBe("H");
        }
    }
}