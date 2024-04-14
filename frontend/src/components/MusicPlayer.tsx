import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Typography} from "@mui/material";
import MusicPlayerControl from "./MusicPlayerControl.tsx";
import OptionSelectionBar from "./OptionSelectionBar.tsx";

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

const DECADE_SELECTIONS = [
    '70s',
    '80s',
    '90s'
]

const MusicPlayer: React.FC = () => {
        const [tracks, setTracks] = useState<TrackObject[]>([]);
        const [selectedDecade, setSelectedDecade] = useState('70s');
        const [currentTrack, setCurrentTrack] = useState(0);
        const [currentYoutubeURL, setCurrentYoutubeURL] = useState('https://www.youtube.com/embed/EoVQ_TQFJy0');
        const youtubeRegex = "data-youtube-url=(.+)";
        const actualRegex = new RegExp(youtubeRegex, "g");
        useEffect(() => {
            const fetchMusicData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/music/${selectedDecade}`);
                    setTracks(response.data.tracks.track);
                } catch (error) {
                    console.error('Error fetching music data:', error);
                }
            };
            fetchMusicData();
        }, [selectedDecade]);

        useEffect(() => {
            if (tracks.length > 0) {
                playTrack(tracks[currentTrack])
            }
        }, [currentTrack]);

        const fetchYoutubeURL = async (track: TrackObject) => {
            try {
                const response = await axios.get(`http://localhost:8080/music/track/${btoa(track.url)}`);
                let regexMatch = response.data.match(actualRegex)[0];
                regexMatch = regexMatch.slice(regexMatch.lastIndexOf('=') + 1, -1);
                return regexMatch;
            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };

        const playTrack = (track: TrackObject) => {
            fetchYoutubeURL(track).then(elmnt => {
                    setCurrentYoutubeURL('https://www.youtube.com/embed/' + elmnt + '?autoplay=1');
                }
            )
        };

        const handleClickDecade = (decade: string) => {
            setSelectedDecade(decade)
        }

        function handleNextTrack() {
            if (currentTrack + 1 === tracks.length) {
                return setCurrentTrack(0);
            }
            setCurrentTrack(currentTrack + 1);
        }

        function handlePreviousTrack() {
            if (currentTrack - 1 < 0) {
                return setCurrentTrack(tracks.length - 1);
            }
            setCurrentTrack(currentTrack - 1);
        }

        function handlePlayTrack() {
            playTrack(tracks[currentTrack])
        }

        return (
            <div>
                <OptionSelectionBar handleOnClick={handleClickDecade} options={DECADE_SELECTIONS}/>
                <Box component="img"
                     sx={{
                         height: 233,
                         width: 350,
                     }}
                     alt="Template image"
                     src={tracks[currentTrack] && tracks[currentTrack].image[2]["#text"]}/>
                {tracks.length > 0 &&
                    <Box><Typography variant={"h3"}>{tracks[currentTrack].name}</Typography>
                        <Typography
                            variant={"h4"}>{tracks[currentTrack].artist.name}</Typography></Box>
                }
                <MusicPlayerControl onPlayClick={handlePlayTrack} onNextClick={handleNextTrack}
                                    onPreviousClick={handlePreviousTrack}/>
                <div className="video-frame">
                    <iframe id="audioPlayer" width="560" height="315" src={currentYoutubeURL}
                            frameBorder="0" allow="autoplay; encrypted-media"
                            allowFullScreen></iframe>
                </div>
            </div>
        );
    }
;
export default MusicPlayer;
