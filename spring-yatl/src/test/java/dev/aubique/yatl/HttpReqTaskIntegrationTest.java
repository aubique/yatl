package dev.aubique.yatl;

import com.google.gson.Gson;
import dev.aubique.yatl.model.Task;
import dev.aubique.yatl.model.TaskCore;
import dev.aubique.yatl.model.User;
import dev.aubique.yatl.repository.TaskRepository;
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
public class HttpReqTaskIntegrationTest {

    private static final Long USER_ID = 1L;
    private static final Long TASK_ID = 4L;
    private static final String TASK_TITLE = "task-item-" + TASK_ID;
    private static final String TASK_DESC = TASK_ID + "th task item";
    private static final Boolean TASK_UNDONE = false;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private static TaskCore newTaskCore() {
        return TaskCore.builder()
                .id(null)
                .complete(TASK_UNDONE)
                .priority(TASK_ID.intValue())
                .build();
    }

    private static Task newTaskItem(User owner) {
        return Task.builder()
                .id(null)
                .taskCore(newTaskCore())
                .title(TASK_TITLE)
                .description(TASK_DESC)
                .user(owner)
                .build();
    }

    private User getUserOne() {
        return userRepository.findById(USER_ID).orElseThrow(RuntimeException::new);
    }

    @Test
    void postControllerTest() throws Exception {
        Task testTask = newTaskItem(getUserOne());

        // Get task by user-id
        mockMvc.perform(post("/rest/user/{userId}", USER_ID)
                .contentType("application/json")
//                .param("param1", "value1")
                .content(gson.toJson(testTask)))
                .andExpect(status().isCreated());

        Task addedTask = taskRepository.findByTitle(TASK_TITLE);
        assertThat(addedTask.getDescription()).isEqualTo(TASK_DESC);
    }

    @Test
    void putControllerTest() throws Exception {
        final var NEW_TASK_ID = 2L;
        Task testTask = newTaskItem(getUserOne());
        testTask.getTaskCore().setId(NEW_TASK_ID);

        // Modify existing task
        mockMvc.perform(put("/rest/todo/{todoId}", NEW_TASK_ID)
                .contentType("application/json")
                .content(gson.toJson(testTask)))
                .andExpect(status().isOk());

        Task modifiedTask = taskRepository.findByTitle(testTask.getTitle());
        assertThat(modifiedTask.getDescription()).isEqualTo(testTask.getDescription());
    }
}
