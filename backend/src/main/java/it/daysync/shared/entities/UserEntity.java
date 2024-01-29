package it.daysync.shared.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "users")
public class UserEntity extends BaseEntity{
    @Column(name = "username", nullable = false,length = 15,unique = true)
    private String username;

    @Column(name="password", nullable = false, length = 32)
    private String password;

    @Column(name = "first_name", nullable = false, length = 20)
    private String first_name;

    @Column(name="last_name", nullable = false, length = 20)
    private String last_name;

    @Column(name="email", nullable = false, length = 30,unique = true)
    private String email;

    @Column(name="is_admin", nullable = false, columnDefinition = "boolean default false")
    private Boolean is_admin;

    @Column(name = "preferences", columnDefinition = "json")
    private String preferences;

    @OneToMany(mappedBy = "user")
    private List<TaskEntity> tasks;

    @Column(name = "token", length = 32)
    private String token;

    @Column(name = "token_expire", columnDefinition = "TIMESTAMP")
    private Timestamp token_expire;
}
