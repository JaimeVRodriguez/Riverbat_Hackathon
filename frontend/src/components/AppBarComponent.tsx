import {AppBar, Box, Button, Grid, Typography} from "@mui/material";
import {styleColors} from "../globals/colors.ts";
import {NavLink} from "react-router-dom";
import {useLogin} from "../contexts/LoginContext.tsx";

export const AppBarComponent = () => {
    const {userName, isLoggedIn, logoutFromApp} = useLogin();

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
                    marginY: 'auto',
                }}>

                    <Grid container sx={{justifyContent: 'end', paddingRight: '2em'}}>
                        {isLoggedIn ? <> <Grid item sx={{
                                marginY: 'auto',
                                paddingRight: '2em'
                            }}>
                                <Typography>Welcome, {userName}</Typography>
                            </Grid>
                                <Grid item>
                                    <Button variant='outlined' color='warning' onClick={logoutFromApp} to='/'
                                            component={NavLink}>Logout</Button>
                                </Grid></>
                            :
                            <Grid item sx={{
                                marginY: 'auto',
                            }}>
                                <Button variant='contained' color='warning' to='/login'
                                        component={NavLink}>Login</Button>
                            </Grid>}
                    </Grid>
                </Grid>
            </Grid>


        </AppBar>
    )
};