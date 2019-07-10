package ncu.graduate.service.impl;

import ncu.graduate.dao.BaseDao;
import ncu.graduate.model.InitialConfig;
import ncu.graduate.model.Scene;
import ncu.graduate.service.InitialConfigService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("initialConfigService")
public class InitialConfigServiceImpl implements InitialConfigService {

    @Resource
    private BaseDao baseDao;

    @Override
    public void updateDefault(String author, String title, double yaw, double pitch, double hfov, String firstScene) {
        String hql = "from InitialConfig where author = " + "'" + author + "'";
        String sql = "from Scene where name = " + "'" + firstScene + "'";
        List<InitialConfig> list = baseDao.find(hql);
        List<Scene> scene = baseDao.find(sql);
        if(list != null || list.size() == 0) {
            list.get(0).setAuthor(author);
            list.get(0).setTitle(title);
            list.get(0).setYaw(yaw);
            list.get(0).setPitch(pitch);
            list.get(0).setHfov(hfov);
            list.get(0).setFirstScene(scene.get(0).getSceneId());
            baseDao.update(list.get(0));
        }else {
            InitialConfig initial = new InitialConfig();
            initial.setAuthor(author);
            initial.setTitle(title);
            initial.setYaw(yaw);
            initial.setPitch(pitch);
            initial.setHfov(hfov);
            initial.setFirstScene(firstScene);
            baseDao.save(initial);
        }
    }

    @Override
    public List<InitialConfig> findDefault() {
        List<InitialConfig> list = baseDao.findAll(InitialConfig.class);
        return list;
    }
}
