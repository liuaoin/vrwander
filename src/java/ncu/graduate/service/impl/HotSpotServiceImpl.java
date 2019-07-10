package ncu.graduate.service.impl;

import ncu.graduate.dao.BaseDao;
import ncu.graduate.model.HotSpot;
import ncu.graduate.model.Scene;
import ncu.graduate.service.HotSpotService;
import ncu.graduate.util.FormatDateTime;
import ncu.graduate.util.Page;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.annotation.Resource;
import javax.servlet.ServletConfig;
import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.*;

@Service("hotSpotService")
public class HotSpotServiceImpl implements HotSpotService {

    @Resource
    private BaseDao baseDao;

    @Override
    public String saveSceneHot(String name, double yaw, double pitch, String sceneId, String targetSceneId,
                               double targetYaw, double targetPitch, double targetHfov, String cssClass, String text) {
        String hql = "from HotSpot where name = " + "'" + name + "'";
        String sql = "from Scene where sceneId = " + "'" + targetSceneId + "'";
        String str = "from Scene where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        List<Scene> scenes = baseDao.find(sql);
        List<Scene> scene = baseDao.find(str);
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
         if((hotSpots == null || hotSpots.size() == 0) && scenes != null && scenes.size() != 0) {
            HotSpot hotSpot = new HotSpot();
            hotSpot.setName(name);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            hotSpot.setTargetSceneId(targetSceneId);
            hotSpot.setTargetYaw(targetYaw);
            hotSpot.setTargetPitch(targetPitch);
            hotSpot.setTargetHfov(targetHfov);
            hotSpot.setCssClass(cssClass);
            hotSpot.setTime(time);
            hotSpot.setText(text);
            hotSpot.setScenes(scene.get(0));
            String id = (String)baseDao.save(hotSpot);
            return id;
        }
        return null;
    }

    @Override
    public String saveTextHot(String name, double yaw, double pitch, String sceneId, String text, String cssClass) {
        String hql = "from HotSpot where name = " + "'" + name + "'";
        String str = "from Scene where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        List<Scene> scene = baseDao.find(str);
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
        if(hotSpots == null || hotSpots.size() == 0) {
            HotSpot hotSpot = new HotSpot();
            hotSpot.setName(name);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            hotSpot.setText(text);
            hotSpot.setCssClass(cssClass);
            hotSpot.setTime(time);
            hotSpot.setScenes(scene.get(0));
            String id = (String)baseDao.save(hotSpot);
            return id;
        }
        return null;
    }

    @Override
    public String saveURLHot(String name, double yaw, double pitch, String sceneId, String URL, String cssClass) {
        String hql = "from HotSpot where name = " + "'" + name + "'";
        String str = "from Scene where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        List<Scene> scene = baseDao.find(str);
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
        if(hotSpots == null || hotSpots.size() == 0) {
            HotSpot hotSpot = new HotSpot();
            hotSpot.setName(name);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            hotSpot.setURL(URL);
            hotSpot.setCssClass(cssClass);
            hotSpot.setTime(time);
            hotSpot.setScenes(scene.get(0));
            String id = (String)baseDao.save(hotSpot);
            return id;
        }
        return null;
    }

    @Override
    public String saveImageHot(String name, double yaw, double pitch, String sceneId, String image, String cssClass) {
        String hql = "from HotSpot where name = " + "'" + name + "'";
        String str = "from Scene where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        List<Scene> scene = baseDao.find(str);
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
        if(hotSpots == null || hotSpots.size() == 0) {
            HotSpot hotSpot = new HotSpot();
            hotSpot.setName(name);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            hotSpot.setImage(image);
            hotSpot.setCssClass(cssClass);
            hotSpot.setTime(time);
            hotSpot.setScenes(scene.get(0));
            String id = (String)baseDao.save(hotSpot);
            return id;
        }
        return null;
    }

    @Override
    public String saveVideoHot(String name, double yaw, double pitch, String sceneId, String video, String cssClass) {
        String hql = "from HotSpot where name = " + "'" + name + "'";
        String str = "from Scene where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        List<Scene> scene = baseDao.find(str);
        FormatDateTime fdt = new FormatDateTime();
        Date time = fdt.parseDate();
        if(hotSpots == null || hotSpots.size() == 0) {
            HotSpot hotSpot = new HotSpot();
            hotSpot.setName(name);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            hotSpot.setVideo(video);
            hotSpot.setCssClass(cssClass);
            hotSpot.setTime(time);
            hotSpot.setScenes(scene.get(0));
            String id = (String)baseDao.save(hotSpot);
            return id;
        }
        return null;
    }

    @Override
    public HotSpot removeHotSpot(String sceneId, double yaw, double pitch) {
        String hql = "from HotSpot where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        Map<Double, HotSpot> map = new HashMap<>();
        if(hotSpots != null) {
            for(HotSpot i : hotSpots) {
                double yawDistance = i.getYaw() - yaw;
                double pitchDistance = i.getPitch() -pitch;
                double distance = Math.sqrt(Math.pow(yawDistance,2) + Math.pow(pitchDistance,2));
                map.put(distance,i);
            }
            Object[] key = map.keySet().toArray();
            Arrays.sort(key);
            HotSpot hotSpot = map.get(key[0]);
            baseDao.delete(hotSpot);
            return hotSpot;
         }
        return null;
    }

    @Override
    public List<HotSpot> findAllHots() {
        List<HotSpot> list = baseDao.findAll(HotSpot.class);
        return list;
    }

    @Override
    public HotSpot updateHotSpot(String sceneId, double initYaw, double initPitch, double yaw, double pitch) {
        String hql = "from HotSpot where sceneId = " + "'" + sceneId + "'";
        List<HotSpot> hotSpots = baseDao.find(hql);
        Map<Double, HotSpot> map = new HashMap<>();
        if(hotSpots != null) {
            for(HotSpot i : hotSpots) {
                double yawDistance = i.getYaw() - initYaw;
                double pitchDistance = i.getPitch() - initPitch;
                double distance = Math.sqrt(Math.pow(yawDistance,2) + Math.pow(pitchDistance,2));
                map.put(distance,i);
            }
            Object[] key = map.keySet().toArray();
            Arrays.sort(key);
            HotSpot hotSpot = map.get(key[0]);
            hotSpot.setYaw(yaw);
            hotSpot.setPitch(pitch);
            baseDao.update(hotSpot);
            return hotSpot;
        }
        return null;
    }

    @Override
    public Page findHotByCondition(String name, String cssClass, String time, int pageNum, int pageSize) {
        String hql = "from HotSpot where 1=1";
        if(name != null && name.length() > 0) {
            String sql = " and name like " + "'%" + name + "%'" ;
            hql += sql;
        }
        if(cssClass != null && cssClass.length() > 0) {
            String sql = " and cssClass like " + "'%" + cssClass + "%'" ;
            hql += sql;
        }
        if(time != null && time.length() > 0) {
            String sql = " and time like " + "'%" + time + "%'";
            hql += sql;
        }
        List<HotSpot> list = baseDao.findByPage(hql,pageNum,pageSize);
        for(HotSpot hotSpot: list) {
            if(hotSpot.getTargetSceneId() != null) {
                String targetSceneId = hotSpot.getTargetSceneId();
                Scene scene = (Scene) baseDao.get(Scene.class, targetSceneId);
                hotSpot.setTargetSceneId(scene.getName());
            }
        }
        int totalCount = (int)baseDao.findCount(HotSpot.class);
        Page page = new Page();
        page.setPageNum(pageNum);
        page.setPageSize(pageSize);
        page.setTotalCount(totalCount);
        page.setList(list);
        return page;
    }

    @Override
    public void deleteHot(String id) {
        HotSpot hotSpot = (HotSpot) baseDao.get(HotSpot.class, id);
        baseDao.delete(hotSpot);
    }

    @Override
    public void deleteSelect(String[] hots) {
        for(String id: hots) {
            deleteHot(id);
        }
    }

    @Override
    public void updateHot(Map<String,Object> map) {
        String id = (String)map.get("id");
        HotSpot hotSpot = (HotSpot) baseDao.get(HotSpot.class,id);
        for(Map.Entry<String,Object> entry:  map.entrySet()) {
            if(entry.getKey().equals("name")) {
                hotSpot.setName((String)entry.getValue());
            }
            if(entry.getKey().equals("yaw")) {
                hotSpot.setYaw(Double.parseDouble((String)entry.getValue()));
            }
            if(entry.getKey().equals("pitch")) {
                hotSpot.setPitch(Double.parseDouble((String)entry.getValue()));
            }
            if(entry.getKey().equals("targetSceneId")) {
                String hql = "from Scene where name = " + "'" + (String)entry.getValue() + "'";
                List<Scene> scene = baseDao.find(hql);
                hotSpot.setTargetSceneId(scene.get(0).getSceneId());
            }
            if(entry.getKey().equals("text")) {
                hotSpot.setText((String)entry.getValue());
            }
            if(entry.getKey().equals("URL")) {
                hotSpot.setURL((String)entry.getValue());
            }
            if(entry.getKey().equals("image")) {
                hotSpot.setImage((String)entry.getValue());
            }
            if(entry.getKey().equals("video")) {
                hotSpot.setVideo((String)entry.getValue());
            }
            if(entry.getKey().equals("sceneId")) {
                String hql = "from Scene where name = " + "'" + (String)entry.getValue() + "'";
                List<Scene> scene = baseDao.find(hql);
                hotSpot.setScenes(scene.get(0));
            }
        }
        baseDao.update(hotSpot);
    }
}
