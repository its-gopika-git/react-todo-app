import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Stack,
    Typography,
    FormControlLabel,
    Checkbox,
    Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

const AddTask = ({ open, onClose }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
     const [category, setCategory] = useState('');
    const [important, setImportant] = useState(false);

    const reset = () => {
        setTitle('');
        setDescription('');
        setError('');
        setCategory('');
        setImportant(false);
    };

    const handleClose = () => {
        reset();
        onClose && onClose();
    };

    const saveAndClose = () => {
        const task = {
            title: title.trim(),
            description: description.trim(),
            category,
            important
        };
        if (!task.title) {
            setError('Please enter a title');
            return;
        }
        dispatch({ type: 'todos/addTodo', payload: task });
        handleClose();
    };
    const categories = ['Office', 'Personal', 'Grocery', 'Wishlist'];

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return;
                    onClose && onClose(event, reason);
                }}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '15px',
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#e6a700', color: '#ffffffff' }}>
                    Add Notes
                    <IconButton
                        aria-label="close"
                        onClick={() => handleClose()}
                        size="small">
                        <CloseIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack sx={{ mt: 1 }}>
                        <TextField
                            required
                            label="Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (error) setError('');
                            }}
                            error={!!error}
                            placeholder='Enter task title'
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiInputLabel-root': { color: error ? 'red' : '#e6a700' },
                                '& .MuiInputLabel-root.Mui-focused': { color: error ? 'red' : '#e6a700' },
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: error ? 'red' : '#e6a700' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: error ? 'red' : '#e6a700' },
                                    '&.Mui-focused .MuiInputBase-input': { color: 'inherit' }
                                },
                                my: 2,
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '14px',
                            }}
                        />


                        <div style={{ marginBottom: 16 }}>
                            <Typography sx={{ display: 'block', marginBottom: 1, color: '#e6a700', fontSize: 13 }}>
                                Category
                            </Typography>
                            <Autocomplete
                                options={categories}
                                value={categories.find(c => c.toLowerCase() === category.toLowerCase()) || null}
                                onChange={(event, newValue) => {
                                    setCategory(newValue ? newValue.toLowerCase() : '');
                                }}
                                // PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: '#e6a700', color: '#ffffffff' }} />)}
                                disableClearable
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Select category"
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e6a700' },
                                            '& .MuiInputLabel-root.Mui-focused': { color: '#e6a700' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e6a700' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e6a700' },
                                            '& .MuiInputBase-input': { padding: '10px' },
                                            fontFamily: '"Roboto", sans-serif',
                                            fontSize: '14px',
                                        }}
                                    />
                                )}
                            />

                        </div>

                        <TextField
                            label="Description"
                            placeholder='Enter task description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#e6a700' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#e6a700' },
                                '& .MuiOutlinedInput-root': {
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e6a700' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e6a700' }
                                },
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '14px',
                                my: 2,
                            }}
                        />

                        <FormControlLabel
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: '14px',
                                }
                            }}
                            control={
                                <Checkbox
                                    checked={important}
                                    onChange={(e) => setImportant(e.target.checked)}
                                    name="important"
                                    sx={{
                                        color: '#e6a700',
                                        '&.Mui-checked': {
                                            color: '#e6a700',
                                        },
                                        fontFamily: '"Roboto", sans-serif',
                                        fontSize: '14px',

                                    }}

                                />
                            }
                            label="Mark as Important"
                        />

                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose}>
                        <Typography sx={{
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            letterSpacing: '1px',
                            color: '#e6a700'
                        }}>
                            Cancel
                        </Typography>
                    </Button>
                    <Button variant="contained"
                        sx={{
                            borderRadius: '20px',
                            color: '#f8f8f8ff',
                            backgroundColor: '#e6a700',
                        }}
                        onClick={saveAndClose}>
                        <Typography sx={{
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            letterSpacing: '1px',
                            color: '#ffffffff'
                        }}>
                            Save
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default AddTask;