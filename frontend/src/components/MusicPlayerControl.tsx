import {Button, Stack} from "@mui/material";
import React, {useState} from "react";
import {
    Favorite,
    FavoriteBorder,
    PauseRounded,
    PlayArrowRounded,
    SkipNextRounded,
    SkipPreviousRounded
} from "@mui/icons-material";
import {styleColors} from "../globals/colors.ts";
import {useLogin} from "../contexts/LoginContext.tsx";


type MusicPlayerControlProps = {
    isPlaying: boolean;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onNextClick: () => void;
    onPreviousClick: () => void;
}

const MusicPlayerControl: React.FC<MusicPlayerControlProps> = (props: MusicPlayerControlProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const {isLoggedIn} = useLogin();


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

    function handleFavoriteClick() {
        setIsFavorite(!isFavorite);
    }

    return <>
        <Stack direction="row" justifyContent="center">
            <Button onClick={handlePreviousClick}><SkipPreviousRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>
            {!props.isPlaying && <Button onClick={handlePlayClick}><PlayArrowRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>}
            {props.isPlaying && <Button onClick={handlePauseClick}><PauseRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>}
            <Button onClick={handleNextClick}><SkipNextRounded sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/></Button>
            {isLoggedIn && <Button onClick={handleFavoriteClick}>{!isFavorite ? <FavoriteBorder sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/> : <Favorite sx={{
                color: styleColors.accent100,
                fontSize: 120,
            }}/>}
            </Button>}
        </Stack>
    </>
}

export default MusicPlayerControl;