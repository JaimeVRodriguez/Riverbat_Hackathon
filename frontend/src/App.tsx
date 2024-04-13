import './App.css'
import {Box, Button} from "@mui/material";

function App() {

    return (
        <>
            <Box>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
                <Box component="img"
                     sx={{
                         height:233,
                         width: 350,
                     }}
                     alt="Template image"
                     src="template_image.jpg" />
            </Box>
        </>
    )
}

export default App
