package dev.aubique.yatl.controller;

import com.google.gson.Gson;
import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Task;
import dev.aubique.yatl.service.YatlService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * Controller used to showcase the REST API
 */
@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/rest/")
public class ApiController {

    @Autowired
    private Gson gson;

    @Autowired
    private YatlService yatlService;

    @GetMapping("user")
    public ResponseEntity<List<Task>> readTodoAll() {
        final List<Task> userTask = yatlService.getFullTodoList();
        // return 200 with JSON body
        return ResponseEntity.ok(userTask);
    }

    @GetMapping("user/{userId:[\\d]+}")
    public ResponseEntity<List<Task>> readTodoOne(@PathVariable Long userId) {
        try {
            final List<Task> userTask = yatlService.getUserTodoList(userId);
            // return 200 with JSON
            return ResponseEntity.ok(userTask);
        } catch (ResourceNotFoundException ex) {
            // return 404 with null body
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("user/{userId:[\\d]+}")
    public ResponseEntity<?> createTodo(
            @PathVariable Long userId,
            @RequestBody Task postTask
    ) throws URISyntaxException {
        try {
            final Task newTask = yatlService.addTodo(postTask, userId);
            // return 201 with handled item
            return ResponseEntity.created(new URI(
                    "/rest/todo/" + newTask.getId())).body(newTask);
        } catch (ResourceAlreadyExistsException ex) {
            // log exception first, then return Conflict (409)
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (BadResourceException ex) {
            // log exception first, then return Bad Request (400)
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("todo/{todoId:[\\d]+}")
    public ResponseEntity<Void> updateTodo(
            @RequestBody Task taskToUpdate,
            @PathVariable Long todoId) {
        try {
            System.out.println(new Gson().toJson(taskToUpdate));
            System.out.println("id: " + todoId);

            taskToUpdate.setId(todoId);
            yatlService.changeTodo(taskToUpdate, todoId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException ex) {
            // log exception first, then return Not Found (404)
            log.error(ex.getMessage());
            return ResponseEntity.notFound().build();
        } catch (BadResourceException ex) {
            // log exception first, then return Bad Request (400)
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("todo/{todoId:[\\d]+}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        try {
            yatlService.removeTodo(todoId);
            // return 200 with null body
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException ex) {
            // log exception then return Not Found (404)
            log.error(ex.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
