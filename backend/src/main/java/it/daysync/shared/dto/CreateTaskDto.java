package it.daysync.shared.dto;

import it.daysync.shared.entities.StatusEntity;
import it.daysync.shared.entities.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskDto {

    private UserEntity user;
    private StatusEntity status;
    private int priority;
    private String title;
    private String body;
    private Boolean remind_me;
    private String expire_at;
}
