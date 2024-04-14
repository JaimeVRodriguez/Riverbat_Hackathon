import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {Box, Container, Stack} from "@mui/material";
import './App.css'
import MusicPlayer from "./components/MusicPlayer.tsx";
import {PageNotFound} from "./components/PageNotFound.tsx";
import {LoginForm} from "./components/LoginForm.tsx";
import {AppBarComponent} from "./components/AppBarComponent.tsx";
import {LoginProvider} from "./contexts/LoginContext.tsx";

import ChatBot from 'react-simple-chatbot';

const steps = [
    {
        id: '0',
        message: 'Welcome to react chatbot!',
        trigger: '1',
    },
    {
        id: '1',
        message: 'Bye!',
        end: true,
    },
];

function App() {

    return (
        <LoginProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <Box sx={{
                            display: 'flex',
                            height: '100vh',
                            backgroundImage: 'url("synth.webp")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <ChatBot steps={steps} />
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
                    }>
                        <Route index element={<MusicPlayer/>}/>
                        <Route path='/music' element={<MusicPlayer/>}/>
                        <Route path='/login' element={<LoginForm/>}/>
                    </Route>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </LoginProvider>
    )
}

export default App
