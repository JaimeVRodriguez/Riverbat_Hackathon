import {Box, Button, Card, TextField} from "@mui/material";
import React, {useState} from "react";
import {useLogin} from "../contexts/LoginContext.tsx";
import {useNavigate} from "react-router-dom";

type ButtonColor = "secondary" | "error" | "primary" | "info" | "success" | "warning" | "inherit";


export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitButtonColor, setSubmitButtonColor] = useState<ButtonColor>('secondary');

    const navigate = useNavigate();
    const {loginToApp} = useLogin();


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLoginClick = () => {
        if (email.length > 0 && password.length > 0) {
            setSubmitButtonColor('secondary');
            loginToApp(email, password);
            navigate('/');
        } else {
            setSubmitButtonColor('error');
        }
    }

    return (
        <Card sx={{
            width: '15em',
            height: "55%",
            padding: '2em',
            marginTop: '5em',
            backgroundColor: "rgba(133,48,227,0.6)",
            backgroundImage: "linear-gradient(90deg, rgba(133,48,227,0.6059756666338411) 48%, rgba(30,144,255,0.6099532576702556) 99%)",
        }}>
            <Box sx={{marginBottom: '0.75em'}}>
                <TextField
                    label="email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
                >
                </TextField>
            </Box>
            <Box>
                <TextField
                    sx={{marginBottom: '0.75em'}}
                    label='password'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(event)}

                />
            </Box>
            <Box>
                <Button variant='contained' color={submitButtonColor} onClick={handleLoginClick}>Login</Button>
            </Box>
        </Card>
    )
};
