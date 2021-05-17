package dev.aubique.yatl.service;

import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Task;
import dev.aubique.yatl.model.User;
import dev.aubique.yatl.repository.TaskCoreRepository;
import dev.aubique.yatl.repository.TaskRepository;
import dev.aubique.yatl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class YatlServiceImpl implements YatlService {

    @Autowired
    TaskCoreRepository taskCoreRepo;

    @Autowired
    TaskRepository taskRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public List<Task> getFullTodoList() {
        return taskRepo.findAll();
    }

    @Override
    public List<Task> getUserTodoList(Long userId)
            throws ResourceNotFoundException {

        // Search by id-property of user-entity
        final List<Task> userTaskList = taskRepo.findAllByUser_Id(userId);
        if (userTaskList.isEmpty())
            throw new ResourceNotFoundException();

        return userTaskList;
    }

    @Override
    @Transactional
    public Task addTodo(Task taskToSave, Long userId)
            throws ResourceAlreadyExistsException, BadResourceException {

        // Verify the user exists, then paste it to the new item
        // Otherwise throw 400 (bad request)
        final User existingUser = userRepo.findById(userId)
                .orElseThrow(BadResourceException::new);
        taskToSave.setUser(existingUser);
        // Hot-fix
        taskToSave.getTaskCore().setId(null);

        // Build an example to look for existing item
        // Throw 409 (conflict) if there collisions with the
        Example<Task> exampleTodo = Example.of(taskToSave);
        if (taskRepo.exists(exampleTodo))
            throw new ResourceAlreadyExistsException();

//        taskCoreRepo.save(taskToSave.getTaskCore());
        return taskRepo.save(taskToSave);
    }

    @Override
    @Transactional
    public void changeTodo(Task newTask, Long taskId)
            throws ResourceNotFoundException, BadResourceException {

        // Make sure there is an existing item and copy its User-property to the new item
        Task oldTask = taskRepo.findById(taskId)
                .orElseThrow(ResourceNotFoundException::new);
        newTask.setUser(oldTask.getUser());
        // Avoid printing User-property due to the recursive list property

        taskRepo.save(newTask);
    }

    @Override
    @Transactional
    public void removeTodo(Long taskId) throws ResourceNotFoundException {

        // Throw 404 if there is no item found in DB
        final Task taskToDelete = taskRepo.findById(taskId)
                .orElseThrow(ResourceNotFoundException::new);

        taskRepo.deleteById(taskId);
    }
}
