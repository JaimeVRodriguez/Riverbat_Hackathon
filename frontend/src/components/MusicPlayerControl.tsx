import {Button, Stack} from "@mui/material";
import React from "react";
import {Pause, PlayArrow, SkipNextRounded, SkipPreviousRounded} from "@mui/icons-material";


type MusicPlayerControlProps = {
    isPlaying: boolean;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onNextClick: () => void;
    onPreviousClick: () => void;
}

const MusicPlayerControl: React.FC<MusicPlayerControlProps> = (props: MusicPlayerControlProps) => {

    function handlePlayClick() {
        props.onPlayClick();
    }

    function handlePauseClick() {
        props.onPauseClick();
    }

    function handleNextClick() {
        props.onNextClick();
    }


    function handlePreviousClick() {
        props.onPreviousClick();
    }

    return <>
        <Stack direction="row" justifyContent="center">
            <Button><SkipPreviousRounded onClick={handlePreviousClick}/></Button>
            <Button>
                {!props.isPlaying && <PlayArrow onClick={handlePlayClick}/>
                }
                {props.isPlaying && <Pause onClick={handlePauseClick}/>}</Button>
            <Button><SkipNextRounded onClick={handleNextClick}/></Button>
        </Stack>
    </>
}

export default MusicPlayerControl;