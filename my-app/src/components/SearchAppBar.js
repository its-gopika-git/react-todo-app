import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton, MenuItem, Stack, Menu, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { useNavigate } from 'react-router-dom';

export default function SearchAppBar(props) {
    const navigate = useNavigate();
    const { userDetails, avatarSrc } = props;
    const { email } = userDetails || {};
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };
    const initials = getInitials(email);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        navigate('/')
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#e6a700' }}>
                <Toolbar>
                    <span className='material-symbols-outlined' style={{ fontSize: '30px', color: '#ffffffff' }}>note_stack</span>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            fontFamily: '"Macondo", cursive',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#ffffffff',
                            textTransform: 'capitalize',
                            letterSpacing: '1px',
                            mx: 1
                        }}
                    >
                        My Notes
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Avatar
                            alt={email}
                            src={avatarSrc || undefined}
                            sx={{
                                ml: 2,
                                backgroundColor: '#ffffff',
                                color: '#e6a700',
                                border: '2px solid #ffffff',
                            }}
                            title={`${email || 'No Email'}`}
                        >
                            {!avatarSrc && initials}
                        </Avatar>
                        <IconButton
                            size='small'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ mx: .5 }}
                        >
                            <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                            }}
                        >
                            <MenuItem onClick={()=>{setAnchorEl(null)}}>
                                <Stack direction="column">
                                    <Typography sx={{
                                        fontFamily: '"Roboto", sans-serif',
                                        fontSize: '14px',
                                    }}>
                                        {email}
                                    </Typography>
                                    <Stack direction={"row"} alignItems={"center"}>
                                        <Brightness1Icon sx={{ fontSize: '12px', mr: .5, color: '#B2D600', verticalAlign: 'middle' }} />
                                        <Typography sx={{
                                            fontFamily: '"Roboto", sans-serif',
                                            fontSize: '12px',
                                            color:'#6f6f6fff'
                                        }}>
                                            {"Active Now"}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose} sx={{
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '14px',
                                color:'#000'
                            }}>
                                <LogoutIcon sx={{
                                    fontSize: '18px',
                                    mx: 1
                                }} />
                                Logout</MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
