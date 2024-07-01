import React, { useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Node from './Node';

const MidPanel = ({ onNodeClick, nodes, setNodes, connections, onDeleteNode }) => {
    const canvasRef = useRef(null);

    const handleDrop = (item, monitor) => {
        const canvas = canvasRef.current.getBoundingClientRect();
        const offset = monitor.getClientOffset();

        if (offset.x < canvas.left || offset.x > canvas.right || offset.y < canvas.top || offset.y > canvas.bottom) {
            onDeleteNode(item.id);
        } else {
            const nodeSize = 50;
            const x = offset.x - canvas.left - nodeSize / 2;
            const y = offset.y - canvas.top - nodeSize / 2;

            if (!item.id) {
                const newId = Math.random().toString(36).substr(2, 9);
                const newNode = {
                    id: newId,
                    value: item.value,
                    type: item.type,
                    x: x,
                    y: y,
                    left: null,
                    right: null,
                };
                setNodes(prevNodes => [...prevNodes, newNode]);
            } else {
                setNodes(prevNodes =>
                    prevNodes.map(node =>
                        node.id === item.id
                            ? { ...node, x: x, y: y }
                            : node
                    )
                );
            }
        }
    };

    const [, drop] = useDrop(() => ({
        accept: ['root', 'left-child', 'right-child'],
        drop: (item, monitor) => handleDrop(item, monitor),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const combinedRef = useCallback((node) => {
        canvasRef.current = node;
        drop(node);
    }, [drop]);

    const handleNodeMove = (id, x, y) => {
        if (x === null && y === null) {
            onDeleteNode(id);
        } else {
            setNodes(prevNodes =>
                prevNodes.map(node =>
                    node.id === id ? { ...node, x, y } : node
                )
            );
        }
    };

    return (
        <div ref={combinedRef} className="mid-panel">
            <h3>Canvas</h3>
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                {connections.map((connection, index) => {
                    const start = nodes.find(node => node.id === connection.startNode);
                    const end = nodes.find(node => node.id === connection.endNode);
                    if (!start || !end) return null;

                    return (
                        <line
                            key={index}
                            x1={start.x + 15}
                            y1={start.y - 45}
                            x2={end.x + 15}
                            y2={end.y - 45}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
            {nodes.map(node => (
                <Node key={node.id} node={node} onClick={onNodeClick} onMove={handleNodeMove} />
            ))}
        </div>
    );
};

export default MidPanel;
