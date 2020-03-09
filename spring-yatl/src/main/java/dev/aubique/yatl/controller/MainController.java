package dev.aubique.yatl.controller;

import com.google.gson.Gson;
import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Todo;
import dev.aubique.yatl.service.TodoService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/rest/")
public class MainController {

    @Autowired
    private Gson gson;

    @Autowired
    private TodoService todoService;

    @GetMapping("user")
    public ResponseEntity<List<Todo>> readTodoAll() {
        final List<Todo> userTodo = todoService.getFullTodoList();
        // return 200 with JSON body
        return ResponseEntity.ok(userTodo);
    }

    @GetMapping("user/{userId:[\\d]+}")
    public ResponseEntity<List<Todo>> readTodoOne(@PathVariable Long userId) {
        try {
            final List<Todo> userTodo = todoService.getUserTodoList(userId);
            // return 200 with JSON
            return ResponseEntity.ok(userTodo);
        } catch (ResourceNotFoundException ex) {
            // return 404 with null body
            log.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("user/{userId:[\\d]+}")
    public ResponseEntity<?> createTodo(
            @PathVariable Long userId,
            @RequestBody Todo postTodo
    ) throws URISyntaxException {
        try {
            final Todo newTodo = todoService.addTodo(postTodo, userId);
            // return 201 with handled item
            return ResponseEntity.created(new URI(
                    "/rest/todo/" + newTodo.getId())).body(newTodo);
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
            @RequestBody Todo todoToUpdate,
            @PathVariable Long todoId) {
        try {
            System.out.println(new Gson().toJson(todoToUpdate));
            System.out.println("id: " + todoId);

            todoToUpdate.setId(todoId);
            todoService.changeTodoItem(todoToUpdate, todoId);
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

    @DeleteMapping("todo/{todoId:\\d]+}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        try {
            todoService.removeTodoItem(todoId);
            // return 200 with null body
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException ex) {
            // log exception then return Not Found (404)
            log.error(ex.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
