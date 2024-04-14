import {Button, Stack} from "@mui/material";
import React from "react";
import {Pause, PlayArrow, SkipNextRounded, SkipPreviousRounded} from "@mui/icons-material";
import {styleColors} from "../globals/colors.ts";


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
        <Stack direction="row" justifyContent="center" >
            <Button onClick={handlePreviousClick}><SkipPreviousRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>
            {!props.isPlaying && <Button onClick={handlePlayClick} ><PlayArrow sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>}
            {props.isPlaying && <Button onClick={handlePauseClick}><Pause sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>}
            <Button onClick={handleNextClick}><SkipNextRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>
        </Stack>
    </>
}

export default MusicPlayerControl;