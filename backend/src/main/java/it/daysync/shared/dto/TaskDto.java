package it.daysync.shared.dto;

import it.daysync.shared.entities.StatusEntity;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

    private int status;
    private String title;
    private String body;
    private Boolean remind_me;
    private int priority;
    private String completed_at;
    private String expire_at;


}
