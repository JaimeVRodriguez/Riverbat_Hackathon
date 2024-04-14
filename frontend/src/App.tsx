import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import MusicPlayer from "./components/MusicPlayer.tsx";
import {PageNotFound} from "./components/PageNotFound.tsx";
import {LoginComponent} from "./components/LoginComponent.tsx";
import {LoginProvider} from "./contexts/LoginContext.tsx";
import {HomeComponent} from "./components/HomeComponent.tsx";

function App() {

    return (
        <LoginProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomeComponent/>}>
                        <Route index element={<MusicPlayer/>}/>
                        <Route path='/music' element={<MusicPlayer/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                    </Route>
                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </LoginProvider>
    )
}

export default App
