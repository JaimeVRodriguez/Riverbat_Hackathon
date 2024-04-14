import React, {useEffect, useState} from 'react';
import {Box, Container, Typography, Card, Fade} from "@mui/material";
import MusicPlayerControl from "./MusicPlayerControl.tsx";
import OptionSelectionBar from "./OptionSelectionBar.tsx";

import backTrackImg from '../assets/backtrack.jpg'
import {styleColors} from "../globals/colors.ts";
import {getAlbumArt, getMusicByDecade, getTrackByName} from "../util/Client.ts";
import {TrackObject} from "../util/type/TrackObjectType.ts";

const DECADE_SELECTIONS = [
    '70s',
    '80s',
    '90s'
]

const MusicPlayer: React.FC = () => {
        const [tracks, setTracks] = useState<TrackObject[]>([]);
        const [selectedDecade, setSelectedDecade] = useState<string>(DECADE_SELECTIONS[0]);
        const [currentTrack, setCurrentTrack] = useState<number>(0);
        const [currentYoutubeURL, setCurrentYoutubeURL] = useState<string>('https://www.youtube.com/embed/EoVQ_TQFJy0');
        const [isPlaying, setIsPlaying] = useState<boolean>(false);
        const [albumArt, setAlbumArt] = useState<string>('')
        const [isLoading, setIsLoading] = useState<boolean>(false)

        useEffect(() => {
            getMusicByDecade(selectedDecade).then(
                (tracks: TrackObject[]) => {
                    setIsLoading(true);
                    setTracks(tracks);
                    const getArt = getAlbumArt(tracks[currentTrack].mbid)
                    getArt.then(data => {
                        const art = data.track.album.image[3]['#text'];
                        if (!art.length) {
                            setAlbumArt(backTrackImg)
                        } else {
                            setAlbumArt(art)
                        }
                        setIsLoading(false)
                    }).catch(() => {
                        setAlbumArt(backTrackImg)
                    }).finally(() => setIsLoading(false))
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
            console.log(tracks);
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
            <Container sx={{
                height: '100%',
            }}>
                <Card sx={{
                    width: '50em',
                    height: "60%",
                    padding: '2em',
                    backgroundColor: "rgba(133,48,227,0.6)",
                    backgroundImage: "linear-gradient(90deg, rgba(133,48,227,0.6059756666338411) 48%, rgba(30,144,255,0.6099532576702556) 99%)",
                }}>
                    <Box
                        sx={{
                            justifyContent: '',
                            borderRadius: '20px',
                            backgroundColor: styleColors.primary500 + '50',
                            paddingY: "1em",
                        }}>
                        <OptionSelectionBar
                            handleOnClick={handleClickDecade}
                            options={DECADE_SELECTIONS}/>
                    </Box>
                    <Box height={275}>
                        {!isLoading &&
                            <Fade in={!isLoading} timeout={1500}>
                                <Box component="img"
                                     sx={{
                                         marginY: "1em",
                                         height: 233,
                                         width: 350,
                                         borderRadius:'1em',
                                         borderColor: styleColors.alt100 + '40',
                                         borderWidth: '5px',
                                         borderStyle: 'solid',
                                     }}
                                     alt="Template image"
                                     src={albumArt}
                                />
                            </Fade>
                        }
                    </Box>
                    {tracks.length > 0 &&
                        <Box
                            sx={{
                                backgroundColor: styleColors.primary400 + "55",
                                padding: '1em',
                                color: 'white',
                                borderRadius: '1em',
                                marginBottom: '1em'
                            }}
                        ><
                            Typography fontFamily={'Arsenal'}
                                       fontWeight={'bold'}
                                       variant={"h3"}>{tracks[currentTrack].name}</Typography>
                            <Typography fontFamily={'Arsenal'}

                                        variant={"h4"}>{tracks[currentTrack].artist.name}</Typography>
                        </Box>
                    }
                    <MusicPlayerControl onPlayClick={handlePlayTrack}
                                        isPlaying={isPlaying}
                                        onPauseClick={handlePlayTrack}
                                        onNextClick={handleNextTrack}
                                        onPreviousClick={handlePreviousTrack}/>
                    <div className="video-frame">
                        {isPlaying && <iframe id="audioPlayer"
                                              src={currentYoutubeURL}
                                              allow="autoplay; encrypted-media"
                                              allowFullScreen></iframe>}
                    </div>
                </Card>
            </Container>
        );
    }
;
export default MusicPlayer;
