package dev.aubique.yatl.repository;

import dev.aubique.yatl.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUser_Id(Long userId);

    Todo findByTitle(String title);
}
