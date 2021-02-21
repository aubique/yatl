package dev.aubique.yatl.service;

import dev.aubique.yatl.exception.BadResourceException;
import dev.aubique.yatl.exception.ResourceAlreadyExistsException;
import dev.aubique.yatl.exception.ResourceNotFoundException;
import dev.aubique.yatl.model.Todo;
import dev.aubique.yatl.model.User;
import dev.aubique.yatl.repository.TodoRepository;
import dev.aubique.yatl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepository todoRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    @Transactional(readOnly = true)
    public List<Todo> getFullTodoList() {
        return todoRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Todo> getUserTodoList(Long userId)
            throws ResourceNotFoundException {

        // Search by id-property of user-entity
        final List<Todo> userTodoList = todoRepo.findAllByUser_Id(userId);
        if (userTodoList == null)
            throw new ResourceNotFoundException();

        return userTodoList;
    }

    @Override
    public Todo addTodo(Todo todoToSave, Long userId)
            throws ResourceAlreadyExistsException, BadResourceException {

        // Verify the user exists, then paste it to the new item
        // Otherwise throw 400 (bad request)
        final User existingUser = userRepo.findById(userId)
                .orElseThrow(BadResourceException::new);
        todoToSave.setUser(existingUser);

        // Build an example to look for existing item
        // Throw 409 (conflict) if there are items presented in DB
        Example<Todo> exampleTodo = Example.of(todoToSave);
        if (todoRepo.exists(exampleTodo))
            throw new ResourceAlreadyExistsException();

        return todoRepo.save(todoToSave);
    }

    @Override
    public void changeTodoItem(Todo newTodo, Long oldTodoId)
            throws ResourceNotFoundException, BadResourceException {

        // Make sure there is an existing item and copy its owner to new item
        Todo oldTodo = todoRepo.findById(oldTodoId)
                .orElseThrow(ResourceNotFoundException::new);
        oldTodo.setId(newTodo.getId());
        oldTodo.setTitle(newTodo.getTitle());
        oldTodo.setDescription(newTodo.getDescription());
//        newTodo.setUser(oldTodo.getUser());

        System.out.println();
//        System.out.println(new Gson().toJson(newTodo));
        todoRepo.save(oldTodo);
    }

    @Override
    public void removeTodoItem(Long todoId) throws ResourceNotFoundException {

        // Throw 404 if there is no item found in DB
        final Todo todoToDelete = todoRepo.findById(todoId)
                .orElseThrow(ResourceNotFoundException::new);

        todoRepo.deleteById(todoId);
    }
}
