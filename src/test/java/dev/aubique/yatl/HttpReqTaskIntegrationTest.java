package dev.aubique.yatl;

import com.google.gson.Gson;
import dev.aubique.yatl.model.Task;
import dev.aubique.yatl.model.TaskCompleteDto;
import dev.aubique.yatl.model.TaskCore;
import dev.aubique.yatl.model.User;
import dev.aubique.yatl.repository.TaskRepository;
import dev.aubique.yatl.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HttpReqTaskIntegrationTest {

    private static final Long USER_ID = 1L;
    private static final Long TASK_ID = 3L;
    private static final String TASK_TITLE = "task-item-" + TASK_ID;
    //  private static final String TASK_DESC = TASK_ID + "th task item";
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
                .priority(TASK_ID.intValue())
                .build();
    }

    private static Task newTaskItem(User owner) {
        return Task.builder()
                .id(null)
                .taskCore(newTaskCore())
                .title(TASK_TITLE)
                .complete(TASK_UNDONE)
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
                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .param("param1", "value1")
                .content(gson.toJson(testTask)))
                .andExpect(status().isCreated());

        Task addedTask = taskRepository.findByTitle(TASK_TITLE);
        assertThat(addedTask.getTaskCore().getPriority()).isEqualTo(TASK_ID.intValue());
    }

    @Test
    void putControllerTest() throws Exception {
        final var NEW_TASK_ID = 2L;
        Task testTask = newTaskItem(getUserOne());
        testTask.getTaskCore().setId(NEW_TASK_ID);

        // Modify existing task
        mockMvc.perform(put("/rest/todo/{todoId}", NEW_TASK_ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(gson.toJson(testTask)))
                .andExpect(status().isOk());

        Task modifiedTask = taskRepository.findByTitle(testTask.getTitle());
        assertThat(modifiedTask.getTaskCore().getPriority()).isEqualTo(testTask.getTaskCore().getPriority());
    }

    @Test
    void patchCoreListControllerTest() throws Exception {
        final var validCore1 = TaskCore.builder().id(2L).priority(1).build();
        final var validCore2 = TaskCore.builder().id(1L).priority(2).build();
        final var invalidCore = TaskCore.builder().priority(2).build();
        final var mockCoreList = new ArrayList<>();

        // Fill out with valid TaskCore's
        mockCoreList.add(validCore1);
        mockCoreList.add(validCore2);
        System.out.println(gson.toJson(mockCoreList));
        mockMvc.perform(patch("/rest/user/{userId}", USER_ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(gson.toJson(mockCoreList)))
                .andExpect(status().isOk());

        // Add invalid TaskCore
        mockCoreList.add(invalidCore);
        System.out.println(gson.toJson(mockCoreList));
        mockMvc.perform(patch("/rest/user/{userId}", USER_ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(gson.toJson(mockCoreList)))
                .andExpect(status().is4xxClientError());

        assertThat(taskRepository.findById(2L).get().getTaskCore().getPriority()).isEqualTo(1);
    }

    @Test
    void patchPartialTodoControllerTest() throws Exception {
        final var TODO_ID = 2L;
        final var COMPLETE_TOGGLE = true;
        var mockTaskDto = new TaskCompleteDto();
        mockTaskDto.setComplete(COMPLETE_TOGGLE);

        System.out.println(mockTaskDto);
        mockMvc.perform(patch("/rest/todo/{todoId}", TODO_ID)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(gson.toJson(mockTaskDto)))
                .andExpect(status().isOk());

        final var patchedTodo = taskRepository.findById(TODO_ID).get();
        assertThat(patchedTodo.getComplete()).isEqualTo(COMPLETE_TOGGLE);
    }
}
