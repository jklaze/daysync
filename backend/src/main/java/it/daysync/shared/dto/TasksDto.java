package it.daysync.shared.dto;

import it.daysync.shared.entities.StatusEntity;
import lombok.*;

import java.sql.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TasksDto {

    private Long id;
    private String status;
    private String title;
    private Boolean remind_me;
    private int priority;
    private String expireAt;

}
