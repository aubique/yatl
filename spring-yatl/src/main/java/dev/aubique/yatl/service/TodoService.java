package dev.aubique.yatl.service;

import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Todo;

import java.util.List;

public interface TodoService {

    List<Todo> getFullTodoList();

    List<Todo> getUserTodoList(Long userId) throws ResourceNotFoundException;

    Todo addTodo(Todo todo, Long userId) throws ResourceAlreadyExistsException, BadResourceException;

    void changeTodoItem(Todo todo, Long todoId) throws ResourceNotFoundException, BadResourceException;

    void removeTodoItem(Long todoId) throws ResourceNotFoundException;
}
