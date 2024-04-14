import './App.css'
import {AppBar, Box, Stack, Typography} from "@mui/material";
import MusicPlayer from "./components/MusicPlayer.tsx";
import {styleColors} from "./globals/colors.ts";

function App() {
    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            backgroundImage: 'url("synth.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <AppBar position="static" sx={{
                backgroundColor: styleColors.primary500,
                paddingY: "1em",
                marginBottom: "2em",
                justifyContent: 'center',
            }}>
                <Box
                    sx={{}}
                >
                    <Typography sx={{fontFamily: 'Syncopate', color: styleColors.accent200}}
                                variant={'h2'}>BackTrack</Typography>
                </Box>
            </AppBar>
            <Box>
                <Stack>
                    <MusicPlayer/>
                </Stack>
            </Box>

        </Box>
    )
}

export default App
