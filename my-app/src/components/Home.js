import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import { SpeedDial, SpeedDialAction, Tooltip } from '@mui/material';
import { LogInPopup } from "./Login";
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
export const Home = () => {
    const [showuserDetails, setShowUserDetails] = React.useState(false);
    return (
        <React.Fragment>
            <LogInPopup open={showuserDetails} onClose={() => setShowUserDetails(false)} />
            <Stack direction={"column"} alignItems="center" justifyContent="center" style={{ minHeight: '100vh', width: '100%', backgroundColor: '#e6a700' }}>
                <Grow in={true}>
                    <span className='material-symbols-outlined' style={{ fontSize: 100, color: '#ffffffff' }}>note_stack</span>
                </Grow>
                <Grow in={true} timeout={1000}>
                    <Typography sx={{
                        fontFamily: '"Macondo", cursive',
                        fontSize: '28px',
                        color: '#ffffffff',
                        letterSpacing: '1.5px',
                        fontWeight: 'bold',
                        my: .5,
                    }}>
                        My Notes
                    </Typography>
                </Grow>
            </Stack>
            <Tooltip
                title="Get Started"
                placement="left"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                            bgcolor: '#ffffff',
                            color: '#e6a700',
                            borderRadius: '8px',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            border: '1px solid #e6a700',
                            '& .MuiTooltip-arrow': {
                                color: '#ffffff',
                            },
                        },
                    },
                }}
            >
                <SpeedDial
                    ariaLabel="Actions"
                    sx={{
                        position: 'fixed', bottom: 16, right: 16,
                        '& .MuiFab-primary': {
                            color: '#e6a700',
                            backgroundColor: '#ffffff',
                            '&:hover': { backgroundColor: '#f0f0f0' }
                        }
                    }}
                    icon={<AddIcon />}
                    tooltipTitle="Get Started"
                    onClick={() => setShowUserDetails(true)}
                >
                </SpeedDial>
            </Tooltip>
        </React.Fragment>
    )
}