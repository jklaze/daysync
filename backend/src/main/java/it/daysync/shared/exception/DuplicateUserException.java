package it.daysync.shared.exception;

public class DuplicateUserException extends Exception{
    public DuplicateUserException(String message){
        super(message);
    }
}
