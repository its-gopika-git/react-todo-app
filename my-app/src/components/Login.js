import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Stack,
    Typography,
    InputAdornment,
    Box,
    Divider,
    IconButton,
    DialogTitle,
} from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import UploadAvatars from './UploadProfile';
import CloseIcon from '@mui/icons-material/Close';
export const LogInPopup = (props) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(
        [
            {
                email: '',
                password: '',
            }
        ]
    );
    const [avatarSrc, setAvatarSrc] = React.useState(undefined);
    const [error, setError] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (!open) {
            setError({
                email: '',
                password: '',
            })
            setUserDetails([
                {
                    email: '',
                    password: '',
                }
            ]);
            setAvatarSrc("")
        }
    }, [open]);

    const handleSave = () => {
        const trimmedEmail = userDetails[0].email.trim();
        if (!trimmedEmail) {
            setError({
                email: 'Please enter your email',
                password: '',
            })
            return;
        }
        if (trimmedEmail.length < 5 || !trimmedEmail.includes('@')) {
            setError({
                email: 'Please enter a valid email',
                password: '',
            })
            return;
        }
        if (!userDetails[0].password) {
            setError({
                email: '',
                password: 'Please enter your password',
            })
            return;
        }
        onClose && onClose();
        navigate('/dashboard', { state: { userDetails: { ...userDetails[0], email: trimmedEmail } ,avatarSrc: avatarSrc } });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick') return;
                onClose && onClose(event, reason);
            }}
            disableEscapeKeyDown
            BackdropProps={{ onClick: (e) => e.stopPropagation() }}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '12px',
                    padding: '0 12px 12px 0px',
                    width: '330px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }
            }}>
            <DialogContent>
                <Typography sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#e6a700',
                    textAlign: 'center',
                    mb: 1,
                }}>
                    {"Hi, Welcome!"}
                </Typography>
                <Divider>
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '12px',
                        color: '#e6a700',
                        textAlign: 'center',
                        letterSpacing: '1px',
                    }}>
                        {"Let's get setup your account"}
                    </Typography>
                </Divider>
                <Stack direction={"column"} alignItems={"center"} sx={{ mt:2,mb:1 }}    >
                    <UploadAvatars avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />
                </Stack>
                <Box>
                    {[
                        {
                            field: 'email',
                            label: 'Email',
                            type: 'text',
                            required: true,
                            icon: <MailIcon sx={{ color: '#e6a700' }} />
                        },
                        {
                            field: 'password',
                            label: 'Password',
                            type: 'password',
                            icon: <LockOutlineIcon sx={{ color: '#e6a700' }} />
                        }
                    ].map((item) => (
                        <TextField
                            key={item.field}
                            required={item.required}
                            label={item.label}
                            type={item.type}
                            variant="standard"
                            helperText={error[item.field]}
                            error={!!error[item.field]}
                            value={userDetails[0][item.field]}
                            onChange={(e) => {
                                const newDetails = [...userDetails];
                                newDetails[0][item.field] = e.target.value;
                                setUserDetails(newDetails);
                                if (error && item.field === 'email') setError('');
                            }}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {item.icon}
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: error[item.field] ? 'red' : '#e6a700',
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 500
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#e6a700' },
                                '& .MuiInput-underline:before': { borderBottomColor: '#e6a700' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#e6a700' },
                                my: 2,
                                width: '300px'
                            }}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions sx={{ pb: 2 }}>
                <Button variant="contained"
                    sx={{
                        borderRadius: '20px',
                        color: '#ffffff',
                        backgroundColor: '#e6a700ff',
                    }}
                    onClick={handleSave}>
                    <Typography sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        letterSpacing: '1px',
                        color: '#ffffff'
                    }}>
                        Continue
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};
