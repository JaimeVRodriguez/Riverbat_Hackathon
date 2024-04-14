import React, {useEffect, useState} from 'react';
import {Box, Container, Typography} from "@mui/material";
import MusicPlayerControl from "./MusicPlayerControl.tsx";
import OptionSelectionBar from "./OptionSelectionBar.tsx";
import {TrackObject, getMusicByDecade, getTrackByName, getAlbumArt} from '../util/lastFM'

const DECADE_SELECTIONS = [
    '70s',
    '80s',
    '90s'
]

const MusicPlayer: React.FC = () => {
        const [tracks, setTracks] = useState<TrackObject[]>([]);
        const [selectedDecade, setSelectedDecade] = useState(DECADE_SELECTIONS[0]);
        const [currentTrack, setCurrentTrack] = useState(0);
        const [currentYoutubeURL, setCurrentYoutubeURL] = useState('https://www.youtube.com/embed/EoVQ_TQFJy0');
        const [isPlaying, setIsPlaying] = useState(false);
        const [albumArt, setAlbumArt] = useState('')

    useEffect(() => {
            getMusicByDecade(selectedDecade).then(
                (tracks: TrackObject[]) => {
                    setTracks(tracks);
                    const art = getAlbumArt(tracks[currentTrack].mbid)
                    art.then(data => {
                        setAlbumArt(data.track.album.image[3]['#text'])
                    })
                }
            );

        }, [selectedDecade, setTracks, currentTrack]);

        useEffect(() => {
            if (tracks.length > 0) {
                getTrackByName(tracks[currentTrack]).then((youtubeLink: string) => {
                        setCurrentYoutubeURL(youtubeLink);
                    }
                )
            }
        }, [currentTrack, isPlaying]);

        const togglePlaying = () => {
            setIsPlaying(!isPlaying);
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
            togglePlaying();
        }

        return (
            <Container>
                <OptionSelectionBar handleOnClick={handleClickDecade} options={DECADE_SELECTIONS}/>
                <Box component="img"
                     sx={{
                         height: 233,
                         width: 350,
                     }}
                     alt="Template image"
                     src={albumArt}/>
                {tracks.length > 0 &&
                    <Box><Typography variant={"h3"}>{tracks[currentTrack].name}</Typography>
                        <Typography
                            variant={"h4"}>{tracks[currentTrack].artist.name}</Typography></Box>
                }
                <MusicPlayerControl onPlayClick={handlePlayTrack}
                                    isPlaying={isPlaying}
                                    onPauseClick={handlePlayTrack}
                                    onNextClick={handleNextTrack}
                                    onPreviousClick={handlePreviousTrack}/>
                <div className="video-frame">
                    {isPlaying && <iframe id="audioPlayer" width="560" height="315"
                                          src={currentYoutubeURL}
                                          frameBorder="0" allow="autoplay; encrypted-media"
                                          allowFullScreen></iframe>}
                </div>
            </Container>
        );
    }
;
export default MusicPlayer;
