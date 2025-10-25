import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function SearchAppBar(props) {
    const { userDetails } = props;
    const { name, profilePicture, email } = userDetails || {};
    const getInitials = (fullName) => {
        if (!fullName) return 'U';
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };
    const initials = getInitials(name);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#e6a700' }}>
                <Toolbar>
                    <Typography
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#ffffffff',
                            textTransform: 'capitalize',
                            letterSpacing: '1px',
                        }}
                    >
                        Welcome, {name || 'User'}
                    </Typography>
                    <Avatar
                        alt={name || 'U'}
                        src={profilePicture || undefined}
                        sx={{
                            ml: 2,
                            backgroundColor: '#ffffff',
                            color: '#e6a700',
                            border: '1px solid #ffffff',
                        }}
                        title={`${name || 'User'} (${email || 'No Email'})`}
                    >
                        {!profilePicture && initials}
                    </Avatar>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
