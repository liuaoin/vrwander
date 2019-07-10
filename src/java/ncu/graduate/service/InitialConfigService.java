package ncu.graduate.service;

import ncu.graduate.model.InitialConfig;

import java.util.List;

public interface InitialConfigService {

    public void updateDefault(String author, String title, double yaw, double pitch,
                               double hfov, String firstScene);

    public List<InitialConfig> findDefault();
}
