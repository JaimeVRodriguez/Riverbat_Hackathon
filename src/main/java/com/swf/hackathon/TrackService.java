package com.swf.hackathon;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TrackService {
    private final String lastFmApiKey = "9beb98cd8c38d5bd1eae3ae43bda26a8";
    private final String stands4Uid = "12476";
    private final String stands4ApiKey = "HOkhjmQ3ruVaQ4LK";

    TrackRepository trackRepository;

    public TrackService(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public List<Track> getTracksByDecade(String decade) {
        return trackRepository.findAllByDecade_Name(decade);
    }

    public void addTrack(Track track) {
        trackRepository.save(track);
    }

    public void addTracks(List<Track> tracks) {
        trackRepository.saveAll(tracks);
    }

    public void addTrack(String mbID, String decade, String artist, String name) {
        Track track = new Track();
        track.setMbid(mbID);
        track.setArtist(artist);
        track.setName(name);
        addTrack(track);
    }

    public void deleteTrack(Track track) {
        trackRepository.delete(track);
    }

    public Track getTrackByMbID(String mbID) {
        return trackRepository.findByMbid(mbID);
    }

    public void loadTracksIntoDatabaseByDecade(String decade) {
        String tag = switch (decade) {
            case "80s" -> "80s";
            case "90s" -> "90s";
            default -> "70s";
        };
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + tag + "&api_key=" + lastFmApiKey + "&format=json&limit=10";
        List<Track> trackList = new ArrayList<>();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        JsonNode trackArray = null;
        Track newTrack;
        try {
            root = mapper.readTree(response.getBody());
            trackArray = root.get("tracks").get("track");
            for (JsonNode track : trackArray) {
                newTrack = new Track(
                        track.get("name").asText(),
                        track.get("mbid").asText(),
                        track.get("artist").get("name").asText(),
                        track.get("url").asText(),
                        decade
                );
                this.populateTrackYoutubeFromURL(newTrack);
                this.populateAlbumArtForTrack(newTrack);
                newTrack.addDecade(new TrackDecade(decade));
                trackList.add(newTrack);
            }
            this.addTracks(trackList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean populateTrackYoutubeFromURL(Track track) {
        boolean result = false;
        String youtubeID;
        RestTemplate restTemplate = new RestTemplate();
        try {
            Document doc = Jsoup.connect(track.getUrl()).get();
            youtubeID = Objects.requireNonNull(doc.getElementById("track-page-video-playlink")).
                    attribute("data-youtube-id").getValue();
            // success state
            track.setYouTubeID(youtubeID);
            result = true;
        } catch (Exception e) {
            track.setYouTubeID("");
            result = false;
        }
        return result;
    }

    public boolean populateAlbumArtForTrack(Track track) {
        boolean result = false;
        String imagePath;
        String url = "http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key="
                + lastFmApiKey + "&mbid=" + track.getMbid() + "&format=json";
        // objects
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = null;
        // execution
        try {
            root = mapper.readTree(Objects.requireNonNull(restTemplate.getForEntity(url, String.class).getBody()));
            imagePath = root.get("track").get("album").get("image").get(3).get("#text").textValue();
            track.setImagePath(imagePath);
            result = true;
        } catch (Exception e) {
            track.setImagePath("");
            result = false;
        }
        return result;
    }
}
