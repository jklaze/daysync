package it.daysync.services.implementation;

import it.daysync.services.interfaces.TaskInterface;
import it.daysync.shared.dto.*;
import it.daysync.shared.entities.StatusEntity;
import it.daysync.shared.entities.TaskEntity;
import it.daysync.shared.entities.UserEntity;
import it.daysync.shared.exception.TaskNotFoundException;
import it.daysync.shared.exception.UserNotFoundException;
import it.daysync.z_repository.StatusRepository;
import it.daysync.z_repository.TaskRepository;
import it.daysync.z_repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TaskImplementation implements TaskInterface {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;
    private final StatusRepository statusRepository;

    private final ValidatorImplementation validator;

    @Autowired
    public TaskImplementation(TaskRepository taskRepository, UserRepository userRepository, StatusRepository statusRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
        validator = new ValidatorImplementation(userRepository);
    }

    @Override
    public void addTask(String token, CreateTaskDto createTaskDto) throws UserNotFoundException {
        if (validator.validate(token)) {
            UserEntity user = userRepository.findByToken(token)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            TaskEntity taskEntity = new TaskEntity();

            taskEntity.setUser(user);
            taskEntity.setStatus(statusRepository.findByCode(1));
            taskEntity.setPriority(createTaskDto.getPriority());
            taskEntity.setTitle(createTaskDto.getTitle());
            taskEntity.setBody(createTaskDto.getBody());
            taskEntity.setRemind_me(createTaskDto.getRemind_me());
            taskEntity.setExpire_at(createTaskDto.getExpire_at());

            taskRepository.save(taskEntity);
        } else {
            throw new UserNotFoundException("Invalid token");
        }
    }

    @Override
    public List<TasksDto> showTasks(String token) throws UserNotFoundException {

        var taskEntities = taskRepository.findByUserOrderByPriorityDesc(userRepository.findByToken(token)
                .orElseThrow(() -> new UserNotFoundException("User not found")));

        return taskEntities.stream()
                .filter(taskEntity -> !taskEntity.getStatus().getCode().equals(2))
                .map(taskEntity -> new TasksDto(
                taskEntity.getId(),
                mapStatus(taskEntity.getStatus().getCode()),
                taskEntity.getTitle(),
                taskEntity.getRemind_me(),
                taskEntity.getPriority(),
                taskEntity.getExpire_at().substring(0, taskEntity.getExpire_at().length() - 3)
        )).toList();
    }

    @Override
    public void editStat(EditStatusDto editStatusDto, String token ) throws UserNotFoundException, TaskNotFoundException{
        if(!validator.validate(token)){
            throw new UserNotFoundException("Not found user");
        }
        StatusEntity statusEntity = statusRepository.findByCode(editStatusDto.getStatus());
        TaskEntity taskEntity = taskRepository.getById(editStatusDto.getId());
        taskEntity.setStatus(statusEntity);

        taskRepository.save(taskEntity);

    }

    @Override
    public TaskDto showSingleTask(Long id, String token) throws UserNotFoundException, TaskNotFoundException {
        try{
            if (!validator.validate(token)) {
                throw new UserNotFoundException("User not valid");
            }
            TaskEntity taskEntity = taskRepository.getTaskEntityById(id).orElseThrow(()->new TaskNotFoundException("Task not found"));
            return new TaskDto(
                    taskEntity.getStatus().getCode(),
                    taskEntity.getTitle(),
                    taskEntity.getBody(),
                    taskEntity.getRemind_me(),
                    taskEntity.getPriority(),
                    taskEntity.getCompleted_at(),
                    taskEntity.getExpire_at().substring(0, taskEntity.getExpire_at().length() - 3)
            );

        } catch (TaskNotFoundException e){
            throw new TaskNotFoundException("Task not found");
        }


    }

    @Override
    public void editTask(String token, EditTaskDto editTaskDto) throws UserNotFoundException{
        try{
            if(!validator.validate(token)){
                throw new UserNotFoundException("User not found");
            }
            TaskEntity taskEntity = taskRepository.getTaskEntityById(editTaskDto.getId()).orElseThrow(() -> new TaskNotFoundException("Task not found"));

            taskEntity.setStatus(statusRepository.findByCode(editTaskDto.getStatus()));
            taskEntity.setTitle(editTaskDto.getTitle());
            taskEntity.setBody(editTaskDto.getBody());
            taskEntity.setPriority(editTaskDto.getPriority());
            taskEntity.setRemind_me(editTaskDto.isRemind_me());
            taskEntity.setCompleted_at(editTaskDto.getCompleted_at());
            taskEntity.setExpire_at(editTaskDto.getExpire_at());

            taskRepository.save(taskEntity);

        } catch (TaskNotFoundException | UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    private String mapStatus(int status){
        return statusRepository.findByCode(status).getDescription();
    }


    public void deleteTask(String token, Long id) throws UserNotFoundException, TaskNotFoundException {
        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() ->  new TaskNotFoundException("Task don't exist"));

        if(!validator.validate(token) || !taskEntity.getUser().getToken().equals(token)){
            throw new UserNotFoundException("Unauthorized user");
        }

        taskRepository.delete(taskEntity);

    }

}
