package it.daysync.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    private String username;
    private String password;
    private String first_name;
    private String last_name;
    private String email;

}
