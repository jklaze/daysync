package it.daysync.controllers;


import it.daysync.services.implementation.UserImplementation;
import it.daysync.shared.dto.CreateUserDto;
import it.daysync.shared.dto.LoginUserDto;
import it.daysync.shared.exception.DuplicateUserException;
import it.daysync.shared.exception.InvalidCredentials;
import it.daysync.shared.exception.UserNotFoundException;
import it.daysync.shared.exception.WrongCredentialsException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLIntegrityConstraintViolationException;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {

    private final UserImplementation userServiceImplementation;

    public UserController(UserImplementation userServiceImplementation) {
        this.userServiceImplementation = userServiceImplementation;
    }

    @PostMapping("/new")
    public ResponseEntity<String> addUser(@RequestBody CreateUserDto newUser){
        try{
            userServiceImplementation.addUser(newUser);
            return ResponseEntity.ok("Created new user");
        } catch (DuplicateUserException | DataIntegrityViolationException | InvalidCredentials e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserDto loginUserDto) {
        try {
            String token = userServiceImplementation.login(loginUserDto);
            return ResponseEntity.ok(token);
        } catch (UserNotFoundException | WrongCredentialsException | NoSuchAlgorithmException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
