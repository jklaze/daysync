package it.daysync.shared.dto;

import it.daysync.shared.entities.StatusEntity;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditStatusDto {
    private Long id;
    private int status;
}
