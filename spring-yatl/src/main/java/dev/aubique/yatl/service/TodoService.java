package dev.aubique.yatl.service;

import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Todo;

import java.util.List;

public interface TodoService {

    /**
     * Retrieve all TodoItems for all Users
     *
     * @return a List of TodoItems
     */
    List<Todo> getFullTodoList();

    /**
     * Retrieve all TodoItems for the User identified by userId
     *
     * @return a List of TodoItems
     */
    List<Todo> getUserTodoList(Long userId) throws ResourceNotFoundException;

    /**
     * Save a TodoItem to the data source, either inserting or updating
     * Assign the TodoItem to User according to his ID
     *
     * @return a TodoItem that was inserted/updated to DB
     */
    Todo addTodo(Todo todo, Long userId) throws ResourceAlreadyExistsException, BadResourceException;

    /**
     * Update a TodoItem in DB by item ID
     */
    void changeTodoItem(Todo todo, Long todoId) throws ResourceNotFoundException, BadResourceException;

    /**
     * Delete the TodoItem in DB by item ID
     */
    void removeTodoItem(Long todoId) throws ResourceNotFoundException;
}
