package it.daysync.z_repository;

import it.daysync.shared.entities.StatusEntity;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@ComponentScan
public interface StatusRepository extends JpaRepository<StatusEntity, Long> {
    StatusEntity findByCode(Integer code);

}
