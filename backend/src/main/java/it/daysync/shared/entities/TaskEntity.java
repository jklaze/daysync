package it.daysync.shared.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.*;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "tasks")
public class TaskEntity extends BaseEntity{

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private StatusEntity status;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "body",nullable = false)
    private String body;

    @Column(name = "remind_me",nullable = false, columnDefinition = "tinyint(1) default 0")
    private Boolean remind_me;

    @Column(name = "priority", nullable = false, length = 2)
    private Integer priority;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @Column(name = "created_at", columnDefinition = "Datetime")
    private Date created_at;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    @Column(name = "completed_at", columnDefinition = "Datetime")
    private String completed_at;

    @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm")
    @Column(name = "expire_at", columnDefinition = "Datetime",nullable = false)
    private String expire_at;

    public TaskEntity(UserEntity user, StatusEntity status, String title, String body, Boolean remind_me,Integer priority, String expire_at){
        this.user = user;
        this.status = status;
        this.title = title;
        this.body = body;
        this.remind_me = remind_me;
        this.priority = priority;
        this.created_at = new Date(System.currentTimeMillis());
        this.completed_at = new Date(System.currentTimeMillis()).toString();
        this.expire_at = expire_at;
    }

}
