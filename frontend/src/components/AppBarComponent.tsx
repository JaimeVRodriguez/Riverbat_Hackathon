import {AppBar, Box, Button, Grid, Typography} from "@mui/material";
import {styleColors} from "../globals/colors.ts";
import {NavLink} from "react-router-dom";

export const AppBarComponent = () => {
    return (
        <AppBar position="static" sx={{
            backgroundColor: styleColors.primary500,
            paddingY: "1em",
            marginBottom: "2em"
        }}>
            <Grid container spacing={3}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Box sx={{justifyContent: 'center',}}>
                        <NavLink to='/'>
                            <Typography sx={{fontFamily: 'Syncopate', color: styleColors.accent200}}
                                        variant={'h2'}>BackTrack</Typography>
                        </NavLink>
                    </Box>
                </Grid>
                <Grid item xs={4} sx={{
                    textAlign: 'end',
                    marginY: 'auto',
                    paddingRight: '2em'
                }}>
                    <Button variant='outlined' color='secondary'><NavLink to='/login'>Login</NavLink></Button>
                </Grid>
            </Grid>


        </AppBar>
    )
};