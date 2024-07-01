import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Paper } from '@mui/material';

const nodeStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    cursor: 'pointer',
    position: 'absolute'
};

const Node = ({ node, onClick, onMove }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: node.type,
        item: { id: node.id, value: node.value, type: node.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const canvas = document.querySelector('.mid-panel').getBoundingClientRect();
            const offset = monitor.getClientOffset();
            if (offset) {
                if (offset.x < canvas.left || offset.x > canvas.right || offset.y < canvas.top || offset.y > canvas.bottom) {
                    onMove(item.id, null, null); // Flag for deletion
                } else {
                    const nodeSize = 50; // Assuming node size is 50x50
                    const x = offset.x - canvas.left - nodeSize / 2;
                    const y = offset.y - canvas.top - nodeSize / 2;
                    onMove(item.id, x, y);
                }
            }
        },
    }));

    useEffect(() => {
        console.log('Rendering node:', node); // Log the node being rendered
    }, [node]);

    const backgroundColor = node.type === 'root' ? '#90caf9' : (node.type === 'left' ? '#f48fb1' : '#ce93d8');

    return (
        <Paper
            ref={drag}
            className={`node ${isDragging ? 'dragging' : ''}`}
            style={{ ...nodeStyle, left: node.x, top: node.y, backgroundColor }}
            onClick={() => onClick(node)}
            elevation={2}
        >
            {node.value}
        </Paper>
    );
};

export default Node;
