package com.swf.hackathon;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/music")
public class MusicController {
    private String apiKey="9beb98cd8c38d5bd1eae3ae43bda26a8";
    
    @Value("${apiKey}")
    @CrossOrigin
    @GetMapping
    public String getMusic() {
        String url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" + apiKey + "&format=json&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}