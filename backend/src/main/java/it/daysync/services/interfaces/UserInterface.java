package it.daysync.services.interfaces;

import it.daysync.shared.dto.CreateUserDto;
import it.daysync.shared.dto.LoginUserDto;
import it.daysync.shared.exception.DuplicateUserException;
import it.daysync.shared.exception.InvalidCredentials;
import it.daysync.shared.exception.UserNotFoundException;
import it.daysync.shared.exception.WrongCredentialsException;
import org.springframework.dao.DataIntegrityViolationException;

import java.security.NoSuchAlgorithmException;


public interface UserInterface {

    void addUser(CreateUserDto newUserDto) throws DuplicateUserException, NoSuchAlgorithmException, InvalidCredentials;

    String login(LoginUserDto loginUserDto) throws UserNotFoundException, WrongCredentialsException, NoSuchAlgorithmException;
}
