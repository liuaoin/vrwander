package ncu.graduate.rest;

import ncu.graduate.model.HotSpot;
import ncu.graduate.service.HotSpotService;
import ncu.graduate.util.Page;
import ncu.graduate.util.ResultObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/hotSpot")
public class HotSpotControl {

    @Resource
    private HotSpotService hotSpotService;

    @RequestMapping(value="/saveSceneHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject saveHotSpot(String name, double yaw, double pitch, String sceneId, String targetSceneId,
        double targetYaw, double targetPitch, double targetHfov, String cssClass, String text) {
        ResultObject object = new ResultObject();
        String id = hotSpotService.saveSceneHot(name, yaw, pitch, sceneId, targetSceneId,
                targetYaw, targetPitch, targetHfov, cssClass, text);
        if(id != null) {
            object.setMessage(id);
        }
        return object;
    }

    @RequestMapping(value="/saveTextHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject saveTextHot(String name, double yaw, double pitch, String sceneId, String text,String cssClass) {
        ResultObject object = new ResultObject();
        String id = hotSpotService.saveTextHot(name, yaw, pitch, sceneId, text, cssClass);
        if(id != null) {
            object.setMessage(id);
        }
        return object;
    }

    @RequestMapping(value="/saveURLHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject saveURLHot(String name, double yaw, double pitch, String sceneId, String URL,String cssClass) {
        ResultObject object = new ResultObject();
        String id = hotSpotService.saveURLHot(name, yaw, pitch, sceneId, URL, cssClass);
        if(id != null) {
            object.setMessage(id);
        }
        return object;
    }

    @RequestMapping(value="/saveImageHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject saveImageHot(String name, double yaw, double pitch, String sceneId, String image,String cssClass) {
        ResultObject object = new ResultObject();
        String id = hotSpotService.saveImageHot(name, yaw, pitch, sceneId, image, cssClass);
        if(id != null) {
            object.setMessage(id);
        }
        return object;
    }

    @RequestMapping(value="/saveVideoHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject saveVideoHot(String name, double yaw, double pitch, String sceneId, String video,String cssClass) {
        ResultObject object = new ResultObject();
        String id = hotSpotService.saveVideoHot(name, yaw, pitch, sceneId, video, cssClass);
        if(id != null) {
            object.setMessage(id);
        }
        return object;
    }

    @RequestMapping(value="/removeHotSpot", method=RequestMethod.POST)
    public @ResponseBody ResultObject removeHotSpot(String sceneId, double yaw, double pitch) {
        ResultObject object = new ResultObject();
        HotSpot hotSpot = hotSpotService.removeHotSpot(sceneId, yaw, pitch);
        object.setObj(hotSpot);
        return object;
    }

    @RequestMapping(value="/findAllHots", method=RequestMethod.POST)
    public @ResponseBody ResultObject findAllHots() {
        ResultObject object = new ResultObject();
        List<HotSpot> list = hotSpotService.findAllHots();
        object.setObj(list);
        return object;
    }

    @RequestMapping(value="/updateHotSpot", method=RequestMethod.POST)
    public @ResponseBody ResultObject updateHotSpot(String sceneId, double initYaw, double initPitch, double yaw, double pitch) {
        ResultObject object = new ResultObject();
        HotSpot hotSpot = hotSpotService.updateHotSpot(sceneId, initYaw, initPitch, yaw, pitch);
        object.setObj(hotSpot);
        return object;
    }

    @RequestMapping(value="/findHotByCondition", method=RequestMethod.POST)
    public @ResponseBody ResultObject findHotByCondition(String name, String cssClass, String time, int pageNum, int pageSize) {
        ResultObject object = new ResultObject();
        Page page = hotSpotService.findHotByCondition(name, cssClass, time, pageNum, pageSize);
        object.setObj(page);
        return object;
    }

    @RequestMapping(value="/deleteHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject deleteHot(String id) {
        ResultObject object = new ResultObject();
        hotSpotService.deleteHot(id);
        return object;
    }

    @RequestMapping(value="/deleteSelect", method=RequestMethod.POST)
    public @ResponseBody ResultObject deleteSelect(String[] hots) {
        ResultObject object = new ResultObject();
        hotSpotService.deleteSelect(hots);
        object.setCode(true);
        return object;
    }

    @RequestMapping(value="/updateHot", method=RequestMethod.POST)
    public @ResponseBody ResultObject updateHot(@RequestBody Map<String,Object> map) {
        ResultObject object = new ResultObject();
        hotSpotService.updateHot(map);
        object.setCode(true);
        return object;
    }
}
