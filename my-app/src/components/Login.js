import React, { useState, useEffect} from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Stack,
    Typography,
    InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
export const LogInPopup = (props) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(
        [
            {
                name: '',
                email: '',
                profilePicture: ''
            }
        ]
    );
    const [error, setError] = useState('');

    useEffect(() => {
        if (!open) {
            setError('');
            setUserDetails([
                {
                    name: '',
                    email: '',
                    profilePicture: ''
                }
            ]);
        }
    }, [open]);

    const handleSave = () => {
        const trimmed = userDetails[0].name.trim();
        if (!trimmed) {
            setError('Please enter your name');
            return;
        }
        onClose && onClose();
        navigate('/dashboard', { state: { userDetails: { ...userDetails[0], name: trimmed } } });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
    };

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="xs"
            onClose={(event, reason) => {
                if (reason === 'backdropClick') return;
                onClose && onClose(event, reason);
            }}
            disableEscapeKeyDown
            BackdropProps={{ onClick: (e) => e.stopPropagation() }}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '15px',
                    backgroundColor: '#e6a700'
                }
            }}>

            <DialogContent>
                <Stack direction="column" alignItems="center">
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#ffffffff',
                    }}>
                        Welcome!
                    </Typography>
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#ffffffff',
                        letterSpacing: '2px',
                        mb: 2,
                    }}>
                        Let's get to know you better.
                    </Typography>
                    <TextField
                        required
                        label="Enter your name / nickname"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userDetails[0].name}
                        onChange={(e) => {
                            const newDetails = [...userDetails];
                            newDetails[0].name = e.target.value;
                            setUserDetails(newDetails);
                            if (error) setError('');
                        }}
                        onKeyDown={handleKeyDown}
                        error={!!error}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: '#ffffffff' }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#ffffffff' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#f1f1f1ff' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
                            '& .MuiInputBase-input': { color: '#ffffff', },
                            my:2
                        }}

                    />
                    <TextField
                        label="Email (optional)"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={userDetails[0].email}
                        onChange={(e) => {
                            const newDetails = [...userDetails];
                            newDetails[0].email = e.target.value;
                            setUserDetails(newDetails);
                        }}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#ffffffff' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#f1f1f1ff' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
                            '& .MuiInputBase-input': { color: '#ffffff', },
                            my:2
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon sx={{ color: '#ffffffff' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        label="Profile Picture URL (optional)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userDetails[0].profilePicture}
                        onChange={(e) => {
                            const newDetails = [...userDetails];
                            newDetails[0].profilePicture = e.target.value;
                            setUserDetails(newDetails);
                        }}
                        sx={{
                            my: 2,
                            '& .MuiInputLabel-root': { color: '#ffffffff' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#f1f1f1ff' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
                            '& .MuiInputBase-input': { color: '#ffffff', },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddPhotoAlternateIcon sx={{ color: '#ffffffff' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        letterSpacing: '1px',
                        color: '#ffffffff'
                    }}>
                        Cancel
                    </Typography>
                </Button>
                <Button variant="contained"
                    sx={{
                        borderRadius: '20px',
                        color: '#e6a700',
                        backgroundColor: '#ffffffff',
                    }}
                    onClick={handleSave}>
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        letterSpacing: '1px',
                        color: '#e6a700'
                    }}>
                        Continue
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};
//