package ncu.graduate.service.impl;

import ncu.graduate.dao.BaseDao;
import ncu.graduate.model.HotSpot;
import ncu.graduate.model.Scene;
import ncu.graduate.service.SceneService;
import ncu.graduate.util.FormatDateTime;
import ncu.graduate.util.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("sceneService")
public class SceneServiceImpl implements SceneService {

    @Resource
    private BaseDao baseDao;

    @Override
    public List<Scene> findAllScene() {
        List<Scene> list = baseDao.findAll(Scene.class);
        for(Scene scene : list) {
            String hql = "from HotSpot where sceneId = " + "'" + scene.getSceneId() + "'";
            List<HotSpot> hotSpots = baseDao.find(hql);
            scene.setHotSpots(hotSpots);
        }
        return list;
    }

    @Override
    public List<Scene> findScene(String panorama) {
        String hql = "from Scene where panorama = " + "'" + panorama + "'";
        List<Scene> list = baseDao.find(hql);
        return list;
    }

    @Override
    public String addScene(String name, double yaw, double pitch, double hfov, double northOffset, String panorama) {
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
        Scene scene = new Scene();
        scene.setName(name);
        scene.setYaw(yaw);
        scene.setPitch(pitch);
        scene.setHfov(hfov);
        scene.setNorthOffset(northOffset);
        scene.setPanorama(panorama);
        scene.setTime(time);
        String id = (String)baseDao.save(scene);
        return id;
    }

    @Override
    public List<Scene> findSceneByName(String name) {
        String hql = "from Scene where name = " + "'" + name + "'";
        List<Scene> list = baseDao.find(hql);
        return list;
    }

    @Override
    public Page findSceneByCondition(String name, String time, int pageNum, int pageSize) {
        String hql = "from Scene where 1=1";
        if(name != null && name.length() > 0) {
            String sql = " and name like " + "'" + name + "%'" ;
            hql += sql;
        }
        if(time != null && time.length() > 0) {
            String sql = " and time like " + "'%" + time + "%'";
            hql += sql;
        }
        List<Scene> list = baseDao.findByPage(hql,pageNum,pageSize);
        int totalCount = (int)baseDao.findCount(Scene.class);
        Page page = new Page();
        page.setPageSize(pageSize);
        page.setPageNum(pageNum);
        page.setTotalCount(totalCount);
        if(list != null && list.size() != 0) {
            for(Scene scene : list) {
                String sql = "from HotSpot where sceneId = " + "'" + scene.getSceneId() + "'";
                List<HotSpot> hotSpots = baseDao.find(sql);
                scene.setHotSpots(hotSpots);
            }
            page.setList(list);
        }
        return page;
    }

    @Override
    public void updateScene(String sceneId, String name, double yaw, double pitch, double hfov, double northOffset, String panorama) {
        Scene scene = (Scene) baseDao.get(Scene.class,sceneId);
        scene.setName(name);
        scene.setYaw(yaw);
        scene.setPitch(pitch);
        scene.setHfov(hfov);
        scene.setNorthOffset(northOffset);
        scene.setPanorama(panorama);
        baseDao.update(scene);
    }

    @Override
    public void deleteScene(String sceneId) {
        Scene scene = (Scene) baseDao.get(Scene.class,sceneId);
        String hql = "from HotSpot where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> list = baseDao.find(hql);
        for(HotSpot hotSpot : list) {
            baseDao.delete(hotSpot);
        }
        baseDao.delete(scene);
    }

    @Override
    public void deleteSelect(String[] scenes) {
        for(String sceneId : scenes) {
            deleteScene(sceneId);
        }
    }

    @Override
    public Scene findSceneBySceneId(String sceneId) {
        Scene scene = (Scene)baseDao.get(Scene.class,sceneId);
        return scene;
    }
}
