package it.daysync.shared.component;

import it.daysync.shared.entities.StatusEntity;
import it.daysync.z_repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
@DependsOn("statusRepository")
public class StatusComponent implements CommandLineRunner {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusComponent(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica se i dati predefiniti esistono già
        if (statusRepository.count() == 0) {
            // Se non esistono, crea i dati predefiniti
            StatusEntity todo = new StatusEntity();
            todo.setCode(1);
            todo.setDescription("To do");
            statusRepository.save(todo);

            StatusEntity completed = new StatusEntity();
            completed.setCode(2);
            completed.setDescription("Completed");
            statusRepository.save(completed);

            StatusEntity inProgress = new StatusEntity();
            inProgress.setCode(3);
            inProgress.setDescription("In Progress");
            statusRepository.save(inProgress);
        }
    }
}
