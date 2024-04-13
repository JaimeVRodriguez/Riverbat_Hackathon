import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
    streamable:{
        '#text': string;
        fullTrack: string;
    };
    url: string;
}
const MusicPlayer: React.FC = () => {
    const [tracks, setTracks] = useState([]);
    const [selectedDecade, setSelectedDecade] = useState('70s');
    const [currentTrack, setCurrentTrack] = useState('');
    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/music/${selectedDecade}`);
                console.log(response.data.tracks.track)
                setTracks(response.data.tracks.track);
            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };
        fetchMusicData();
    }, [selectedDecade]);
    const playTrack = (trackUrl: string) => {
        setCurrentTrack(trackUrl);
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
                {tracks.map((track: TrackObject) => (
                    <li key={track.name}>
                        {track.name} - {track.artist.name}
                        <button onClick={() => playTrack(track.url)}>Play</button>
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
};
export default MusicPlayer;