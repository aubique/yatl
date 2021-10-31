using Shouldly;
using Todos.ServerApp.Service;
using Xunit;

namespace TodosTests.ServerApp.Service
{
    public class TaskServiceTests
    {
        [Fact]
        public void Should_TitleCase_WhenStringIsSingleCharacter()
        {
            var singleCharacterString = TaskService.ToTitleCase("h");

            singleCharacterString.ShouldBe("H");
        }
    }
}
