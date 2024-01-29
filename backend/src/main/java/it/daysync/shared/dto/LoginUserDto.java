package it.daysync.shared.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUserDto {
    String username;
    String password;
}
