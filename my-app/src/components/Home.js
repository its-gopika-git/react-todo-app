import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Button from "@mui/material/Button";
import { LogInPopup } from "./Login";
export const Home = () => {
    const [showuserDetails, setShowUserDetails] = React.useState(false);
    return (
      <React.Fragment>
        <LogInPopup open={showuserDetails} onClose={() => setShowUserDetails(false)} />
          <Stack direction={"column"} alignItems="center" justifyContent="center" style={{ minHeight: '100vh', width: '100%', backgroundColor:'#e6a700'}}>
            <Grow in={true}>
                <span className='material-symbols-outlined' style={{ fontSize: 100, color: '#ffffffff' }}>note_stack</span>
            </Grow>
            <Grow in={true} timeout={1000}>
                <Typography sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '18px',
                    color: '#ffffffff',
                    letterSpacing: '2px',
                    fontWeight: 'bold',
                    my: 1,
                }}>
                    To Do List
                </Typography>
            </Grow>
             <Grow in={true} timeout={1200}>
                <Typography sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '12px',
                    color: '#ffffffff',
                    letterSpacing: '3px',
                    fontWeight: '500',
                }}>
                    Organize your tasks efficiently
                </Typography>
            </Grow>
            <Grow in={true} timeout={1500}>
                <Button variant="contained"
                onClick={()=>{
                    setShowUserDetails(true);
                }} color="primary" href="#/todos" sx={{mt:2,borderRadius: '20px',color:'#e6a700' ,backgroundColor: '#ffffffff'
             }}>
                <Typography sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    letterSpacing: '1px',
                    

                }}>
                    Get Started
                </Typography>
                </Button>
            </Grow>
        </Stack>
        </React.Fragment>
    )
}