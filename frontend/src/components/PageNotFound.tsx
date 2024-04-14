import {Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

export const PageNotFound = () => {
    return (
        <Typography mt={50} sx={{fontSize: '2em'}}>Page not found. Return to <NavLink to={'/'}>Home page</NavLink>.</Typography>
    )
}