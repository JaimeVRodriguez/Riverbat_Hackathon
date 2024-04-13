import './App.css'
import {Box, Button, Stack} from "@mui/material";
import {
    PlayArrow,
    SkipNextRounded,
    SkipPreviousRounded
} from "@mui/icons-material";
import MusicPlayer from "./components/MusicPlayer.tsx";

function App() {

    return (
        <>
            <Box>
                <Stack>
                    <Stack direction="row" justifyContent="center">
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>4</Button>
                    </Stack>

                    <Box component="img"
                         sx={{
                             height: 233,
                             width: 350,
                         }}
                         alt="Template image"
                         src="template_image.jpg"/>
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <Button><SkipPreviousRounded/></Button>
                    <Button><PlayArrow/></Button>
                    <Button><SkipNextRounded/></Button>
                </Stack>
                <MusicPlayer/>
            </Box>
        </>
    )
}

export default App
