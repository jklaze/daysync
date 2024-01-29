package it.daysync.shared.dto;

import lombok.*;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditTaskDto {

    private Long id;
    private int status;
    private String title;
    private String body;
    private int priority;
    private boolean remind_me;
    private String completed_at;
    private String expire_at;

}
