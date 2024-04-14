package com.swf.hackathon;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TrackDecade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public TrackDecade(String name) {
        this.name = name;
    }

    public TrackDecade() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String name;
}
