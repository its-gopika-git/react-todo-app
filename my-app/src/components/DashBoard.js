import { Link, useLocation } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import React from "react";
import { Box, Breadcrumbs, Card, Divider, Grow, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddTask from "./AddTask";
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { removeTodo } from "./todosSlice";
import SearchIcon from '@mui/icons-material/Search';
const sortBy = require('lodash/sortBy');

export const DashBoard = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
    const [sortTasksBy, setSortTasksBy] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const { userDetails, avatarSrc } = location.state || {};

    const filteredTodos = React.useMemo(() => {
        const searchFilter = searchTerm.toLowerCase();
        const sortedTodos = sortTasksBy
            ? sortBy(todos, (t) => (t?.taskInfo?.title || '').toLowerCase())
            : todos;

        return sortedTodos.filter(todo =>
            todo.taskInfo.title.toLowerCase().includes(searchFilter)
        );
    }, [todos, sortTasksBy, searchTerm]);

    return (
        <React.Fragment>
            <SearchAppBar userDetails={userDetails} avatarSrc={avatarSrc} />
            {openTaskDialog && <AddTask open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} />}
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{ mx: 2, my: 3 }}
                >
                    <Link to="/"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                        }}>
                        Home
                    </Link>
                    <Typography
                        sx={{
                            color: 'text.primary',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                        }}>DashBoard
                    </Typography>
                </Breadcrumbs>
                {todos.length > 0 && <PlaylistAddCircleIcon titleAccess="Add Notes" onClick={() => {
                    setOpenTaskDialog(true);
                }} sx={{ fontSize: 34, color: '#e6a700', cursor: 'pointer', mx: 3 }} />}

            </Stack>
            <Divider />

            {
                todos.length === 0 ? (
                    <Stack
                        justifyContent={"space-between"}
                        direction={"column"}
                        alignItems={"center"}>
                        <img
                            style={{ width: '300px' }}
                            alt="No tasks available"
                            src={"https://static.vecteezy.com/system/resources/previews/004/968/590/non_2x/no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-etc-vector.jpg"}
                        />
                        <Typography
                            sx={{
                                color: '#e6a700',
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '16px',
                                letterSpacing: '1px',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                mb: .5
                            }}>
                            No notes available.
                        </Typography>
                        <Typography sx={{
                            color: '#999999',
                            fontFamily: '"Roboto", sans-serif"',
                            fontSize: '14px',
                            letterSpacing: '2px',
                        }}>
                            Click the plus icon to add your first task!
                        </Typography>
                        <Grow in={true} timeout={1200}>
                            <PlaylistAddCircleIcon onClick={() => setOpenTaskDialog(true)} sx={{ fontSize: 50, color: '#e6a700', mt: 2 }} />
                        </Grow>
                    </Stack>
                ) : <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                        mb: 1,
                        p: 2
                    }}>
                        <TextField
                            placeholder="Search By Title"
                            size="small"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 24, color: '#e6a700', cursor: 'pointer' }} />
                                </InputAdornment>),

                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Divider orientation="vertical" variant="middle" flexItem sx={{ height: '16px' }} />
                                        <SwapVertIcon sx={{ fontSize: 24, color: '#e6a700', cursor: 'pointer', mx: 2 }} titleAccess="Sort Notes by Title" onClick={() => {
                                            setSortTasksBy(!sortTasksBy);
                                        }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                width: { xs: '80%', sm: '60%', md: '40%' },
                                borderRadius: '8px',
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '14px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#e6a700',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#e6a700',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#e6a700',
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 500
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#e6a700' },
                                '& .MuiInput-underline:before': { borderBottomColor: '#e6a700' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#e6a700' },
                            }}
                        />
                    </Box>

                    {filteredTodos?.length > 0 ? <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, p: 2 }}>
                        {
                            filteredTodos.map((todo) => (
                                <Card
                                    key={todo.id}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: '10px',
                                        boxShadow: 3,
                                        backgroundColor: '#fff',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        minWidth: 0,
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 5,
                                        },
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography sx={{
                                            fontFamily: '"Roboto", sans-serif',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            color: '#000',
                                            textTransform: 'capitalize',
                                        }}>
                                            {todo.taskInfo.title}
                                        </Typography>
                                        {todo.taskInfo.important && <PriorityHighIcon sx={{ color: 'red' }} />}
                                        <Stack direction="row" sx={{ ml: 'auto', justifyContent: 'flex-end' }}>
                                            <DeleteIcon sx={{ color: '#e6a700' }} titleAccess="Delete Task" onClick={() => dispatch(removeTodo(todo.id))} />
                                        </Stack>
                                    </Stack>
                                    <Divider sx={{ mb: 1, borderColor: '#e6a700' }} />
                                    <Typography sx={{
                                        fontFamily: '"Roboto", sans-serif',
                                        fontSize: '14px',
                                        color: '#e6a700',
                                        border: '1px solid #e6a700',
                                        display: 'inline-block',
                                        px: 1,
                                        borderRadius: '5px',
                                        textTransform: 'capitalize',
                                        mb: 1,
                                    }}>
                                        {todo.taskInfo.category || 'General'}
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily: '"Roboto", sans-serif',
                                        fontSize: '14px',
                                        color: '#000',
                                    }}>
                                        {todo.taskInfo.description}
                                    </Typography>
                                </Card>
                            ))
                        }
                    </Box> : <Stack
                        justifyContent={"space-between"}
                        direction={"column"}
                        alignItems={"center"}>
                        <img
                            style={{ width: '300px' }}
                            alt="No tasks available"
                            src={"https://static.vecteezy.com/system/resources/previews/004/968/590/non_2x/no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-etc-vector.jpg"}
                        />
                        <Typography
                            sx={{
                                color: '#e6a700',
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '16px',
                                letterSpacing: '1px',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                mb: .5
                            }}>
                            No notes Found.
                        </Typography>
                    </Stack>}
                </>
            }

            <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#e6a700', textAlign: 'center', p: 2 }}>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Copyright © {new Date().getFullYear()}. All rights reserved.
                </Typography>
            </Box>
        </React.Fragment>
    );
};
