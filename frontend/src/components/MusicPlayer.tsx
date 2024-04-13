import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MusicPlayer: React.FC = () => {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response =
                    await axios.get('http://localhost:8080/music', );
                setTracks(response.data.tracks.track);
            } catch
                (error)
                {
                    console.error('Error fetching music data:', error);
                }
            }
            ;
            fetchMusicData();
        }, []
    )
        ;
        return (
            <div>
                <h1>Retro Music Player</h1>
                <ul>
                    {tracks.map((track: any) => (
                        <li key={track.name}>
                            {track.name} - {track.artist.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    export default MusicPlayer;