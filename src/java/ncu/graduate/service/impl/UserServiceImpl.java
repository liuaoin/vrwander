package ncu.graduate.service.impl;

import ncu.graduate.dao.BaseDao;
import ncu.graduate.model.User;
import ncu.graduate.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private BaseDao baseDao;

    @Override
    public User findLoginUser(String username, String password) {
        String hql = "from User where username = " + "'" + username + "'" + " and password = " + "'" + password +"'";
        User user = new User();
        List<User> list = baseDao.find(hql);
        if(list == null || list.size() == 0) {
            user = null;
        }else {
            user = list.get(0);
        }
        return user;
    }

    @Override
    public Serializable saveUser(String username, String password) {
        Serializable id = null;
        String hql = "from User where username = " + "'" + username + "'";
        List<User> list = baseDao.find(hql);
        if(list == null || list.size() == 0) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            id = baseDao.save(user);
        }
        return id;
    }

    @Override
    public boolean updateUser(String username, String oldpass, String newpass) {
        String hql = "from User where username= " + "'" + username + "'" + " and password = " + "'" + oldpass +"'";
        List<User> list = baseDao.find(hql);
        if(list != null && list.size() != 0) {
            User user = list.get(0);
            user.setPassword(newpass);
            baseDao.update(user);
            return true;
        }
        return false;
    }
}
