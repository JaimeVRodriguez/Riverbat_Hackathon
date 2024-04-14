import {useState} from 'react';
import {GoogleGenerativeAI} from "@google/generative-ai";
import {Box, Button, Modal, Typography} from "@mui/material";
import {styleColors} from "../globals/colors.ts";

interface GeminiProps {
    song: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 500,
    bgcolor: styleColors.primary500,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'
};
function Gemini({song}: GeminiProps) {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);

    }
    const handleClose = () => setOpen(false);

    const genAI = new GoogleGenerativeAI(
        "AIzaSyDLHXlAbDzFdBADrs193T6dEtAfr4_ozd4"
    );
    const fetchData = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${song} Lyrics`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setApiData(text);
        setLoading(false);
    };
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        fetchData();
    };
    return (
        <div className="container">
            <div className="mt-5 mb-5">
                <form onSubmit={handleSubmit}>
                    <div className="row d-flex align-items-end">
                        <div className="col-lg-2">
                            <Button
                                sx={{
                                    fontSize: 'x-large',
                                    fontFamily: 'Roboto Mono',
                                    backgroundColor:styleColors.accent200,
                                    marginX:'2em',
                                    padding:'10px',
                                    color: styleColors.primary500,
                                    borderRadius: '20px'
                                }} type={'submit'}
                                onClick={handleOpen} className="btn btn-primary mt-3 col-lg-12"
                            >Get Lyrics</Button>
                        </div>

                    </div>
                </form>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2, color:'white' }}>
                        {!loading && `${apiData}`}
                        {loading && "Gemini Pro AI is getting your lyrics..."}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
export default Gemini;