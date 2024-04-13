package com.swf.hackathon;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/music")
public class MusicController {
    private final  String apiKey="9beb98cd8c38d5bd1eae3ae43bda26a8";
    @CrossOrigin
    @GetMapping("/{decade}")
    public String getMusicByDecade(@PathVariable String decade) {
        String tag;
        String completeJSON;
        JSONParser parser;
        List<String> completeList;
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
        RestTemplate testTemplate = new RestTemplate();
        String url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + tag + "&api_key=" + apiKey + "&format=json&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        completeJSON=restTemplate.getForObject(url, String.class);
        return completeJSON;
    }

    @CrossOrigin
    @GetMapping("/track/{url}")
    public String getTrackByName(@PathVariable String url) {
        System.out.println(url);
        byte[] actualURL=Base64.getDecoder().decode(url);
        String stringURL=new String(actualURL);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(stringURL, String.class);
    }

}