using Shouldly;
using Xunit;

namespace Exercise.Todos.Controllers.Tests
{
    public class TodosControllerTests
    {
        [Fact]
        public void Should_TitleCase_WhenStringIsSingleCharacter()
        {
            var singleCharacterString = TodosController.ToTitleCase("h");

            singleCharacterString.ShouldBe("H");
        }
    }
}
