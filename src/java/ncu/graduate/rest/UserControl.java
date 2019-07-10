package ncu.graduate.rest;

import ncu.graduate.model.User;
import ncu.graduate.service.UserService;
import ncu.graduate.util.ResultObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.Serializable;

@Controller
@RequestMapping("/user")
public class UserControl {

    @Resource
    private UserService userService;

    @RequestMapping(value="/loginCheck", method=RequestMethod.POST)
    public @ResponseBody ResultObject loginCheck(String username, String password ,HttpServletRequest request) {
        ResultObject object = new ResultObject();
        User user = userService.findLoginUser(username, password);
        if(user != null) {
            object.setMessage("success");
        }
        request.getSession().setAttribute("username",user.getUsername());
        return object;
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public @ResponseBody ResultObject register(String username, String password) {
        ResultObject object = new ResultObject();
        Serializable id = userService.saveUser(username,password);
        if(id != null) {
            object.setMessage("success");
        }
        return object;
    }

    @RequestMapping(value="/update", method=RequestMethod.POST)
    public @ResponseBody ResultObject updateUser(String username, String oldpass, String newpass) {
        ResultObject object = new ResultObject();
        boolean flag = userService.updateUser(username, oldpass, newpass);
        if(flag) {
            object.setCode(true);
        }
        return object;
    }

    @RequestMapping(value="/getSession", method=RequestMethod.POST)
    public @ResponseBody ResultObject getSession(HttpServletRequest request) {
        ResultObject object = new ResultObject();
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        object.setMessage(username);
        return object;
    }
}
