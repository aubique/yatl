package dev.aubique.yatl.repository;

import dev.aubique.yatl.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository class for <code>_Todo</code> domain objects.
 * All method names are compliant with Spring Data naming conventions.
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUser_Id(Long userId);

    Todo findByTitle(String title);
}
