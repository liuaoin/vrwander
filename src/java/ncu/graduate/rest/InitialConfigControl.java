package ncu.graduate.rest;

import ncu.graduate.model.InitialConfig;
import ncu.graduate.service.InitialConfigService;
import ncu.graduate.util.ResultObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/initialConfig")
public class InitialConfigControl {

    @Resource
    private InitialConfigService initialConfigService;

    @RequestMapping("/updateDefault")
    public @ResponseBody ResultObject updateDefault(String author, String title, double yaw, double pitch,
                                                  double hfov, String firstScene) {
        ResultObject object = new ResultObject();
        initialConfigService.updateDefault(author,title,yaw,pitch,hfov,firstScene);
        object.setCode(true);
        return object;
    }

    @RequestMapping("/findDefault")
    public @ResponseBody ResultObject findDefault() {
        ResultObject object = new ResultObject();
        List<InitialConfig> list = initialConfigService.findDefault();
        object.setObj(list.get(0));
        return object;
    }
}
