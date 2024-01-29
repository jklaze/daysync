package it.daysync.services.implementation;

import it.daysync.services.interfaces.UserInterface;
import it.daysync.shared.dto.CreateUserDto;
import it.daysync.shared.dto.LoginUserDto;
import it.daysync.shared.entities.UserEntity;
import it.daysync.shared.exception.DuplicateUserException;
import it.daysync.shared.exception.InvalidCredentials;
import it.daysync.shared.exception.UserNotFoundException;
import it.daysync.shared.exception.WrongCredentialsException;
import it.daysync.z_repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Timestamp;
import java.time.Instant;



@Service
public class UserImplementation implements UserInterface {
    private final UserRepository userRepository;

    @Autowired
    public UserImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void addUser(CreateUserDto newUserDto) throws DuplicateUserException, InvalidCredentials {

        if(newUserDto.getUsername().isEmpty() || newUserDto.getEmail().isEmpty()){
            throw new InvalidCredentials("Email or username not valid");
        }

        if(userRepository.existsByEmailOrUsername(newUserDto.getEmail(), newUserDto.getUsername())) {
            throw new DuplicateUserException("Email or username already exists");
        }
        try {
            UserEntity userEntity = new UserEntity();

            userEntity.setUsername(newUserDto.getUsername());
            userEntity.setPassword(newUserDto.getPassword());
            userEntity.setFirst_name(newUserDto.getFirst_name());
            userEntity.setLast_name(newUserDto.getLast_name());
            userEntity.setEmail(newUserDto.getEmail());
            userEntity.setIs_admin(false);

            userRepository.save(userEntity);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateUserException("Email or username already exists");
        }
    }


    @Override
    public String login(LoginUserDto loginUserDto) throws UserNotFoundException, WrongCredentialsException, NoSuchAlgorithmException {

        // Crea un Digest con algoritmo md5
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        // stringa da codificare
        String toEncode = loginUserDto.getUsername() + Instant.now().toString();
        // aggiungo la stringa da codificare al digest
        messageDigest.update(toEncode.getBytes(), 0, toEncode.length());
        String token = "";

        UserEntity userEntity = userRepository.findByUsername(loginUserDto.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User doesn't exist"));

        if(!userEntity.getPassword().equals(loginUserDto.getPassword())){
            throw new WrongCredentialsException("Wrong password");
        } else {
            // Eseguo il digest
            token = new BigInteger(1, messageDigest.digest()).toString(16);
            if (token.length() < 32) { token = "0" + token; } // lo vogliamo di 32 caratteri

            userEntity.setToken(token);
            userEntity.setToken_expire(Timestamp.from(Instant.now().plusSeconds(3600)));

            userRepository.save(userEntity);
        }


        return token;
    }


}
