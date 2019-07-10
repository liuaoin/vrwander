package ncu.graduate.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="initialconfig")
public class InitialConfig implements Serializable {

    @Id
    @Column(name="uuid")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String uuid;

    @Column(name="author")
    private String author;

    @Column(name="title")
    private String title;

    @Column(name="yaw")
    private double yaw;

    @Column(name="pitch")
    private double pitch;

    @Column(name="hfov")
    private double hfov;

    @Column(name="firstScene")
    private String firstScene;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getFirstScene() {
        return firstScene;
    }

    public void setFirstScene(String firstScene) {
        this.firstScene = firstScene;
    }
}
