package com.swf.hackathon;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String artist;
    private String imagePath;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    private String url;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id")
    private List<TrackDecade> decade;

    public List<TrackDecade> getDecade() {
        return decade;
    }

    public void setDecade(List<TrackDecade> decade) {
        this.decade = decade;
    }

    public void addDecade(TrackDecade decade) {
        this.decade.add(decade);
    }

    public void removeDecade(TrackDecade decade) {
        this.decade.remove(decade);
    }

    public Track(String name, String mbid, String artist, String url, String decade) {
        this(name, mbid, url, "", artist, "", "", decade);
    }

    public Track(String name, String mbid, String url, String imagePath, String artist, String youTubeID, String lyrics, String decade) {
        this.name = name;
        this.artist = artist;
        this.url = url;
        this.imagePath = imagePath;
        this.youTubeID = youTubeID;
        this.mbid = mbid;
        this.lyrics = lyrics;
        this.decade = new ArrayList<TrackDecade>();
    }

    private String youTubeID;

    public Track() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getYouTubeID() {
        return youTubeID;
    }

    public void setYouTubeID(String youTubeID) {
        this.youTubeID = youTubeID;
    }

    private String mbid;
    private String lyrics;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getMbid() {
        return mbid;
    }

    public void setMbid(String mbID) {
        this.mbid = mbID;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }
}
