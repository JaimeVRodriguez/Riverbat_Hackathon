package com.swf.hackathon;

import jakarta.annotation.PostConstruct;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController {
    private final TrackService trackService;
    private final String lastFmApiKey = "9beb98cd8c38d5bd1eae3ae43bda26a8";
    private final String stands4Uid = "12476";
    private final String stands4ApiKey = "HOkhjmQ3ruVaQ4LK";

    public MusicController(TrackService trackService) {
        this.trackService = trackService;
    }

    @PostConstruct
    public ResponseEntity<Integer> init() {
        trackService.loadTracksIntoDatabaseByDecade("70s");
        trackService.loadTracksIntoDatabaseByDecade("80s");
        trackService.loadTracksIntoDatabaseByDecade("90s");
        return new ResponseEntity<>(trackService.getAllTracks().size(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/{decade}")
    public List<Track> getMusicByDecade(@PathVariable String decade) {
        return trackService.getTracksByDecade(decade);
    }

    @CrossOrigin
    @GetMapping("/track/{url}")
    public String getTrackByName(@PathVariable String url) {
        byte[] actualURL = Base64.getDecoder().decode(url);
        String stringURL = new String(actualURL);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(stringURL, String.class);
    }

    @CrossOrigin
    @GetMapping("/track/album/{mbid}")
    public String getAlbumArt(@PathVariable String mbid) {
        String res = "";
        try {
            String url = "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=" + lastFmApiKey + "&mbid=" + mbid + "&format=json";
            RestTemplate restTemplate = new RestTemplate();
            res = restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return res;
    }
}