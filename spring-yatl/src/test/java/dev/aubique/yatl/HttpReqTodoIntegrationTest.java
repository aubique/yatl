package dev.aubique.yatl;

import com.google.gson.Gson;
import dev.aubique.yatl.model.Todo;
import dev.aubique.yatl.model.User;
import dev.aubique.yatl.repository.TodoRepository;
import dev.aubique.yatl.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HttpReqTodoIntegrationTest {

    private static final Long TODO_ID = 8L;
    private static final String TODO_DESC = "Eighth item";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    private static Todo newItem(User owner) {
        return Todo.builder()
                .user(owner)
                .id(TODO_ID)
                .title(TODO_ID + " item")
                .description(TODO_DESC)
                .completed(false)
                .build();
    }

    @Test
    void postControllerTest() throws Exception {
        User dummyUser = new User();
        dummyUser.setId(1L);
        dummyUser.setUsername("admin");
        Todo testTodo = newItem(dummyUser);

        mockMvc.perform(post("/rest/user/{userId}", 1L)
                .contentType("application/json")
//                .param("param1", "value1")
                .content(gson.toJson(testTodo)))
                .andExpect(status().isCreated());

        Todo addedTodo = todoRepository.findByTitle(TODO_ID + " item");
        assertThat(addedTodo.getDescription()).isEqualTo(TODO_DESC);
    }

    @Test
    void putControllerTest() throws Exception {
        User userNum1 = userRepository.findById(1L).orElseThrow(RuntimeException::new);
        Todo testTodo = newItem(userNum1);

        mockMvc.perform(put("/rest/todo/{todoId}", 2L)
                .contentType("application/json")
                .content(gson.toJson(testTodo)))
                .andExpect(status().isOk());

        Todo modifiedTodo = todoRepository.findByTitle(testTodo.getTitle());
        assertThat(modifiedTodo.getDescription()).isEqualTo(testTodo.getDescription());
    }
}
