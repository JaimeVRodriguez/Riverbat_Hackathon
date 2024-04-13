package com.swf.hackathon;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
@RestController
@RequestMapping("/music")
public class MusicController {
    private final  String apiKey="9beb98cd8c38d5bd1eae3ae43bda26a8";

//    @Value("${apiKey}")
    @CrossOrigin
    @GetMapping("/{decade}")
    public String getMusicByDecade(@PathVariable String decade) {
        String tag;
        switch (decade) {
            case "70s":
                tag = "70s";
                break;
            case "80s":
                tag = "80s";
                break;
            case "90s":
                tag = "90s";
                break;
            default:
                tag = "70s"; // Default to 70s if invalid decade provided
        }
        String url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + tag + "&api_key=" + apiKey + "&format=json&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}