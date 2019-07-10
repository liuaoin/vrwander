package ncu.graduate.service;

import ncu.graduate.model.User;

import java.io.Serializable;

public interface UserService {

    public User findLoginUser(String username, String password);

    public Serializable saveUser(String username, String password);

    public boolean updateUser(String username, String oldpass, String newpass);
}
