import {Button, Stack} from "@mui/material";
import React from "react";
import {PlayArrow, SkipNextRounded, SkipPreviousRounded} from "@mui/icons-material";


type MusicPlayerControlProps = {
    onPlayClick: () => void;
    onNextClick: () => void;
    onPreviousClick: () => void;
}

const MusicPlayerControl: React.FC<MusicPlayerControlProps> = (props: MusicPlayerControlProps) => {

    function handlePlayClick() {

        props.onPlayClick();
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
            <Button><PlayArrow onClick={handlePlayClick}/></Button>
            <Button><SkipNextRounded onClick={handleNextClick}/></Button>
        </Stack>
    </>
}

export default MusicPlayerControl;