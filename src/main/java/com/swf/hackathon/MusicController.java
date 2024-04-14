package com.swf.hackathon;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController {
    private final String apiKey = "9beb98cd8c38d5bd1eae3ae43bda26a8";

    @CrossOrigin
    @GetMapping("/{decade}")
    public String getMusicByDecade(@PathVariable String decade) {
        String tag;
        String completeJSON;
        JSONParser parser;
        List<String> completeList;
        tag = switch (decade) {
            case "80s" -> "80s";
            case "90s" -> "90s";
            default -> "70s";
        };
        RestTemplate testTemplate = new RestTemplate();
        String url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + tag +
                "&api_key=" + apiKey + "&format=json&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        completeJSON = restTemplate.getForObject(url, String.class);
        return completeJSON;
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
            String url = "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=" + apiKey +
                    "&mbid=" + mbid + "&format=json";
            RestTemplate restTemplate = new RestTemplate();
            res = restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
            return res;
    }
}