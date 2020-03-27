package dev.aubique.yatl.service;

import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Task;
import dev.aubique.yatl.model.TaskCore;
import dev.aubique.yatl.model.TaskCompleteDto;
import dev.aubique.yatl.model.User;

import java.util.List;

public interface YatlService {

    /**
     * Retrieve all {@link Task} instances for any users
     *
     * @return a List of tasks
     */
    List<Task> getFullTodoList();

    /**
     * Retrieve all {@link Task} for {@link User} identified by user-id
     *
     * @return a List of tasks
     */
    List<Task> getUserTodoList(Long userId) throws ResourceNotFoundException;

    /**
     * Save a {@link Task} instance to the data source, either inserting or updating
     * Assign task to {@link User} according to his ID
     *
     * @return a task that was successfully queried to the persistence
     */
    Task addTodo(Task task, Long userId) throws ResourceAlreadyExistsException, BadResourceException;

    /**
     * Update a {@link Task} in persistence by {@link TaskCore} ID
     */
    void changeTodo(Task task, Long taskId) throws ResourceNotFoundException, BadResourceException;

    /**
     * Update a part of {@link Task} instance with new complete-value provided by {@link TaskCompleteDto}
     */
    void modifyTodoComplete(TaskCompleteDto taskDto, Long todoId) throws ResourceNotFoundException;

    /**
     * Update a list of {@link TaskCore} entities in order to keep up-to-date a frequently changed priority
     */
    void modifyCoreList(List<TaskCore> taskCoreList, Long userId) throws BadResourceException;

    /**
     * Delete a {@link Task} in persistence by {@link TaskCore} ID
     */
    void removeTodo(Long taskId) throws ResourceNotFoundException;
}
