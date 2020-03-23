package dev.aubique.yatl.repository;

import dev.aubique.yatl.model.TaskCore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface to access {@link TaskCore} data entities
 */
@Repository
public interface TaskCoreRepository extends JpaRepository<TaskCore, Long> {
}
