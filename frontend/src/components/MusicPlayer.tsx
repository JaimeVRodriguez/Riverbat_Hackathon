import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box} from "@mui/material";

type ArtistObject = {
    mbid: string;
    name: string;
    url: string;
};
type ImageObject = {
    '#text': string;
    size: string;
};
type TrackObject = {
    artist: ArtistObject;
    duration: string;
    image: ImageObject[];
    mbid: string;
    name: string;
    streamable: {
        '#text': string;
        fullTrack: string;
    };
    url: string;
}
const MusicPlayer: React.FC = () => {
        const [tracks, setTracks] = useState([]);
        const [selectedDecade, setSelectedDecade] = useState('70s');
        const [currentTrack, setCurrentTrack] = useState('');
        const [currentYoutubeURL, setCurrentYoutubeURL] = useState('https://www.youtube.com/embed/EoVQ_TQFJy0');
        const youtubeRegex = "data-youtube-url=(.+)";
        const actualRegex = new RegExp(youtubeRegex, "g");
        useEffect(() => {
            const fetchMusicData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/music/${selectedDecade}`);
                    console.log(response.data);
                    console.log(response.data.tracks.track)
                    setTracks(response.data.tracks.track);
                } catch (error) {
                    console.error('Error fetching music data:', error);
                }
            };
            fetchMusicData();
        }, [selectedDecade]);

        const fetchYoutubeURL = async (track: TrackObject) => {
            try {
                const response = await axios.get(`http://localhost:8080/music/track/${btoa(track.url)}`);
                let regexMatch = response.data.match(actualRegex)[0];
                console.log(regexMatch);
                regexMatch = regexMatch.slice(regexMatch.lastIndexOf('=')+1,-1);
                return regexMatch;
            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };

        const playTrack = (track: TrackObject) => {
            fetchYoutubeURL(track).then(elmnt => {
                    console.log(elmnt);
                    setCurrentYoutubeURL('https://www.youtube.com/embed/' + elmnt+'?autoplay=1');
                    setCurrentTrack(track.url);
                }
            )
        };
        return (
            <div>
                <h1>Retro Music Player</h1>
                <div>
                    <label htmlFor="decade">Select Decade:</label>
                    <select id="decade" value={selectedDecade} onChange={(e) => setSelectedDecade(e.target.value)}>
                        <option value="70s">70s</option>
                        <option value="80s">80s</option>
                        <option value="90s">90s</option>
                    </select>
                </div>
                <ul>
                    <Box>
                        <h1>Youtube video Play/Stop</h1>

                        <div className="video-frame">
                            <iframe id="youtubeIframe" width="560" height="315" src={currentYoutubeURL}
                                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>

                        <button id="play">Play</button>
                        <button id="stop">Stop</button>
                    </Box>

                    {tracks.map((track: TrackObject) => (
                        <li key={track.name}>
                            {track.name} - {track.artist.name}
                            <button onClick={() => playTrack(track)}>Play</button>
                        </li>
                    ))}
                </ul>
                {currentTrack && (
                    <audio controls autoPlay>
                        <source src={currentTrack} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        );
    }
;
export default MusicPlayer;