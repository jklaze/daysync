package it.daysync.services.implementation;

import it.daysync.services.interfaces.ValidatorInterface;
import it.daysync.shared.exception.UserNotFoundException;
import it.daysync.z_repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidatorImplementation implements ValidatorInterface {

    private final UserRepository userRepository;

    @Autowired
    public ValidatorImplementation(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean validate(String token) throws UserNotFoundException {
        return userRepository.existsByToken(token);
    }

}
