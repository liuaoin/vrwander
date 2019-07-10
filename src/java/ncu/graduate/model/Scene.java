package ncu.graduate.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name="scene")
public class Scene implements Serializable {

    @Id
    @Column(name="sceneId")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String sceneId;

    @Column(name="yaw")
    private double yaw;

    @Column(name="pitch")
    private double pitch;

    @Column(name="hfov")
    private double hfov;

    @Column(name="northOffset")
    private double northOffset;

    @Column(name="panorama")
    private String panorama;

    @Column(name="name")
    private String name;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name="time",columnDefinition = "date")
    private Date time;

    @OneToMany(targetEntity = HotSpot.class, fetch = FetchType.EAGER)
    private List<HotSpot> hotSpots = new ArrayList<>();

    public String getSceneId() {
        return sceneId;
    }

    public void setSceneId(String sceneId) {
        this.sceneId = sceneId;
    }

    public double getYaw() {
        return yaw;
    }

    public void setYaw(double yaw) {
        this.yaw = yaw;
    }

    public double getPitch() {
        return pitch;
    }

    public void setPitch(double pitch) {
        this.pitch = pitch;
    }

    public double getHfov() {
        return hfov;
    }

    public void setHfov(double hfov) {
        this.hfov = hfov;
    }

    public double getNorthOffset() {
        return northOffset;
    }

    public void setNorthOffset(double northOffset) {
        this.northOffset = northOffset;
    }

    public String getPanorama() {
        return panorama;
    }

    public void setPanorama(String panorama) {
        this.panorama = panorama;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public List<HotSpot> getHotSpots() {
        return hotSpots;
    }

    public void setHotSpots(List<HotSpot> hotSpots) {
        this.hotSpots = hotSpots;
    }
}
