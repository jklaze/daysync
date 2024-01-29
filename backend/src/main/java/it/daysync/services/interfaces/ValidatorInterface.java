package it.daysync.services.interfaces;

import it.daysync.shared.exception.UserNotFoundException;

public interface ValidatorInterface {

    boolean validate(String token) throws UserNotFoundException;
}
