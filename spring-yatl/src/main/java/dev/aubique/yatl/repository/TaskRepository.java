package dev.aubique.yatl.repository;

import dev.aubique.yatl.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface access to {@link Task} data entities
 * Query methods to find tasks by user or a single task by title-field
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUser_Id(Long userId);

    Task findByTitle(String title);
}
