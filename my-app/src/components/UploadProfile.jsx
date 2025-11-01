import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Tooltip } from '@mui/material';

export default function UploadAvatars(props) {
    const {avatarSrc, setAvatarSrc} = props

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ButtonBase
            component="label"
            role={undefined}
            tabIndex={-1}
            aria-label="Avatar image"
            sx={{
                borderRadius: '40px',
                '&:has(:focus-visible)': {
                    outline: '2px solid',
                    outlineOffset: '2px',
                },
            }}
        >
            {
                avatarSrc ? (
                    <Avatar
                        src={avatarSrc}
                        alt="Profile Picture"
                        sx={{ width: 70, height: 70 }}
                    />
                ) : (
                    <Tooltip
                        title="Upload Profile Picture"
                        placement="right"
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: '#ffffffff',
                                    color: '#e6a700',
                                    borderRadius: '8px',
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: '12px',
                                    border: '1px solid #e6a700',
                                    '& .MuiTooltip-arrow': {
                                        color: '#e6a700',
                                    },
                                },
                            },
                        }}
                    >
                        <Avatar sx={{ width: 60, height: 60, border: '2px dashed #e6a700', backgroundColor: '#ffffffff' }}>
                            <AddAPhotoIcon color="action" sx={{
                                width: 35, height: 35,color: '#e6a700',opacity:0.7
                            }} />
                        </Avatar>
                    </Tooltip>
                )
            }
            <input
                type="file"
                accept="image/*"
                style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: '1px',
                    margin: '-1px',
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                }}
                onChange={handleAvatarChange}
            />
        </ButtonBase>
    );
}
