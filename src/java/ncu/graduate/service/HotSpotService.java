package ncu.graduate.service;

import ncu.graduate.model.HotSpot;
import ncu.graduate.util.Page;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface HotSpotService {

    public String saveSceneHot(String name, double yaw, double pitch, String sceneId, String targetSceneId,
                               double targetYaw, double targetPitch, double targetFov, String cssClass, String text);

    public String saveTextHot(String name, double yaw, double pitch, String sceneId, String text, String cssClass);

    public String saveURLHot(String name, double yaw, double pitch, String sceneId, String URL, String cssClass);

    public String saveImageHot(String name, double yaw, double pitch, String sceneId, String image, String cssClass);

    public String saveVideoHot(String name, double yaw, double pitch, String sceneId, String video, String cssClass);

    public HotSpot removeHotSpot(String sceneId, double yaw, double pitch);

    public List<HotSpot> findAllHots();

    public HotSpot updateHotSpot(String sceneId, double initYaw, double initPitch, double yaw, double pitch);

    public Page findHotByCondition(String name, String cssClass, String time, int pageNum, int pageSize);

    public void deleteHot(String id);

    public void deleteSelect(String[] hots);

    public void updateHot(Map<String,Object> map);
}
