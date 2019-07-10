package ncu.graduate.rest;

import com.fasterxml.jackson.annotation.JsonFormat;
import ncu.graduate.model.Scene;
import ncu.graduate.service.SceneService;
import ncu.graduate.util.Page;
import ncu.graduate.util.ResultObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/scene")
public class SceneControl {

    @Resource
    private SceneService sceneService;

    @RequestMapping(value="/findAllScene", method=RequestMethod.POST)
    public @ResponseBody ResultObject findAllScene() {
        ResultObject object = new ResultObject();
        List<Scene> list = sceneService.findAllScene();
        object.setObj(list);
        return object;
    }

    @RequestMapping(value="/findScene", method=RequestMethod.POST)
    public @ResponseBody ResultObject findSceneByPanorama(String panorama) {
        ResultObject object = new ResultObject();
        List<Scene> list = sceneService.findScene(panorama);
        object.setObj(list.get(0));
        return object;
    }

    @RequestMapping(value="/addScene", method=RequestMethod.POST)
    public @ResponseBody ResultObject addScene(String name, double yaw, double pitch, double hfov,
                                               double northOffset,String panorama) {
        ResultObject object = new ResultObject();
        String id = sceneService.addScene(name,yaw,pitch,hfov,northOffset,panorama);
        object.setMessage(id);
        return object;
    }

    @RequestMapping(value="/findSceneByName", method=RequestMethod.POST)
    public @ResponseBody ResultObject findSceneByName(String name) {
        ResultObject object = new ResultObject();
        List<Scene> list = sceneService.findSceneByName(name);
        object.setObj(list.get(0));
        return object;
    }

    @RequestMapping(value="/findSceneByCondition", method=RequestMethod.POST)
    public @ResponseBody ResultObject findSceneByCondition(String name, String time, int pageNum, int pageSize) {
        ResultObject object = new ResultObject();
        Page page = sceneService.findSceneByCondition(name,time,pageNum,pageSize);
        object.setObj(page);
        return object;
    }

    @RequestMapping(value="/updateScene", method=RequestMethod.POST)
    public @ResponseBody ResultObject updateScene(String sceneId, String name, double yaw, double pitch, double hfov,
                                                  double northOffset,String panorama) {
        ResultObject object = new ResultObject();
        sceneService.updateScene(sceneId, name,yaw,pitch,hfov,northOffset,panorama);
        object.setCode(true);
        return object;
    }

    @RequestMapping(value="/deleteScene", method=RequestMethod.POST)
    public @ResponseBody ResultObject deleteScene(String sceneId) {
        ResultObject object = new ResultObject();
        sceneService.deleteScene(sceneId);
        object.setCode(true);
        return object;
    }

    @RequestMapping(value="/deleteSelect", method=RequestMethod.POST)
    public @ResponseBody ResultObject deleteSelect(String[] scenes) {
        ResultObject object = new ResultObject();
        sceneService.deleteSelect(scenes);
        object.setCode(true);
        return object;
    }

    @RequestMapping(value="/findSceneBySceneId", method=RequestMethod.POST)
    public @ResponseBody ResultObject findSceneBySceneId(String sceneId) {
        ResultObject object = new ResultObject();
        Scene scene = sceneService.findSceneBySceneId(sceneId);
        object.setObj(scene);
        return object;
    }

    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public @ResponseBody ResultObject upload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ResultObject object = new ResultObject();
        request.setCharacterEncoding("utf-8");
        return object;
    }
}
