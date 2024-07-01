import React from 'react';
import { useDragLayer } from 'react-dnd';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform,
    };
};

const CustomDragLayer = ({ nodes, connections }) => {
    const {
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(), // Ensure this is correctly set
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !initialOffset || !currentOffset) {
        return null;
    }

    const currentItem = nodes.find(node => node.id === item.id) || item;
    const { x: initialX, y: initialY } = initialOffset;
    const { x: currentX, y: currentY } = currentOffset;
    const deltaX = currentX - initialX;
    const deltaY = currentY - initialY;

    const connectedLines = connections.filter(
        connection => connection.startNode === currentItem.id || connection.endNode === currentItem.id
    );

    const backgroundColor = currentItem.type === 'root' ? '#90caf9' : (currentItem.type === 'left' ? '#f48fb1' : '#ce93d8');

    return (
        <div style={layerStyles}>
            <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                {connectedLines.map((connection, index) => {
                    const start = nodes.find(node => node.id === connection.startNode);
                    const end = nodes.find(node => node.id === connection.endNode);
                    if (!start || !end) return null;

                    const isStartNode = start.id === currentItem.id;
                    const isEndNode = end.id === currentItem.id;

                    const startX = isStartNode ? start.x + deltaX : start.x;
                    const startY = isStartNode ? start.y + deltaY : start.y;
                    const endX = isEndNode ? end.x + deltaX : end.x;
                    const endY = isEndNode ? end.y + deltaY : end.y;

                    return (
                        <line
                            key={index}
                            x1={startX + 475}
                            y1={startY + 95}
                            x2={endX + 475}
                            y2={endY + 95}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                <div
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        textAlign: 'center',
                        border: '1px solid #ccc',
                    }}
                >
                    {currentItem.value}
                </div>
            </div>
        </div>
    );
};

export default CustomDragLayer;
