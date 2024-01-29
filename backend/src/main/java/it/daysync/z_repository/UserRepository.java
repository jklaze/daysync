package it.daysync.z_repository;

import it.daysync.shared.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByEmailOrUsername(String email, String username);
    boolean existsByToken(String token);
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByToken(String token);
}
