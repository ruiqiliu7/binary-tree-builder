import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper, Typography, Box } from '@mui/material';

const nodeStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    margin: '10px 0',
    textAlign: 'center',
    cursor: 'pointer'
};

const LeftPanel = ({ nodes }) => {
    const hasRoot = nodes.some(node => node.type === 'root');

    const [{ isDragging: isDraggingRoot }, dragRoot] = useDrag(() => ({
        type: 'root',
        item: { id: null, value: 'Root', type: 'root' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ isDragging: isDraggingLeft }, dragLeft] = useDrag(() => ({
        type: 'left-child',
        item: { id: null, value: 'Left Child', type: 'left' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ isDragging: isDraggingRight }, dragRight] = useDrag(() => ({
        type: 'right-child',
        item: { id: null, value: 'Right Child', type: 'right' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <Paper className="left-panel" elevation={3}>
            <Typography variant="h6">Nodes</Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                {!hasRoot ? (
                    <Paper
                        ref={dragRoot}
                        className={`node ${isDraggingRoot ? 'dragging' : ''}`}
                        elevation={1}
                        style={{ ...nodeStyle, backgroundColor: '#90caf9' }}
                    >
                        Root Node
                    </Paper>
                ) : (
                    <>
                        <Paper
                            ref={dragLeft}
                            className={`node left-child ${isDraggingLeft ? 'dragging' : ''}`}
                            elevation={1}
                            style={{ ...nodeStyle, backgroundColor: '#f48fb1' }}
                        >
                            Left Child
                        </Paper>
                        <Paper
                            ref={dragRight}
                            className={`node right-child ${isDraggingRight ? 'dragging' : ''}`}
                            elevation={1}
                            style={{ ...nodeStyle, backgroundColor: '#ce93d8' }}
                        >
                            Right Child
                        </Paper>
                    </>
                )}
            </Box>
            <div className="hint">
                <Typography variant="body2">
                    {hasRoot ? 'Drag left or right child nodes to the canvas to add them.' : 'Drag the root node to the canvas to start.'}
                </Typography>
            </div>
        </Paper>
    );
};

export default LeftPanel;
