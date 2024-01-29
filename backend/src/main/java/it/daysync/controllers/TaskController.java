package it.daysync.controllers;


import it.daysync.services.implementation.TaskImplementation;
import it.daysync.shared.dto.CreateTaskDto;
import it.daysync.shared.dto.EditStatusDto;
import it.daysync.shared.dto.EditTaskDto;
import it.daysync.shared.exception.TaskNotFoundException;
import it.daysync.shared.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskImplementation taskServiceImplementation;

    public TaskController(TaskImplementation serviceImplementation) {
        this.taskServiceImplementation = serviceImplementation;
    }
    @PostMapping("/{token}/create")
    public ResponseEntity<String> addTask(@PathVariable String token, @RequestBody CreateTaskDto createTaskDto) {
        try {
            taskServiceImplementation.addTask(token, createTaskDto);
            return ResponseEntity.ok("Added");
        } catch (UserNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{token}")
    public ResponseEntity<?> showTasks(@PathVariable String token){
        try {
            return ResponseEntity.ok(taskServiceImplementation.showTasks(token));
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{token}/status")
    public ResponseEntity<?> editStatus(@RequestBody EditStatusDto editStatusDto, @PathVariable String token){
        try{
            taskServiceImplementation.editStat(editStatusDto, token);
            return ResponseEntity.ok().body("Edited");
        } catch (UserNotFoundException | TaskNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{token}/{id}")
    public ResponseEntity<?> showSingleTask(@PathVariable String token, @PathVariable Long id) throws UserNotFoundException, TaskNotFoundException {
        return ResponseEntity.ok(taskServiceImplementation.showSingleTask(id, token));
    }

    @PutMapping("/{token}")
    public ResponseEntity<String> editSingleTask(@PathVariable String token,@RequestBody EditTaskDto editTaskDto) throws UserNotFoundException {
        try{
            taskServiceImplementation.editTask(token,editTaskDto);
            return ResponseEntity.ok("Edited task");
        } catch (UserNotFoundException  e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/{token}/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String token , @PathVariable Long id){
        try{
            taskServiceImplementation.deleteTask(token, id);
            return ResponseEntity.ok().body("Task deleted");
        } catch (UserNotFoundException | TaskNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
