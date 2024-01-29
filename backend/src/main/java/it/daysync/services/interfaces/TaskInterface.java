package it.daysync.services.interfaces;

import it.daysync.shared.dto.*;
import it.daysync.shared.exception.TaskNotFoundException;
import it.daysync.shared.exception.UserNotFoundException;
import org.apache.catalina.User;

import java.util.List;

public interface TaskInterface {

    void addTask(String token, CreateTaskDto createTaskDto) throws UserNotFoundException;

     List<TasksDto> showTasks(String token) throws UserNotFoundException;

     TaskDto showSingleTask(Long id, String token) throws UserNotFoundException, TaskNotFoundException;
     void editTask(String token, EditTaskDto editTaskDto) throws UserNotFoundException;

     void deleteTask(String token, Long id) throws UserNotFoundException, TaskNotFoundException;

    void editStat(EditStatusDto editStatusDto, String token) throws UserNotFoundException, TaskNotFoundException;

}
