import {AppBarComponent} from "./AppBarComponent.tsx";
import {Box, Container, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";

export const HomeComponent = () => {
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
            <AppBarComponent/>
            <Box>
                <Stack>
                    <Container sx={{
                        height: '100%',
                    }}>
                        <Outlet/>
                    </Container>
                </Stack>
            </Box>
        </Box>
    )
}