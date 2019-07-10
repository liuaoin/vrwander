package ncu.graduate.service;

import ncu.graduate.model.Scene;
import ncu.graduate.util.Page;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public interface SceneService {

    public List<Scene> findAllScene();

    public List<Scene> findScene(String panorama);

    public String addScene(String name, double yaw, double pitch,
                                 double hfov, double northOffset, String panorama);

    public List<Scene> findSceneByName(String name);

    public Page findSceneByCondition(String name, String time, int pageNum, int pageSize);

    public void updateScene(String sceneId, String name, double yaw, double pitch,
                              double hfov, double northOffset, String panorama);

    public void deleteScene(String sceneId);

    public void deleteSelect(String[] scenes);

    public Scene findSceneBySceneId(String sceneId);
}
