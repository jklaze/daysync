package it.daysync.shared.exception;

public class WrongCredentialsException extends Exception {
    public WrongCredentialsException (String message) {
        super(message);
    }
}
