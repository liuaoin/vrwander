package ncu.graduate.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="hotspot")
public class HotSpot implements Serializable {

    @Id
    @Column(name="id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    @Column(name="text")
    private String text;

    @Column(name="URL")
    private String URL;

    @Column(name="image")
    private String image;

    @Column(name="video")
    private String video;

    /*相对参考坐标系的位置*/
    @Column(name="yaw")
    private double yaw;

    /*相对参考坐标系的位置*/
    @Column(name="pitch")
    private double pitch;

    @Column(name="targetSceneId")
    private String targetSceneId;

    /*相对参考坐标系的位置*/
    @Column(name="targetYaw")
    private double targetYaw;

    /*相对参考坐标系的位置*/
    @Column(name="targetPitch")
    private double targetPitch;

    @Column(name="targetHfov")
    private double targetHfov;

    @Column(name="cssClass")
    private String cssClass;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name="time",columnDefinition = "date")
    private Date time;

    @ManyToOne(targetEntity = Scene.class, fetch = FetchType.EAGER)
    @JoinColumn(name="sceneId",referencedColumnName = "sceneId")
    private Scene scenes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
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

    public String getTargetSceneId() {
        return targetSceneId;
    }

    public void setTargetSceneId(String targetSceneId) {
        this.targetSceneId = targetSceneId;
    }

    public double getTargetYaw() {
        return targetYaw;
    }

    public void setTargetYaw(double targetYaw) {
        this.targetYaw = targetYaw;
    }

    public double getTargetPitch() {
        return targetPitch;
    }

    public void setTargetPitch(double targetPitch) {
        this.targetPitch = targetPitch;
    }

    public double getTargetHfov() {
        return targetHfov;
    }

    public void setTargetHfov(double targetHfov) {
        this.targetHfov = targetHfov;
    }

    public String getCssClass() {
        return cssClass;
    }

    public void setCssClass(String cssClass) {
        this.cssClass = cssClass;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Scene getScenes() {
        return scenes;
    }

    public void setScenes(Scene scenes) {
        this.scenes = scenes;
    }
}
