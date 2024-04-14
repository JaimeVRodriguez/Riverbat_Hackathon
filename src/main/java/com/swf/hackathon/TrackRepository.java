package com.swf.hackathon;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    Track findByMbid(String mbID);

    List<Track> findAllByDecade_Name(String decade);
}