package dev.aubique.yatl.repository;

import dev.aubique.yatl.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository class for <code>User</code> domain objects.
 * All method names are compliant with Spring Data naming conventions.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
