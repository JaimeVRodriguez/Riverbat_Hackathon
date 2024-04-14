import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Button, Chip, Stack, Typography} from "@mui/material";
import {PlayArrow, SkipNextRounded, SkipPreviousRounded} from "@mui/icons-material";

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
        if(tracks.length>0) {
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
                    // setCurrentTrack(track);
                }
            )
        };

        const handleOnClick = (decade: string) => {
            setSelectedDecade(decade)
        }

        function handlePlayClick() {
            playTrack(tracks[currentTrack])
        }

        function handleNextClick() {
            console.log(tracks[currentTrack].image[3]["#text"])
            if(currentTrack + 1 === tracks.length) {
                return setCurrentTrack(0);
            }
            setCurrentTrack(currentTrack + 1);
        }


        function handlePreviousClick() {
            if(currentTrack - 1 < 0) {
                return setCurrentTrack(tracks.length - 1);
            }
            setCurrentTrack(currentTrack - 1);

        }

        return (
            <div>
                <Stack direction="row" justifyContent="center">
                    <Chip label={"70s"} color={'warning'} onClick={handleOnClick.bind(this, "70s")}/>
                    <Chip label={"80s"} color={'warning'} onClick={handleOnClick.bind(this, "80s")}/>
                    <Chip label={"90s"} color={'warning'} onClick={handleOnClick.bind(this, "90s")}/>
                </Stack>
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
                <Stack direction="row" justifyContent="center">
                    <Button><SkipPreviousRounded onClick={handlePreviousClick}/></Button>
                    <Button><PlayArrow onClick={handlePlayClick}/></Button>
                    <Button><SkipNextRounded onClick={handleNextClick}/></Button>
                </Stack>
                <div className="video-frame">
                    <iframe id="audioPlayer" width="560" height="315" src={currentYoutubeURL}
                            frameBorder="0" allow="autoplay; encrypted-media"
                            allowFullScreen ></iframe>
                </div>
            </div>
        );
    }
;
export default MusicPlayer;
