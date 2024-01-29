package it.daysync.z_repository;


import it.daysync.shared.entities.TaskEntity;
import it.daysync.shared.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    List<TaskEntity> findByUserOrderByPriorityDesc(UserEntity user);
    Optional<TaskEntity> getTaskEntityById(Long id);

    TaskEntity getById(Long id);



}
