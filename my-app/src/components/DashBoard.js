import { useLocation } from "react-router-dom";
import SearchAppBar from "./SearchAppBar"
import React from "react";
import { Box, Card, Divider, Grow, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddTask from "./AddTask";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeTodo } from "./todosSlice";
import SwapVertIcon from '@mui/icons-material/SwapVert';
const sortBy = require('lodash/sortBy');

export const DashBoard = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
    const [sortTasksBy, setSortTasksBy] = React.useState(false);
    const { userDetails } = location.state || {};
    const displayedTodos = React.useMemo(() => {
        // use lodash sortBy when sorting is requested
        // require is used here so we don't need to add a top-level import
        if (sortTasksBy) {
            return sortBy(todos, (t) => (t?.taskInfo?.title || '').toLowerCase());
        }
        return todos;
    }, [todos, sortTasksBy]);

    return (
        <React.Fragment>
            <SearchAppBar userDetails={userDetails} />
            {openTaskDialog && <AddTask open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} />}
            {
                todos.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100%',
                        backgroundColor: '#ffffffff',
                        borderRadius: '8px',
                    }}>
                        <img
                            style={{ width: '300px' }}
                            alt="No tasks available"
                            src={"https://img.freepik.com/premium-vector/lady-completes-tasks-notes-calendar-cartoon-character-practicing-time-management-efficiency-business-process-organizing-time-when-working-good-business-productivity-process-vector_776652-2279.jpg"} />
                        <Typography sx={{
                            color: '#e6a700',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '16px',
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            mb: 1,
                        }}>
                            No tasks available.
                        </Typography>
                         <Typography sx={{
                            color: '#999999',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '14px',
                            letterSpacing: '2px',
                        }}>
                            Click the plus icon to add your first task!
                        </Typography>
                        <Grow in={true} timeout={1200}>
                            <PlaylistAddCircleIcon onClick={() => {
                                setOpenTaskDialog(true);
                            }} sx={{ fontSize: 50, color: '#e6a700', mt: 2 }} />
                        </Grow>



                    </Box>
                ) : <>
                    {
                        todos.length > 0 && <Box sx={{
                            mt: 2, mb: 1, ml: 2
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{
                                    fontFamily: '"Roboto", sans-serif',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#e6a700',
                                    mt: 2,
                                    mb: 1,
                                }}>
                                    {`Your Tasks (${todos.length})`}
                                </Typography>
                                <Stack direction={"row"} alignItems="center" justifyContent={"flex-end"}>
                                    <SwapVertIcon sx={{ fontSize: 30, color: '#e6a700', cursor: 'pointer', mx: 2 }} titleAccess="Sort Tasks by Title" onClick={() => {
                                        setSortTasksBy(!sortTasksBy);
                                    }} />
                                    <PlaylistAddCircleIcon titleAccess="Add Task" onClick={() => {
                                        setOpenTaskDialog(true);
                                    }} sx={{ fontSize: 40, color: '#e6a700', cursor: 'pointer', mx: 2 }} />
                                </Stack>
                            </Box>
                            <Divider flexItem sx={{ mb: 2 }} />
                        </Box>
                    }

                    {/* Use CSS Grid so columns fit predictably: 1 on xs, 2 on sm, 4 on md+ */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 2,
                        p: 2,
                    }}>
                        {
                            displayedTodos.map((todo) => (
                                <Card
                                    key={todo.id}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: '10px',
                                        boxShadow: 3,
                                        backgroundColor: '#e6a700',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        minWidth: 0
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography sx={{
                                            fontFamily: '"Roboto", sans-serif',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            color: '#ffffffff',
                                            textTransform: 'capitalize',
                                        }}>
                                            {todo.taskInfo.title}
                                        </Typography>
                                        {todo.taskInfo.important && <PriorityHighIcon sx={{ color: 'red' }} />}
                                        <Stack direction="row" sx={{ ml: 'auto', justifyContent: 'flex-end' }}>
                                            <DeleteIcon sx={{ color: '#ffffffff' }} titleAccess="Delete Task" onClick={() => dispatch(removeTodo(todo.id))} />
                                        </Stack>
                                    </Stack>
                                    <Divider sx={{ mb: 1, borderColor: '#ffffffff' }} />
                                    <Typography sx={{
                                        fontFamily: '"Roboto", sans-serif',
                                        fontSize: '14px',
                                        color: '#e6a700',
                                        backgroundColor: '#ffffffff',
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
                                        color: '#ffffffff',
                                    }}>
                                        {todo.taskInfo.description}
                                    </Typography>

                                </Card>
                            ))
                        }
                    </Box>
                </>
            }
        </React.Fragment>
    )
}