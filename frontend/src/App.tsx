import './App.css'
import {Box, Stack, Typography} from "@mui/material";
import MusicPlayer from "./components/MusicPlayer.tsx";

function App() {

    return (
        <>
            <Box>
                <Stack>
                    <Typography variant={'h1'}>Retro Music Player</Typography>
                    <MusicPlayer/>



                </Stack>

            </Box>
        </>
    )
}

export default App
